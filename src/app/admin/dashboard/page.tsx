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
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
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
        fetch("http://localhost:5000/api/products").catch(() => ({
          ok: false,
        })),
        fetch("http://localhost:5000/api/orders").catch(() => ({ ok: false })),
        fetch("http://localhost:5000/api/vendors").catch(() => ({ ok: false })),
        fetch("http://localhost:5000/api/bloggers").catch(() => ({
          ok: false,
        })),
        fetch("http://localhost:5000/api/content-creators").catch(() => ({
          ok: false,
        })),
        fetch("http://localhost:5000/api/contact").catch(() => ({ ok: false })),
        fetch("http://localhost:5000/api/professionals").catch(() => ({
          ok: false,
        })),
        fetch("http://localhost:5000/api/internships").catch(() => ({
          ok: false,
        })),
      ]);

      const products =
        productsRes.ok && "json" in productsRes ? await productsRes.json() : [];
      const orders =
        ordersRes.ok && "json" in ordersRes ? await ordersRes.json() : [];
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
        await fetch(`http://localhost:5000/api/products/${id}`, {
          method: "DELETE",
        });
        fetchDashboardData(); // Refresh data
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <Link
              href="/admin/products/add"
              className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-purple-700"
            >
              <FiPlus /> Add Product
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.products}
                </p>
              </div>
              <FiShoppingBag className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Orders</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.orders}
                </p>
              </div>
              <FiFileText className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Messages
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.contacts + stats.professionals}
                </p>
              </div>
              <FiMail className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Link
            href="/admin/vendors"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {stats.applications.vendors}
              </div>
              <div className="text-sm text-gray-600">Vendor Apps</div>
            </div>
          </Link>

          <Link
            href="/admin/bloggers"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.applications.bloggers}
              </div>
              <div className="text-sm text-gray-600">Blogger Apps</div>
            </div>
          </Link>

          <Link
            href="/admin/content-creators"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.applications.contentCreators}
              </div>
              <div className="text-sm text-gray-600">Content Creators</div>
            </div>
          </Link>

          <Link
            href="/admin/professionals"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.professionals}
              </div>
              <div className="text-sm text-gray-600">Professional Contacts</div>
            </div>
          </Link>

          <Link
            href="/admin/contacts"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {stats.contacts}
              </div>
              <div className="text-sm text-gray-600">Contact Messages</div>
            </div>
          </Link>

          <Link
            href="/admin/internships"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {stats.internships}
              </div>
              <div className="text-sm text-gray-600">Internship Apps</div>
            </div>
          </Link>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {stats.applications.vendors +
                  stats.applications.bloggers +
                  stats.applications.contentCreators +
                  stats.internships}
              </div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Products
            </h2>
            <Link
              href="/admin/products"
              className="text-purple-600 hover:text-purple-700"
            >
              View All
            </Link>
          </div>
          <div className="p-6">
            {recentProducts.length > 0 ? (
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/products/edit/${product._id}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No products found
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/products"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <FiShoppingBag className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Manage Products</h3>
                <p className="text-sm text-gray-600">
                  Add, edit, or remove products
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/contacts"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <FiMail className="h-8 w-8 text-red-600" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Contact Messages
                </h3>
                <p className="text-sm text-gray-600">
                  View contact form submissions
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/vendors"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <FiFileText className="h-8 w-8 text-indigo-600" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Vendor Applications
                </h3>
                <p className="text-sm text-gray-600">
                  Review vendor applications
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/bloggers"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <FiFileText className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Blogger Applications
                </h3>
                <p className="text-sm text-gray-600">
                  Review blogger applications
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/content-creators"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <FiFileText className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Content Creators
                </h3>
                <p className="text-sm text-gray-600">
                  Review content creator applications
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/professionals"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <FiMail className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Professional Contacts
                </h3>
                <p className="text-sm text-gray-600">
                  View professional consultations
                </p>
              </div>
            </div>
          </Link>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center space-x-4">
              <FiEye className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Total Submissions</h3>
                <p className="text-lg font-bold">
                  {stats.contacts +
                    stats.professionals +
                    stats.applications.vendors +
                    stats.applications.bloggers +
                    stats.applications.contentCreators}
                </p>
                <p className="text-sm opacity-90">All form submissions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
