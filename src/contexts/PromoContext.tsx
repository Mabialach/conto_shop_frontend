"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { PromotionsService, type ValidatePromoResponse } from "@/services/PromotionsService"
import { useToast } from "@/hooks/use-toast"

interface PromoContextType {
  appliedPromo: ValidatePromoResponse | null
  applyPromoCode: (code: string, total: number) => Promise<boolean>
  removePromoCode: () => void
  isValidating: boolean
  calculateDiscount: (subtotal: number) => {
    discount: number
    newTotal: number
    freeShipping: boolean
  }
}

const PromoContext = createContext<PromoContextType | undefined>(undefined)

export function PromoProvider({ children }: { children: React.ReactNode }) {
  const [appliedPromo, setAppliedPromo] = useState<ValidatePromoResponse | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const { toast } = useToast()

  const applyPromoCode = async (code: string, total: number): Promise<boolean> => {
    if (!code.trim()) {
      toast({
        title: "Code requis",
        description: "Veuillez saisir un code promo",
        variant: "destructive",
      })
      return false
    }

    setIsValidating(true)

    try {
      const result = await PromotionsService.validateCode(code, total)

      if (result.valid) {
        setAppliedPromo(result)
        toast({
          title: "Code promo appliqué",
          description: result.message,
        })
        return true
      } else {
        toast({
          title: "Code promo invalide",
          description: result.message,
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de valider le code promo",
        variant: "destructive",
      })
      return false
    } finally {
      setIsValidating(false)
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
    toast({
      title: "Code promo retiré",
      description: "Le code promo a été retiré de votre commande",
    })
  }

  const calculateDiscount = (subtotal: number) => {
    let discount = 0
    let freeShipping = false

    if (appliedPromo?.promotion) {
      const { type, valeur, code } = appliedPromo.promotion

      if (type === "pourcentage") {
        discount = (valeur / 100) * subtotal
      } else if (type === "montant") {
        discount = valeur
      }

      // Exemple : livraison gratuite si code = "FREEDELIVERY"
      if (code === "FREEDELIVERY") {
        freeShipping = true
      }
    }

    // On limite la réduction au maximum au sous-total
    discount = Math.min(discount, subtotal)

    const newTotal = Math.max(0, subtotal - discount)

    return {
      discount,
      newTotal,
      freeShipping,
    }
  }



  useEffect(() => {
    return () => {
      setAppliedPromo(null)
    }
  }, [])

  return (
    <PromoContext.Provider
      value={{
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        isValidating,
        calculateDiscount,
      }}
    >
      {children}
    </PromoContext.Provider>
  )
}

export function usePromo() {
  const context = useContext(PromoContext)
  if (context === undefined) {
    throw new Error("usePromo must be used within a PromoProvider")
  }
  return context
}
