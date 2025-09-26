'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { dispatch } = useCart();

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity: 1 }
    });
    dispatch({ type: 'OPEN_CART' });
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <Link href={`/shop/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
          
          {/* Quick Add to Cart */}
          <button
            onClick={addToCart}
            className="absolute bottom-3 right-3 p-2 bg-[#450209] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#5a0a0a]"
            aria-label="Quick add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
            <Link href={`/shop/products/${product.id}`}>
              <h3 className="font-medium text-gray-900 hover:text-[#450209] transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-[#450209]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {!product.inStock && (
            <span className="text-xs text-red-500 font-medium">Out of Stock</span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={addToCart}
          disabled={!product.inStock}
          className="w-full mt-3 bg-[#450209] text-white py-2 px-4 rounded-lg hover:bg-[#5a0a0a] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}