import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VendorHeroSection } from "@/components/vendor-app/hero-section";
import { VendorFormSection } from "@/components/vendor-app/form-section";

export default function VendorAppPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <VendorHeroSection />
      <VendorFormSection />
      <Footer />
    </main>
  );
}
