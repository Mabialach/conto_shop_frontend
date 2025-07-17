import api from "@/lib/api"

export interface Category {
  id: number
  nom: string
  description?: string
  created_at: string
  updated_at: string
}

export interface CreateCategoryData {
  nom: string
  description?: string
}

class CategoriesServiceClass {
  // Récupérer toutes les catégories
  async getAll(): Promise<Category[]> {
    try {
      return await api.get<Category[]>("/categories")
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error)
      throw error
    }
  }

  // Récupérer une catégorie par ID
  async getById(id: string): Promise<Category> {
    try {
      return await api.get<Category>(`/categories/${id}`)
    } catch (error) {
      console.error(`Erreur lors du chargement de la catégorie ${id}:`, error)
      throw error
    }
  }

  // Créer une nouvelle catégorie (admin)
  async create(categoryData: CreateCategoryData): Promise<Category> {
    try {
      return await api.post<Category>("/categories", categoryData)
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie:", error)
      throw error
    }
  }

  // Mettre à jour une catégorie (admin)
  async update(id: number, categoryData: Partial<CreateCategoryData>): Promise<Category> {
    try {
      return await api.put<Category>(`/categories/${id}`, categoryData)
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la catégorie ${id}:`, error)
      throw error
    }
  }

  // Supprimer une catégorie (admin)
  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/categories/${id}`)
    } catch (error) {
      console.error(`Erreur lors de la suppression de la catégorie ${id}:`, error)
      throw error
    }
  }
}

export const CategoriesService = new CategoriesServiceClass()
