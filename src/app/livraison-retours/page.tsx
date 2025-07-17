"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Package, RotateCcw, Clock, MapPin } from "lucide-react"

export default function LivraisonRetoursPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Truck className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Livraison & Retours</h1>
            <p className="text-xl mb-8">
              Toutes les informations sur nos services de livraison et notre politique de retour
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="livraison" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="livraison">Livraison</TabsTrigger>
              <TabsTrigger value="retours">Retours</TabsTrigger>
              <TabsTrigger value="suivi">Suivi</TabsTrigger>
            </TabsList>

            <TabsContent value="livraison" className="space-y-6">
              {/* Options de livraison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Options de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">Livraison Standard</h3>
                        <Badge variant="outline">3-5 jours</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">Livraison à domicile par Colissimo</p>
                      <div className="text-lg font-bold text-green-600">
                        5,90€ <span className="text-sm font-normal text-gray-500">(Gratuite dès 50€)</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">Livraison Express</h3>
                        <Badge className="bg-orange-500">24-48h</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">Livraison rapide par Chronopost</p>
                      <div className="text-lg font-bold text-orange-600">9,90€</div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">Point Relais</h3>
                        <Badge variant="outline">2-4 jours</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">Retrait en point relais Mondial Relay</p>
                      <div className="text-lg font-bold text-blue-600">3,90€</div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">Retrait en magasin</h3>
                        <Badge className="bg-green-500">Gratuit</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">Retrait dans nos boutiques partenaires</p>
                      <div className="text-lg font-bold text-green-600">Gratuit</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Zones de livraison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Zones de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-semibold">France métropolitaine</h4>
                        <p className="text-sm text-gray-600">Toutes les options de livraison disponibles</p>
                      </div>
                      <Badge className="bg-green-500">Disponible</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-semibold">Corse et DOM-TOM</h4>
                        <p className="text-sm text-gray-600">Livraison standard uniquement, délais prolongés</p>
                      </div>
                      <Badge variant="outline">Délais +2-3 jours</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-semibold">Union Européenne</h4>
                        <p className="text-sm text-gray-600">Livraison internationale, frais supplémentaires</p>
                      </div>
                      <Badge variant="outline">Sur devis</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Délais et conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Délais et conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Préparation des commandes</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Commandes passées avant 14h : expédiées le jour même</li>
                        <li>• Commandes passées après 14h : expédiées le lendemain</li>
                        <li>• Pas d'expédition les weekends et jours fériés</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Conditions spéciales</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Livraison gratuite dès 50€ d'achat</li>
                        <li>• Emballage soigné et écologique</li>
                        <li>• Notification SMS/email de suivi</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="retours" className="space-y-6">
              {/* Politique de retour */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RotateCcw className="h-5 w-5" />
                    Politique de retour
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">30</div>
                      <div className="text-sm text-gray-600">jours pour retourner</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                      <div className="text-sm text-gray-600">remboursement</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 mb-2">0€</div>
                      <div className="text-sm text-gray-600">frais de retour*</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Conditions de retour</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>✅ Articles non portés et dans leur emballage d'origine</li>
                        <li>✅ Étiquettes et tags encore attachés</li>
                        <li>✅ Retour dans les 30 jours suivant la réception</li>
                        <li>✅ Facture d'achat incluse</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Articles non retournables</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>❌ Sous-vêtements et articles d'hygiène</li>
                        <li>❌ Articles personnalisés ou sur-mesure</li>
                        <li>❌ Articles soldés ou en promotion (sauf défaut)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Processus de retour */}
              <Card>
                <CardHeader>
                  <CardTitle>Comment effectuer un retour ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Demande de retour</h4>
                        <p className="text-sm text-gray-600">
                          Connectez-vous à votre compte et demandez un retour depuis votre historique de commandes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Étiquette de retour</h4>
                        <p className="text-sm text-gray-600">
                          Imprimez l'étiquette de retour prépayée que nous vous envoyons par email
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Emballage</h4>
                        <p className="text-sm text-gray-600">
                          Remettez les articles dans leur emballage d'origine avec la facture
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold">Expédition</h4>
                        <p className="text-sm text-gray-600">
                          Déposez le colis dans un point relais ou bureau de poste
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold">Remboursement</h4>
                        <p className="text-sm text-gray-600">
                          Remboursement sous 5-7 jours après réception de votre retour
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Échanges */}
              <Card>
                <CardHeader>
                  <CardTitle>Échanges</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Vous souhaitez échanger un article contre une autre taille ou couleur ? C'est possible et gratuit
                    pour votre première commande !
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Échange gratuit première commande</h4>
                    <p className="text-sm text-blue-700">
                      Pour votre première commande, nous prenons en charge les frais d'échange. Contactez notre service
                      client pour en bénéficier.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suivi" className="space-y-6">
              {/* Suivi de commande */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Suivi de votre commande
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Suivez votre commande en temps réel grâce à notre système de tracking avancé.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Étapes de suivi</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">Commande confirmée</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm">En préparation</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-sm">Expédiée</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Livrée</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Notifications</h4>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>📧 Email de confirmation de commande</li>
                          <li>📦 Email d'expédition avec numéro de suivi</li>
                          <li>📱 SMS de livraison (optionnel)</li>
                          <li>✅ Email de confirmation de livraison</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Problèmes de livraison */}
              <Card>
                <CardHeader>
                  <CardTitle>Problèmes de livraison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-red-800">Colis non reçu</h4>
                      <p className="text-sm text-gray-600">
                        Si votre colis n'arrive pas dans les délais prévus, contactez-nous. Nous lançons immédiatement
                        une enquête avec le transporteur.
                      </p>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold text-yellow-800">Colis endommagé</h4>
                      <p className="text-sm text-gray-600">
                        En cas de réception d'un colis endommagé, refusez la livraison ou notez les dégâts sur le bon de
                        livraison et contactez-nous immédiatement.
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-blue-800">Absence lors de la livraison</h4>
                      <p className="text-sm text-gray-600">
                        Le transporteur laisse un avis de passage. Vous avez 15 jours pour récupérer votre colis au
                        bureau de poste ou point relais indiqué.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
