import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductShowcase } from "@/components/product-showcase"
import { BrandsSection } from "@/components/brands-section"
import { DibbaWealthSection } from "@/components/dibba-wealth-section"
import { ServicesSection } from "@/components/services-section"
import { CategoriesSection } from "@/components/categories-section"
import { ProfessionalsSection } from "@/components/professionals-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductShowcase />
      <BrandsSection />
      <DibbaWealthSection />
      <ServicesSection />
      <CategoriesSection />
      <ProfessionalsSection />
      <Footer />
    </main>
  )
}
