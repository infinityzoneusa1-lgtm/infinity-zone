"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiUser, FiMail, FiCalendar } from "react-icons/fi";

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

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const [vendorRes, bloggerRes, creatorRes] = await Promise.all([
        fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
          }/api/vendors`
        ),
        fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
          }/api/bloggers`
        ),
        fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
          }/api/content-creators`
        ),
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

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.type === filter;
  });

  // Calculate stats
  const totalApplications = applications.length;
  const vendorCount = applications.filter(
    (app) => app.type === "vendor"
  ).length;
  const bloggerCount = applications.filter(
    (app) => app.type === "blogger"
  ).length;
  const contentCreatorCount = applications.filter(
    (app) => app.type === "contentCreator"
  ).length;

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

  const handleViewApplication = (application: Application) => {
    // For now, we'll just show an alert with the application details
    // This can be replaced with a modal or detail view later
    alert(`Application Details:
Name: ${application.name}
Email: ${application.email}
Type: ${application.type}
Status: ${application.status}
Business Name: ${application.businessName || "N/A"}
Created: ${new Date(application.createdAt).toLocaleDateString()}`);
  };

  const handleUpdateStatus = async (
    applicationId: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      // Find the application to determine its type
      const application = applications.find((app) => app._id === applicationId);
      if (!application) return;

      let endpoint = "";
      switch (application.type) {
        case "vendor":
          endpoint = "vendors";
          break;
        case "blogger":
          endpoint = "bloggers";
          break;
        case "contentCreator":
          endpoint = "content-creators";
          break;
      }

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/${endpoint}/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        // Update the application status in the local state
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        alert(`Application ${newStatus} successfully!`);
      } else {
        alert("Failed to update application status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating application status");
    }
  };

  const handleDeleteApplication = async (applicationId: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      // Find the application to determine its type
      const application = applications.find((app) => app._id === applicationId);
      if (!application) return;

      let endpoint = "";
      switch (application.type) {
        case "vendor":
          endpoint = "vendors";
          break;
        case "blogger":
          endpoint = "bloggers";
          break;
        case "contentCreator":
          endpoint = "content-creators";
          break;
      }

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/${endpoint}/${applicationId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the application from the local state
        setApplications((prev) =>
          prev.filter((app) => app._id !== applicationId)
        );
        alert("Application deleted successfully!");
      } else {
        alert("Failed to delete application");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Error deleting application");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#450209] to-[#5a0a0d] rounded-2xl shadow-xl p-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Application Management
              </h1>
              <p className="text-white/80">
                Review and manage vendor, blogger, and content creator
                applications
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <span className="text-white font-medium">
                Total Applications: {totalApplications}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Vendor Applications
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {vendorCount}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiUser className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Blogger Applications
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {bloggerCount}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiMail className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Content Creator Applications
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {contentCreatorCount}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiCalendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            {["all", "vendor", "blogger", "contentCreator"].map(
              (filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === filterOption
                      ? "bg-gradient-to-r from-[#450209] to-[#5a0a0d] text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  {filterOption === "all"
                    ? "All Applications"
                    : filterOption === "contentCreator"
                    ? "Content Creators"
                    : filterOption.charAt(0).toUpperCase() +
                      filterOption.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {filter === "all"
                ? "All Applications"
                : filter === "vendor"
                ? "Vendor Applications"
                : filter === "blogger"
                ? "Blogger Applications"
                : "Content Creator Applications"}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#450209] to-[#5a0a0d] flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {app.name ? app.name[0].toUpperCase() : "N"}
                              </span>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1 h-3 w-3" />
                          {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewApplication(app)}
                            className="text-[#450209] hover:text-[#5a0a0d] font-medium transition-colors duration-200"
                          >
                            View
                          </button>
                          {/* <button
                            onClick={() =>
                              handleUpdateStatus(app._id, "approved")
                            }
                            className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(app._id, "rejected")
                            }
                            className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                          >
                            Reject
                          </button> */}
                          <button
                            onClick={() => handleDeleteApplication(app._id)}
                            className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
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
      </div>
    </div>
  );
}
