"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/cart-context";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedCapacity, setSelectedCapacity] = useState("20L");
  const [selectedColor, setSelectedColor] = useState("Beige");
  const [mainImage, setMainImage] = useState(0);
  const { addToCart, isInCart } = useCart();

  const productId = parseInt(params.id as string);
  const product = products.find((p) => p.id === productId);

  // If product not found, redirect to shop page
  if (!product) {
    router.push("/shop");
    return null;
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity,
        selectedCapacity,
        selectedColor,
      });
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <main className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.thumbnails[mainImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {/* <div className="grid grid-cols-4 gap-2">
              {product.thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    mainImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>

              {/* Price Section */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-red-600">
                  ${product.price}/month
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                  {product.discount}% off
                </span>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-4">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Subscription
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.subscription}
                </span>
              </div>

              {/* Setup Fee */}
              <p className="text-gray-600 mb-6">
                ${product.setupFee} One Time Setup fee
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating}.0</span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {/* Capacity */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Capacity
                </label>
                <select
                  value={selectedCapacity}
                  onChange={(e) => setSelectedCapacity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="20L">20L</option>
                  <option value="30L">30L</option>
                  <option value="40L">40L</option>
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Color
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Beige">Beige</option>
                  <option value="White">White</option>
                  <option value="Gray">Gray</option>
                  <option value="Black">Black</option>
                </select>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 hover:bg-gray-100 rounded-l-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 hover:bg-gray-100 rounded-r-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 ${
                    isInCart(product.id)
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-primary hover:bg-primary/90 text-white"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isInCart(product.id) ? "Added to Cart" : "Add To Cart"}
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
