import api from "@/lib/api"

export interface Promotion {
  id: number
  code: string
  nom: string
  description?: string
  type: "pourcentage" | "montant"
  valeur: number
  date_debut: string
  date_fin: string
  utilisation_max?: number
  utilisation_actuelle?: number
  montant_min?: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface CreatePromotionData {
  code: string
  nom: string
  description?: string
  type: "pourcentage" | "montant"
  valeur: number
  date_debut: string
  date_fin: string
  utilisation_max?: number
  montant_min?: number
  active: boolean
}

export interface ValidatePromoResponse {
  valid: boolean
  promotion?: Promotion
  discount_amount?: number
  message: string
}

class PromotionsServiceClass {
  // Récupérer toutes les promotions (admin)
  async getAll(): Promise<Promotion[]> {
    try {
      return await api.get<Promotion[]>("/promotions")
    } catch (error) {
      console.error("Erreur lors du chargement des promotions:", error)
      throw error
    }
  }

  // Récupérer les promotions actives
  async getActive(): Promise<Promotion[]> {
    try {
      return await api.get<Promotion[]>("/promotions/active")
    } catch (error) {
      console.error("Erreur lors du chargement des promotions actives:", error)
      throw error
    }
  }

  // Valider un code promo
  async validateCode(code: string, total: number): Promise<ValidatePromoResponse> {
    try {
      return await api.post<ValidatePromoResponse>("/promotions/validate", {
        code,
        total,
      })
    } catch (error) {
      console.error("Erreur lors de la validation du code promo:", error)
      throw error
    }
  }

  // Créer une nouvelle promotion (admin)
  async create(promotionData: CreatePromotionData): Promise<Promotion> {
    try {
      return await api.post<Promotion>("/promotions", promotionData)
    } catch (error) {
      console.error("Erreur lors de la création de la promotion:", error)
      throw error
    }
  }

  // Mettre à jour une promotion (admin)
  async update(id: number, promotionData: Partial<CreatePromotionData>): Promise<Promotion> {
    try {
      return await api.put<Promotion>(`/promotions/${id}`, promotionData)
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la promotion ${id}:`, error)
      throw error
    }
  }

  // Supprimer une promotion (admin)
  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/promotions/${id}`)
    } catch (error) {
      console.error(`Erreur lors de la suppression de la promotion ${id}:`, error)
      throw error
    }
  }

  // Activer/désactiver une promotion (admin)
  async toggleActive(id: number, active: boolean): Promise<Promotion> {
    try {
      return await api.patch<Promotion>(`/promotions/${id}/toggle`, { active })
    } catch (error) {
      console.error(`Erreur lors du changement de statut de la promotion ${id}:`, error)
      throw error
    }
  }
}

export const PromotionsService = new PromotionsServiceClass()
