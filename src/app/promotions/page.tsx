"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/ProductCard"
import { Clock, Percent, Gift } from "lucide-react"
import Link from "next/link"

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    // Simuler le chargement des promotions
    setPromotions([
      {
        id: 1,
        titre: "Soldes d'été",
        description: "Jusqu'à -50% sur une sélection de produits",
        reduction: 50,
        code: "SUMMER50",
        dateDebut: "2024-06-01",
        dateFin: "2024-08-31",
        image: "/placeholder.svg?height=200&width=400",
        type: "pourcentage",
      },
      {
        id: 2,
        titre: "Bienvenue",
        description: "10% de réduction pour votre première commande",
        reduction: 10,
        code: "WELCOME10",
        dateDebut: "2024-01-01",
        dateFin: "2024-12-31",
        image: "/placeholder.svg?height=200&width=400",
        type: "pourcentage",
      },
      {
        id: 3,
        titre: "Livraison gratuite",
        description: "Frais de port offerts dès 30€ d'achat",
        reduction: 0,
        code: "FREEDELIVERY",
        dateDebut: "2024-01-01",
        dateFin: "2024-12-31",
        image: "/placeholder.svg?height=200&width=400",
        type: "livraison",
      },
    ])

    // Simuler le chargement des produits en promotion
    setFeaturedProducts([
      {
        id: 1,
        nom: "Legging Sport Premium",
        prix: 45.99,
        prixOriginal: 65.99,
        image: "/placeholder.svg?height=300&width=300",
        categorie: { id: 1, nom: "Leggings" },
        reduction: 30,
      },
      {
        id: 2,
        nom: "Brassière Ultra Confort",
        prix: 29.99,
        prixOriginal: 39.99,
        image: "/placeholder.svg?height=300&width=300",
        categorie: { id: 2, nom: "Brassières" },
        reduction: 25,
      },
    ])
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  const isActive = (dateDebut: string, dateFin: string) => {
    const now = new Date()
    const debut = new Date(dateDebut)
    const fin = new Date(dateFin)
    return now >= debut && now <= fin
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Promotions & Offres Spéciales</h1>
            <p className="text-xl mb-8">Découvrez nos meilleures offres du moment</p>
            <div className="flex justify-center items-center gap-4">
              <Gift className="h-8 w-8" />
              <span className="text-lg">Jusqu'à -50% sur une sélection de produits</span>
            </div>
          </div>
        </section>

        {/* Promotions actives */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Offres du moment</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map((promo) => (
                <Card key={promo.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={promo.image || "/placeholder.svg"}
                      alt={promo.titre}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className={`absolute top-4 right-4 ${
                        isActive(promo.dateDebut, promo.dateFin) ? "bg-green-500" : "bg-gray-500"
                      }`}
                    >
                      {isActive(promo.dateDebut, promo.dateFin) ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Percent className="h-5 w-5 text-pink-500" />
                      {promo.titre}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{promo.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-pink-500">
                        {promo.type === "pourcentage" ? `-${promo.reduction}%` : "Gratuit"}
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {promo.code}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>
                        Du {formatDate(promo.dateDebut)} au {formatDate(promo.dateFin)}
                      </span>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href="/produits">Voir les produits</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Produits en promotion */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Produits en promotion</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="relative">
                  <Badge className="absolute top-2 left-2 z-10 bg-red-500">-{product.reduction}%</Badge>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button size="lg" asChild>
                <Link href="/produits">Voir tous les produits</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 bg-pink-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ne ratez aucune promotion !</h2>
            <p className="text-xl mb-8">Inscrivez-vous à notre newsletter pour être informé en avant-première</p>

            <div className="max-w-md mx-auto flex gap-4">
              <input type="email" placeholder="Votre email" className="flex-1 px-4 py-2 rounded-lg text-gray-900" />
              <Button variant="secondary">S'inscrire</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
