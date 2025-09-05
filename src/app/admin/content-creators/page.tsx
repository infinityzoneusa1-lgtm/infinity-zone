"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiEye,
  FiTrash2,
  FiGlobe,
  FiVideo,
} from "react-icons/fi";

interface ContentCreatorApplication {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  contentType: string;
  contentCategory: string;
  description: string;
  agreeToTerms: boolean;
  contentFile?: {
    filename: string;
    originalName: string;
    url: string;
    size: number;
    mimeType: string;
  };
  status?: string;
  createdAt: string;
}

export default function AdminContentCreators() {
  const [applications, setApplications] = useState<ContentCreatorApplication[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] =
    useState<ContentCreatorApplication | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/content-creators`
      );
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching content creator applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this content creator application?"
      )
    ) {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
          }/api/content-creators/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchApplications();
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error deleting content creator application:", error);
      }
    }
  };

  const openApplicationModal = (application: ContentCreatorApplication) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#450209]"></div>
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
              <Link
                href="/admin/dashboard"
                className="text-white/80 hover:text-white mb-2 inline-block transition-colors duration-200"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold mb-2">
                Content Creator Applications
              </h1>
              <p className="text-white/80">
                Review and manage content creator applications
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <span className="text-white font-medium">
                Total Applications: {applications.length}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Applications
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {applications.length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiVideo className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">
                  {
                    applications.filter((app) => app.status === "approved")
                      .length
                  }
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiUser className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {
                    applications.filter(
                      (app) => app.status === "pending" || !app.status
                    ).length
                  }
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FiCalendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Content Creator Applications
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Creator Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                {applications.length > 0 ? (
                  applications.map((application) => (
                    <tr
                      key={application._id}
                      className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 cursor-pointer"
                      onClick={() => openApplicationModal(application)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#450209] to-[#5a0a0d] flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {application.firstName
                                  ? application.firstName[0].toUpperCase()
                                  : "N"}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.firstName} {application.lastName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FiMail className="mr-1 h-3 w-3" />
                              {application.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FiPhone className="mr-1 h-3 w-3" />
                              {application.phone}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FiGlobe className="mr-1 h-3 w-3" />
                              {application.country}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {application.contentType}
                          </span>
                          <div className="text-sm text-gray-500 mt-1">
                            Category: {application.contentCategory}
                          </div>
                          {application.contentFile && (
                            <div className="mt-1">
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                <FiVideo className="mr-1 h-3 w-3" />
                                File Attached
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            application.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : application.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {application.status || "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1 h-3 w-3" />
                          {new Date(application.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openApplicationModal(application);
                            }}
                            className="text-[#450209] hover:text-[#5a0a0d] font-medium transition-colors duration-200"
                            title="View Details"
                          >
                            View
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteApplication(application._id);
                            }}
                            className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                            title="Delete Application"
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
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No content creator applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-2xl rounded-2xl bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Content Creator Application Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors duration-200"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      First Name
                    </label>
                    <p className="text-gray-900">
                      {selectedApplication.firstName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Last Name
                    </label>
                    <p className="text-gray-900">
                      {selectedApplication.lastName}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedApplication.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="text-gray-900">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Country
                    </label>
                    <p className="text-gray-900">
                      {selectedApplication.country}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Content Type
                    </label>
                    <p className="text-gray-900">
                      {selectedApplication.contentType}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Content Category
                    </label>
                    <p className="text-gray-900">
                      {selectedApplication.contentCategory}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Content File
                  </label>
                  {selectedApplication.contentFile ? (
                    <div className="text-gray-900 bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p>
                          <strong>Filename:</strong>{" "}
                          {selectedApplication.contentFile.filename}
                        </p>
                        <p>
                          <strong>Original Name:</strong>{" "}
                          {selectedApplication.contentFile.originalName}
                        </p>
                        <p>
                          <strong>Size:</strong>{" "}
                          {(
                            selectedApplication.contentFile.size /
                            1024 /
                            1024
                          ).toFixed(2)}{" "}
                          MB
                        </p>
                        <p>
                          <strong>Type:</strong>{" "}
                          {selectedApplication.contentFile.mimeType}
                        </p>
                      </div>
                      {selectedApplication.contentFile.url && (
                        <div className="mt-3">
                          <a
                            href={selectedApplication.contentFile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <FiEye className="mr-1 h-4 w-4" />
                            View/Download File
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 bg-gray-50 p-4 rounded-md">
                      No file uploaded
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                    {selectedApplication.description ||
                      "No description provided"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Terms Agreement
                  </label>
                  <p className="text-gray-900">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedApplication.agreeToTerms
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedApplication.agreeToTerms
                        ? "✓ Agreed to terms"
                        : "✗ Not agreed"}
                    </span>
                  </p>
                </div>

                {selectedApplication.status && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Application Status
                    </label>
                    <p className="text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedApplication.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : selectedApplication.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {selectedApplication.status.charAt(0).toUpperCase() +
                          selectedApplication.status.slice(1)}
                      </span>
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Application Date
                  </label>
                  <p className="text-gray-900">
                    {new Date(selectedApplication.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Application ID
                  </label>
                  <p className="text-gray-900 font-mono text-sm bg-gray-50 p-2 rounded">
                    {selectedApplication._id}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-all duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => deleteApplication(selectedApplication._id)}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 font-medium transition-all duration-200 shadow-lg"
                >
                  Delete Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
