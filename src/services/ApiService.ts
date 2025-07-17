const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

class ApiServiceClass {
  private baseURL: string

  constructor() {
    this.baseURL = API_BASE_URL
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    const token = localStorage.getItem("token")

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: "GET" })
  }

  async post(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async patch(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async put(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: "DELETE" })
  }
}

export const ApiService = new ApiServiceClass()
