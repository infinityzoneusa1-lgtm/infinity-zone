import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductDetails } from '@/components/shop/ProductDetails';
import { RelatedProducts } from '@/components/shop/RelatedProducts';
import { ProductReviews } from '@/components/shop/ProductReviews';
import { Product } from '@/types/product';

// Sample product data - replace with API call
async function getProduct(id: string): Promise<Product | null> {
  // This would be an API call in a real application
  const sampleProducts: Record<string, Product> = {
    '1': {
      id: '1',
      name: 'Premium Skincare Set',
      description: 'Complete skincare routine with natural ingredients for all skin types.',
      longDescription: `Our Premium Skincare Set is carefully crafted with the finest natural ingredients to provide your skin with the ultimate care it deserves. Each product in this set is designed to work synergistically, creating a complete skincare routine that addresses multiple skin concerns.

The set includes:
- Gentle Cleanser (150ml): Removes impurities without stripping natural oils
- Balancing Toner (120ml): Restores pH balance and prepares skin for treatment
- Vitamin C Serum (30ml): Brightens and protects against environmental damage
- Hydrating Moisturizer (50ml): Provides long-lasting hydration and nourishment

All products are dermatologist-tested, cruelty-free, and suitable for all skin types.`,
      price: 89.99,
      originalPrice: 120.00,
      images: [
        '/colostrum-skincare-product-luxury-packaging.png',
        '/placeholder.jpg',
        '/placeholder.jpg',
        '/placeholder.jpg'
      ],
      category: 'Beauty',
      subcategory: 'Skincare',
      brand: 'Infinity Zone',
      inStock: true,
      stockQuantity: 50,
      rating: 4.8,
      reviewCount: 127,
      features: [
        'Natural ingredients',
        'Cruelty-free',
        'Dermatologist tested',
        'Suitable for all skin types',
        'Complete 4-step routine',
        'Travel-friendly sizes'
      ],
      specifications: {
        'Skin Type': 'All types',
        'Size': '4-piece set',
        'Origin': 'USA',
        'Shelf Life': '24 months',
        'Cruelty Free': 'Yes',
        'Vegan': 'Yes'
      },
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    '2': {
      id: '2',
      name: 'Luxury Makeup Palette',
      description: 'Professional eyeshadow palette with premium brushes',
      longDescription: 'Professional-grade eyeshadow palette featuring 24 highly pigmented shades in both matte and shimmer finishes. Includes premium synthetic brushes for flawless application.',
      price: 149.99,
      originalPrice: 199.99,
      images: [
        '/luxury-makeup-products-eyeshadow-palettes-and-brus.png',
        '/placeholder.jpg'
      ],
      category: 'Beauty',
      subcategory: 'Makeup',
      brand: 'Infinity Zone',
      inStock: true,
      stockQuantity: 30,
      rating: 4.9,
      reviewCount: 89,
      features: ['Professional quality', 'Long-lasting', 'Includes brushes'],
      specifications: {
        'Colors': '24 shades',
        'Finish': 'Matte & Shimmer',
        'Origin': 'Italy'
      },
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    }
  };

  return sampleProducts[id] || null;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found | Infinity Zone',
    };
  }

  return {
    title: `${product.name} | Infinity Zone`,
    description: product.description,
    keywords: `${product.name}, ${product.category}, ${product.brand}, premium products`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-[#450209]">Home</a></li>
            <li>/</li>
            <li><a href="/shop" className="hover:text-[#450209]">Shop</a></li>
            <li>/</li>
            <li><a href={`/shop?category=${product.category}`} className="hover:text-[#450209]">{product.category}</a></li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <ProductDetails product={product} />
        
        <div className="mt-16">
          <ProductReviews productId={product.id} />
        </div>
        
        <div className="mt-16">
          <RelatedProducts category={product.category} currentProductId={product.id} />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}