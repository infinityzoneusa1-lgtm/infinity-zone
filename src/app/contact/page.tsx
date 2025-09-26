import { Metadata } from 'next';
import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { ContactFormSection } from "@/components/contact/contact-form-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactInfoSection } from "@/components/contact/contact-info-section";
import { generateSEO, pagesSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO(pagesSEO.contact);

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
