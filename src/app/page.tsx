import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/home/HeroSection"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { CategoriesSection } from "@/components/home/CategoriesSection"
import { PromotionsSection } from "@/components/home/PromotionsSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <CategoriesSection />
        <PromotionsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
