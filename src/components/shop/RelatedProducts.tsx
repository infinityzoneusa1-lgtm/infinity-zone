'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/product';

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

// Sample related products
const sampleProducts: Product[] = [
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
    name: 'Skincare Analysis Service',
    description: 'Professional skincare analysis with customized routine',
    price: 149.99,
    images: ['/skincare-analysis-professional.png'],
    category: 'Beauty',
    subcategory: 'Skincare',
    brand: 'Infinity Zone',
    inStock: true,
    stockQuantity: 15,
    rating: 4.9,
    reviewCount: 28,
    features: ['Detailed analysis', 'Custom routine', 'Product samples'],
    specifications: {
      'Duration': '90 minutes',
      'Analysis Type': 'Professional equipment',
      'Report': 'Detailed written report'
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '6',
    name: 'Premium Facial Treatment',
    description: 'Luxury facial treatment with premium products',
    price: 249.99,
    images: ['/professional-skincare-specialist-man.png'],
    category: 'Beauty',
    subcategory: 'Treatment',
    brand: 'Infinity Zone',
    inStock: true,
    stockQuantity: 8,
    rating: 4.8,
    reviewCount: 52,
    features: ['Premium products', 'Relaxing experience', 'Visible results'],
    specifications: {
      'Duration': '2.5 hours',
      'Treatment Type': 'Deep cleansing & hydration',
      'Aftercare': 'Included'
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  }
];

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Filter products by category and exclude current product
      const related = sampleProducts
        .filter(product => 
          product.category === category && 
          product.id !== currentProductId
        )
        .slice(0, 4); // Limit to 4 products
      
      setRelatedProducts(related);
      setLoading(false);
    }, 500);
  }, [category, currentProductId]);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}