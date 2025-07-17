"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "Comment choisir la bonne taille de bas de contention ?",
      answer:
        "Pour choisir la bonne taille, mesurez votre tour de cheville, de mollet et de cuisse le matin au réveil. Consultez notre guide des tailles pour trouver la taille correspondante. En cas de doute, n'hésitez pas à nous contacter.",
    },
    {
      question: "Quelle classe de compression choisir ?",
      answer:
        "La classe de compression dépend de vos besoins : Classe I (15-21 mmHg) pour la prévention, Classe II (23-32 mmHg) pour les troubles légers à modérés, Classe III (34-46 mmHg) pour les troubles sévères. Consultez votre médecin pour un conseil personnalisé.",
    },
    {
      question: "Comment entretenir mes bas de contention ?",
      answer:
        "Lavez vos bas à la main ou en machine à 30°C maximum avec un détergent doux. Évitez l'adoucissant et le sèche-linge. Faites sécher à plat à l'ombre. Remplacez vos bas tous les 3 à 6 mois selon l'usage.",
    },
    {
      question: "Puis-je porter mes bas de contention la nuit ?",
      answer:
        "En général, les bas de contention se portent le jour et se retirent la nuit. Cependant, dans certains cas médicaux spécifiques, votre médecin peut recommander un port nocturne. Suivez toujours les conseils de votre professionnel de santé.",
    },
    {
      question: "Combien de temps dure la livraison ?",
      answer:
        "Nous proposons plusieurs options de livraison : standard (3-5 jours ouvrés) à 5,90€ et express (24-48h) à 9,90€. La livraison est gratuite dès 50€ d'achat. Vous recevrez un email de suivi dès l'expédition.",
    },
    {
      question: "Puis-je retourner mes produits ?",
      answer:
        "Oui, vous disposez de 30 jours pour retourner vos produits non portés dans leur emballage d'origine. Les frais de retour sont gratuits. Pour des raisons d'hygiène, les produits portés ne peuvent être repris sauf défaut de fabrication.",
    },
    {
      question: "Acceptez-vous les prescriptions médicales ?",
      answer:
        "Oui, nous acceptons les prescriptions médicales. Contactez-nous avec votre ordonnance pour bénéficier d'un accompagnement personnalisé dans le choix de vos produits et connaître les modalités de remboursement.",
    },
    {
      question: "Comment savoir si mes bas sont encore efficaces ?",
      answer:
        "Vérifiez régulièrement l'élasticité de vos bas. S'ils sont détendus, troués, ou si vous ressentez moins de compression, il est temps de les remplacer. En usage quotidien, remplacez-les tous les 3 à 6 mois.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Questions fréquentes</h1>
            <p className="text-gray-600">
              Trouvez rapidement les réponses à vos questions sur nos produits et services
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>FAQ - Bas de contention</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
