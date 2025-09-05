"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiFileText,
  FiEye,
  FiTrash2,
  FiGlobe,
  FiBriefcase,
} from "react-icons/fi";

interface VendorApplication {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  businessName: string;
  businessType: string;
  experience: string;
  description: string;
  agreeToTerms: boolean;
  createdAt: string;
}

export default function AdminVendors() {
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] =
    useState<VendorApplication | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/vendors`
      );
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching vendor applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this vendor application?")
    ) {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
          }/api/vendors/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchApplications();
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error deleting vendor application:", error);
      }
    }
  };

  const openApplicationModal = (application: VendorApplication) => {
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
                Vendor Applications
              </h1>
              <p className="text-gray-600">
                Review and manage vendor partnership applications
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
                    Vendor Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Information
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience & Description
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
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <FiUser className="h-5 w-5 text-indigo-600" />
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
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            <FiBriefcase className="mr-1 h-3 w-3" />
                            {application.businessName}
                          </div>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 mt-1">
                            {application.businessType}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div className="font-medium">
                            Experience: {application.experience}
                          </div>
                          <div className="text-gray-500 max-w-xs truncate mt-1">
                            {application.description}
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
                      No vendor applications found
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
              <FiFileText className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Vendor Applications
                </h3>
                <p className="text-2xl font-bold text-indigo-600">
                  {applications.length}
                </p>
                <p className="text-sm text-gray-500">
                  Applications received from potential business partners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Vendor Application Details
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
                      Business Name
                    </label>
                    <p className="text-gray-900">
                      {selectedApplication.businessName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Business Type
                    </label>
                    <p className="text-gray-900">
                      {selectedApplication.businessType}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Experience Level
                  </label>
                  <p className="text-gray-900">
                    {selectedApplication.experience}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                    {selectedApplication.description}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Terms Agreement
                  </label>
                  <p className="text-gray-900">
                    {selectedApplication.agreeToTerms
                      ? "Agreed to terms"
                      : "Not agreed"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Application Date
                  </label>
                  <p className="text-gray-900">
                    {new Date(selectedApplication.createdAt).toLocaleString()}
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
