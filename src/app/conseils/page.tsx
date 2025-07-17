"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, Heart, Zap, Shield, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ConseilsPage() {
  const conseils = [
    {
      id: 1,
      categorie: "Choix du produit",
      titre: "Comment choisir sa taille de legging ?",
      description: "Guide complet pour trouver la taille parfaite selon votre morphologie",
      contenu:
        "Pour choisir la bonne taille de legging, mesurez votre tour de taille et de hanches. Référez-vous à notre guide des tailles et n'hésitez pas à prendre une taille au-dessus si vous êtes entre deux tailles.",
      icone: <Shield className="h-6 w-6" />,
      difficulte: "Débutant",
    },
    {
      id: 2,
      categorie: "Entretien",
      titre: "Comment entretenir ses vêtements de compression ?",
      description: "Conseils pour prolonger la durée de vie de vos vêtements",
      contenu:
        "Lavez à l'eau froide (30°C max), utilisez un détergent doux, évitez l'adoucissant qui peut altérer l'élasticité. Séchage à l'air libre recommandé.",
      icone: <Heart className="h-6 w-6" />,
      difficulte: "Facile",
    },
    {
      id: 3,
      categorie: "Utilisation",
      titre: "Quand porter des vêtements de compression ?",
      description: "Les meilleurs moments pour optimiser les bénéfices",
      contenu:
        "Portez vos vêtements de compression pendant l'effort, après l'entraînement pour la récupération, ou lors de longs voyages pour améliorer la circulation.",
      icone: <Zap className="h-6 w-6" />,
      difficulte: "Intermédiaire",
    },
    {
      id: 4,
      categorie: "Santé",
      titre: "Les bienfaits de la compression graduée",
      description: "Comprendre les avantages pour votre corps",
      contenu:
        "La compression graduée améliore le retour veineux, réduit les courbatures, diminue les risques de blessures et accélère la récupération musculaire.",
      icone: <Star className="h-6 w-6" />,
      difficulte: "Avancé",
    },
  ]

  const categories = [
    { nom: "Choix du produit", count: 8, color: "bg-blue-100 text-blue-800" },
    { nom: "Entretien", count: 5, color: "bg-green-100 text-green-800" },
    { nom: "Utilisation", count: 6, color: "bg-purple-100 text-purple-800" },
    { nom: "Santé", count: 4, color: "bg-pink-100 text-pink-800" },
  ]

  const getDifficultyColor = (difficulte: string) => {
    switch (difficulte) {
      case "Débutant":
        return "bg-green-100 text-green-800"
      case "Facile":
        return "bg-blue-100 text-blue-800"
      case "Intermédiaire":
        return "bg-yellow-100 text-yellow-800"
      case "Avancé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Lightbulb className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Conseils & Guides</h1>
            <p className="text-xl mb-8">Tout ce que vous devez savoir sur les vêtements de compression</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Catégories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((cat) => (
                    <div
                      key={cat.nom}
                      className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <span className="font-medium">{cat.nom}</span>
                      <Badge className={cat.color}>{cat.count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Besoin d'aide ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
                  <Button asChild className="w-full">
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {conseils.map((conseil) => (
                  <Card key={conseil.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{conseil.icone}</div>
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {conseil.categorie}
                            </Badge>
                            <CardTitle className="text-xl">{conseil.titre}</CardTitle>
                          </div>
                        </div>
                        <Badge className={getDifficultyColor(conseil.difficulte)}>{conseil.difficulte}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-600 mb-4">{conseil.description}</p>
                      <p className="text-gray-800 mb-6">{conseil.contenu}</p>

                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          Lire la suite
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>4.8/5 (24 avis)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Section FAQ rapide */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Questions fréquentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Combien de temps porter des vêtements de compression ?</h4>
                    <p className="text-gray-600">
                      Il est recommandé de porter les vêtements de compression pendant l'activité et jusqu'à 2h après
                      pour optimiser la récupération.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold">Peut-on dormir avec des vêtements de compression ?</h4>
                    <p className="text-gray-600">
                      Il n'est généralement pas recommandé de dormir avec, sauf avis médical contraire. La peau a besoin
                      de respirer la nuit.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold">À quelle fréquence laver ses vêtements de compression ?</h4>
                    <p className="text-gray-600">
                      Après chaque utilisation pour maintenir l'hygiène et préserver les propriétés du tissu.
                    </p>
                  </div>
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
