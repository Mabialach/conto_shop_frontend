"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ruler, Calculator, Info, CheckCircle } from "lucide-react"

export default function GuideTaillesPage() {
  const [measurements, setMeasurements] = useState({
    poitrine: "",
    taille: "",
    hanches: "",
    hauteur: "",
  })

  const [recommendedSize, setRecommendedSize] = useState("")

  const sizeCharts = {
    leggings: [
      { taille: "XS", tour_taille: "60-64", tour_hanches: "86-90", longueur: "95" },
      { taille: "S", tour_taille: "65-69", tour_hanches: "91-95", longueur: "97" },
      { taille: "M", tour_taille: "70-74", tour_hanches: "96-100", longueur: "99" },
      { taille: "L", tour_taille: "75-79", tour_hanches: "101-105", longueur: "101" },
      { taille: "XL", tour_taille: "80-84", tour_hanches: "106-110", longueur: "103" },
      { taille: "XXL", tour_taille: "85-89", tour_hanches: "111-115", longueur: "105" },
    ],
    brassieres: [
      { taille: "XS", tour_poitrine: "78-82", tour_dessous: "68-72", bonnet: "A-B" },
      { taille: "S", tour_poitrine: "83-87", tour_dessous: "73-77", bonnet: "B-C" },
      { taille: "M", tour_poitrine: "88-92", tour_dessous: "78-82", bonnet: "C-D" },
      { taille: "L", tour_poitrine: "93-97", tour_dessous: "83-87", bonnet: "D-E" },
      { taille: "XL", tour_poitrine: "98-102", tour_dessous: "88-92", bonnet: "E-F" },
      { taille: "XXL", tour_poitrine: "103-107", tour_dessous: "93-97", bonnet: "F-G" },
    ],
    hauts: [
      { taille: "XS", tour_poitrine: "78-82", tour_taille: "60-64", longueur: "58" },
      { taille: "S", tour_poitrine: "83-87", tour_taille: "65-69", longueur: "60" },
      { taille: "M", tour_poitrine: "88-92", tour_taille: "70-74", longueur: "62" },
      { taille: "L", tour_poitrine: "93-97", tour_taille: "75-79", longueur: "64" },
      { taille: "XL", tour_poitrine: "98-102", tour_taille: "80-84", longueur: "66" },
      { taille: "XXL", tour_poitrine: "103-107", tour_taille: "85-89", longueur: "68" },
    ],
  }

  const calculateSize = () => {
    const taille = Number.parseInt(measurements.taille)
    const hanches = Number.parseInt(measurements.hanches)
    const poitrine = Number.parseInt(measurements.poitrine)

    if (!taille || !hanches) {
      setRecommendedSize("Veuillez remplir tous les champs")
      return
    }

    // Logique simple de calcul de taille
    if (taille <= 64 && hanches <= 90) setRecommendedSize("XS")
    else if (taille <= 69 && hanches <= 95) setRecommendedSize("S")
    else if (taille <= 74 && hanches <= 100) setRecommendedSize("M")
    else if (taille <= 79 && hanches <= 105) setRecommendedSize("L")
    else if (taille <= 84 && hanches <= 110) setRecommendedSize("XL")
    else setRecommendedSize("XXL")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Ruler className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Guide des Tailles</h1>
            <p className="text-xl mb-8">Trouvez la taille parfaite pour vos vêtements de compression</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculateur de taille */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Calculateur de taille
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="poitrine">Tour de poitrine (cm)</Label>
                    <Input
                      id="poitrine"
                      type="number"
                      value={measurements.poitrine}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, poitrine: e.target.value }))}
                      placeholder="Ex: 85"
                    />
                  </div>

                  <div>
                    <Label htmlFor="taille">Tour de taille (cm)</Label>
                    <Input
                      id="taille"
                      type="number"
                      value={measurements.taille}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, taille: e.target.value }))}
                      placeholder="Ex: 70"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hanches">Tour de hanches (cm)</Label>
                    <Input
                      id="hanches"
                      type="number"
                      value={measurements.hanches}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, hanches: e.target.value }))}
                      placeholder="Ex: 95"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hauteur">Hauteur (cm)</Label>
                    <Input
                      id="hauteur"
                      type="number"
                      value={measurements.hauteur}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, hauteur: e.target.value }))}
                      placeholder="Ex: 165"
                    />
                  </div>

                  <Button onClick={calculateSize} className="w-full">
                    Calculer ma taille
                  </Button>

                  {recommendedSize && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-800">Taille recommandée:</span>
                      </div>
                      <Badge className="mt-2 bg-green-600 text-white text-lg px-3 py-1">{recommendedSize}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Conseils de mesure */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Comment bien se mesurer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p>
                      <strong>Tour de poitrine:</strong> Mesurez au niveau le plus fort de la poitrine
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p>
                      <strong>Tour de taille:</strong> Mesurez au niveau le plus étroit de la taille
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p>
                      <strong>Tour de hanches:</strong> Mesurez au niveau le plus fort des hanches
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p>
                      <strong>Conseil:</strong> Mesurez-vous en sous-vêtements pour plus de précision
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tableaux des tailles */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="leggings" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="leggings">Leggings</TabsTrigger>
                  <TabsTrigger value="brassieres">Brassières</TabsTrigger>
                  <TabsTrigger value="hauts">Hauts</TabsTrigger>
                </TabsList>

                <TabsContent value="leggings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Guide des tailles - Leggings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 p-3 text-left">Taille</th>
                              <th className="border border-gray-300 p-3 text-left">Tour de taille (cm)</th>
                              <th className="border border-gray-300 p-3 text-left">Tour de hanches (cm)</th>
                              <th className="border border-gray-300 p-3 text-left">Longueur (cm)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeCharts.leggings.map((size) => (
                              <tr key={size.taille} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-3 font-semibold">{size.taille}</td>
                                <td className="border border-gray-300 p-3">{size.tour_taille}</td>
                                <td className="border border-gray-300 p-3">{size.tour_hanches}</td>
                                <td className="border border-gray-300 p-3">{size.longueur}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="brassieres">
                  <Card>
                    <CardHeader>
                      <CardTitle>Guide des tailles - Brassières</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 p-3 text-left">Taille</th>
                              <th className="border border-gray-300 p-3 text-left">Tour de poitrine (cm)</th>
                              <th className="border border-gray-300 p-3 text-left">Tour dessous poitrine (cm)</th>
                              <th className="border border-gray-300 p-3 text-left">Bonnet équivalent</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeCharts.brassieres.map((size) => (
                              <tr key={size.taille} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-3 font-semibold">{size.taille}</td>
                                <td className="border border-gray-300 p-3">{size.tour_poitrine}</td>
                                <td className="border border-gray-300 p-3">{size.tour_dessous}</td>
                                <td className="border border-gray-300 p-3">{size.bonnet}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="hauts">
                  <Card>
                    <CardHeader>
                      <CardTitle>Guide des tailles - Hauts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 p-3 text-left">Taille</th>
                              <th className="border border-gray-300 p-3 text-left">Tour de poitrine (cm)</th>
                              <th className="border border-gray-300 p-3 text-left">Tour de taille (cm)</th>
                              <th className="border border-gray-300 p-3 text-left">Longueur (cm)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeCharts.hauts.map((size) => (
                              <tr key={size.taille} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-3 font-semibold">{size.taille}</td>
                                <td className="border border-gray-300 p-3">{size.tour_poitrine}</td>
                                <td className="border border-gray-300 p-3">{size.tour_taille}</td>
                                <td className="border border-gray-300 p-3">{size.longueur}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Conseils supplémentaires */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Conseils pour bien choisir</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Entre deux tailles ?</h4>
                      <p className="text-sm text-blue-700">
                        Choisissez la taille supérieure pour plus de confort, ou la taille inférieure pour plus de
                        compression.
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Première fois ?</h4>
                      <p className="text-sm text-green-700">
                        Commencez par une compression modérée et augmentez progressivement selon votre confort.
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Morphologie particulière ?</h4>
                      <p className="text-sm text-purple-700">
                        N'hésitez pas à nous contacter pour des conseils personnalisés selon votre morphologie.
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Échange gratuit</h4>
                      <p className="text-sm text-orange-700">
                        Première commande ? Échange gratuit sous 30 jours si la taille ne convient pas.
                      </p>
                    </div>
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
