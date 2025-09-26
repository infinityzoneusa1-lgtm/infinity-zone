import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { ShopFilters } from '@/components/shop/ShopFilters';
import { ShopHero } from '@/components/shop/ShopHero';
import { TrustBadges, SecuritySection } from '@/components/common/TrustBadges';
import { CompactTestimonials } from '@/components/common/Testimonials';
import { generateSEO, pagesSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO(pagesSEO.products);

export default function ShopPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ShopHero />
      
      {/* Trust Badges */}
      <TrustBadges />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ShopFilters />
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            <ProductGrid />
          </div>
        </div>
      </div>
      
      {/* Customer Reviews */}
      <CompactTestimonials />
      
      {/* Security Section */}
      <SecuritySection />
      
      <Footer />
    </main>
  );
}
