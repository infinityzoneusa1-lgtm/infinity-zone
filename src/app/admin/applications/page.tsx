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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-wrap gap-2">
            {["all", "vendor", "blogger", "contentCreator"].map(
              (filterOption) => (
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
              )
            )}
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
                    Applied
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1 h-3 w-3" />
                          {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
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
