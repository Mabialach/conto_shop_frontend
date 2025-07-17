"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, ShoppingBag, Heart, Settings, Package } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { OrdersService } from "@/services/OrdersService"

export default function MonComptePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [ordersStats, setOrdersStats] = useState([])
  const [ordersLoadingStats, setOrdersStatsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
    if (user) {
      loadOrdersStats()
    }
  }, [user, loading, router])

  const loadOrdersStats = async () => {
    try {
      const ordersStatsData = await OrdersService.getMyOrdersStats()
      setOrdersStats(ordersStatsData)
    } catch (error) {
      console.error("Erreur lors du chargement des stats des commandes:", error)
    } finally {
      setOrdersStatsLoading(false)
    }
  }

  if (loading || ordersLoadingStats) {
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Mon compte</h1>
            <p className="text-gray-600">
              Bienvenue {user.prenoms} {user.nom}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Mes informations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Nom :</span> {user.nom}
                  </p>
                  <p>
                    <span className="font-medium">Prénom :</span> {user.prenoms}
                  </p>
                  <p>
                    <span className="font-medium">Email :</span> {user.email}
                  </p>
                  {user.telephone && (
                    <p>
                      <span className="font-medium">Téléphone :</span> {user.telephone}
                    </p>
                  )}
                  {user.adresse && (
                    <p>
                      <span className="font-medium">Adresse :</span> {user.adresse}
                    </p>
                  )}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/mon-compte/profil">Modifier</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Mes commandes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Mes commandes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Commandes totales</span>
                    <Badge variant="secondary">{ordersStats.total || 0}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">En cours</span>
                    <Badge variant="outline">{ordersStats.en_livraison || 0}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Livrées</span>
                    <Badge variant="outline">{ordersStats.livrees || 0}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Annulées</span>
                    <Badge variant="outline">{ordersStats.annulees || 0}</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/mon-compte/commandes">Voir toutes</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Mes favoris */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Mes favoris
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Retrouvez tous vos produits favoris</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/favoris">Voir mes favoris</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Mes avis
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Mes avis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Partagez votre expérience sur nos produits</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/mon-compte/avis">Mes avis</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Paramètres 
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Paramètres
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start p-0" asChild>
                    <Link href="/mon-compte/mot-de-passe">Changer mot de passe</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-0" asChild>
                    <Link href="/mon-compte/notifications">Notifications</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-0" asChild>
                    <Link href="/mon-compte/adresses">Mes adresses</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support 
            <Card>
              <CardHeader>
                <CardTitle>Besoin d'aide ?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start p-0" asChild>
                    <Link href="/faq">FAQ</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-0" asChild>
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-0" asChild>
                    <Link href="/guide-tailles">Guide des tailles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
