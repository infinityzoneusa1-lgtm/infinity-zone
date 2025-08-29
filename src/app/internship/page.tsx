import { ContentCreatorHeroSection } from "@/components/content-creator/hero-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ContentCreationForm from "@/components/content-creator/content-creation-form";
import { InternshipSection } from "@/components/internship/hero-section";
import { InternshipFormSection } from "@/components/internship/internship-form";

export default function InternshipPage() {
  return (
    <main className="min-h-screen">
      <Header />
     <InternshipSection/>
     <InternshipFormSection/> 
      <Footer />
    </main>
  );
}
