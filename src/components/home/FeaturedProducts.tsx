"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/products/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductsService } from "@/services/ProductsService"

interface Product {
  id: number
  nom: string
  description: string
  prix: number
  image?: string
  categorie: {
    id: number
    nom: string
  }
  taille: string
  couleur: string
  compression: string
  quantite: number
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const allProducts = await ProductsService.getAll()
        const featured = allProducts.filter((p: any) => p.quantite > 0)
        console.log(featured)
        setProducts(featured)
      } catch (error) {
        console.error("Erreur lors du chargement des produits vedettes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Produits Vedettes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de bas de contention de qualité médicale, conçus pour votre confort et votre
            bien-être.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
