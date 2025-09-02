import { AffiliatesHeroSection } from "@/components/affiliates/affiliate";
import { AffiliateProgramDetails } from "@/components/affiliates/affiliate-program-details";
import { Step1Section } from "@/components/affiliates/step-1";
import { Step2Section } from "@/components/affiliates/step-2";
import { Step3Section } from "@/components/affiliates/step-3";
import { Step4Section } from "@/components/affiliates/step-4";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function AffiliatePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AffiliatesHeroSection />

      <Step1Section />
      <Step2Section />
      <Step3Section />
      <Step4Section />
      <AffiliateProgramDetails />
      <Footer />
    </main>
  );
}
