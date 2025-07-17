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
import { Percent, Plus, Edit, Trash2, Calendar, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { PromotionsService, type Promotion, type CreatePromotionData } from "@/services/PromotionsService"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function AdminCodesPromoPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState<CreatePromotionData>({
    code: "",
    nom: "",
    description: "",
    type: "pourcentage",
    valeur: 0,
    date_debut: "",
    date_fin: "",
    utilisation_max: undefined,
    montant_min: undefined,
    active: true,
  })

  useEffect(() => {
    if (!user || (user.role?.nom !== "admin" && user.role?.nom !== "superadmin")) {
      router.push("/auth/login")
      return
    }

    loadPromotions()
  }, [user, router])

  const loadPromotions = async () => {
    try {
      setLoading(true)
      const data = await PromotionsService.getAll()
      setPromotions(data)
    } catch (error) {
      console.error("Erreur lors du chargement des promotions:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les codes promo",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      code: "",
      nom: "",
      description: "",
      type: "pourcentage",
      valeur: 0,
      date_debut: "",
      date_fin: "",
      utilisation_max: undefined,
      montant_min: undefined,
      active: true,
    })
    setEditingPromo(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (editingPromo) {
        await PromotionsService.update(editingPromo.id, formData)
        toast({
          title: "Code promo mis à jour",
          description: "Le code promo a été modifié avec succès",
        })
      } else {
        await PromotionsService.create(formData)
        toast({
          title: "Code promo créé",
          description: "Le nouveau code promo a été créé avec succès",
        })
      }

      setIsDialogOpen(false)
      resetForm()
      await loadPromotions()
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

  const handleEdit = (promo: Promotion) => {
    setEditingPromo(promo)
    setFormData({
      code: promo.code,
      nom: promo.nom,
      description: promo.description || "",
      type: promo.type,
      valeur: promo.valeur,
      date_debut: promo.date_debut,
      date_fin: promo.date_fin,
      utilisation_max: promo.utilisation_max,
      montant_min: promo.montant_min,
      active: promo.active,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce code promo ?")) return

    try {
      await PromotionsService.delete(id)
      toast({
        title: "Code promo supprimé",
        description: "Le code promo a été supprimé avec succès",
      })
      await loadPromotions()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le code promo",
        variant: "destructive",
      })
    }
  }

  const toggleActive = async (id: number, active: boolean) => {
    try {
      await PromotionsService.toggleActive(id, active)
      toast({
        title: active ? "Code promo activé" : "Code promo désactivé",
        description: `Le code promo a été ${active ? "activé" : "désactivé"} avec succès`,
      })
      await loadPromotions()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de modifier le statut du code promo",
        variant: "destructive",
      })
    }
  }

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData((prev) => ({ ...prev, code: result }))
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
            <h1 className="text-3xl font-bold">Codes Promo</h1>
            <p className="text-gray-600">Gérez les codes de réduction</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau code promo
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingPromo ? "Modifier le code promo" : "Créer un code promo"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="code">Code *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
                      placeholder="Ex: WELCOME10"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="button" variant="outline" onClick={generateRandomCode}>
                      Générer
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nom: e.target.value }))}
                    placeholder="Nom de la promotion"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Description du code promo"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type de réduction</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: "pourcentage" | "montant") =>
                        setFormData((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pourcentage">Pourcentage</SelectItem>
                        <SelectItem value="montant">Montant fixe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="valeur">Valeur {formData.type === "pourcentage" ? "(%)" : "(€)"}</Label>
                    <Input
                      id="valeur"
                      type="number"
                      min="0"
                      step={formData.type === "pourcentage" ? "1" : "0.01"}
                      max={formData.type === "pourcentage" ? "100" : undefined}
                      value={formData.valeur}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, valeur: Number.parseFloat(e.target.value) || 0 }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="montant_min">Montant minimum (€)</Label>
                    <Input
                      id="montant_min"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.montant_min || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          montant_min: e.target.value ? Number.parseFloat(e.target.value) : undefined,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="utilisation_max">Nombre d'utilisations max</Label>
                    <Input
                      id="utilisation_max"
                      type="number"
                      min="0"
                      value={formData.utilisation_max || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          utilisation_max: e.target.value ? Number.parseInt(e.target.value) : undefined,
                        }))
                      }
                      placeholder="0 = illimité"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date_debut">Date de début</Label>
                    <Input
                      id="date_debut"
                      type="date"
                      value={formData.date_debut}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date_debut: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="date_fin">Date de fin</Label>
                    <Input
                      id="date_fin"
                      type="date"
                      value={formData.date_fin}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date_fin: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Sauvegarde..." : editingPromo ? "Modifier" : "Créer"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total codes</p>
                  <p className="text-2xl font-bold">{promotions.length}</p>
                </div>
                <Percent className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Codes actifs</p>
                  <p className="text-2xl font-bold text-green-600">{promotions.filter((p) => p.active).length}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Utilisations</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {promotions.reduce((sum, p) => sum + p.utilisation_actuelle, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taux d'usage</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {promotions.length > 0
                      ? Math.round(
                          (promotions.reduce((sum, p) => sum + p.utilisation_actuelle, 0) /
                            promotions.reduce((sum, p) => sum + (p.utilisation_max || 100), 0)) *
                            100,
                        )
                      : 0}
                    %
                  </p>
                </div>
                <Badge className="bg-orange-500">Usage</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tableau des codes promo */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des codes promo</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Réduction</TableHead>
                  <TableHead>Utilisations</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotions.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell>
                      <div className="font-mono font-bold">{promo.code}</div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <div className="font-medium">{promo.nom}</div>
                        {promo.description && (
                          <div className="text-sm text-gray-500 max-w-xs truncate">{promo.description}</div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        {promo.type === "pourcentage" ? `${promo.valeur}%` : `${promo.valeur}€`}
                      </Badge>
                      {promo.montant_min && <div className="text-xs text-gray-500">Min: {promo.montant_min}€</div>}
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">
                        {promo.utilisation_actuelle} / {promo.utilisation_max || "∞"}
                        {promo.utilisation_max && promo.utilisation_max > 0 && (
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div
                              className="bg-blue-600 h-1 rounded-full"
                              style={{
                                width: `${(promo.utilisation_actuelle / promo.utilisation_max) * 100}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-xs">
                        <div>Du: {new Date(promo.date_debut).toLocaleDateString("fr-FR")}</div>
                        <div>Au: {new Date(promo.date_fin).toLocaleDateString("fr-FR")}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={promo.active ? "default" : "secondary"}>
                          {promo.active ? "Actif" : "Inactif"}
                        </Badge>
                        <Switch
                          checked={promo.active}
                          onCheckedChange={(checked) => toggleActive(promo.id, checked)}
                          size="sm"
                        />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(promo)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(promo.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {promotions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun code promo créé pour le moment.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}