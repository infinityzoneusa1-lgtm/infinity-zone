import { Metadata } from 'next';
import { AffiliatesHeroSection } from "@/components/affiliates/affiliate";
import AffiliateApplicationForm from "@/components/affiliates/AffiliateApplicationForm";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { generateSEO, pagesSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO(pagesSEO.affiliates);

export default function AffiliatePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AffiliatesHeroSection />
      <AffiliateApplicationForm />
      <Footer />
    </main>
  );
}
