"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Search, Menu, X, Heart, Phone, Mail, LogOut } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { useFavorites } from "@/contexts/FavoritesContext"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { getTotalItems } = useCart()
  const { user, logout } = useAuth()
  const { getTotalFavorites } = useFavorites()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/produits?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>contact@contoshop.fr</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Livraison gratuite dès 50€ d'achat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Cs</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ContoShop</span>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button type="submit" size="sm" className="absolute right-1 top-1 h-8 w-8 p-0">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Mobile */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Favorites */}
            <Link href="/favoris">
              <Button variant="ghost" size="sm" className="hidden sm:flex relative">
                <Heart className="h-5 w-5" />
                {getTotalFavorites() > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {getTotalFavorites()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/panier">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href={user.role.nom === "client" ? "/mon-compte" : "/admin"}>
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:ml-2 sm:inline">{user.nom}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:ml-2 sm:inline">Connexion</span>
                </Button>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center justify-center space-x-8 mt-4 pt-4 border-t border-gray-200">
          <Link href="/produits" className="text-gray-700 hover:text-blue-600 font-medium">
            Tous les produits
          </Link>
          <Link href="/categories" className="text-gray-700 hover:text-blue-600">
            Catégories
          </Link>
          <Link href="/promotions" className="text-gray-700 hover:text-blue-600 ">
            Promotions
          </Link>
          <Link href="/conseils" className="text-gray-700 hover:text-blue-600">
            Conseils
          </Link>
          <Link href="/guide-tailles" className="text-gray-700 hover:text-blue-600">
            Guide des tailles
          </Link>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-2">
            <Link
              href="/produits"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Tous les produits
            </Link>
            <Link
              href="/categories"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Catégories
            </Link>
            <Link
              href="/promotions"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Promotions
            </Link>
            <Link
              href="/conseils"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Conseils
            </Link>
            <Link
              href="/guide-tailles"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Guide des tailles
            </Link>

            {/* Mobile search */}
            <div className="pt-4">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
