"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ProductDetails } from "@/components/products/ProductDetails"
import { RelatedProducts } from "@/components/products/RelatedProducts"
import { ProductReviews } from "@/components/products/ProductReviews"
import { ProductsService } from "@/services/ProductsService"
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

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await ProductsService.getById(params.id as string)
        setProduct(productData)
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

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

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p>Produit non trouvé</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ProductDetails product={product} />
        <div className="mt-12">
          <ProductReviews productId={product.id} />
        </div>
        {/* <div className="mt-12">
          <RelatedProducts categoryId={product.categorie.id} currentProductId={product.id} />
        </div> */}
      </main>
      <Footer />
    </div>
  )
}
