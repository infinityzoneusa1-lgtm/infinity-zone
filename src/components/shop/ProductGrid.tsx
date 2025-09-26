'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/product';

// Sample products data - replace with API call
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Skincare Set',
    description: 'Complete skincare routine with natural ingredients',
    price: 89.99,
    originalPrice: 120.00,
    images: ['/colostrum-skincare-product-luxury-packaging.png'],
    category: 'Beauty',
    subcategory: 'Skincare',
    brand: 'Infinity Zone',
    inStock: true,
    stockQuantity: 50,
    rating: 4.8,
    reviewCount: 127,
    features: ['Natural ingredients', 'Cruelty-free', 'Dermatologist tested'],
    specifications: {
      'Skin Type': 'All types',
      'Size': '50ml each',
      'Origin': 'USA'
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Luxury Makeup Palette',
    description: 'Professional eyeshadow palette with premium brushes',
    price: 149.99,
    originalPrice: 199.99,
    images: ['/luxury-makeup-products-eyeshadow-palettes-and-brus.png'],
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
  },
  {
    id: '3',
    name: 'Professional Beauty Service',
    description: 'Expert makeup application and consultation',
    price: 199.99,
    images: ['/makeup-application-professional-service.png'],
    category: 'Services',
    subcategory: 'Beauty',
    brand: 'Infinity Zone',
    inStock: true,
    stockQuantity: 10,
    rating: 5.0,
    reviewCount: 45,
    features: ['Expert consultation', '2-hour session', 'Product recommendations'],
    specifications: {
      'Duration': '2 hours',
      'Location': 'In-studio',
      'Includes': 'Consultation & Application'
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '4',
    name: 'Beauty Consultation Package',
    description: 'Personalized beauty consultation with skincare analysis',
    price: 99.99,
    images: ['/beauty-consultation-professional.png'],
    category: 'Services',
    subcategory: 'Consultation',
    brand: 'Infinity Zone',
    inStock: true,
    stockQuantity: 20,
    rating: 4.7,
    reviewCount: 67,
    features: ['Skin analysis', 'Product recommendations', 'Follow-up support'],
    specifications: {
      'Duration': '1 hour',
      'Format': 'In-person or Virtual',
      'Follow-up': 'Included'
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '5',
    name: 'Premium Car Care Kit',
    description: 'Professional car detailing products and tools',
    price: 299.99,
    originalPrice: 399.99,
    images: ['/luxury-car-premium-products.png'],
    category: 'Automotive',
    subcategory: 'Care',
    brand: 'Infinity Zone',
    inStock: true,
    stockQuantity: 15,
    rating: 4.6,
    reviewCount: 34,
    features: ['Professional grade', 'Complete kit', 'Long-lasting protection'],
    specifications: {
      'Items': '12 products',
      'Coverage': 'Full vehicle',
      'Warranty': '1 year'
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '6',
    name: 'Luxury Wheel & Tire Set',
    description: 'Premium wheels and tires for luxury vehicles',
    price: 1999.99,
    images: ['/luxury-car-wheels-and-tires.png'],
    category: 'Automotive',
    subcategory: 'Wheels',
    brand: 'Infinity Zone',
    inStock: true,
    stockQuantity: 5,
    rating: 4.8,
    reviewCount: 12,
    features: ['Premium materials', 'Professional installation', 'Warranty included'],
    specifications: {
      'Size': '20 inch',
      'Material': 'Forged aluminum',
      'Installation': 'Included'
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  }
];

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Sort Options */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{products.length} products found</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#450209]"
          aria-label="Sort products by"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      {products.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-[#450209] text-white px-8 py-3 rounded-lg hover:bg-[#5a0a0a] transition-colors">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
}