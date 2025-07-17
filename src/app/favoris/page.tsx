"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ProductCard } from "@/components/products/ProductCard"
import { useFavorites } from "@/contexts/FavoritesContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Mes favoris</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Aucun favori</h2>
            <p className="text-gray-600 mb-6">Vous n'avez pas encore ajouté de produits à vos favoris</p>
            <Button asChild>
              <Link href="/produits">Découvrir nos produits</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
