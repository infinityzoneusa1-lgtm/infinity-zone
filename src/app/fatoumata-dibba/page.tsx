import { FatoumataDibbaContactSection } from "@/components/fatoumata-dibba/contact-section";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function FatoumataDibbaPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <FatoumataDibbaContactSection />
      <Footer />
    </main>
  );
}
