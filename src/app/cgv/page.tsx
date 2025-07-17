"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Calendar, Shield, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

const today = format(new Date(), "d MMMM yyyy", { locale: fr })

export default function CGVPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <FileText className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Conditions Générales de Vente</h1>
            <p className="text-xl mb-4">ContoShop - Vêtements de compression</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Dernière mise à jour : {today}</span>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sommaire */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Sommaire</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2 text-sm">
                    <a href="#article1" className="block text-blue-600 hover:underline">
                      1. Objet et champ d'application
                    </a>
                    <a href="#article2" className="block text-blue-600 hover:underline">
                      2. Informations légales
                    </a>
                    <a href="#article3" className="block text-blue-600 hover:underline">
                      3. Produits et services
                    </a>
                    <a href="#article4" className="block text-blue-600 hover:underline">
                      4. Commandes
                    </a>
                    <a href="#article5" className="block text-blue-600 hover:underline">
                      5. Prix et paiement
                    </a>
                    <a href="#article6" className="block text-blue-600 hover:underline">
                      6. Livraison
                    </a>
                    <a href="#article7" className="block text-blue-600 hover:underline">
                      7. Droit de rétractation
                    </a>
                    <a href="#article8" className="block text-blue-600 hover:underline">
                      8. Garanties
                    </a>
                    <a href="#article9" className="block text-blue-600 hover:underline">
                      9. Responsabilité
                    </a>
                    <a href="#article10" className="block text-blue-600 hover:underline">
                      10. Données personnelles
                    </a>
                    <a href="#article11" className="block text-blue-600 hover:underline">
                      11. Propriété intellectuelle
                    </a>
                    <a href="#article12" className="block text-blue-600 hover:underline">
                      12. Droit applicable
                    </a>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-3">
              <ScrollArea className="h-[800px] pr-4">
                <div className="space-y-8">
                  {/* Article 1 */}
                  <Card id="article1">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          1
                        </span>
                        Objet et champ d'application
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <p>
                        Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre
                        ContoShop, société par actions simplifiée au capital de 50 000 euros, immatriculée au RCS de
                        Paris sous le numéro 123 456 789, dont le siège social est situé au 123 Rue de la Mode, 75001
                        Paris, France, ci-après dénommée "le Vendeur" ou "ContoShop", et toute personne physique ou
                        morale souhaitant procéder à un achat via le site internet www.contoshop.fr, ci-après dénommée
                        "l'Acheteur" ou "le Client".
                      </p>
                      <p>
                        Ces CGV s'appliquent à toutes les ventes conclues par ContoShop, à l'exclusion de toute autre
                        condition. Elles sont accessibles à tout moment sur le site internet et prévaudront, le cas
                        échéant, sur toute autre version ou tout autre document contradictoire.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Article 2 */}
                  <Card id="article2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </span>
                        Informations légales
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                        <div>
                          <h4 className="font-semibold mb-2">ContoShop SAS</h4>
                          <p className="text-sm text-gray-600">
                            Capital social : 50 000 €<br />
                            RCS Paris : 123 456 789
                            <br />
                            SIRET : 123 456 789 00012
                            <br />
                            TVA : FR12 123456789
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Contact</h4>
                          <p className="text-sm text-gray-600">
                            123 Rue de la Mode
                            <br />
                            75001 Paris, France
                            <br />
                            Tél : +33 1 23 45 67 89
                            <br />
                            Email : contact@contoshop.fr
                          </p>
                        </div>
                      </div>
                      <p>
                        Directeur de la publication : Chadai
                        <br />
                        Hébergeur : LWS (Ligne Web Services) - RCS Paris B 851 993 683 00024
                      </p>
                    </CardContent>
                  </Card>

                  {/* Article 3 */}
                  <Card id="article3">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          3
                        </span>
                        Produits et services
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <p>
                        ContoShop propose à la vente des vêtements de compression de haute qualité, notamment des
                        leggings, brassières, hauts et accessoires destinés au sport et au bien-être.
                      </p>
                      <p>
                        Les produits proposés sont ceux qui figurent sur le site www.contoshop.fr au jour de la
                        consultation du site par l'Acheteur. Les photographies et graphismes présentés sur le site ne
                        sont pas contractuels et ne sauraient engager la responsabilité du Vendeur.
                      </p>
                      <p>
                        Les caractéristiques essentielles des pro duits sont présentées sur le site. Il appartient à
                        l'Acheteur de s'en assurer avant de procéder à l'achat.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Article 4 */}
                  <Card id="article4">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          4
                        </span>
                        Commandes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <p>
                        Les commandes peuvent être passées uniquement sur le site internet www.contoshop.fr. L'Acheteur
                        sélectionne les produits qu'il souhaite commander, puis suit le processus de commande en ligne.
                      </p>
                      <p>
                        Toute commande vaut acceptation des présentes CGV. La validation de la commande par l'Acheteur
                        vaut signature et acceptation des opérations effectuées.
                      </p>
                      <p>
                        ContoShop se réserve le droit d'annuler ou de refuser toute commande d'un Acheteur avec lequel
                        il existerait un litige relatif au paiement d'une commande antérieure.
                      </p>
                      <hr />
                      <h4 className="font-semibold">Processus de commande :</h4>
                      <ol>
                        <li>Sélection des produits et ajout au panier</li>
                        <li>Vérification du contenu du panier</li>
                        <li>Identification ou création de compte</li>
                        <li>Saisie des informations de livraison</li>
                        <li>Choix du mode de paiement</li>
                        <li>Vérification et validation de la commande</li>
                        <li>Paiement sécurisé</li>
                        <li>Confirmation de commande par email</li>
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Article 5 */}
                  <Card id="article5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          5
                        </span>
                        Prix et paiement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <h4 className="font-semibold">Prix</h4>
                      <p>
                        Les prix sont indiqués en euros toutes taxes comprises (TTC), hors frais de livraison. Les prix
                        peuvent être modifiés à tout moment, mais les produits seront facturés sur la base des tarifs en
                        vigueur au moment de la validation de la commande.
                      </p>

                      <h4 className="font-semibold">Modes de paiement acceptés</h4>
                      <ul>
                        <li>Espèce</li>
                        <li>Carte bancaire (Visa, Mastercard, American Express)</li>
                        <li>PayPal</li>
                        <li>Chèque</li>
                        <li>Virement bancaire (pour les commandes professionnelles)</li>
                      </ul>

                      <p>
                        Le paiement est exigible immédiatement à la commande. En cas de refus d'autorisation de paiement
                        par carte bancaire, la commande sera automatiquement annulée.
                      </p>

                      <h4 className="font-semibold">Sécurité</h4>
                      <p>
                        Toutes les transactions sont sécurisées par le protocole SSL et traitées par notre partenaire de
                        paiement certifié PCI-DSS. ContoShop ne stocke aucune donnée bancaire.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Article 6 */}
                  <Card id="article6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          6
                        </span>
                        Livraison
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <h4 className="font-semibold">Zones de livraison</h4>
                      <p>ContoShop livre en France métropolitaine, Corse, DOM-TOM et dans l'Union Européenne.</p>

                      <h4 className="font-semibold">Modes de livraison</h4>
                      <ul>
                        <li>
                          <strong>Standard (3-5 jours) :</strong> 5,90€ - Gratuite dès 50€ d'achat
                        </li>
                        <li>
                          <strong>Express (24-48h) :</strong> 9,90€
                        </li>
                        <li>
                          <strong>Point Relais (2-4 jours) :</strong> 3,90€
                        </li>
                        <li>
                          <strong>Retrait en magasin :</strong> Gratuit
                        </li>
                      </ul>

                      <h4 className="font-semibold">Délais</h4>
                      <p>
                        Les délais de livraison sont donnés à titre indicatif et courent à compter de la confirmation de
                        la commande et du paiement. En cas de retard de livraison, l'Acheteur sera informé par email.
                      </p>

                      <p>
                        En cas de non-livraison dans les délais impartis, l'Acheteur pourra demander l'annulation de sa
                        commande et le remboursement des sommes versées.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Article 7 */}
                  <Card id="article7">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          7
                        </span>
                        Droit de rétractation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <p>
                        Conformément aux dispositions du Code de la consommation, l'Acheteur dispose d'un délai de 14
                        jours francs pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer
                        de pénalité.
                      </p>

                      <p>
                        Ce délai court à compter de la réception des produits. En cas de commande portant sur plusieurs
                        produits livrés séparément, le délai court à compter de la réception du dernier produit.
                      </p>

                      <h4 className="font-semibold">Conditions de retour</h4>
                      <ul>
                        <li>Produits dans leur emballage d'origine</li>
                        <li>Étiquettes et tags encore attachés</li>
                        <li>Produits non portés et en parfait état</li>
                        <li>Facture d'achat incluse</li>
                      </ul>

                      <h4 className="font-semibold">Exceptions</h4>
                      <p>
                        Le droit de rétractation ne peut être exercé pour les sous-vêtements et articles d'hygiène pour
                        des raisons de protection de la santé et d'hygiène.
                      </p>

                      <h4 className="font-semibold">Remboursement</h4>
                      <p>
                        Le remboursement sera effectué dans un délai maximum de 14 jours à compter de la réception du
                        produit retourné, sur le même moyen de paiement que celui utilisé lors de l'achat.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Article 8 */}
                  <Card id="article8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          8
                        </span>
                        Garanties
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <h4 className="font-semibold">Garantie légale de conformité</h4>
                      <p>
                        Tous les produits bénéficient de la garantie légale de conformité prévue aux articles L.217-4 et
                        suivants du Code de la consommation et de la garantie des vices cachés prévue aux articles 1641
                        et suivants du Code civil.
                      </p>

                      <h4 className="font-semibold">Garantie satisfait ou remboursé</h4>
                      <p>
                        En plus des garanties légales, ContoShop offre une garantie "satisfait ou remboursé" de 30 jours
                        à compter de la réception des produits.
                      </p>

                      <h4 className="font-semibold">Service après-vente</h4>
                      <p>Pour toute réclamation, l'Acheteur peut contacter le service client :</p>
                      <ul>
                        <li>Par téléphone : +33 1 23 45 67 89</li>
                        <li>Par email : sav@contoshop.fr</li>
                        <li>Par courrier : ContoShop SAV, 123 Rue de la Mode, 75001 Paris</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Article 9 */}
                  <Card id="article9">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          9
                        </span>
                        Responsabilité
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <p>
                        ContoShop s'engage à apporter le plus grand soin à l'exécution des commandes et à la qualité des
                        produits vendus. La responsabilité de ContoShop ne saurait être engagée en cas de dommages
                        indirects ou imprévisibles.
                      </p>

                      <p>
                        ContoShop ne saurait être tenue responsable de l'inexécution du contrat conclu en cas de rupture
                        de stock ou indisponibilité du produit, cas fortuit ou force majeure.
                      </p>

                      <p>
                        En tout état de cause, la responsabilité de ContoShop est limitée au montant de la commande.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Article 10 */}
                  <Card id="article10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          10
                        </span>
                        Données personnelles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <p>
                        ContoShop s'engage à préserver la confidentialité des informations fournies par l'Acheteur. Ces
                        informations sont nécessaires au traitement et à la livraison des commandes.
                      </p>

                      <p>
                        Conformément au Règlement Général sur la Protection des Données (RGPD), l'Acheteur dispose d'un
                        droit d'accès, de rectification, d'effacement, de portabilité et d'opposition sur ses données
                        personnelles.
                      </p>

                      <p>
                        Pour exercer ces droits, l'Acheteur peut contacter ContoShop à l'adresse : dpo@contoshop.fr ou
                        par courrier à l'adresse du siège social.
                      </p>

                      <p>
                        Les données sont conservées pendant la durée nécessaire à l'exécution du contrat et au respect
                        des obligations légales.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Article 11 */}
                  <Card id="article11">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          11
                        </span>
                        Propriété intellectuelle
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <p>
                        Tous les éléments du site www.contoshop.fr sont et restent la propriété intellectuelle et
                        exclusive de ContoShop. Nul n'est autorisé à reproduire, exploiter, rediffuser, ou utiliser à
                        quelque titre que ce soit, même partiellement, des éléments du site qu'ils soient logiciels,
                        visuels ou sonores.
                      </p>

                      <p>
                        Toute reproduction totale ou partielle du site www.contoshop.fr est strictement interdite et
                        constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la
                        propriété intellectuelle.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Article 12 */}
                  <Card id="article12">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          12
                        </span>
                        Droit applicable et juridiction
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <p>
                        Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux français
                        seront seuls compétents.
                      </p>

                      <p>
                        Conformément aux dispositions du Code de la consommation concernant le règlement amiable des
                        litiges, ContoShop adhère au service du médiateur du e-commerce de la FEVAD (Fédération du
                        e-commerce et de la vente à distance) dont les coordonnées sont les suivantes :
                      </p>

                      <p>
                        Médiateur du e-commerce de la FEVAD
                        <br />
                        60 Rue La Boétie – 75008 Paris
                        <br />
                        <a href="http://www.mediateurfevad.fr" className="text-blue-600 hover:underline">
                          www.mediateurfevad.fr
                        </a>
                      </p>

                      <p>
                        Après démarche préalable écrite des consommateurs vis-à-vis de ContoShop, le Service du
                        Médiateur peut être saisi pour tout litige de consommation dont le règlement n'aurait pas
                        abouti.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
