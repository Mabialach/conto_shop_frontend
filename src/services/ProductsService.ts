import api from "@/lib/api"

export interface Product {
  id: number
  nom: string
  description: string
  prix: number
  image?: string
  quantite: number
  taille: string
  couleur: string
  compression: string
  categorie_id: number
  categorie: {
    id: number
    nom: string
  }
  created_at: string
  updated_at: string
}

export interface CreateProductData {
  nom: string
  description: string
  prix: number
  image?: string
  quantite: number
  taille: string
  couleur: string
  compression: string
  categorie_id: number
}

export interface ProductFilters {
  categorie_id?: number
  prix_min?: number
  prix_max?: number
  taille?: string
  couleur?: string
  compression?: string
  search?: string
}

export interface PaginatedProducts {
  data: Product[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

class ProductsServiceClass {
  // Récupérer tous les produits avec pagination et filtres
  async getAll(page = 1, filters?: ProductFilters): Promise<PaginatedProducts> {
    try {
      const params = {
        page,
        ...filters,
      }
      return await api.get<PaginatedProducts>("/produits", params)
    } catch (error) {
      console.error("Erreur lors du chargement des produits:", error)
      throw error
    }
  }

  // Récupérer un produit par ID
  async getById(id: string): Promise<Product> {
    try {
      return await api.get<Product>(`/produits/${id}`)
    } catch (error) {
      console.error(`Erreur lors du chargement du produit ${id}:`, error)
      throw error
    }
  }

  // Récupérer les produits populaires/en vedette
  async getFeatured(limit = 8): Promise<Product[]> {
    try {
      return await api.get<Product[]>("/produits/featured", { limit })
    } catch (error) {
      console.error("Erreur lors du chargement des produits en vedette:", error)
      // Fallback: récupérer les premiers produits
      const allProducts = await this.getAll(1)
      return allProducts.data.slice(0, limit)
    }
  }

  // Rechercher des produits
  async search(query: string, page = 1): Promise<PaginatedProducts> {
    try {
      return await api.get<PaginatedProducts>("/produits/search", {
        q: query,
        page,
      })
    } catch (error) {
      console.error("Erreur lors de la recherche:", error)
      throw error
    }
  }

  // Récupérer les produits d'une catégorie
  async getByCategory(categoryId: number, page = 1): Promise<PaginatedProducts> {
    try {
      return await api.get<PaginatedProducts>(`/produits/category/${categoryId}`, { page })
    } catch (error) {
      console.error(`Erreur lors du chargement des produits de la catégorie ${categoryId}:`, error)
      throw error
    }
  }

  // Créer un nouveau produit (admin)
  async create(productData: CreateProductData): Promise<Product> {
    try {
      return await api.post<Product>("/produits", productData)
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error)
      throw error
    }
  }

  // Mettre à jour un produit (admin)
  async update(id: number, productData: Partial<CreateProductData>): Promise<Product> {
    try {
      return await api.put<Product>(`/produits/${id}`, productData)
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du produit ${id}:`, error)
      throw error
    }
  }

  // Supprimer un produit (admin)
  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/produits/${id}`)
    } catch (error) {
      console.error(`Erreur lors de la suppression du produit ${id}:`, error)
      throw error
    }
  }

  // Upload d'image pour un produit
  async uploadImage(productId: number, imageFile: File): Promise<{ image_url: string }> {
    try {
      const formData = new FormData()
      formData.append("image", imageFile)

      return await api.upload<{ image_url: string }>(`/produits/${productId}/image`, formData)
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image:", error)
      throw error
    }
  }

  // Récupérer les produits liés/similaires
  async getRelated(productId: number, limit = 4): Promise<Product[]> {
    try {
      return await api.get<Product[]>(`/produits/${productId}/related`, { limit })
    } catch (error) {
      console.error("Erreur lors du chargement des produits liés:", error)
      return []
    }
  }
}

export const ProductsService = new ProductsServiceClass()
