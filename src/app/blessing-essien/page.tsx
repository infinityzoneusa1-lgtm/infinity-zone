import { BlessingEssienContactSection } from "@/components/blessing-essien/contact-section";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blessing Essien - Executive Support Corporate | Infinity Zone",
  description:
    "Connect with Blessing Essien, Executive Support Corporate at Infinity Zone. Get professional assistance with inquiries, feedback, and business opportunities.",
  keywords:
    "Blessing Essien, Executive Support, Corporate, Infinity Zone, Professional Services",
};

export default function BlessingEssienPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <BlessingEssienContactSection />
      <Footer />
    </main>
  );
}
