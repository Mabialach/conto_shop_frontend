"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Tag } from "lucide-react"
import Link from "next/link"
import { PromotionsService } from "@/services/PromotionsService"

interface Promotion {
  id: number
  nom: string
  description: string
  pourcentage_reduction: number
  date_debut: string
  date_fin: string
  code_promo?: string
}

export function PromotionsSection() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await PromotionsService.getAll()
      console.log("prom ", response)
      setPromotions(response) 
    } catch (error) {
      console.error("Erreur lors du chargement des promos:", error)
    } finally {
      setLoading(false)
    }
  }

  fetchCategories()
}, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (promotions.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Promotions Actuelles</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ne manquez pas nos offres spéciales sur une sélection de produits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {promotions.map((promotion) => (
            <Card key={promotion.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{promotion.code}</h3>
                    <p className="text-gray-600 mb-4">{promotion.description}</p>
                  </div>
                  <Badge variant="destructive" className="text-lg font-bold px-3 py-1">
                    -{promotion.valeur}%
                  </Badge>
                </div>

                {promotion.code_promo && (
                  <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3 mb-4">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-sm text-gray-600">Code promo:</span>
                    </div>
                    <code className="font-mono font-bold text-blue-600">{promotion.code_promo}</code>
                  </div>
                )}

                <Link href="/produits">
                  <Button className="w-full">Voir les produits en promotion</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
