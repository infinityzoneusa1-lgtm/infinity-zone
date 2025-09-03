"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiFileText,
  FiUser,
  FiMail,
  FiCalendar,
  FiEye,
  FiCheck,
  FiX,
} from "react-icons/fi";

interface Application {
  _id: string;
  name: string;
  email: string;
  type: "vendor" | "blogger" | "contentCreator";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  businessName?: string;
  website?: string;
  socialMedia?: string;
  experience?: string;
}

interface VendorApplication extends Omit<Application, "type"> {
  businessName: string;
  website?: string;
}

interface BloggerApplication extends Omit<Application, "type"> {
  socialMedia?: string;
  experience?: string;
}

interface ContentCreatorApplication extends Omit<Application, "type"> {
  socialMedia?: string;
  experience?: string;
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const [vendorRes, bloggerRes, creatorRes] = await Promise.all([
        fetch("http://localhost:5000/api/vendors"),
        fetch("http://localhost:5000/api/bloggers"),
        fetch("http://localhost:5000/api/content-creators"),
      ]);

      const vendors = await vendorRes.json();
      const bloggers = await bloggerRes.json();
      const creators = await creatorRes.json();

      const allApplications = [
        ...vendors.map((app: VendorApplication) => ({
          ...app,
          type: "vendor" as const,
        })),
        ...bloggers.map((app: BloggerApplication) => ({
          ...app,
          type: "blogger" as const,
        })),
        ...creators.map((app: ContentCreatorApplication) => ({
          ...app,
          type: "contentCreator" as const,
        })),
      ];

      setApplications(allApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (
    id: string,
    type: string,
    status: string
  ) => {
    try {
      const endpoint =
        type === "vendor"
          ? "vendors"
          : type === "blogger"
          ? "bloggers"
          : "content-creators";

      const response = await fetch(
        `http://localhost:5000/api/${endpoint}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        fetchApplications();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    if (filter === "pending") return app.status === "pending";
    if (filter === "approved") return app.status === "approved";
    if (filter === "rejected") return app.status === "rejected";
    return app.type === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vendor":
        return "bg-blue-100 text-blue-800";
      case "blogger":
        return "bg-purple-100 text-purple-800";
      case "contentCreator":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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
            <div>
              <Link
                href="/admin/dashboard"
                className="text-purple-600 hover:text-purple-700 mb-2 inline-block"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Applications Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-50 px-4 py-2 rounded-md">
                <span className="text-yellow-800 font-medium">
                  Pending:{" "}
                  {applications.filter((a) => a.status === "pending").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-wrap gap-2">
            {[
              "all",
              "pending",
              "approved",
              "rejected",
              "vendor",
              "blogger",
              "contentCreator",
            ].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === filterOption
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filterOption === "all"
                  ? "All Applications"
                  : filterOption === "contentCreator"
                  ? "Content Creators"
                  : filterOption.charAt(0).toUpperCase() +
                    filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <FiUser className="h-5 w-5 text-purple-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {app.name}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FiMail className="mr-1 h-3 w-3" />
                              {app.email}
                            </div>
                            {app.businessName && (
                              <div className="text-xs text-gray-400">
                                {app.businessName}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(
                            app.type
                          )}`}
                        >
                          {app.type === "contentCreator"
                            ? "Content Creator"
                            : app.type.charAt(0).toUpperCase() +
                              app.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1 h-3 w-3" />
                          {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setShowModal(true);
                            }}
                            className="text-purple-600 hover:text-purple-900 p-1"
                            title="View Details"
                          >
                            <FiEye />
                          </button>
                          {app.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateApplicationStatus(
                                    app._id,
                                    app.type,
                                    "approved"
                                  )
                                }
                                className="text-green-600 hover:text-green-900 p-1"
                                title="Approve"
                              >
                                <FiCheck />
                              </button>
                              <button
                                onClick={() =>
                                  updateApplicationStatus(
                                    app._id,
                                    app.type,
                                    "rejected"
                                  )
                                }
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Reject"
                              >
                                <FiX />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No applications found for the selected filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FiFileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {applications.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-yellow-600"></div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Pending</h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter((a) => a.status === "pending").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <FiCheck className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Approved</h3>
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter((a) => a.status === "approved").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <FiX className="h-4 w-4 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Rejected</h3>
                <p className="text-2xl font-bold text-red-600">
                  {applications.filter((a) => a.status === "rejected").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Application Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Name
                  </label>
                  <p className="text-gray-900">{selectedApp.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedApp.email}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Type
                  </label>
                  <p className="text-gray-900">
                    {selectedApp.type === "contentCreator"
                      ? "Content Creator"
                      : selectedApp.type.charAt(0).toUpperCase() +
                        selectedApp.type.slice(1)}
                  </p>
                </div>

                {selectedApp.businessName && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Business Name
                    </label>
                    <p className="text-gray-900">{selectedApp.businessName}</p>
                  </div>
                )}

                {selectedApp.website && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Website
                    </label>
                    <p className="text-gray-900">{selectedApp.website}</p>
                  </div>
                )}

                {selectedApp.socialMedia && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Social Media
                    </label>
                    <p className="text-gray-900">{selectedApp.socialMedia}</p>
                  </div>
                )}

                {selectedApp.experience && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Experience
                    </label>
                    <p className="text-gray-900">{selectedApp.experience}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <span
                    className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      selectedApp.status
                    )}`}
                  >
                    {selectedApp.status.charAt(0).toUpperCase() +
                      selectedApp.status.slice(1)}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Applied Date
                  </label>
                  <p className="text-gray-900">
                    {new Date(selectedApp.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedApp.status === "pending" && (
                <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                  <button
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApp._id,
                        selectedApp.type,
                        "rejected"
                      )
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApp._id,
                        selectedApp.type,
                        "approved"
                      )
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
