"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface FavoriteItem {
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
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addToFavorites: (product: any) => void
  removeFromFavorites: (id: number) => void
  isFavorite: (id: number) => boolean
  getTotalFavorites: () => number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (product: any) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) return prev

      return [
        ...prev,
        {
          id: product.id,
          nom: product.nom,
          description: product.description || "",
          prix: product.prix,
          image: product.image,
          categorie: product.categorie || { id: 0, nom: "Non catégorisé" },
          taille: product.taille,
          couleur: product.couleur,
          compression: product.compression,
          quantite: product.quantite || product.stock || 0,
        },
      ]
    })
  }

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id)
  }

  const getTotalFavorites = () => {
    return favorites.length
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getTotalFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
