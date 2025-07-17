"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, Quote } from "lucide-react"
import { ReviewsService, type Review } from "@/services/ReviewsService"

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await ReviewsService.getFeatured(6)
        setTestimonials(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Erreur lors du chargement des témoignages:", error)
        // Fallback avec données vides si erreur
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6">
                <Skeleton className="h-20 w-full mb-4" />
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits qui nous font confiance pour leurs besoins en
            compression médicale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-6 w-6 text-blue-500 mr-3" />
                  {renderStars(testimonial.note)}
                </div>

                <blockquote className="text-gray-700 mb-6 italic">"{testimonial.commentaire}"</blockquote>

                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {testimonial.user.prenoms.charAt(0)}
                      {testimonial.user.nom.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {testimonial.user.prenoms} {testimonial.user.nom}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.produit.nom}</p>
                    <p className="text-xs text-gray-500">{formatDate(testimonial.created_at)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
