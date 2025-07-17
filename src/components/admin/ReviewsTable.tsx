"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Star, Check, X, Trash2, Eye } from "lucide-react"
import type { Review } from "@/services/ReviewsService"

interface ReviewsTableProps {
  reviews: Review[]
  onApprove: (id: number) => void
  onReject: (id: number) => void
  onDelete: (id: number) => void
}

export function ReviewsTable({ reviews, onApprove, onReject, onDelete }: ReviewsTableProps) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "approuve":
        return <Badge className="bg-green-100 text-green-800">Approuvé</Badge>
      case "rejete":
        return <Badge className="bg-red-100 text-red-800">Rejeté</Badge>
      case "en_attente":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun avis trouvé</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Commentaire</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {review.user.prenoms.charAt(0)}
                        {review.user.nom.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {review.user.prenoms} {review.user.nom}
                      </p>
                      <p className="text-sm text-gray-500">{review.user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={review.produit.image || "/placeholder.svg"}
                      alt={review.produit.nom}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span className="font-medium">{review.produit.nom}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.note)}
                    <span className="ml-2 text-sm font-medium">{review.note}/5</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="truncate" title={review.commentaire}>
                      {review.commentaire}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(review.statut)}</TableCell>
                <TableCell className="text-sm text-gray-500">{formatDate(review.created_at)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedReview(review)}>
                      <Eye className="h-4 w-4" />
                    </Button>

                    {review.statut === "en_attente" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onApprove(review.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onReject(review.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer l'avis</AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer cet avis ? Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(review.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal de détail de l'avis */}
      {selectedReview && (
        <AlertDialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Détail de l'avis</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>
                    {selectedReview.user.prenoms.charAt(0)}
                    {selectedReview.user.nom.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {selectedReview.user.prenoms} {selectedReview.user.nom}
                  </p>
                  <p className="text-sm text-gray-500">{selectedReview.user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <img
                  src={selectedReview.produit.image || "/placeholder.svg"}
                  alt={selectedReview.produit.nom}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{selectedReview.produit.nom}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(selectedReview.note)}
                    <span className="ml-2 text-sm">{selectedReview.note}/5</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Commentaire :</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedReview.commentaire}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">Statut : </span>
                  {getStatusBadge(selectedReview.statut)}
                </div>
                <div className="text-sm text-gray-500">{formatDate(selectedReview.created_at)}</div>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Fermer</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
