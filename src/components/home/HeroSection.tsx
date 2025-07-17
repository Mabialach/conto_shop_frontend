"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Truck, Award } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Votre bien-être
                <span className="text-blue-600 block">commence ici</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Découvrez notre gamme complète de bas de contention médicaux, conçus pour améliorer votre circulation et
                votre confort au quotidien.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/produits">
                <Button size="lg" className="w-full sm:w-auto">
                  Découvrir nos produits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Voir les catégories
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Certifié médical</p>
                <p className="text-xs text-gray-600">Norme CE</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Livraison rapide</p>
                <p className="text-xs text-gray-600">24-48h</p>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Qualité garantie</p>
                <p className="text-xs text-gray-600">Satisfaction client</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/petitefille.jpg"
                alt="Bas de contention ContoShop"
                className="w-full rounded-2xl shadow-2xl h-[600px]"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-50 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
