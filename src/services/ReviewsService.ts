import api from "@/lib/api"

export interface Review {
  id: number
  user_id: number
  produit_id: number
  note: number
  commentaire: string
  statut: "en_attente" | "approuve" | "rejete"
  created_at: string
  updated_at: string
  user: {
    id: number
    nom: string
    prenoms: string
    email: string
  }
  produit: {
    id: number
    nom: string
    image: string
  }
}

export interface CreateReviewData {
  produit_id: number
  note: number
  commentaire: string
}

export interface UpdateReviewData {
  note?: number
  commentaire?: string
  statut?: "en_attente" | "approuve" | "rejete"
}

export const ReviewsService = {
  // Récupérer tous les avis (admin)
  async getAll(params?: {
    page?: number
    per_page?: number
    statut?: string
    produit_id?: number
    search?: string
  }) {
    try {
      console.log("🔍 Récupération des avis:", params)
      const response = await api.get("/avis", { params })
      return response
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des avis:", error)
      throw error
    }
  },

  // Récupérer les avis d'un produit
  async getByProduct(
    productId: number,
    params?: {
      page?: number
      per_page?: number
      statut?: "approuve"
    },
  ) {
    try {
      console.log("🔍 Récupération des avis du produit:", productId)
      const response = await api.get(`/produits/${productId}/avis`, {
        params: { statut: "approuve", ...params },
      })
      console.log("✅ Avis du produit récupérés:", response)
      return response
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des avis du produit:", error)
      throw error
    }
  },

  // Récupérer les avis approuvés pour la page d'accueil
  async getFeatured(limit = 6) {
    try {
      console.log("🔍 Récupération des avis vedettes")
      const response = await api.get("/avis/featured", {
        params: { limit, statut: "approuve" },
      })
      console.log("✅ Avis vedettes récupérés:", response)
      return response
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des avis vedettes:", error)
      throw error
    }
  },

  // Créer un avis
  async create(data: CreateReviewData) {
    try {
      console.log("📝 Création d'un avis:", data)
      const response = await api.post("/avis", data)
      console.log("✅ Avis créé:", response)
      return response
    } catch (error) {
      console.error("❌ Erreur lors de la création de l'avis:", error)
      throw error
    }
  },

  // Mettre à jour un avis
  async update(id: number, data: UpdateReviewData) {
    try {
      console.log("📝 Mise à jour de l'avis:", id, data)
      const response = await api.put(`/avis/${id}`, data)
      console.log("✅ Avis mis à jour:", response)
      return response
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour de l'avis:", error)
      throw error
    }
  },

  // Supprimer un avis
  async delete(id: number) {
    try {
      console.log("🗑️ Suppression de l'avis:", id)
      const response = await api.delete(`/avis/${id}`)
      console.log("✅ Avis supprimé")
      return response
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de l'avis:", error)
      throw error
    }
  },

  // Approuver un avis
  async approve(id: number) {
    try {
      console.log("✅ Approbation de l'avis:", id)
      const response = await api.patch(`/avis/${id}/approve`)
      console.log("✅ Avis approuvé:", response)
      return response
    } catch (error) {
      console.error("❌ Erreur lors de l'approbation de l'avis:", error)
      throw error
    }
  },

  // Rejeter un avis
  async reject(id: number) {
    try {
      console.log("❌ Rejet de l'avis:", id)
      const response = await api.patch(`/avis/${id}/reject`)
      console.log("✅ Avis rejeté:", response)
      return response
    } catch (error) {
      console.error("❌ Erreur lors du rejet de l'avis:", error)
      throw error
    }
  },

  // Obtenir les statistiques des avis
  async getStats() {
    try {
      console.log("📊 Récupération des statistiques des avis")
      const response = await api.get("/avis/stats")
      console.log('rrrrrrrrrrrrrrrrrrrrrrrrr', response)
      return response
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des statistiques:", error)
      throw error
    }
  },
}
