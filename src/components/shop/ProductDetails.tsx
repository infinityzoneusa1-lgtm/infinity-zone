'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity }
    });
    dispatch({ type: 'OPEN_CART' });
  };

  const shareProduct = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product.images[selectedImage] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>
        
        {/* Thumbnail Images */}
        <div className="flex space-x-2 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                selectedImage === index ? 'border-[#450209]' : 'border-transparent'
              }`}
              aria-label={`View product image ${index + 1}`}
            >
              <Image
                src={image || '/placeholder.jpg'}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-[#450209]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xl text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Description */}
        <div>
          <p className="text-gray-600 leading-relaxed">
            {product.longDescription || product.description}
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold mb-3">Key Features:</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-[#450209] rounded-full mr-3"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="font-medium">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-50"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {product.stockQuantity} in stock
            </span>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={addToCart}
              disabled={!product.inStock}
              className="flex-1 bg-[#450209] text-white py-3 px-6 rounded-lg hover:bg-[#5a0a0a] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center font-medium"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-3 border rounded-lg transition-colors ${
                isWishlisted
                  ? 'border-red-500 text-red-500 bg-red-50'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={shareProduct}
              className="p-3 border border-gray-300 text-gray-600 hover:border-gray-400 rounded-lg transition-colors"
              aria-label="Share product"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center space-x-6 py-6 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <Truck className="w-5 h-5 mr-2 text-green-600" />
            Free shipping over $100
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Secure payment
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <RotateCcw className="w-5 h-5 mr-2 text-orange-600" />
            30-day returns
          </div>
        </div>

        {/* Specifications */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold mb-4">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">{key}:</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}