"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  inventory: {
    stock: number;
  };
}

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const { addToCart, isInCart } = useCart();

  const productId = params.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // console.log("Fetching product with ID:", productId);
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
          }/api/products/${productId}`
        );
        // console.log("Response status:", response.status);
        // console.log("Response ok:", response.ok);

        if (response.ok) {
          const data = await response.json();
          // console.log("Product data received:", data);
          // Backend returns data.product, not data.data
          setProduct(data.data?.product || data.product || data.data);
        } else {
          const errorText = await response.text();
          console.error(
            "Product not found. Status:",
            response.status,
            "Error:",
            errorText
          );
          router.push("/shop");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/shop");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, router]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: parseInt(product._id, 16),
        title: product.title,
        price: product.price,
        image: product.images?.[0]?.url || "/placeholder.jpg",
        quantity: quantity,
      };

      // console.log("Adding to cart:", cartItem);
      // console.log("Selected quantity:", quantity);

      addToCart(cartItem);

      // Optional: Show success message or feedback
      // console.log(`Added ${quantity} items to cart`);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      return product && newQuantity <= product.inventory.stock
        ? newQuantity
        : prev;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={
                  product.images?.[mainImage]?.url ||
                  product.images?.[0]?.url ||
                  "/placeholder.jpg"
                }
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      mainImage === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || product.title}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category?.name || "Product"}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-red-600">
                ${product.price}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Stock:</span>
              <span
                className={`text-sm ${
                  product.inventory.stock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.inventory.stock > 0
                  ? `${product.inventory.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity >= product.inventory.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={
                product.inventory.stock === 0 ||
                isInCart(parseInt(product._id, 16))
              }
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {product.inventory.stock === 0
                ? "Out of Stock"
                : isInCart(parseInt(product._id, 16))
                ? "Added to Cart"
                : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
