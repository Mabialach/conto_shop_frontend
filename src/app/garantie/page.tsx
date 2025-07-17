"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, AlertTriangle, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function GarantiePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Garantie & SAV</h1>
            <p className="text-xl mb-8">Votre satisfaction est notre priorité</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Garanties principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">30 jours</h3>
                <p className="text-gray-600">Satisfait ou remboursé</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">2 ans</h3>
                <p className="text-gray-600">Garantie légale</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">7j/7</h3>
                <p className="text-gray-600">Service client</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Garantie satisfait ou remboursé */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Garantie Satisfait ou Remboursé
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">30 jours pour essayer</h4>
                  <p className="text-sm text-green-700">
                    Vous avez 30 jours à partir de la réception de votre commande pour tester nos produits. Si vous
                    n'êtes pas entièrement satisfait, nous vous remboursons intégralement.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Conditions</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>✅ Articles non portés et dans leur emballage d'origine</li>
                    <li>✅ Étiquettes et tags encore attachés</li>
                    <li>✅ Facture d'achat incluse</li>
                    <li>✅ Retour gratuit pour votre première commande</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Remboursement</h4>
                  <p className="text-sm text-gray-600">
                    Le remboursement est effectué sous 5-7 jours ouvrés après réception de votre retour, sur le même
                    moyen de paiement utilisé lors de l'achat.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Garantie légale */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Garantie Légale de Conformité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">2 ans de garantie</h4>
                  <p className="text-sm text-blue-700">
                    Tous nos produits bénéficient de la garantie légale de conformité de 2 ans, conformément au Code de
                    la consommation français.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Défauts couverts</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Défauts de fabrication</li>
                    <li>• Non-conformité à la description</li>
                    <li>• Usure prématurée anormale</li>
                    <li>• Problèmes de coutures ou matériaux</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Solutions proposées</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>🔄 Échange gratuit</li>
                    <li>🔧 Réparation si possible</li>
                    <li>💰 Remboursement partiel ou total</li>
                    <li>🎁 Geste commercial selon le cas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Garantie qualité */}
            <Card>
              <CardHeader>
                <CardTitle>Notre Engagement Qualité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Contrôle qualité</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Chaque produit est contrôlé avant expédition pour garantir la meilleure qualité possible.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-500">✓</Badge>
                    <span className="text-sm">Matériaux certifiés Oeko-Tex</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-500">✓</Badge>
                    <span className="text-sm">Tests de résistance et d'élasticité</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-500">✓</Badge>
                    <span className="text-sm">Contrôle des coutures et finitions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-500">✓</Badge>
                    <span className="text-sm">Vérification des tailles et couleurs</span>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Garantie performance</h4>
                  <p className="text-sm text-purple-700">
                    Nos vêtements de compression conservent leurs propriétés pendant au moins 100 lavages en suivant nos
                    instructions d'entretien.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Service après-vente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-purple-600" />
                  Service Après-Vente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Notre équipe à votre service</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Une équipe dédiée pour répondre à toutes vos questions et résoudre rapidement vos problèmes.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">Téléphone</div>
                      <div className="text-sm text-gray-600">01 23 45 67 89</div>
                      <div className="text-xs text-gray-500">Lun-Dim 9h-20h</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-sm text-gray-600">sav@contoshop.fr</div>
                      <div className="text-xs text-gray-500">Réponse sous 24h</div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Conseil</h4>
                      <p className="text-sm text-yellow-700">
                        Pour un traitement plus rapide, ayez votre numéro de commande à portée de main lors de votre
                        contact.
                      </p>
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href="/contact">Contacter le SAV</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Garantie */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Questions fréquentes sur la garantie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Que faire si mon produit se déchire après quelques utilisations ?</h4>
                <p className="text-sm text-gray-600">
                  Contactez immédiatement notre SAV avec des photos du défaut. Si c'est un défaut de fabrication, nous
                  procédons à un échange gratuit.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">La garantie couvre-t-elle l'usure normale ?</h4>
                <p className="text-sm text-gray-600">
                  L'usure normale n'est pas couverte, mais nos produits sont conçus pour durer. Une usure prématurée
                  anormale est couverte par la garantie.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold">Puis-je échanger un produit qui ne me va pas ?</h4>
                <p className="text-sm text-gray-600">
                  Oui, dans les 30 jours suivant l'achat, même si le produit vous va mais ne vous convient pas.
                  Consultez notre guide des tailles pour éviter les erreurs.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">Comment faire jouer la garantie ?</h4>
                <p className="text-sm text-gray-600">
                  Contactez notre SAV en précisant votre numéro de commande et en décrivant le problème. Nous vous
                  guiderons dans la procédure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
