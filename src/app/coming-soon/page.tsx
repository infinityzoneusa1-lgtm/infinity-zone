import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/coming-soon/hero";

export default function BecomeBlogger() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <Footer />
    </main>
  );
}
