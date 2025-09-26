"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiShoppingBag,
  FiFileText,
  FiMail,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiVideo,
} from "react-icons/fi";

interface DashboardStats {
  products: number;
  orders: number;
  applications: {
    vendors: number;
    bloggers: number;
    contentCreators: number;
  };
  contacts: number;
  professionals: number;
  internships: number;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  category: {
    _id: string;
    name: string;
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

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    orders: 0,
    applications: { vendors: 0, bloggers: 0, contentCreators: 0 },
    contacts: 0,
    professionals: 0,
    internships: 0,
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const API_BASE = `${
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
      }/api`;

      // Fetch stats
      const [
        productsRes,
        ordersRes,
        vendorRes,
        bloggerRes,
        creatorRes,
        contactRes,
        professionalRes,
        internshipRes,
      ] = await Promise.all([
        fetch(`${API_BASE}/products?admin=true`).catch(() => ({
          ok: false,
        })),
        fetch(`${API_BASE}/admin/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        }).catch(() => ({ ok: false })),
        fetch(`${API_BASE}/vendors`).catch(() => ({ ok: false })),
        fetch(`${API_BASE}/bloggers`).catch(() => ({
          ok: false,
        })),
        fetch(`${API_BASE}/content-creators`).catch(() => ({
          ok: false,
        })),
        fetch(`${API_BASE}/contact`).catch(() => ({ ok: false })),
        fetch(`${API_BASE}/professionals`).catch(() => ({
          ok: false,
        })),
        fetch(`${API_BASE}/internships`).catch(() => ({
          ok: false,
        })),
      ]);

      const products =
        productsRes.ok && "json" in productsRes ? await productsRes.json() : [];
      const ordersData =
        ordersRes.ok && "json" in ordersRes ? await ordersRes.json() : {};
      const orders = ordersData.success ? ordersData.data : [];
      const vendors =
        vendorRes.ok && "json" in vendorRes ? await vendorRes.json() : [];
      const bloggers =
        bloggerRes.ok && "json" in bloggerRes ? await bloggerRes.json() : [];
      const creators =
        creatorRes.ok && "json" in creatorRes ? await creatorRes.json() : [];
      const contacts =
        contactRes.ok && "json" in contactRes ? await contactRes.json() : [];
      const professionals =
        professionalRes.ok && "json" in professionalRes
          ? await professionalRes.json()
          : [];
      const internships =
        internshipRes.ok && "json" in internshipRes
          ? await internshipRes.json()
          : [];

      // Debug log to check products data
      // console.log("Products API Response:", products);

      // Ensure all responses are arrays
      const productsArray = Array.isArray(products) ? products : [];
      const ordersArray = Array.isArray(orders) ? orders : [];
      const vendorsArray = Array.isArray(vendors) ? vendors : [];
      const bloggersArray = Array.isArray(bloggers) ? bloggers : [];
      const creatorsArray = Array.isArray(creators) ? creators : [];
      const contactsArray = Array.isArray(contacts) ? contacts : [];
      const professionalsArray = Array.isArray(professionals)
        ? professionals
        : [];
      const internshipsArray = Array.isArray(internships) ? internships : [];

      // console.log("Products Array Length:", productsArray.length);

      setStats({
        products: productsArray.length || 0,
        orders: ordersArray.length || 0,
        applications: {
          vendors: vendorsArray.length || 0,
          bloggers: bloggersArray.length || 0,
          contentCreators: creatorsArray.length || 0,
        },
        contacts: contactsArray.length || 0,
        professionals: professionalsArray.length || 0,
        internships: internshipsArray.length || 0,
      });

      // Set recent data
      setRecentProducts(productsArray.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const API_BASE = `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api`;

        const response = await fetch(`${API_BASE}/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          alert("Product deleted successfully!");
          fetchDashboardData(); // Refresh data
        } else {
          const error = await response.json();
          alert(
            "Failed to delete product: " + (error.message || "Unknown error")
          );
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#450209] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#450209] to-[#5a0a0d] rounded-2xl shadow-xl p-4 md:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome to Admin Dashboard
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Monitor and manage your business operations
            </p>
          </div>
          <Link
            href="/admin/products/add"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl flex items-center gap-2 transition-all duration-200 transform hover:scale-105 text-sm md:text-base"
          >
            <FiPlus className="w-4 h-4 md:w-5 md:h-5" /> Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">
                Total Products
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                {stats.products}
              </p>
              <p className="text-xs text-green-600 mt-1">Active inventory</p>
            </div>
            <div className="bg-green-100 p-3 md:p-4 rounded-xl">
              <FiShoppingBag className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-[#450209] hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">
                Total Orders
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                {stats.orders}
              </p>
              <p className="text-xs text-[#450209] mt-1">Customer orders</p>
            </div>
            <div className="bg-red-100 p-3 md:p-4 rounded-xl">
              <FiFileText className="h-6 w-6 md:h-8 md:w-8 text-[#450209]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-200 transform hover:scale-105 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">
                Messages
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                {stats.contacts + stats.professionals}
              </p>
              <p className="text-xs text-orange-600 mt-1">Contact inquiries</p>
            </div>
            <div className="bg-orange-100 p-3 md:p-4 rounded-xl">
              <FiMail className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Applications Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6 flex items-center">
          <FiFileText className="mr-2 md:mr-3 text-[#450209]" />
          Applications Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <Link
            href="/admin/vendors"
            className="group bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-3 md:p-4 hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-indigo-600 group-hover:text-indigo-700">
                {stats.applications.vendors}
              </div>
              <div className="text-xs md:text-sm text-indigo-600 font-medium">
                Vendor Apps
              </div>
            </div>
          </Link>

          <Link
            href="/admin/bloggers"
            className="group bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 md:p-4 hover:from-green-100 hover:to-green-200 transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-green-600 group-hover:text-green-700">
                {stats.applications.bloggers}
              </div>
              <div className="text-xs md:text-sm text-green-600 font-medium">
                Blogger Apps
              </div>
            </div>
          </Link>

          <Link
            href="/admin/content-creators"
            className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 md:p-4 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-blue-600 group-hover:text-blue-700">
                {stats.applications.contentCreators}
              </div>
              <div className="text-xs md:text-sm text-blue-600 font-medium">
                Content Creators
              </div>
            </div>
          </Link>

          <Link
            href="/admin/internships"
            className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 md:p-4 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-purple-600 group-hover:text-purple-700">
                {stats.internships}
              </div>
              <div className="text-xs md:text-sm text-purple-600 font-medium">
                Internship Apps
              </div>
            </div>
          </Link>

          <Link
            href="/admin/professionals"
            className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-3 md:p-4 hover:from-yellow-100 hover:to-yellow-200 transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-yellow-600 group-hover:text-yellow-700">
                {stats.professionals}
              </div>
              <div className="text-xs md:text-sm text-yellow-600 font-medium">
                Professional Contacts
              </div>
            </div>
          </Link>

          <Link
            href="/admin/contacts"
            className="group bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 md:p-4 hover:from-red-100 hover:to-red-200 transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-red-600 group-hover:text-red-700">
                {stats.contacts}
              </div>
              <div className="text-xs md:text-sm text-red-600 font-medium">
                Contact Messages
              </div>
            </div>
          </Link>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 md:p-4">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-600">
                {stats.applications.vendors +
                  stats.applications.bloggers +
                  stats.applications.contentCreators +
                  stats.internships}
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">
                Total Applications
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#450209] to-[#5a0a0d] rounded-xl p-3 md:p-4 text-white">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold">
                {stats.contacts +
                  stats.professionals +
                  stats.applications.vendors +
                  stats.applications.bloggers +
                  stats.applications.contentCreators +
                  stats.internships}
              </div>
              <div className="text-xs md:text-sm font-medium opacity-90">
                Total Submissions
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center">
            <FiShoppingBag className="mr-2 md:mr-3 text-[#450209]" />
            Recent Products
          </h2>
          <Link
            href="/admin/products"
            className="text-[#450209] hover:text-[#350107] font-medium transition-colors duration-200 text-sm md:text-base"
          >
            View All →
          </Link>
        </div>
        <div className="p-4 md:p-6">
          {recentProducts.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200 hover:border-[#450209]/20 gap-3"
                >
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={product.images?.[0]?.url || "/placeholder.jpg"}
                        alt={product.title}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {product.inventory?.stock || 0}
                        </span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-lg truncate">
                        {product.title}
                      </h3>
                      <p className="text-[#450209] font-bold text-sm md:text-lg">
                        ${product.price}
                      </p>
                      <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-1">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {product.category?.name || "No Category"}
                        </span>
                        <span className="text-xs text-gray-500">
                          Stock: {product.inventory?.stock || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2 self-end sm:self-center">
                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Edit Product"
                    >
                      <FiEdit className="w-4 h-4 md:w-5 md:h-5" />
                    </Link>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete Product"
                    >
                      <FiTrash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="bg-gray-100 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag className="h-8 w-8 md:h-10 md:w-10 text-gray-400" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
                Get started by adding your first product to the inventory.
              </p>
              <Link
                href="/admin/products/add"
                className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-[#450209] to-[#5a0a0d] hover:from-[#350107] hover:to-[#450209] transition-all duration-200 transform hover:scale-105"
              >
                <FiPlus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Link
          href="/admin/products"
          className="group bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-l-4 border-green-500"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="bg-green-100 p-3 md:p-4 rounded-xl group-hover:bg-green-200 transition-colors duration-200 flex-shrink-0">
              <FiShoppingBag className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                Manage Products
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Add, edit, or remove products from inventory
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/contacts"
          className="group bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-l-4 border-red-500"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="bg-red-100 p-3 md:p-4 rounded-xl group-hover:bg-red-200 transition-colors duration-200 flex-shrink-0">
              <FiMail className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                Contact Messages
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                View and respond to customer inquiries
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/applications"
          className="group bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-l-4 border-[#450209] sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="bg-red-100 p-3 md:p-4 rounded-xl group-hover:bg-red-200 transition-colors duration-200 flex-shrink-0">
              <FiFileText className="h-6 w-6 md:h-8 md:w-8 text-[#450209]" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                All Applications
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Review vendor, blogger & content creator apps
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/vendors"
          className="group bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-l-4 border-indigo-500"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="bg-indigo-100 p-3 md:p-4 rounded-xl group-hover:bg-indigo-200 transition-colors duration-200 flex-shrink-0">
              <FiFileText className="h-6 w-6 md:h-8 md:w-8 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                Vendor Applications
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Review and approve vendor partnerships
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/content-creators"
          className="group bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-l-4 border-blue-500"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="bg-blue-100 p-3 md:p-4 rounded-xl group-hover:bg-blue-200 transition-colors duration-200 flex-shrink-0">
              <FiVideo className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                Content Creators
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Manage content creator partnerships
              </p>
            </div>
          </div>
        </Link>

        <div className="bg-gradient-to-br from-[#450209] to-[#5a0a0d] rounded-2xl shadow-lg p-4 md:p-6 text-white">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="bg-white/20 p-3 md:p-4 rounded-xl flex-shrink-0">
              <FiEye className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-base md:text-lg">
                System Overview
              </h3>
              <p className="text-lg md:text-xl font-bold">
                {stats.contacts +
                  stats.professionals +
                  stats.applications.vendors +
                  stats.applications.bloggers +
                  stats.applications.contentCreators +
                  stats.internships}
              </p>
              <p className="text-white/80 text-sm md:text-base">
                Total submissions managed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
