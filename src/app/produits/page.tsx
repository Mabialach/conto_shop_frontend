"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ProductCard } from "@/components/products/ProductCard"
import { ProductFilters } from "@/components/products/ProductFilters"
import { ProductsService } from "@/services/ProductsService"
import { CategoriesService } from "@/services/CategoriesService"
import { Loader2 } from "lucide-react"

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

interface Category {
  id: number
  nom: string
  description: string
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: searchParams.get("categorie") || "",
    priceRange: [0, 1000],
    compression: "",
    color: "",
    size: "",
    search: searchParams.get("search") || "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([ProductsService.getAll(), CategoriesService.getAll()])
        setProducts(productsData)
        setCategories(categoriesData)
        setFilteredProducts(productsData)
      } catch (error) {
        console.error("Erreur lors du chargement:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = products

    // Filtre par recherche
    if (filters.search) {
      filtered = filtered.filter(
        (p) =>
          p.nom.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Filtre par catégorie
    if (filters.category) {
      filtered = filtered.filter((p) => p.categorie.id.toString() === filters.category)
    }

    // Filtre par compression
    if (filters.compression) {
      filtered = filtered.filter((p) => p.compression === filters.compression)
    }

    // Filtre par couleur
    if (filters.color) {
      filtered = filtered.filter((p) => p.couleur === filters.color)
    }

    // Filtre par taille
    if (filters.size) {
      filtered = filtered.filter((p) => p.taille === filters.size)
    }

    // Filtre par prix
    filtered = filtered.filter((p) => p.prix >= filters.priceRange[0] && p.prix <= filters.priceRange[1])

    setFilteredProducts(filtered)
  }, [filters, products])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <ProductFilters
              categories={categories}
              filters={filters}
              onFiltersChange={setFilters}
              products={products}
            />
          </aside>
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {filters.search ? `Résultats pour "${filters.search}"` : "Nos Produits"}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun produit ne correspond à vos critères.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
