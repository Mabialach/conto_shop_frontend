"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Mail, Gift, Star, Zap, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewsletterPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    prenom: "",
    nom: "",
    frequence: "hebdomadaire",
    categories: [] as string[],
    promotions: true,
    nouveautes: true,
    conseils: true,
  })
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const categories = [
    { id: "leggings", nom: "Leggings", icon: "👖" },
    { id: "brassieres", nom: "Brassières", icon: "👙" },
    { id: "hauts", nom: "Hauts", icon: "👕" },
    { id: "accessoires", nom: "Accessoires", icon: "🎽" },
    { id: "sport", nom: "Sport", icon: "🏃‍♀️" },
    { id: "wellness", nom: "Bien-être", icon: "🧘‍♀️" },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, categoryId] : prev.categories.filter((id) => id !== categoryId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simuler l'inscription
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubscribed(true)
      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez bientôt votre premier email avec un code promo de bienvenue",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Inscription confirmée !</h2>
              <p className="text-gray-600 mb-6">
                Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt un email de confirmation avec votre
                code promo de bienvenue.
              </p>
              <Button asChild>
                <a href="/">Retour à l'accueil</a>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Mail className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Newsletter ContoShop</h1>
            <p className="text-xl mb-8">Restez informé de nos dernières nouveautés et offres exclusives</p>

            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                <span>Offres exclusives</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>Nouveautés en avant-première</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span>Conseils d'experts</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avantages */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pourquoi s'inscrire ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Gift className="h-5 w-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-semibold">Code promo de bienvenue</h4>
                      <p className="text-sm text-gray-600">10% de réduction sur votre première commande</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-semibold">Accès prioritaire</h4>
                      <p className="text-sm text-gray-600">Découvrez nos nouveautés avant tout le monde</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold">Conseils personnalisés</h4>
                      <p className="text-sm text-gray-600">Tips et astuces selon vos préférences</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nos engagements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>✅ Pas de spam, promis !</p>
                  <p>✅ Désabonnement en un clic</p>
                  <p>✅ Vos données sont protégées</p>
                  <p>✅ Contenu de qualité uniquement</p>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire d'inscription */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Inscription à la newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informations personnelles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="prenom">Prénom</Label>
                        <Input
                          id="prenom"
                          value={formData.prenom}
                          onChange={(e) => setFormData((prev) => ({ ...prev, prenom: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Fréquence */}
                    <div>
                      <Label className="text-base font-semibold">Fréquence d'envoi</Label>
                      <RadioGroup
                        value={formData.frequence}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, frequence: value }))}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="quotidienne" id="quotidienne" />
                          <Label htmlFor="quotidienne">Quotidienne (offres flash)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hebdomadaire" id="hebdomadaire" />
                          <Label htmlFor="hebdomadaire">Hebdomadaire (recommandé)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mensuelle" id="mensuelle" />
                          <Label htmlFor="mensuelle">Mensuelle</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Catégories d'intérêt 
                    <div>
                      <Label className="text-base font-semibold">Vos centres d'intérêt</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={category.id}
                              checked={formData.categories.includes(category.id)}
                              onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                            />
                            <Label htmlFor={category.id} className="flex items-center gap-2">
                              <span>{category.icon}</span>
                              {category.nom}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>*/}

                    {/* Types de contenu */}
                    <div>
                      <Label className="text-base font-semibold">Types de contenu</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="promotions"
                              checked={formData.promotions}
                              onCheckedChange={(checked) =>
                                setFormData((prev) => ({ ...prev, promotions: checked as boolean }))
                              }
                            />
                            <Label htmlFor="promotions">Promotions et offres spéciales</Label>
                          </div>
                          <Badge variant="secondary">Recommandé</Badge>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="nouveautes"
                            checked={formData.nouveautes}
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({ ...prev, nouveautes: checked as boolean }))
                            }
                          />
                          <Label htmlFor="nouveautes">Nouveautés et collections</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="conseils"
                            checked={formData.conseils}
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({ ...prev, conseils: checked as boolean }))
                            }
                          />
                          <Label htmlFor="conseils">Conseils et guides d'achat</Label>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      En vous inscrivant, vous acceptez de recevoir nos emails marketing. Vous pouvez vous désabonner à
                      tout moment. Consultez notre{" "}
                      <a href="/cgv" className="text-blue-600 hover:underline">
                        politique de confidentialité
                      </a>
                      .
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                      {loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Inscription en cours...
                        </div>
                      ) : (
                        "S'inscrire à la newsletter"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
