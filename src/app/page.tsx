import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/home/hero-section"
import { ProductShowcase } from "@/components/home/product-showcase"
import { BrandsSection } from "@/components/home/brands-section"
import { DibbaWealthSection } from "@/components/home/dibba-wealth-section"
import { ServicesSection } from "@/components/home/services-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { ProfessionalsSection } from "@/components/home/professionals-section"
import { Footer } from "@/components/layout/footer"

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
