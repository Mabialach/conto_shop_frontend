"use client"

import { useCart } from "@/contexts/CartContext"
import { usePromo } from "@/contexts/PromoContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart } from "lucide-react"

export function OrderSummary() {
  const { items, getTotalPrice, getTotalItems } = useCart()
  const { calculateDiscount } = usePromo()

  const subtotal = getTotalPrice()
  const { discount, newTotal, freeShipping } = calculateDiscount(subtotal)
  const shipping = freeShipping || newTotal > 50 ? 0 : 5.99
  const total = newTotal + shipping

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Résumé de la commande
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Articles */}
        <div className="space-y-2">
          {items.map((item) => (
            <div key={`${item.id}-${item.taille}-${item.couleur}`} className="flex justify-between text-sm">
              <span className="flex-1">
                {item.nom} ({item.quantity}x)
              </span>
              <span>{(item.prix * item.quantity).toFixed(2)}€</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Totaux */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Sous-total ({getTotalItems()} articles)</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Réduction</span>
              <span>-{discount.toFixed(2)}€</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Livraison</span>
            <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
              {shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)}€`}
            </span>
          </div>

          {(shipping === 0 || freeShipping) && (
            <p className="text-sm text-green-600">
              ✓ Livraison gratuite {freeShipping ? "avec votre code promo" : "dès 50€ d'achat"}
            </p>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{total.toFixed(2)}€</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
