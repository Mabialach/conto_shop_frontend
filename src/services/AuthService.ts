import api from "@/lib/api"

export interface User {
  id: number
  nom: string
  prenoms: string
  email: string
  telephone?: string
  adresse?: string
  role: {
    id: number
    nom: string
  }
  created_at: string
  updated_at: string
}

export interface LoginCredentials {
  email: string
  mot_de_passe: string
}

export interface RegisterData {
  nom: string
  prenoms: string
  email: string
  mot_de_passe: string
  mot_de_passe_confirmation: string
  telephone?: string
  adresse?: string
}

export interface LoginResponse {
  user: User
  token: string
  message: string
}

class AuthServiceClass {
  // Connexion utilisateur
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log("🔐 Tentative de connexion avec:", { email, mot_de_passe: password })

      const payload = {
        email: email,
        mot_de_passe: password,
      }

      console.log("📤 Payload envoyé:", payload)

      const response = await api.post<LoginResponse>("/login", payload)

      console.log("📥 Réponse reçue:", response)

      // Stocker le token et les infos utilisateur
      if (response.token) {
        api.setAuthToken(response.token)
        this.setUser(response.user)
      }

      return response
    } catch (error) {
      console.error("❌ Erreur lors de la connexion:", error)
      throw error
    }
  }

  // Inscription utilisateur
  async register(userData: RegisterData): Promise<LoginResponse> {
    try {
      console.log("📝 Tentative d'inscription avec:", userData)

      const response = await api.post<LoginResponse>("/register", userData)

      console.log("📥 Réponse inscription:", response)

      // Stocker le token et les infos utilisateur
      if (response.token) {
        api.setAuthToken(response.token)
        this.setUser(response.user)
      }

      return response
    } catch (error) {
      console.error("❌ Erreur lors de l'inscription:", error)
      throw error
    }
  }

  // Déconnexion
  async logout(): Promise<void> {
    try {
      await api.post("/logout")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      // Nettoyer les données locales même en cas d'erreur
      api.removeAuthToken()
      this.removeUser()
    }
  }

  // Récupérer les infos de l'utilisateur connecté
  async me(): Promise<User> {
    try {
      return await api.get<User>("/me")
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error)
      throw error
    }
  }

  // Mettre à jour le profil
  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const updatedUser = await api.put<User>("/me", userData)
      this.setUser(updatedUser)
      return updatedUser
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error)
      throw error
    }
  }

  // Changer le mot de passe
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await api.put("/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPassword,
      })
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe:", error)
      throw error
    }
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
    return !!localStorage.getItem("auth_token")
  }

  // Récupérer l'utilisateur depuis le localStorage
  getUser(): User | null {
    if (typeof window === "undefined") return null
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  }

  // Stocker l'utilisateur dans le localStorage
  private setUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }

  // Supprimer l'utilisateur du localStorage
  private removeUser(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  // Vérifier si l'utilisateur a un rôle spécifique
  hasRole(roleName: string): boolean {
    const user = this.getUser()
    return user?.role?.nom === roleName
  }

  // Vérifier si l'utilisateur est admin
  isAdmin(): boolean {
    return this.hasRole("admin") || this.hasRole("super_admin")
  }
}

export const AuthService = new AuthServiceClass()
