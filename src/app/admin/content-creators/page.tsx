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
        "http://localhost:5000/api/content-creators"
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
          `http://localhost:5000/api/content-creators/${id}`,
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
                Content Creator Applications
              </h1>
              <p className="text-gray-600">
                Review and manage content creator applications
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 px-4 py-2 rounded-md">
                <span className="text-blue-800 font-medium">
                  Total: {applications.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Applications Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Creator Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content Info & Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description & File
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
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => openApplicationModal(application)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FiUser className="h-5 w-5 text-blue-600" />
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
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {application.contentType}
                          </span>
                          <div className="text-sm text-gray-500 mt-1">
                            Category: {application.contentCategory}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {application.contentFile && (
                            <div className="mb-2">
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                <FiVideo className="mr-1 h-3 w-3" />
                                {application.contentFile.originalName ||
                                  "File Attached"}
                              </span>
                              <div className="text-xs text-gray-400 mt-1">
                                {(
                                  application.contentFile.size /
                                  1024 /
                                  1024
                                ).toFixed(2)}{" "}
                                MB
                              </div>
                            </div>
                          )}
                          <div className="text-gray-500 max-w-xs">
                            <p
                              className="truncate"
                              title={application.description}
                            >
                              {application.description ||
                                "No description provided"}
                            </p>
                            {application.status && (
                              <span
                                className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  application.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : application.status === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {application.status.charAt(0).toUpperCase() +
                                  application.status.slice(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                            className="text-purple-600 hover:text-purple-900 p-1"
                            title="View Details"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteApplication(application._id);
                            }}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Application"
                          >
                            <FiTrash2 />
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

        {/* Summary Card */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FiVideo className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Content Creator Applications
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {applications.length}
                </p>
                <p className="text-sm text-gray-500">
                  Applications received from content creators
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Content Creator Application Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
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

              <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => deleteApplication(selectedApplication._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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
