import api from "@/lib/api"

export interface OrderItem {
  id: number
  produit_id: number
  quantite: number
  prix_unitaire: number
  produit: {
    nom: string
    image?: string
  }
}

export interface Order {
  id: number
  numero: string
  user_id: number
  user: {
    nom: string
    email: string
  }
  total: number
  statut: "en_attente" | "validee" | "en_livraison" | "livree" | "annulee"
  adresse_livraison: string
  mode_paiement: string
  lignes: OrderItem[]
  created_at: string
  updated_at: string
}

export interface CreateOrderData {
  utilisateur_id: number
  items: Array<{
    produit_id: number
    quantite: number
    prix_unitaire: number
  }>
  adresse_livraison: string
  mode_paiement: string
  observation?: string
}


class OrdersServiceClass {
  // Récupérer toutes les commandes (admin)
  async getAll(): Promise<Order[]> {
    try {
      return await api.get<Order[]>("/commandes")
    } catch (error) {
      console.error("Erreur lors du chargement des commandes:", error)
      throw error
    }
  }

  // Récupérer une commande par ID
  async getById(id: string): Promise<Order> {
    try {
      return await api.get<Order>(`/commandes/${id}`)
    } catch (error) {
      console.error(`Erreur lors du chargement de la commande ${id}:`, error)
      throw error
    }
  }

  // Récupérer les commandes de l'utilisateur connecté
  async getMyOrders(): Promise<Order[]> { 
    try {
      return await api.get('/me/commandes')
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes:", error)
      throw error
    }
  }

  async getMyOrdersStats(): Promise<Order[]> {
    try {
      return await api.get("/me/commandes/stats")
    } catch (error) {
      console.error("Erreur lors de la récupération des stats des commandes:", error)
      throw error
    }
  }



  // Créer une nouvelle commande
  async create(orderData: CreateOrderData): Promise<Order> {
  try {
    const payload = {
      utilisateur_id: orderData.utilisateur_id,
      mode_paiement: orderData.mode_paiement,
      adresse_livraison: orderData.adresse_livraison,
      observation: orderData.observation || null,
      lignes: orderData.items,
    }

    return await api.post<Order>("/commandes", payload)
  } catch (error) {
      console.error("Erreur lors de la création de la commande:", error)
      throw error
    }
  }

  // Mettre à jour le statut d'une commande (admin)
  async updateStatus(id: number, status: Order["statut"]): Promise<Order> {
    try {
      return await api.patch<Order>(`/commandes/statut/${id}`, { statut: status })
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du statut de la commande ${id}:`, error)
      throw error
    }
  }

  // Annuler une commande
  async cancel(id: number): Promise<Order> {
    try {
      return await api.put<Order>(`/commandes/cancel/${id}`)
    } catch (error) {
      console.error(`Erreur lors de l'annulation de la commande ${id}:`, error)
      throw error
    }
  }
}

export const OrdersService = new OrdersServiceClass()
