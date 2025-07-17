"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Truck, Building, FileText, DollarSign } from "lucide-react"
import { OrdersService } from "@/services/OrdersService"
import { PaymentMethodsService } from "@/services/PaiementMethodsService"

interface PaymentMethod {
  id: string
  name: string
  type: "livraison" | "carte" | "virement" | "cheque" | "paypal"
  description: string
  active: boolean
  position: number
  instructions?: string
}

interface CheckoutFormProps {
  onOrderComplete: (orderData: any) => void
}

export function CheckoutForm({ onOrderComplete }: CheckoutFormProps) {
  const { items, total } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nom: user?.nom || "",
    prenoms: user?.prenoms || "",
    email: user?.email || "",
    telephone: user?.telephone || "",
    adresse: user?.adresse || "",
    paymentMethod: "",
    notes: "",
  })

  useEffect(() => {
    // Charger les modes de paiement actifs depuis l'admin
    loadPaymentMethods()
  }, [])

  const loadPaymentMethods = async () => {
  try {
    const response = await PaymentMethodsService.getActive()

    // Trier par position croissante
    const activeMethods = response
      .filter((method) => method.active)
      .sort((a, b) => a.position - b.position)

    setPaymentMethods(activeMethods)

    // Préselectionner le premier mode de paiement actif
    if (activeMethods.length > 0) {
      setFormData((prev) => ({
        ...prev,
        paymentMethod: String(activeMethods[0].id),
      }))
    }
  } catch (error) {
    console.error("Erreur lors du chargement des modes de paiement :", error)
    toast({
      title: "Erreur",
      description: "Impossible de charger les modes de paiement",
      variant: "destructive",
    })
  }
}

  const getPaymentIcon = (type: PaymentMethod["type"]) => {
    switch (type) {
      case "livraison":
        return <Truck className="h-5 w-5" />
      case "carte":
        return <CreditCard className="h-5 w-5" />
      case "virement":
        return <Building className="h-5 w-5" />
      case "cheque":
        return <FileText className="h-5 w-5" />
      case "paypal":
        return <DollarSign className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    const selectedMethod = paymentMethods.find((m) => m.id === formData.paymentMethod)
    if (!selectedMethod || !user) throw new Error("Données manquantes")

    const order = await OrdersService.create({
      utilisateur_id: user.id,
      mode_paiement: selectedMethod.type,
      adresse_livraison: `${formData.adresse}`,
      observation: formData.notes,
      items: items.map((item) => ({
        produit_id: item.id,
        quantite: item.quantity,
        prix_unitaire: item.prix,
      })),
    })

    toast({
      title: "Commande créée",
      description: "Votre commande a été enregistrée avec succès.",
    })

    onOrderComplete(order)
  } catch (error: any) {
    toast({
      title: "Erreur",
      description: error.message || "Impossible d'enregistrer la commande.",
      variant: "destructive",
    })
  } finally {
    setLoading(false)
  }
}


  const selectedMethod = paymentMethods.find((m) => m.id === formData.paymentMethod)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de livraison</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="prenoms">Prénoms *</Label>
              <Input
                id="prenoms"
                value={formData.prenoms}
                onChange={(e) => setFormData({ ...formData, prenoms: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="telephone">Téléphone *</Label>
              <Input
                id="telephone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Adresse de livraison */}
          <div>
            <Label htmlFor="adresse">Adresse de livraison *</Label>
            <Input
              id="adresse"
              value={formData.adresse}
              onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
              placeholder="Numéro et nom de rue"
              required
            />
          </div>

          {/* Mode de paiement */}
          <div>
            <Label className="text-base font-semibold">Mode de paiement *</Label>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
              className="mt-3"
            >
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getPaymentIcon(method.type)}
                      <Label htmlFor={method.id} className="font-medium cursor-pointer">
                        {method.nom}
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Instructions du mode de paiement sélectionné */}
          {selectedMethod && selectedMethod.instructions && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Instructions de paiement</h4>
              <p className="text-sm text-blue-800 whitespace-pre-line">{selectedMethod.instructions}</p>
            </div>
          )}

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Instructions spéciales pour la livraison..."
              rows={3}
            />Vue d'ensemble de votre boutique
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Création de la commande..." : "Finaliser la commande"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
