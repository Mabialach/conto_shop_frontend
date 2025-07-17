import api from "@/lib/api"
import type { User } from "./AuthService"

export interface PaginatedUsers {
  data: User[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface CreateUserData {
  nom: string
  prenoms: string
  email: string
  mot_de_passe: string
  telephone?: string
  adresse?: string
  role_id: number
}

class UsersServiceClass {
  // Récupérer tous les utilisateurs avec pagination (admin)
  async getAll(page = 1): Promise<PaginatedUsers> {
    try {
      return await api.get<PaginatedUsers>("/users", { page })
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error)
      throw error
    }
  }

  // Récupérer un utilisateur par ID (admin)
  async getById(id: number): Promise<User> {
    try {
      return await api.get<User>(`/users/${id}`)
    } catch (error) {
      console.error(`Erreur lors du chargement de l'utilisateur ${id}:`, error)
      throw error
    }
  }

  // Créer un nouvel utilisateur (admin)
  async create(userData: CreateUserData): Promise<User> {
    try {
      return await api.post<User>("/users", userData)
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error)
      throw error
    }
  }

  // Mettre à jour un utilisateur (admin)
  async update(id: number, userData: Partial<CreateUserData>): Promise<User> {
    try {
      return await api.put<User>(`/users/${id}`, userData)
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error)
      throw error
    }
  }

  // Supprimer un utilisateur (admin)
  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/users/${id}`)
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error)
      throw error
    }
  }

  // Rechercher des utilisateurs (admin)
  async search(query: string, page = 1): Promise<PaginatedUsers> {
    try {
      return await api.get<PaginatedUsers>("/users/search", {
        q: query,
        page,
      })
    } catch (error) {
      console.error("Erreur lors de la recherche d'utilisateurs:", error)
      throw error
    }
  }
}

export const UsersService = new UsersServiceClass()
