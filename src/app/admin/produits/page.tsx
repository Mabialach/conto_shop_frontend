"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ProductsTable } from "@/components/admin/ProductsTable"
import { ProductForm } from "@/components/admin/ProductForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { type Product, ProductsService } from "@/services/ProductsService"
import { type Category, CategoriesService } from "@/services/CategoriesService"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
      router.push("/auth/login")
      return
    }

    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([ProductsService.getAll(), CategoriesService.getAll()])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Erreur lors du chargement:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, router])

  const handleProductSaved = () => {
    setDialogOpen(false)
    setEditingProduct(null)
    ProductsService.getAll().then(setProducts)
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await ProductsService.delete(id)
      setProducts(products.filter((p: any) => p.id !== id))
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
    }
  }

  if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Gestion des produits</h1>
            <p className="text-gray-600">Gérez votre catalogue de produits</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProduct(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un produit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Modifier le produit" : "Ajouter un produit"}</DialogTitle>
              </DialogHeader>
              <ProductForm
                product={editingProduct}
                categories={categories}
                onSave={handleProductSaved}
                onCancel={() => setDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <ProductsTable products={products} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </AdminLayout>
  )
}
