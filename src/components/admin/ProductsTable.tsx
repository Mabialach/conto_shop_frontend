"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Product {
  id: number
  nom: string
  description: string
  prix: number
  image?: string
  categorie: {
    id: number
    nom: string
  }
  taille: string
  couleur: string
  compression: string
  quantite: number
  visibilite: boolean
}

interface ProductsTableProps {
  products: Product[]
  loading: boolean
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export function ProductsTable({ products, loading, onEdit, onDelete }: ProductsTableProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null)

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Nom et description</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Aucun produit trouvé
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.nom}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Eye className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{product.nom}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[500px]">{product.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.categorie.nom}</Badge>
                </TableCell>
                <TableCell className="font-medium">{product.prix}€</TableCell>
                <TableCell>
                  <Badge
                    variant={product.quantite > 10 ? "default" : product.quantite > 0 ? "secondary" : "destructive"}
                  >
                    {product.quantite > 0 ? `${product.quantite} en stock` : "Rupture"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={product.visibilite ? "default" : "destructive"}>
                    {product.visibilite ? "Visible" : "Invisible"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setDeleteId(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer le produit</AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer "{product.nom}" ? Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              onDelete(product.id)
                              setDeleteId(null)
                            }}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
