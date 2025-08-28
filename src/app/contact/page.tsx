import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { ContactFormSection } from "@/components/contact/contact-form-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactHeroSection />
      <ContactFormSection />
      {/* <ContactInfoSection /> */}
      <Footer />
    </main>
  );
}
