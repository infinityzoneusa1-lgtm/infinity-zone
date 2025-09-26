import { Metadata } from 'next';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VendorHeroSection } from "@/components/vendor-app/hero-section";
import VendorApplicationForm from "@/components/vendor-app/VendorApplicationForm";
import { generateSEO, pagesSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO(pagesSEO.vendors);

export default function VendorAppPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <VendorHeroSection />
      <VendorApplicationForm />
      <Footer />
    </main>
  );
}
