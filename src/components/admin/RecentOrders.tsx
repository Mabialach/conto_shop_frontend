"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { OrdersService, type Order } from "@/services/OrdersService"
import Link from "next/link"

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecentOrders()
  }, [])

  const loadRecentOrders = async () => {
    try {
      setLoading(true)
      const response = await OrdersService.getAll(1, 5)
      setOrders(response)
    } catch (error) {
      console.error("Erreur lors du chargement des commandes récentes:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      en_attente: { variant: "secondary" as const, label: "En attente" },
      validee: { variant: "default" as const, label: "Validée" },
      en_preparation: { variant: "default" as const, label: "En préparation" },
      en_livraison: { variant: "default" as const, label: "En livraison" },
      livree: { variant: "default" as const, label: "Livrée" },
      annulee: { variant: "destructive" as const, label: "Annulée" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || {
      variant: "secondary" as const,
      label: status,
    }

    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Commandes récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.isArray(orders) && orders.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune commande récente</p>
          ) : Array.isArray(orders) ? (
            orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Commande <small className="h-5">#{order.numero_commande}</small></span>
                    {getStatusBadge(order.statut)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.utilisateur ? `${order.utilisateur.nom} ${order.utilisateur.prenoms}` : "Utilisateur inconnu"} • {order.montant_total}€
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Link href={`/commande/confirmation/${order.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))
          ) : (
            <p className="text-red-500">Aucune commande récente</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
