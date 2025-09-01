import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ShopHeroSection } from "@/components/shop/hero-section";
import { ProductSection } from "@/components/shop/product-section";

export default function Shop() {
  return (
    <main className="min-h-screen">
      <Header />
      <ShopHeroSection />
      <ProductSection />
      <Footer />
    </main>
  );
}
