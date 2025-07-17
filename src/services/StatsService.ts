import api from "@/lib/api"

export interface DashboardStats {
  total_products: number
  total_orders: number
  total_users: number
  total_revenue: number
  orders_today: number
  revenue_today: number
  pending_orders: number
  low_stock_products: number
}

export interface SalesData {
  date: string
  sales: number
  orders: number
}

export interface CategoryStats {
  category: string
  sales: number
  percentage: number
}

export interface RevenueData {
  month: string
  revenue: number
  orders: number
}

class StatsServiceClass {
  // Récupérer les statistiques du dashboard (admin)
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      return await api.get<DashboardStats>("/stats/dashboard")
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error)
      throw error
    }
  }

  // Récupérer les données de ventes par jour
  async getSalesData(days = 30): Promise<SalesData[]> {
    try {
      return await api.get<SalesData[]>("/stats/sales", { days })
    } catch (error) {
      console.error("Erreur lors du chargement des données de ventes:", error)
      throw error
    }
  }

  // Récupérer les statistiques par catégorie
  async getCategoryStats(): Promise<CategoryStats[]> {
    try {
      return await api.get<CategoryStats[]>("/stats/categories")
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques par catégorie:", error)
      throw error
    }
  }

  // Récupérer les données de revenus par mois
  async getRevenueData(months = 12): Promise<RevenueData[]> {
    try {
      return await api.get<RevenueData[]>("/stats/revenue", { months })
    } catch (error) {
      console.error("Erreur lors du chargement des données de revenus:", error)
      throw error
    }
  }

  // Récupérer les commandes récentes
  async getRecentOrders(limit = 10): Promise<any[]> {
    try {
      return await api.get<any[]>("/stats/recent-orders", { limit })
    } catch (error) {
      console.error("Erreur lors du chargement des commandes récentes:", error)
      throw error
    }
  }
}

export const StatsService = new StatsServiceClass()
