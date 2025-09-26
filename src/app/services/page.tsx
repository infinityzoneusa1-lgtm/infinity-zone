import { HeroSection } from "@/components/services/hero-section";
import { HomeownerSection } from "@/components/services/homeowner-section";
import { PaymentPlanningSection } from "@/components/services/payment-planning-section";
import { CategoriesSection } from "@/components/services/categories-section";
import { DirectPurchaseSection } from "@/components/services/direct-purchase-section";
import { CustomerBenefitsSection } from "@/components/services/customer-benefits-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CallToActionSection } from "@/components/services/call-to-action-section";

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HomeownerSection />
      <PaymentPlanningSection />
      <CategoriesSection />
      <DirectPurchaseSection />
      <CustomerBenefitsSection />
      {/* <CallToActionSection /> */}
      <Footer />
    </main>
  );
}
