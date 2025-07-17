"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductsService } from "@/services/ProductsService"
import { useToast } from "@/hooks/use-toast"

interface Category {
  id: number
  nom: string
}

interface Product {
  id?: number
  nom: string
  description: string
  prix: number
  image?: string
  categorie_id: number
  taille: string
  couleur: string
  compression: string
  quantite: number
}

interface ProductFormProps {
  product?: any
  categories: Category[]
  onSave: () => void
  onCancel: () => void
}

export function ProductForm({ product, categories, onSave, onCancel }: ProductFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Product>({
    nom: "",
    description: "",
    prix: 0,
    image: "",
    categorie_id: 0,
    taille: "",
    couleur: "",
    compression: "",
    quantite: 0,
  })

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        nom: product.nom || "",
        description: product.description || "",
        prix: product.prix || 0,
        image: product.image || "",
        categorie_id: product.categorie?.id || product.categorie_id || 0,
        taille: product.taille?.toString() || "",
        couleur: product.couleur || "",
        compression: product.compression?.toString() || "",
        quantite: product.quantite || 0,
      })
    }
  }, [product])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (product?.id) {
        await ProductsService.update(product.id, formData)
        toast({
          title: "Produit modifié",
          description: "Le produit a été modifié avec succès.",
        })
      } else {
        await ProductsService.create(formData)
        toast({
          title: "Produit créé",
          description: "Le produit a été créé avec succès.",
        })
      }
      onSave()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const selectedCategory = categories.find(c => c.id === Number(formData.categorie_id))

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom du produit *</Label>
          <Input id="nom" value={formData.nom} onChange={(e) => handleChange("nom", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prix">Prix (€) *</Label>
          <Input
            id="prix"
            type="number"
            step="0.01"
            min="0"
            value={formData.prix}
            onChange={(e) => handleChange("prix", Number.parseFloat(e.target.value) || 0)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="categorie">Catégorie *</Label>
          <Select
  value={formData.categorie_id.toString()}
  onValueChange={(value) => {
  const parsed = parseInt(value)
  if (!isNaN(parsed)) {
    handleChange("categorie_id", parsed)
  }
}}

>
  <SelectTrigger>
    <SelectValue>
      {selectedCategory?.nom || "Sélectionner une catégorie"}
    </SelectValue>
  </SelectTrigger>
  <SelectContent>
    {categories.map((category) => (
      <SelectItem key={category.id} value={category.id.toString()}>
        {category.nom}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

        </div>
        <div className="space-y-2">
          <Label htmlFor="quantite">Quantité en stock *</Label>
          <Input
            id="quantite"
            type="number"
            min="0"
            value={formData.quantite}
            onChange={(e) => handleChange("quantite", Number.parseInt(e.target.value) || 0)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="taille">Taille </Label>
          <Input id="taille" value={formData.taille} onChange={(e) => handleChange("taille", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="couleur">Couleur</Label>
          <Input
            id="couleur"
            value={formData.couleur}
            onChange={(e) => handleChange("couleur", e.target.value)}
            placeholder="ex: Noir, Blanc, Rouge..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="compression">Compression</Label>
          <Input id="compression" value={formData.compression} onChange={(e) => handleChange("compression", e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL de l'image</Label>
        <Input
          id="image"
          type="url"
          value={formData.image}
          onChange={(e) => handleChange("image", e.target.value)}
          placeholder="https://exemple.com/image.jpg"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : product?.id ? "Modifier" : "Créer"}
        </Button>
      </div>
    </form>
  )
}
