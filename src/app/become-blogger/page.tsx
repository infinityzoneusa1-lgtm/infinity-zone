import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BloggerHeroSection } from "@/components/become-blogger/hero-section";
import BloggerApplicationForm from "@/components/bloggers/BloggerApplicationForm";

export default function BecomeBlogger() {
  return (
    <main className="min-h-screen">
      <Header />
      <BloggerHeroSection />
      <BloggerApplicationForm />
      <Footer />
    </main>
  );
}
