"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { CategoriesService } from "@/services/CategoriesService"
import { useToast } from "@/hooks/use-toast"

interface CategoryFormProps {
  category?: any
  onSave: () => void
  onCancel: () => void
}

export function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    active: true,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (category) {
      setFormData({
        nom: category.nom || "",
        description: category.description || "",
        active: category.active ?? true,
      })
    }
  }, [category])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (category) {
        await CategoriesService.update(category.id, formData)
        toast({
          title: "Catégorie modifiée",
          description: "La catégorie a été modifiée avec succès.",
        })
      } else {
        await CategoriesService.create(formData)
        toast({
          title: "Catégorie créée",
          description: "La catégorie a été créée avec succès.",
        })
      }
      onSave()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nom">Nom de la catégorie *</Label>
        <Input
          id="nom"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      {/* <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.active}
          onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
        />
        <Label htmlFor="active">Catégorie active</Label>
      </div> */}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Sauvegarde..." : category ? "Modifier" : "Créer"}
        </Button>
      </div>
    </form>
  )
}
