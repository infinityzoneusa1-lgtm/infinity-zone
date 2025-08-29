import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BloggerHeroSection } from "@/components/become-blogger/hero-section";
import { BloggerFormSection } from "@/components/become-blogger/form-section";

export default function BecomeBlogger() {
  return (
    <main className="min-h-screen">
      <Header />
      <BloggerHeroSection />
      <BloggerFormSection />
      <Footer />
    </main>
  );
}
