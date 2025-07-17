"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Printer, Truck } from "lucide-react"
import Link from "next/link"
import { OrdersService } from "@/services/OrdersService"
import { useParams } from "next/navigation"
import { Eye } from "lucide-react"


export default function OrderConfirmationPage() {
  const { id } = useParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await OrdersService.getById(id as string)
        setOrder(response)
      } catch (error) {
        console.error("Erreur lors du chargement de la commande :", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOrder()
    }
  }, [id])

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    alert("Fonctionnalité PDF à implémenter")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4">Chargement de votre commande...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 print:p-0">
        <div className="max-w-4xl mx-auto">
          {/* En-tête de confirmation */}
          <div className="text-center mb-8 print:mb-4">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Commande confirmée !</h1>
            <p className="text-gray-600">Merci pour votre commande. Vous recevrez un email de confirmation sous peu.</p>
          </div>

          {/* Actions d'impression */}
          <div className="flex justify-center gap-4 mb-8 print:hidden">
            <Button onClick={handlePrint} variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
            <Button onClick={handleDownloadPDF} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Télécharger PDF
            </Button>
          </div>

          {/* Détails de la commande */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Commande N° {order.numero_commande}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {order.statut}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Informations de commande</h3>
                  <p className="text-sm text-gray-600">Date : {new Date(order.created_at).toLocaleDateString("fr-FR")}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Livraison à</h3>
                  <p className="text-sm text-gray-600">Nom : {order.utilisateur.nom} {order.utilisateur.prenoms}</p>
                  <p className="text-sm text-gray-600">Adresse : {order.utilisateur.adresse}</p>
                  <p className="text-sm text-gray-600">Téléphone : {order.utilisateur.telephone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Articles commandés */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Articles commandés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.lignes.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div className="flex-1">
                      {item.produit.image ? (
                      <img
                        src={item.produit.image || "/placeholder.svg"}
                        alt={item.produit.nom}
                        className="w-[100px] h-[100px] object-cover"
                      />
                    ) : (
                      <Eye className="h-6 w-6 text-gray-400" />
                    )}
                      <h4 className="font-medium">{item.produit.nom}</h4>
                      <p className="text-sm text-gray-600">
                        Taille : {item.produit.taille} - Couleur : {item.produit.couleur} - Compression : {item.produit.compression}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {item.quantite} × {item.prix_unitaire} €
                      </p>
                      <p className="text-sm text-gray-600">{(item.quantite * item.prix_unitaire)} €</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total :</span>
                  <span>{order.montant_total} €</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{order.montant_total} €</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations de suivi 
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Suivi de livraison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Commande confirmée</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">En préparation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Expédiée</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Livrée</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Vous recevrez un email avec le numéro de suivi dès l'expédition de votre commande.
              </p>
            </CardContent>
          </Card>*/}

          {/* Actions */}
          <div className="text-center print:hidden">
            <div className="space-x-4">
              <Button asChild>
                <Link href="/produits">Continuer mes achats</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/mon-compte/commandes">Mes commandes</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
