import { BlessingEssienContactSection } from "@/components/blessing-essien/contact-section";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function BlessingEssienPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <BlessingEssienContactSection />
      <Footer />
    </main>
  );
}
