"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, Package, Truck, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { OrdersService } from "@/services/OrdersService"

export default function MesCommandesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
    if (user) {
      loadOrders()
    }
  }, [user, loading, router])

  const loadOrders = async () => {
    try {
      const ordersData = await OrdersService.getMyOrders()
      setOrders(ordersData)
    } catch (error) {
      console.error("Erreur lors du chargement des commandes:", error)
    } finally {
      setOrdersLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "en_attente":
        return <Package className="h-4 w-4" />
      case "validee":
        return <CheckCircle className="h-4 w-4" />
      case "en_livraison":
        return <Truck className="h-4 w-4" />
      case "livree":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "en_attente":
        return "secondary"
      case "validee":
        return "default"
      case "en_livraison":
        return "outline"
      case "livree":
        return "default"
      default:
        return "secondary"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "en_attente":
        return "En attente"
      case "validee":
        return "Validée"
      case "en_livraison":
        return "En livraison"
      case "livree":
        return "Livrée"
      default:
        return status
    }
  }

  if (loading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/mon-compte">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à mon compte
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Mes commandes</h1>
            <p className="text-gray-600">Suivez l'état de vos commandes</p>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucune commande</h3>
                <p className="text-gray-600 mb-4">Vous n'avez pas encore passé de commande.</p>
                <Button asChild>
                  <Link href="/produits">Découvrir nos produits</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Commande #{order.numero_commande}</CardTitle>
                        <p className="text-sm text-gray-600">
                          Passée le {new Date(order.created_at).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <Badge variant={getStatusVariant(order.statut)} className="flex items-center gap-1">
                        {getStatusIcon(order.statut)}
                        {getStatusLabel(order.statut)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Total:</span>
                          <p className="text-lg font-bold">{order.montant_total}€</p>
                        </div>
                        <div>
                          <span className="font-medium">Articles:</span>
                          <p>{order.items?.length || order.lignes?.length || 0} article(s)</p>
                        </div>
                        <div>
                          <span className="font-medium">Livraison:</span>
                          <p>{order.adresse_livraison || "Adresse par défaut"}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-gray-600">
                          {order.statut === "livree" && (
                            <span className="text-green-600 font-medium">✓ Commande livrée</span>
                          )}
                          {order.statut === "en_livraison" && (
                            <span className="text-blue-600 font-medium">📦 En cours de livraison</span>
                          )}
                          {order.statut === "validee" && (
                            <span className="text-orange-600 font-medium">⏳ En préparation</span>
                          )}
                          {order.statut === "en_attente" && (
                            <span className="text-gray-600 font-medium">⏳ En attente de confirmation</span>
                          )}
                        </div>
                      
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
