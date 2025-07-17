import api from "@/lib/api"

export interface PaymentMethod {
  id: number
  nom: string
  type: "livraison" | "carte" | "virement" | "cheque" | "paypal"
  description: string
  instructions?: string
  active: boolean
  position: number
  created_at: string
  updated_at: string
}

export interface CreatePaymentMethodData {
  nom: string
  type: "livraison" | "carte" | "virement" | "cheque" | "paypal"
  description: string
  instructions?: string
  active: boolean
  position: number
}

class PaymentMethodsServiceClass {
  // Récupérer tous les modes de paiement (admin)
  async getAll(): Promise<PaymentMethod[]> {
    try {
      return await api.get<PaymentMethod[]>("/modes-paiement")
    } catch (error) {
      console.error("Erreur lors du chargement des modes de paiement:", error)
      throw error
    }
  }

  // Récupérer seulement les modes de paiement actifs
  async getActive(): Promise<PaymentMethod[]> {
    try {
      return await api.get<PaymentMethod[]>("/modes-paiement/active")
    } catch (error) {
      console.error("Erreur lors du chargement des modes de paiement actifs:", error)
      throw error
    }
  }

  // Créer un nouveau mode de paiement (admin)
  async create(data: CreatePaymentMethodData): Promise<PaymentMethod> {
    try {
      return await api.post<PaymentMethod>("/modes-paiement", data)
    } catch (error) {
      console.error("Erreur lors de la création du mode de paiement:", error)
      throw error
    }
  }

  // Mettre à jour un mode de paiement (admin)
  async update(id: number, data: Partial<CreatePaymentMethodData>): Promise<PaymentMethod> {
    try {
      return await api.put<PaymentMethod>(`/modes-paiement/${id}`, data)
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du mode de paiement ${id}:`, error)
      throw error
    }
  }

  // Supprimer un mode de paiement (admin)
  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/modes-paiement/${id}`)
    } catch (error) {
      console.error(`Erreur lors de la suppression du mode de paiement ${id}:`, error)
      throw error
    }
  }

  // Activer/désactiver un mode de paiement (admin)
  async toggleActive(id: number, active: boolean): Promise<PaymentMethod> {
    try {
      return await api.patch<PaymentMethod>(`/modes-paiement/${id}/toggle`, { active })
    } catch (error) {
      console.error(`Erreur lors du changement de statut du mode de paiement ${id}:`, error)
      throw error
    }
  }

  // Mettre à jour la position d’un mode de paiement
  async updatePosition(id: number, direction: "up" | "down"): Promise<void> {
    try {
      await api.patch(`/modes-paiement/${id}/position`, { direction })
    } catch (error) {
      console.error(`Erreur lors du changement de position du mode de paiement ${id}:`, error)
      throw error
    }
  }

}

export const PaymentMethodsService = new PaymentMethodsServiceClass()
