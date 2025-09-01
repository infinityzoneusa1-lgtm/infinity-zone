"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Search } from "lucide-react";
import { products } from "@/data/products";

export function ProductSection() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState<number[]>([]);
  const router = useRouter();

  const pageSize = 8;
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleAddToCart = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleProductClick = (id: number) => {
    router.push(`/shop/product/${id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <section className="py-4 px-2 sm:py-6 md:py-8">
      {/* Search Bar */}
      <form
        className="flex justify-center mb-6 sm:mb-8"
        onSubmit={handleSearch}
      >
        <div className="relative w-full max-w-xl px-2 sm:px-0">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            className="rounded-full border border-gray-300 bg-white pl-4 sm:pl-6 pr-10 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full"
          />
          <Button
            size="icon"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90 p-1.5 sm:p-2"
            type="submit"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </Button>
        </div>
      </form>

      {/* Product Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
        {paginatedProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        ) : (
          paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md flex flex-col relative overflow-hidden h-[340px] sm:h-[360px] md:h-[380px] lg:h-[400px]"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Product Image */}
              <div className="w-full h-40 sm:h-44 md:h-48 lg:h-52 flex items-center justify-center bg-gray-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <div className="flex items-start w-full mt-3 sm:mt-4 mb-1 sm:mb-2 px-2 sm:px-3">
                <div className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 leading-tight line-clamp-2">
                  {product.title}
                </div>
              </div>

              {/* Rating & Subscription */}
              <div className="flex items-center w-full px-2 sm:px-3 mb-1 sm:mb-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 mr-0.5"
                    />
                  ))}
                  <span className="ml-1 text-xs sm:text-sm text-gray-500">
                    {product.rating}.0
                  </span>
                </div>
                <span className="ml-auto bg-red-200 text-red-800 text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  Subscription
                </span>
              </div>

              {/* Price & Add to Cart */}
              <div className="flex items-center w-full mt-auto mb-2 sm:mb-3 justify-between gap-2 px-2 sm:px-3 pb-2 sm:pb-3">
                <Button
                  className={`bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-4 sm:px-6 text-xs sm:text-sm font-semibold whitespace-nowrap ${
                    cart.includes(product.id)
                      ? "opacity-60 pointer-events-none"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product.id);
                  }}
                >
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                  {cart.includes(product.id) ? "Added" : "Add To Cart"}
                </Button>
                <span className="font-bold text-sm sm:text-base md:text-lg text-gray-900">
                  ${product.price}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 sm:mt-8">
        <nav className="inline-flex items-center space-x-1 sm:space-x-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setPage(idx + 1)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold border transition-colors ${
                page === idx + 1
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
