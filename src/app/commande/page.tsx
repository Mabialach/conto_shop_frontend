"use client"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CheckoutForm } from "@/components/checkout/CheckoutForm"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingBag, Lock } from "lucide-react"

export default function CheckoutPage() {
  const { items } = useCart()
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Lock className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Connexion requise</h2>
            <p className="text-gray-600 mb-6">Vous devez être connecté pour passer commande</p>
            <Button asChild>
              <Link href="/auth/login">Se connecter</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">Ajoutez des produits à votre panier avant de commander</p>
            <Button asChild>
              <Link href="/produits">Voir nos produits</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Finaliser ma commande</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CheckoutForm />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
