"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ReviewsTable } from "@/components/admin/ReviewsTable"
import { ReviewsStats } from "@/components/admin/ReviewsStats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewsService, type Review } from "@/services/ReviewsService"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [currentTab, setCurrentTab] = useState("tous")
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
      router.push("/auth/login")
      return
    }

    fetchReviews(currentTab)
    fetchStats()
  }, [currentTab])

  const fetchReviews = async (statut?: string) => {
    try {
      setLoading(true)
      const params = statut && statut !== "tous" ? { statut } : {}
      const data = await ReviewsService.getAll(params)
      setReviews(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Erreur lors du chargement des avis :", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les avis",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const data = await ReviewsService.getStats()
      setStats(data)
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques :", error)
    }
  }

  const handleApprove = async (id: number) => {
    try {
      await ReviewsService.approve(id)
      toast({
        title: "Succès",
        description: "Avis approuvé avec succès",
      })
      fetchReviews(currentTab)
      fetchStats()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'approuver l'avis",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (id: number) => {
    try {
      await ReviewsService.reject(id)
      toast({
        title: "Succès",
        description: "Avis rejeté avec succès",
      })
      fetchReviews(currentTab)
      fetchStats()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de rejeter l'avis",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await ReviewsService.delete(id)
      toast({
        title: "Succès",
        description: "Avis supprimé avec succès",
      })
      fetchReviews(currentTab)
      fetchStats()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'avis",
        variant: "destructive",
      })
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Avis</h1>
          <p className="text-gray-600">Gérez les avis clients de votre boutique</p>
        </div>

        {stats && <ReviewsStats stats={stats} />}

        <Card>
          <CardHeader>
            <CardTitle>Avis Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsContent value={currentTab} className="mt-6">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <ReviewsTable
                    reviews={reviews}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onDelete={handleDelete}
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}