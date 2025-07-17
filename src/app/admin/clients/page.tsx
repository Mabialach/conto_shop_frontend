"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ClientsTable } from "@/components/admin/ClientsTable"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { UsersService } from "@/services/UsersService"
import { useToast } from "@/hooks/use-toast"

export default function AdminClientsPage() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
      router.push("/auth/login")
      return
    }

    loadClients()
  }, [user, router, currentPage])

  const loadClients = async () => {
    try {
      setLoading(true)
      const response = await UsersService.getAll(currentPage)
      const clientsOnly = response.filter((user) => user.role?.nom === "client" || user.role?.nom === "user")

      setClients(clientsOnly)
      setTotalPages(response.last_page)
    } catch (error) {
      console.error("Erreur lors du chargement des clients:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les clients",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Gestion des clients</h1>
          <p className="text-gray-600">Consultez et gérez vos clients</p>
        </div>

        <ClientsTable
          clients={clients}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </AdminLayout>
  )
}
