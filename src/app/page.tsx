import { Metadata } from "next";
import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/home/hero-section"
import { ProductShowcase } from "@/components/home/product-showcase"
import { BrandsSection } from "@/components/home/brands-section"
import { DibbaWealthSection } from "@/components/home/dibba-wealth-section"
import { ServicesSection } from "@/components/home/services-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { ProfessionalsSection } from "@/components/home/professionals-section"
import { TestimonialsSection } from "@/components/common/Testimonials"
import { TrustBadges } from "@/components/common/TrustBadges"
import { Footer } from "@/components/layout/footer"
import { generateSEO, pagesSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO(pagesSEO.home);

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TrustBadges />
      <ProductShowcase />
      <BrandsSection />
      <TestimonialsSection />
      <DibbaWealthSection />
      <ServicesSection />
      <CategoriesSection />
      <ProfessionalsSection />
      <Footer />
    </main>
  )
}
