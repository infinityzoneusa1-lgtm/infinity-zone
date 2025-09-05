"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMessageSquare,
  FiEye,
  FiTrash2,
} from "react-icons/fi";

interface ProfessionalContact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  professionalId: string;
  serviceType: string;
  message: string;
  status: string;
  urgency: string;
  preferredContactMethod: string;
  agreeToTerms: boolean;
  createdAt: string;
}

export default function AdminProfessionalContacts() {
  const [contacts, setContacts] = useState<ProfessionalContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] =
    useState<ProfessionalContact | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/professionals`
      );
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Error fetching professional contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this professional contact?"
      )
    ) {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
          }/api/professionals/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchContacts();
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error deleting professional contact:", error);
      }
    }
  };

  const openContactModal = (contact: ProfessionalContact) => {
    setSelectedContact(contact);
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
                Professional Contacts
              </h1>
              <p className="text-gray-600">
                Contacts for professional consultations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 px-4 py-2 rounded-md">
                <span className="text-blue-800 font-medium">
                  Total: {contacts.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contacts Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Professional & Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <tr
                      key={contact._id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => openContactModal(contact)}
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
                              {contact.firstName} {contact.lastName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FiMail className="mr-1 h-3 w-3" />
                              {contact.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FiPhone className="mr-1 h-3 w-3" />
                              {contact.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {contact.professionalId}
                          </span>
                          {contact.serviceType && (
                            <div className="text-xs text-gray-500">
                              {contact.serviceType}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {contact.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1 h-3 w-3" />
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openContactModal(contact);
                            }}
                            className="text-purple-600 hover:text-purple-900 p-1"
                            title="View Details"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteContact(contact._id);
                            }}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Contact"
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
                      No professional contacts found
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
              <FiMessageSquare className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Professional Contacts
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {contacts.length}
                </p>
                <p className="text-sm text-gray-500">
                  Professional consultation requests and contacts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Details Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Professional Contact Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Name
                  </label>
                  <p className="text-gray-900">
                    {selectedContact.firstName} {selectedContact.lastName}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedContact.email}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="text-gray-900">{selectedContact.phone}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Professional & Service
                  </label>
                  <p className="text-gray-900">
                    Professional: {selectedContact.professionalId}
                    {selectedContact.serviceType && (
                      <span className="block text-sm text-gray-600">
                        Service: {selectedContact.serviceType}
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status & Urgency
                  </label>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {selectedContact.status}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedContact.urgency === "urgent"
                          ? "bg-red-100 text-red-800"
                          : selectedContact.urgency === "high"
                          ? "bg-orange-100 text-orange-800"
                          : selectedContact.urgency === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedContact.urgency}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Preferred Contact Method
                  </label>
                  <p className="text-gray-900">
                    {selectedContact.preferredContactMethod}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Message
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                    {selectedContact.message}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Date Received
                  </label>
                  <p className="text-gray-900">
                    {new Date(selectedContact.createdAt).toLocaleString()}
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
                  onClick={() => deleteContact(selectedContact._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
