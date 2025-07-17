"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthService, type User } from "@/services/AuthService"

interface AuthContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (userData: any) => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const initAuth = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const userData = AuthService.getUser()
          if (userData) {
            setUser(userData)
          } else {
            // Essayer de récupérer les infos utilisateur depuis l'API
            const currentUser = await AuthService.me()
            setUser(currentUser)
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'auth:", error)
        // Si erreur, nettoyer les données locales
        AuthService.logout()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      console.log("🔐 AuthContext: Tentative de connexion", { email })

      const response = await AuthService.login(email, password)

      console.log("✅ AuthContext: Connexion réussie", response.user)

      setUser(response.user)
    } catch (error) {
      console.error("❌ AuthContext: Erreur de connexion", error)
      throw error
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await AuthService.register(userData)
      setUser(response.user)
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout()
      setUser(null)
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      // Même en cas d'erreur, on déconnecte localement
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    setUser,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isAdmin: user?.role?.nom === "admin" || user?.role?.nom === "super_admin",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
