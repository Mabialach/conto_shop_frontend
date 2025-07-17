"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

interface Category {
  id: number
  nom: string
  description: string
}

interface Product {
  id: number
  nom: string
  prix: number
  taille: string
  couleur: string
  compression: string
  categorie: {
    id: number
    nom: string
  }
}

interface Filters {
  category: string
  priceRange: number[]
  compression: string
  color: string
  size: string
}

interface ProductFiltersProps {
  categories: Category[]
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  products: Product[]
}

export function ProductFilters({ categories, filters, onFiltersChange, products }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Extraire les valeurs uniques des produits
  const compressions = [...new Set(products.map((p) => p.compression))].filter(Boolean)
  const colors = [...new Set(products.map((p) => p.couleur))].filter(Boolean)
  const sizes = [...new Set(products.map((p) => p.taille))].filter(Boolean)

  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      category: "",
      priceRange: [0, 1000],
      compression: "",
      color: "",
      size: "",
    })
  }

  const hasActiveFilters =
    filters.category ||
    filters.compression ||
    filters.color ||
    filters.size ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Catégories */}
      <div>
        <h3 className="font-semibold mb-3">Catégorie</h3>
        <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Prix */}
      <div>
        <h3 className="font-semibold mb-3">Prix</h3>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value)}
            max={1000}
            min={0}
            step={10}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{filters.priceRange[0]}€</span>
            <span>{filters.priceRange[1]}€</span>
          </div>
        </div>
      </div>

      {/* Compression */}
      {compressions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Compression</h3>
          <Select value={filters.compression} onValueChange={(value) => updateFilter("compression", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Toutes les compressions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les compressions</SelectItem>
              {compressions.map((compression) => (
                <SelectItem key={compression} value={compression}>
                  Compression {compression}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Couleur */}
      {colors.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Couleur</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                variant={filters.color === color ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter("color", filters.color === color ? "" : color)}
                className="capitalize"
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Taille */}
      {sizes.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Taille</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={filters.size === size ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter("size", filters.size === size ? "" : size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Bouton de réinitialisation */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Effacer les filtres
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Version mobile */}
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              Actifs
            </Badge>
          )}
        </Button>
        {isOpen && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <FilterContent />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Version desktop */}
      <div className="hidden lg:block">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Filtres
              {hasActiveFilters && <Badge variant="secondary">Actifs</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
