"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, Truck, Shield, Award } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

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

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        nom: product.nom,
        prix: product.prix,
        image: product.image,
        taille: product.taille,
        couleur: product.couleur,
        compression: product.compression,
      },
      selectedQuantity,
    )
  }

  const compressionInfo = {
    "Classe I": "15-21 mmHg - Compression légère",
    "Classe II": "23-32 mmHg - Compression modérée",
    "Classe III": "34-46 mmHg - Compression forte",
    "Classe IV": "49+ mmHg - Compression très forte",
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image du produit */}
      <div className="space-y-4">
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
          <img
            src={product.image || `/placeholder.svg?height=500&width=500`}
            alt={product.nom}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Badges de confiance */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Certifié CE
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Truck className="h-3 w-3" />
            Livraison 24-48h
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Award className="h-3 w-3" />
            Garantie 2 ans
          </Badge>
        </div>
      </div>

      {/* Informations du produit */}
      <div className="space-y-6">
        <div>
          <Badge variant="outline" className="mb-2">
            {product.categorie.nom}
          </Badge>
          <h1 className="text-3xl font-bold">{product.nom}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="text-sm text-gray-600">(4.2/5 - 127 avis)</span>
          </div>
        </div>

        <div className="text-3xl font-bold text-primary">{product.prix} €</div>

        {/* Caractéristiques techniques */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Caractéristiques techniques</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Taille:</span>
                <span className="ml-2 font-medium">{product.taille}</span>
              </div>
              <div>
                <span className="text-gray-600">Couleur:</span>
                <span className="ml-2 font-medium">{product.couleur}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">Compression:</span>
                <span className="ml-2 font-medium">{product.compression}</span>
                <div className="text-xs text-gray-500 mt-1">
                  {compressionInfo[product.compression as keyof typeof compressionInfo]}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed">
            {product.description ||
              "Bas de contention de haute qualité, conçus pour offrir un confort optimal et une compression graduée efficace. Idéal pour améliorer la circulation sanguine et réduire la sensation de jambes lourdes."}
          </p>
        </div>

        <Separator />

        {/* Actions d'achat */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantité:
              </label>
              <select
                id="quantity"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                className="border rounded px-3 py-1"
              >
                {[...Array(Math.min(product.quantite, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {product.quantite > 0 ? (
              <Badge variant="secondary" className="text-green-600">
                En stock ({product.quantite} disponibles)
              </Badge>
            ) : (
              <Badge variant="destructive">Rupture de stock</Badge>
            )}
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAddToCart} disabled={product.quantite === 0} className="flex-1" size="lg">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Ajouter au panier
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? "text-red-500 border-red-500" : ""}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Informations de livraison */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Livraison et retours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-green-600" />
                <span>Livraison gratuite dès 50€ d'achat</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Retours gratuits sous 30 jours</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-600" />
                <span>Garantie fabricant 2 ans</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
