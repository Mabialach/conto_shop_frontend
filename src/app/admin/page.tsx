"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { DashboardStats } from "@/components/admin/DashboardStats"
import { RecentOrders } from "@/components/admin/RecentOrders"
import { SalesChart } from "@/components/admin/SalesChart"
import { useAuth } from "@/contexts/AuthContext"
import { RevenueChart } from "@/components/admin/RevenueChart"
import { CategoryChart } from "@/components/admin/CategoryChart"

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin"))) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble de votre boutique</p>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <RevenueChart />
          <CategoryChart />
          <RecentOrders />
        </div>
      </div>
    </AdminLayout>
  )
}
