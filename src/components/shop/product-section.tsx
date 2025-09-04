"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Search } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { api } from "@/lib/api";

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

export function ProductSection() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart, isInCart } = useCart();

  const pageSize = 8;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await api.getProducts();
      // console.log("Products API response:", result); // Debug log

      // Handle both direct array and structured response
      let productsData = [];
      if (Array.isArray(result)) {
        productsData = result;
      } else if (result.data && Array.isArray(result.data.products)) {
        productsData = result.data.products;
      } else if (result.data && Array.isArray(result.data)) {
        productsData = result.data;
      }

      // console.log("Processed products data:", productsData); // Debug log
      // console.log("First product ID:", productsData?.[0]?._id); // Debug log
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          (product.title || "").toLowerCase().includes(search.toLowerCase()) ||
          (product.description || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (product.category?.name || "")
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: parseInt(product._id, 16), // Convert MongoDB ObjectId to number for cart compatibility
      title: product.title,
      price: product.price,
      image: product.images?.[0]?.url || "/placeholder.jpg",
    });
  };

  const handleProductClick = (id: string) => {
    // console.log("Product clicked with ID:", id);
    router.push(`/shop/product/${id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  if (loading) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#450209] border-t-transparent mx-auto mb-6"></div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <p className="text-lg font-semibold text-gray-700">
                  Loading amazing products...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Please wait while we fetch the latest items
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 px-2 sm:py-6 md:py-8">
      {/* Search Bar */}
      <form
        className="flex justify-center mb-8 sm:mb-12"
        onSubmit={handleSearch}
      >
        <div className="relative w-full max-w-2xl px-2 sm:px-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-2">
            <div className="relative">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for amazing products..."
                className="rounded-xl border-0 bg-transparent pl-6 pr-16 py-4 text-base placeholder:text-gray-500 focus:outline-none focus:ring-0 w-full"
              />
              <Button
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-[#450209] to-[#5a0a0d] hover:from-[#350107] hover:to-[#450209] p-3 transition-all duration-200 transform hover:scale-105 shadow-lg"
                type="submit"
              >
                <Search className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Product Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
        {paginatedProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mx-auto max-w-md">
              <div className="w-16 h-16 bg-gradient-to-r from-[#450209]/20 to-[#5a0a0d]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#450209]" />
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {filteredProducts.length === 0 && search
                  ? "No products found"
                  : "No products available"}
              </p>
              <p className="text-gray-500">
                {filteredProducts.length === 0 && search
                  ? `Try searching for something else`
                  : "Check back later for new products"}
              </p>
            </div>
          </div>
        ) : (
          paginatedProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl flex flex-col relative overflow-hidden h-[340px] sm:h-[360px] md:h-[380px] lg:h-[400px] cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-white/20"
              onClick={() => handleProductClick(product._id)}
            >
              {/* Product Image */}
              <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={product.images?.[0]?.url || "/placeholder.jpg"}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.jpg";
                  }}
                />
                {/* Stock badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      product.inventory.stock > 10
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : product.inventory.stock > 0
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    } backdrop-blur-sm shadow-sm`}
                  >
                    {product.inventory.stock > 0
                      ? `${product.inventory.stock} left`
                      : "Out of stock"}
                  </span>
                </div>
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#450209] border border-white/50 backdrop-blur-sm shadow-sm">
                    {product.category?.name || "No Category"}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-3 sm:p-4 flex flex-col">
                {/* Title */}
                <div className="mb-3">
                  <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900 leading-tight line-clamp-2 group-hover:text-[#450209] transition-colors duration-200">
                    {product.title}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 mr-0.5"
                      />
                    ))}
                    <span className="ml-2 text-xs sm:text-sm text-gray-600 font-medium">
                      5.0 (25)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#450209] to-[#5a0a0d] bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${Math.round(product.price * 1.3)}
                    </span>
                  </div>
                  <span className="text-xs text-green-600 font-semibold">
                    23% OFF
                  </span>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-auto">
                  <Button
                    className={`w-full bg-gradient-to-r from-[#450209] to-[#5a0a0d] hover:from-[#350107] hover:to-[#450209] text-white rounded-xl flex items-center justify-center gap-2 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                      isInCart(parseInt(product._id, 16)) ||
                      product.inventory.stock === 0
                        ? "opacity-60 pointer-events-none"
                        : "hover:shadow-xl"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (product.inventory.stock > 0) {
                        handleAddToCart(product);
                      }
                    }}
                    disabled={product.inventory.stock === 0}
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    {product.inventory.stock === 0
                      ? "Out of Stock"
                      : isInCart(parseInt(product._id, 16))
                      ? "Added to Cart"
                      : "Add To Cart"}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 sm:mt-12">
          <nav className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20">
            <div className="inline-flex items-center space-x-1 sm:space-x-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setPage(idx + 1)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-200 ${
                    page === idx + 1
                      ? "bg-gradient-to-r from-[#450209] to-[#5a0a0d] text-white shadow-lg transform scale-110"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-[#450209] hover:scale-105 shadow-sm"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </section>
  );
}
