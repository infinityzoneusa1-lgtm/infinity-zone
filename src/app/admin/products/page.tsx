"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter } from "react-icons/fi";
import Link from "next/link";

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
  inventory: {
    stock: number;
  };
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  createdAt: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/products?admin=true`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // Ensure data is an array
        setProducts(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch products:", response.status);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setProducts((prevProducts) =>
          (prevProducts || []).filter((product) => product._id !== productId)
        );
        setShowDeleteModal(false);
        setProductToDelete(null);
        alert("Product deleted successfully!");
      } else {
        const error = await response.json();
        alert(
          "Failed to delete product: " + (error.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch =
      (product.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "" || product.category?.name === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(
    new Set(
      (products || []).map((product) => product.category?.name).filter(Boolean)
    )
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#450209] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#450209] to-[#5a0a0d] bg-clip-text text-transparent">
              Products Management
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your product catalog, inventory, and pricing
            </p>
          </div>
        </div>
        <div className="mt-6 sm:mt-0 sm:ml-8 sm:flex-none">
          <Link
            href="/admin/products/add"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-[#450209] to-[#5a0a0d] hover:from-[#350107] hover:to-[#450209] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#450209] transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <FiPlus className="mr-2 h-5 w-5" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products by name or description..."
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-[#450209] bg-gray-50 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiFilter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-12 pr-8 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-[#450209] rounded-xl bg-gray-50 focus:bg-white transition-all duration-200 text-gray-900"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-[#450209]/10 to-[#5a0a0d]/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Created
                </th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-gray-100">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-white/80 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-xl object-cover shadow-md border border-gray-200"
                            src={product.images?.[0]?.url || "/placeholder.jpg"}
                            alt={product.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.description?.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-[#450209]/10 to-[#5a0a0d]/10 text-[#450209]">
                        {product.category?.name || "No Category"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          product.inventory.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.inventory.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inventory.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <Link
                          href={`/admin/products/edit/${product._id}`}
                          className="p-2 text-[#450209] hover:bg-[#450209]/10 rounded-lg transition-colors duration-200"
                        >
                          <FiEdit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setProductToDelete(product._id);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="text-gray-500">
                      <div className="mx-auto h-16 w-16 bg-gradient-to-r from-[#450209]/20 to-[#5a0a0d]/20 rounded-full flex items-center justify-center mb-4">
                        <FiSearch className="h-8 w-8 text-[#450209]" />
                      </div>
                      <p className="text-lg font-semibold text-gray-700">
                        No products found
                      </p>
                      <p className="mt-2 text-gray-500">
                        {searchTerm || categoryFilter
                          ? "Try adjusting your search or filter criteria."
                          : "Get started by adding your first product."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div className="p-8">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <FiTrash2 className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Delete Product
                </h3>
                <p className="text-gray-600 mb-8">
                  Are you sure you want to delete this product? This action
                  cannot be undone and will remove all associated data.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 text-base font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      productToDelete && handleDeleteProduct(productToDelete)
                    }
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-base font-semibold rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
