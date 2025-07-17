"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CartItems } from "@/components/cart/CartItems"
import { CartSummary } from "@/components/cart/CartSummary"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { items } = useCart()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Mon Panier</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
            <Button asChild>
              <Link href="/produits">Voir nos produits</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems />
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
