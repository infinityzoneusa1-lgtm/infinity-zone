import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/about/hero-section"
import { WelcomeSection } from "@/components/about/welcome-section"
import { BusinessDevelopmentSection } from "@/components/about/business-development-section"
import { DreamsSection } from "@/components/about/dreams-section"
import { InvestmentSection } from "@/components/about/investment-section"
import { RealEstateServicesSection } from "@/components/about/real-estate-services-section"
import { InnovationSection } from "@/components/about/innovation-section"
import { SustainabilitySection } from "@/components/about/sustainability-section"
import { CommunitySection } from "@/components/about/community-section"

export default function About() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <WelcomeSection />
      <BusinessDevelopmentSection />
      <DreamsSection />
      <InvestmentSection />
      <RealEstateServicesSection />
      <InnovationSection />
      <SustainabilitySection />
      <CommunitySection />
      <Footer />
    </main>
  )
}
