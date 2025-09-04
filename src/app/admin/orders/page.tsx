"use client";

import { useState, useEffect } from "react";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiDownload,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import Link from "next/link";

interface Order {
  _id: string;
  orderNumber: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: Array<{
    product: {
      _id: string;
      title: string;
      images: Array<{
        url: string;
        alt: string;
      }>;
    };
    quantity: number;
    price: number;
  }>;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
  updatedAt: string;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusIcons = {
  pending: FiClock,
  processing: FiPackage,
  shipped: FiTruck,
  delivered: FiCheckCircle,
  cancelled: FiAlertCircle,
};

const paymentStatusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch orders:", response.status);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setOrders((prevOrders) =>
          (prevOrders || []).filter((order) => order._id !== orderId)
        );
        setShowDeleteModal(false);
        setOrderToDelete(null);
        alert("Order deleted successfully!");
      } else {
        const error = await response.json();
        alert("Failed to delete order: " + (error.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order");
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        fetchOrders(); // Refresh the orders list
        alert("Order status updated successfully!");
      } else {
        const error = await response.json();
        alert(
          "Failed to update order status: " + (error.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status");
    }
  };

  const filteredOrders = (orders || []).filter((order) => {
    const matchesSearch =
      (order.orderNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (order.user?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (order.user?.email || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || order.status === statusFilter;
    const matchesPayment =
      paymentFilter === "" || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );
  const averageOrderValue =
    filteredOrders.length > 0 ? totalRevenue / filteredOrders.length : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#450209] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading orders...</p>
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
              Orders Management
            </h1>
            <p className="mt-2 text-gray-600">
              Track and manage all customer orders, payments, and shipments
            </p>
          </div>
        </div>
        {/* <div className="mt-6 sm:mt-0 sm:ml-8 sm:flex-none">
          <button
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-[#450209] to-[#5a0a0d] hover:from-[#350107] hover:to-[#450209] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#450209] transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <FiDownload className="mr-2 h-5 w-5" />
            Export Orders
          </button>
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20">
              <FiPackage className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredOrders.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-green-600/20">
              <FiCheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-purple-600/20">
              <FiTruck className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Order</p>
              <p className="text-2xl font-bold text-gray-900">
                ${averageOrderValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#450209]/20 to-[#5a0a0d]/20">
              <FiClock className="h-8 w-8 text-[#450209]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pending Orders
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  filteredOrders.filter((order) => order.status === "pending")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders by number, customer name or email..."
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiFilter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-12 pr-8 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-[#450209] rounded-xl bg-gray-50 focus:bg-white transition-all duration-200 text-gray-900"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="">All Payments</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-[#450209]/10 to-[#5a0a0d]/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status];
                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-white/80 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-r from-[#450209]/10 to-[#5a0a0d]/10 rounded-xl flex items-center justify-center">
                            <FiPackage className="h-6 w-6 text-[#450209]" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              #{order.orderNumber || order._id.slice(-8)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.items?.length || 0} items
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.user?.name || "Guest User"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.user?.email || "No email"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order._id, e.target.value)
                            }
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                              statusColors[order.status]
                            } focus:outline-none focus:ring-2 focus:ring-[#450209]`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            paymentStatusColors[order.paymentStatus]
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-bold text-gray-900">
                          ${order.total?.toFixed(2) || "0.00"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <Link
                            href={`/admin/orders/${order._id}`}
                            className="p-2 text-[#450209] hover:bg-[#450209]/10 rounded-lg transition-colors duration-200"
                          >
                            <FiEye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/orders/edit/${order._id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          >
                            <FiEdit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => {
                              setOrderToDelete(order._id);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="text-gray-500">
                      <div className="mx-auto h-16 w-16 bg-gradient-to-r from-[#450209]/20 to-[#5a0a0d]/20 rounded-full flex items-center justify-center mb-4">
                        <FiPackage className="h-8 w-8 text-[#450209]" />
                      </div>
                      <p className="text-lg font-semibold text-gray-700">
                        No orders found
                      </p>
                      <p className="mt-2 text-gray-500">
                        {searchTerm || statusFilter || paymentFilter
                          ? "Try adjusting your search or filter criteria."
                          : "Orders will appear here once customers start placing them."}
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
                  Delete Order
                </h3>
                <p className="text-gray-600 mb-8">
                  Are you sure you want to delete this order? This action cannot
                  be undone and will remove all associated data.
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
                      orderToDelete && handleDeleteOrder(orderToDelete)
                    }
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-base font-semibold rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
                  >
                    Delete Order
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
