"use client"

import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={`${item.id}-${item.taille}-${item.couleur}`}>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Image produit */}
              <div className="flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg?height=120&width=120"}
                  alt={item.nom}
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Informations produit */}
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-lg">{item.nom}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>

                {/* Caractéristiques */}
                <div className="flex flex-wrap gap-2 text-sm">
                  {item.taille && <span className="bg-gray-100 px-2 py-1 rounded">Taille : {item.taille}</span>}
                  {item.couleur && <span className="bg-gray-100 px-2 py-1 rounded">Couleur : {item.couleur}</span>}
                  {item.compression && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Compression : {item.compression}</span>
                  )}
                </div>

                {/* Prix unitaire */}
                <div className="text-lg font-semibold text-green-600">{item.prix}€</div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:items-end gap-4">
                {/* Contrôles quantité */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-12 text-center font-medium">{item.quantity}</span>

                  <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Prix total */}
                <div className="text-xl font-bold">{(item.prix * item.quantity)}€</div>

                {/* Bouton supprimer */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
