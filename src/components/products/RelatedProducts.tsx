"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./ProductCard"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  id: number
  nom: string
  description: string
  image: string
  prix: number
  quantite: number
  taille: string
  couleur: string
  compression: string
  categorie: {
    id: number
    nom: string
  }
}

interface RelatedProductsProps {
  categoryId: number
  currentProductId: number
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Simuler des produits similaires pour la démo
        const mockProducts: Product[] = [
          {
            id: 1,
            nom: "Bas de contention Classe II - Noir",
            description: "Compression modérée pour un usage quotidien",
            image: "/placeholder.svg?height=300&width=300",
            prix: 45.9,
            quantite: 15,
            taille: "M",
            couleur: "Noir",
            compression: "Classe II",
            categorie: { id: categoryId, nom: "Bas de contention" },
          },
          {
            id: 2,
            nom: "Chaussettes de contention Sport",
            description: "Idéales pour les activités sportives",
            image: "/placeholder.svg?height=300&width=300",
            prix: 32.5,
            quantite: 8,
            taille: "L",
            couleur: "Blanc",
            compression: "Classe I",
            categorie: { id: categoryId, nom: "Chaussettes" },
          },
          {
            id: 4,
            nom: "Collants de contention Femme",
            description: "Élégance et efficacité thérapeutique",
            image: "/placeholder.svg?height=300&width=300",
            prix: 68.0,
            quantite: 12,
            taille: "S",
            couleur: "Chair",
            compression: "Classe II",
            categorie: { id: categoryId, nom: "Collants" },
          },
          {
            id: 5,
            nom: "Bas de contention Classe III",
            description: "Compression forte pour pathologies avancées",
            image: "/placeholder.svg?height=300&width=300",
            prix: 78.9,
            quantite: 5,
            taille: "XL",
            couleur: "Beige",
            compression: "Classe III",
            categorie: { id: categoryId, nom: "Bas de contention" },
          },
        ]

        // Filtrer pour exclure le produit actuel
        const filteredProducts = mockProducts.filter((p) => p.id !== currentProductId)
        setProducts(filteredProducts.slice(0, 4))
      } catch (error) {
        console.error("Erreur lors du chargement des produits similaires:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [categoryId, currentProductId])

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
