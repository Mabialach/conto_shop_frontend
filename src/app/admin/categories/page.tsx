"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { CategoriesTable } from "@/components/admin/CategoriesTable"
import { CategoryForm } from "@/components/admin/CategoryForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { type Category, CategoriesService } from "@/services/CategoriesService"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
      router.push("/auth/login")
      return
    }

    loadCategories()
  }, [user, router])

  const loadCategories = async () => {
    try {
      const categoriesData = await CategoriesService.getAll()
      setCategories(categoriesData)
    } catch (error) {
      console.error("Erreur lors du chargement:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySaved = () => {
    setDialogOpen(false)
    setEditingCategory(null)
    loadCategories()
  }

  const handleEdit = (category: any) => {
    setEditingCategory(category)
    setDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await CategoriesService.delete(id)
      loadCategories()
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
            <h1 className="text-2xl font-bold">Gestion des catégories</h1>
            <p className="text-gray-600">Organisez vos produits par catégories</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCategory(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une catégorie
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Modifier la catégorie" : "Ajouter une catégorie"}</DialogTitle>
              </DialogHeader>
              <CategoryForm
                category={editingCategory}
                onSave={handleCategorySaved}
                onCancel={() => setDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <CategoriesTable categories={categories} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </AdminLayout>
  )
}
