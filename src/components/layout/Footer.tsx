import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ContoShop</h3>
            <p className="text-gray-300 text-sm mb-4">
              Votre spécialiste en bas de contention. Nous proposons des produits de qualité médicale pour améliorer
              votre circulation sanguine et votre bien-être.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-white">
                  Catégories
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-gray-300 hover:text-white">
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="/conseils" className="text-gray-300 hover:text-white">
                  Conseils
                </Link>
              </li>
              <li>
                <Link href="/guide-tailles" className="text-gray-300 hover:text-white">
                  Guide des tailles
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-gray-300 hover:text-white">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Service client */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service client</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/livraison-retours" className="text-gray-300 hover:text-white">
                  Livraison et retours
                </Link>
              </li>
              <li>
                <Link href="/garantie" className="text-gray-300 hover:text-white">
                  Garantie
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-gray-300 hover:text-white">
                  CGV
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300">01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300">contact@contoshop.fr</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span className="text-gray-300">
                  123 Rue de la Santé
                  <br />
                  75000 Paris, France
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 ContoShop. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
