"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { OrdersTable } from "@/components/admin/OrdersTable"
import { type Order, OrdersService } from "@/services/OrdersService"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
      router.push("/auth/login")
      return
    }

    const fetchOrders = async () => {
      try {
        const ordersData = await OrdersService.getAll()
        setOrders(ordersData)
      } catch (error) {
        console.error("Erreur lors du chargement des commandes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user, router])

  if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Gestion des commandes</h1>
          <p className="text-gray-600">Suivez et gérez toutes les commandes</p>
        </div>

        <OrdersTable orders={orders} loading={loading} />
      </div>
    </AdminLayout>
  )
}
