"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { useFavorites } from "@/contexts/FavoritesContext"
import { useToast } from "@/hooks/use-toast"

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

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addItem } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { toast } = useToast()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAddingToCart(true)

    try {
      addItem(product, 1)
      toast({
        title: "Produit ajouté au panier",
        description: `${product.nom} a été ajouté à votre panier`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier",
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
      toast({
        title: "Retiré des favoris",
        description: `${product.nom} a été retiré de vos favoris`,
      })
    } else {
      addToFavorites(product)
      toast({
        title: "Ajouté aux favoris",
        description: `${product.nom} a été ajouté à vos favoris`,
      })
    }
  }

  const isOutOfStock = product.quantite === 0

  return (
    <Link href={`/produits/${product.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
        <CardContent className="p-0">
          {/* Image container */}
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={product.image || "/placeholder.svg?height=300&width=300"}
              alt={product.nom}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full w-10 h-10 p-0"
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isFavorite(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stock badge */}
            {isOutOfStock && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                Rupture de stock
              </Badge>
            )}

            {/* Category badge */}
            <Badge variant="secondary" className="absolute top-2 right-2">
              {product.categorie.nom}
            </Badge>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.nom}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
            </div>

            {/* Product details */}
            <div className="flex flex-wrap gap-1 text-xs">
              <Badge variant="outline">{product.taille}</Badge>
              <Badge variant="outline">{product.couleur}</Badge>
              <Badge variant="outline">{product.compression}</Badge>
            </div>

            {/* Price and actions */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-lg font-bold text-gray-900">{product.prix} €</span>
                {product.quantite <= 5 && product.quantite > 0 && (
                  <p className="text-xs text-orange-600">Plus que {product.quantite} en stock</p>
                )}
              </div>

              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAddingToCart}
                className="min-w-[100px]"
              >
                {isAddingToCart ? (
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Ajout...</span>
                  </div>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {isOutOfStock ? "Indisponible" : "Ajouter"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
