import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$299",
      originalPrice: "$399",
      rating: 4.8,
      reviews: 124,
      image: "/api/placeholder/300/300",
      badge: "Best Seller",
      badgeColor: "bg-green-500",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$199",
      originalPrice: "$249",
      rating: 4.6,
      reviews: 89,
      image: "/api/placeholder/300/300",
      badge: "New",
      badgeColor: "bg-blue-500",
    },
    {
      id: 3,
      name: "Ultra HD Camera",
      price: "$899",
      originalPrice: "$1199",
      rating: 4.9,
      reviews: 67,
      image: "/api/placeholder/300/300",
      badge: "Limited",
      badgeColor: "bg-red-500",
    },
    {
      id: 4,
      name: "Gaming Laptop Pro",
      price: "$1599",
      originalPrice: "$1899",
      rating: 4.7,
      reviews: 156,
      image: "/api/placeholder/300/300",
      badge: "Hot Deal",
      badgeColor: "bg-orange-500",
    },
    {
      id: 5,
      name: "Wireless Earbuds",
      price: "$149",
      originalPrice: "$199",
      rating: 4.5,
      reviews: 203,
      image: "/api/placeholder/300/300",
      badge: "Popular",
      badgeColor: "bg-purple-500",
    },
    {
      id: 6,
      name: "Smart Home Hub",
      price: "$129",
      originalPrice: "$179",
      rating: 4.4,
      reviews: 78,
      image: "/api/placeholder/300/300",
      badge: "Featured",
      badgeColor: "bg-indigo-500",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products with exclusive deals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">📦</div>
                    <div className="text-sm">Product Image</div>
                  </div>
                </div>
                
                {/* Badge */}
                <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
                  {product.badge}
                </div>
                
                {/* Actions */}
                <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                  <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
