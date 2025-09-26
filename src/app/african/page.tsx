import { AfricanHeroSection } from "@/components/african/hero";
import { InfoSection } from "@/components/african/info-section";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function AfricanPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AfricanHeroSection />
      <InfoSection />
      <Footer />
    </main>
  );
}
