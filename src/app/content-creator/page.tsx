import { ContentCreatorHeroSection } from "@/components/content-creator/hero-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ContentCreationForm from "@/components/content-creator/content-creation-form";

export default function ContentCreatorPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContentCreatorHeroSection />
      <ContentCreationForm />
      <Footer />
    </main>
  );
}
