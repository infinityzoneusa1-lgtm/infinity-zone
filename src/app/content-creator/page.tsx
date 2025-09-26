import { ContentCreatorHeroSection } from "@/components/content-creator/hero-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ContentCreatorApplicationForm from "@/components/content-creators/ContentCreatorApplicationForm";

export default function ContentCreatorPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContentCreatorHeroSection />
      <ContentCreatorApplicationForm />
      <Footer />
    </main>
  );
}
