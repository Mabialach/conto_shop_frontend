import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from "axios"

// Interface pour les réponses API standardisées
interface ApiResponse<T = any> {
  data: T
  message?: string
  status: number
  success: boolean
}

// Interface pour les erreurs API
interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status: number
}

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8000/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Intercepteur pour les requêtes
    this.client.interceptors.request.use(
      (config) => {
        // Ajouter le token d'authentification
        const token = this.getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // Log des requêtes en mode développement
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
        console.log("📤 Request Data:", config.data)
        console.log("📤 Request Headers:", config.headers)

        return config
      },
      (error) => {
        console.error("❌ Request Error:", error)
        return Promise.reject(error)
      },
    )

    // Intercepteur pour les réponses
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log des réponses en mode développement
        console.log(
          `✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
        )
        console.log("📥 Response Data:", response.data)

        return response
      },
      (error: AxiosError) => {
        // Log des erreurs
        console.error(
          `❌ API Error: ${error.response?.status} ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        )
        console.error("📥 Error Response:", error.response?.data)

        // Gestion des erreurs d'authentification
        if (error.response?.status === 401) {
          this.handleAuthError()
        }

        // Gestion des erreurs de validation (422)
        if (error.response?.status === 422) {
          const validationErrors = error.response.data as any
          console.error("❌ Validation Errors:", validationErrors.errors)
        }

        return Promise.reject(this.formatError(error))
      },
    )
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
  }

  private handleAuthError() {
    if (typeof window === "undefined") return

    // Supprimer les tokens
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("user")

    // Rediriger vers la page de connexion
    window.location.href = "/auth/login"
  }

  private formatError(error: AxiosError): ApiError {
    const response = error.response

    return {
      message: response?.data?.message || error.message || "Une erreur est survenue",
      errors: response?.data?.errors || {},
      status: response?.status || 500,
    }
  }

  // Méthodes HTTP publiques
  async get<T = any>(url: string, params?: any): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(url, { params })
    return response.data.data || response.data
  }

  async post<T = any>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, data)
    return response.data.data || response.data
  }

  async put<T = any>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data)
    return response.data.data || response.data
  }

  async patch<T = any>(url: string, data?: any): Promise<T> {
    const response = await this.client.patch<ApiResponse<T>>(url, data)
    return response.data.data || response.data
  }

  async delete<T = any>(url: string): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url)
    return response.data.data || response.data
  }

  // Méthode pour uploader des fichiers
  async upload<T = any>(url: string, formData: FormData): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data.data || response.data
  }

  // Méthode pour définir le token d'authentification
  setAuthToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  // Méthode pour supprimer le token d'authentification
  removeAuthToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      sessionStorage.removeItem("auth_token")
    }
  }
}

// Instance singleton
const api = new ApiClient()
export default api
