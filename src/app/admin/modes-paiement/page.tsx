"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Plus, Edit, Trash2, ArrowUpDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  PaymentMethodsService,
  type PaymentMethod,
  type CreatePaymentMethodData,
} from "@/services/PaiementMethodsService"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function AdminPaymentMethodsPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState<CreatePaymentMethodData>({
    nom: "",
    type: "carte",
    description: "",
    instructions: "",
    active: true,
    position: 0,
  })

  useEffect(() => {
    if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
      router.push("/auth/login")
      return
    }

    loadPaymentMethods()
  }, [user, router])

  const loadPaymentMethods = async () => {
    try {
      setLoading(true)
      const data = await PaymentMethodsService.getAll()
      setPaymentMethods(data)
    } catch (error) {
      console.error("Erreur lors du chargement des modes de paiement:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les modes de paiement",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nom: "",
      type: "carte",
      description: "",
      instructions: "",
      active: true,
      position: paymentMethods.length,
    })
    setEditingMethod(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (editingMethod) {
        await PaymentMethodsService.update(editingMethod.id, formData)
        toast({
          title: "Mode de paiement mis à jour",
          description: "Le mode de paiement a été modifié avec succès",
        })
      } else {
        await PaymentMethodsService.create(formData)
        toast({
          title: "Mode de paiement créé",
          description: "Le nouveau mode de paiement a été créé avec succès",
        })
      }

      setIsDialogOpen(false)
      resetForm()
      await loadPaymentMethods()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (method: PaymentMethod) => {
    setEditingMethod(method)
    setFormData({
      nom: method.nom,
      type: method.type,
      description: method.description || "",
      instructions: method.instructions || "",
      active: method.active,
      position: method.position,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce mode de paiement ?")) return

    try {
      await PaymentMethodsService.delete(id)
      toast({
        title: "Mode de paiement supprimé",
        description: "Le mode de paiement a été supprimé avec succès",
      })
      await loadPaymentMethods()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le mode de paiement",
        variant: "destructive",
      })
    }
  }

  const toggleActive = async (id: number, active: boolean) => {
    try {
      await PaymentMethodsService.toggleActive(id, active)
      toast({
        title: active ? "Mode de paiement activé" : "Mode de paiement désactivé",
        description: `Le mode de paiement a été ${active ? "activé" : "désactivé"} avec succès`,
      })
      await loadPaymentMethods()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de modifier le statut du mode de paiement",
        variant: "destructive",
      })
    }
  }

  const updatePosition = async (id: number, direction: "up" | "down") => {
    try {
      await PaymentMethodsService.updatePosition(id, direction)
      await loadPaymentMethods()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de modifier la position",
        variant: "destructive",
      })
    }
  }

  if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
    return null
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Modes de Paiement</h1>
            <p className="text-gray-600">Gérez les méthodes de paiement acceptées</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau mode de paiement
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingMethod ? "Modifier le mode de paiement" : "Créer un mode de paiement"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nom: e.target.value }))}
                    placeholder="Ex: Paiement par carte bancaire"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) => setFormData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="livraison">À la livraison</SelectItem>
                      <SelectItem value="carte">Par carte</SelectItem>
                      <SelectItem value="virement">Par virement</SelectItem>
                      <SelectItem value="cheque">Par chèque</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Description courte du mode de paiement"
                  />
                </div>

                <div>
                  <Label htmlFor="instructions">Instructions détaillées</Label>
                  <Textarea
                    id="instructions"
                    value={formData.instructions}
                    onChange={(e) => setFormData((prev) => ({ ...prev, instructions: e.target.value }))}
                    placeholder="Instructions détaillées pour le client"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="position">Position d'affichage</Label>
                  <Input
                    id="position"
                    type="number"
                    min="0"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, position: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, active: checked }))}
                  />
                  <Label htmlFor="active">Mode de paiement actif</Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Sauvegarde..." : editingMethod ? "Modifier" : "Créer"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total modes</p>
                  <p className="text-2xl font-bold">{paymentMethods.length}</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Modes actifs</p>
                  <p className="text-2xl font-bold text-green-600">{paymentMethods.filter((m) => m.active).length}</p>
                </div>
                <Badge className="bg-green-500">Actifs</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Modes inactifs</p>
                  <p className="text-2xl font-bold text-red-600">{paymentMethods.filter((m) => !m.active).length}</p>
                </div>
                <Badge className="bg-red-500">Inactifs</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tableau des modes de paiement */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des modes de paiement</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentMethods
                  .sort((a, b) => a.position - b.position)
                  .map((method) => (
                    <TableRow key={method.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{method.position}</span>
                          <div className="flex flex-col">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updatePosition(method.id, "up")}
                              disabled={method.position === 0}
                            >
                              <ArrowUpDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="font-medium">{method.nom}</div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline">
                          {method.type === "livraison" && "À la livraison"}
                          {method.type === "carte" && "Par carte"}
                          {method.type === "virement" && "Par virement"}
                          {method.type === "cheque" && "Par chèque"}
                          {method.type === "paypal" && "PayPal"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="max-w-xs truncate text-sm text-gray-600">{method.description}</div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={method.active ? "default" : "secondary"}>
                            {method.active ? "Actif" : "Inactif"}
                          </Badge>
                          <Switch
                            checked={method.active}
                            onCheckedChange={(checked) => toggleActive(method.id, checked)}
                            size="sm"
                          />
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(method)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(method.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {paymentMethods.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun mode de paiement configuré pour le moment.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
