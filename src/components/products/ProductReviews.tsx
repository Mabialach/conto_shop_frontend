"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, User } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { ReviewsService, type Review } from "@/services/ReviewsService"

interface ProductReviewsProps {
  productId: number
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ note: 0, commentaire: "" })
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const data = await ReviewsService.getByProduct(productId)
        setReviews(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Erreur lors du chargement des avis:", error)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  const handleStarClick = (rating: number) => {
    setNewReview((prev) => ({ ...prev, note: rating }))
  }

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour laisser un avis",
        variant: "destructive",
      })
      return
    }

    if (newReview.note === 0 || !newReview.commentaire.trim()) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez donner une note et écrire un commentaire",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      await ReviewsService.create({
        produit_id: productId,
        note: newReview.note,
        commentaire: newReview.commentaire,
      })

      setNewReview({ note: 0, commentaire: "" })
      setShowForm(false)

      toast({
        title: "Avis ajouté",
        description: "Votre avis a été soumis et sera publié après modération",
      })

      // Recharger les avis
      const data = await ReviewsService.getByProduct(productId)
      setReviews(Array.isArray(data) ? data : [])
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.response?.data?.message || "Impossible d'ajouter votre avis",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.note, 0) / reviews.length : 0

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Avis clients</span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">{renderStars(Math.round(averageRating))}</div>
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} ({reviews.length} avis)
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Bouton pour ajouter un avis */}
          {user && !showForm && (
            <Button onClick={() => setShowForm(true)} className="mb-6">
              Laisser un avis
            </Button>
          )}

          {!user && (
            <p className="text-gray-600 mb-6">
              <a href="/auth/login" className="text-blue-600 hover:underline">
                Connectez-vous
              </a>{" "}
              pour laisser un avis
            </p>
          )}

          {/* Formulaire d'ajout d'avis */}
          {showForm && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Note</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleStarClick(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= newReview.note ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            } hover:text-yellow-400 transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Commentaire</label>
                    <Textarea
                      value={newReview.commentaire}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, commentaire: e.target.value }))}
                      placeholder="Partagez votre expérience avec ce produit..."
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleSubmitReview} disabled={submitting}>
                      {submitting ? "Envoi..." : "Publier l'avis"}
                    </Button>
                    <Button variant="outline" onClick={() => setShowForm(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Liste des avis */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-4">Chargement des avis...</div>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">
                        {review.user.prenoms} {review.user.nom.charAt(0)}.
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Achat vérifié
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>

                  <div className="flex items-center mb-2">{renderStars(review.note)}</div>

                  <p className="text-gray-700">{review.commentaire}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">Aucun avis pour ce produit</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
