"use client"

import { useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { usePromo } from "@/contexts/PromoContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ShoppingCart, Truck, Shield, CreditCard, X, Tag } from "lucide-react"

export function CartSummary() {
  const { items, getTotalPrice, getTotalItems } = useCart()
  const { appliedPromo, applyPromoCode, removePromoCode, calculateDiscount } = usePromo()
  const [promoCode, setPromoCode] = useState("")
  const [isApplying, setIsApplying] = useState(false)

  const subtotal = getTotalPrice()
  const { discount, newTotal, freeShipping } = calculateDiscount(subtotal)
  const shipping = freeShipping || newTotal > 50 ? 0 : 5.99
  const total = newTotal + shipping

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return

    setIsApplying(true)
    const success = await applyPromoCode(promoCode.trim(), subtotal)
    if (success) {
      setPromoCode("")
    }
    setIsApplying(false)
  }


  return (
    <div className="space-y-6">
      {/* Résumé de la commande */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Résumé de la commande
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Sous-total ({getTotalItems()} articles)</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>

          {/* Code promo appliqué */}
          {appliedPromo && appliedPromo.promotion && (
            <div className="flex justify-between items-center p-2 bg-green-50 rounded">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-green-600" />
                <span className="text-green-800 font-medium">{appliedPromo.promotion.code}</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  -{appliedPromo.promotion.type === "pourcentage"
                    ? `${appliedPromo.promotion.valeur}%`
                    : `${appliedPromo.promotion.valeur}€`}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={removePromoCode} className="text-red-600 hover:text-red-800">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}


          {/* Réduction */}
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Réduction</span>
              <span>-{discount.toFixed(2)}€</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Livraison</span>
            <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
              {shipping === 0 ? "Gratuite" : `${shipping}€`}
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

          <Button asChild className="w-full" size="lg">
            <Link href="/checkout">Passer la commande</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Code promo */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-3">Code promo</h3>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Entrez votre code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleApplyPromo()}
            />
            <Button variant="outline" size="sm" onClick={handleApplyPromo} disabled={isApplying || !promoCode.trim()}>
              {isApplying ? "..." : "Appliquer"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Avantages */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Truck className="h-4 w-4 text-green-600" />
            <span>Livraison gratuite dès 50€</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Shield className="h-4 w-4 text-blue-600" />
            <span>Garantie 30 jours satisfait ou remboursé</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <CreditCard className="h-4 w-4 text-purple-600" />
            <span>Paiement sécurisé SSL</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
