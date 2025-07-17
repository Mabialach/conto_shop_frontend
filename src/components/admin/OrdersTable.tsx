"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Package, Truck, CheckCircle } from "lucide-react"
import Link from "next/link"
import { OrdersService } from "@/services/OrdersService"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: number
  numero: string
  user?: {
    nom: string
    email: string
  }
  user_id?: number
  total: number
  statut: string
  created_at: string
  items?: Array<{
    produit: {
      nom: string
    }
    quantite: number
    prix: number
  }>
  lignes?: Array<{
    produit: {
      nom: string
    }
    quantite: number
    prix_unitaire: number
  }>
}

interface OrdersTableProps {
  orders: Order[]
  loading: boolean
}

export function OrdersTable({ orders, loading }: OrdersTableProps) {
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null)
  const { toast } = useToast()

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_attente":
        return <Badge variant="secondary">En attente</Badge>
      case "validee":
        return <Badge variant="default">Validée</Badge>
      case "en_livraison":
        return <Badge variant="outline">En livraison</Badge>
      case "livree":
        return <Badge className="bg-green-100 text-green-800">Livrée</Badge>
      case "annulee":
        return <Badge variant="destructive">Annulée</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setUpdatingStatus(orderId)
    try {
      await OrdersService.updateStatus(orderId, newStatus)
      toast({
        title: "Statut mis à jour",
        description: "Le statut de la commande a été modifié avec succès.",
      })
      // Refresh the page or update the local state
      window.location.reload()
    } catch (error) {
      console.log("erreur : ", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de la commande.",
        variant: "destructive",
      })
    } finally {
      setUpdatingStatus(null)
    }
  }

  const getClientName = (order: Order) => {
    console.log(order)
    if (order.utilisateur?.nom) return order.utilisateur.nom
    return `Client #${order.utilisateur_id || order.id}`
  }

  const getClientEmail = (order: Order) => {
    if (order.utilisateur?.email) return order.utilisateur.email
    return "email@example.com"
  }

  const getItemsCount = (order: Order) => {
    if (order.items) return order.items.length
    if (order.lignes) return order.lignes.length
    return 0
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Commande</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Articles</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Mode de paiement</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Aucune commande trouvée
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.numero_commande || `#${order.id}`}</TableCell>
                <TableCell>
                  {new Date(order.created_at || Date.now()).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{getClientName(order)}</div>
                    <div className="text-sm text-gray-500">{getClientEmail(order)}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {getItemsCount(order)} article{getItemsCount(order) > 1 ? "s" : ""}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{order.montant_total} €</TableCell>
                <TableCell>{order.mode_paiement}</TableCell>
                <TableCell>{getStatusBadge(order.statut)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/commande/confirmation/${order.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>

                    {order.statut === "en_attente" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(order.id, "validee")}
                        disabled={updatingStatus === order.id}
                      >
                        <Package className="h-4 w-4" />
                      </Button>
                    )}

                    {order.statut === "validee" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(order.id, "en_livraison")}
                        disabled={updatingStatus === order.id}
                      >
                        <Truck className="h-4 w-4" />
                      </Button>
                    )}

                    {order.statut === "en_livraison" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(order.id, "livree")}
                        disabled={updatingStatus === order.id}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
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
