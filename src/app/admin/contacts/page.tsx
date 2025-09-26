"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiMail,
  FiCalendar,
  FiUser,
  FiPhone,
  FiMessageSquare,
  FiEye,
  FiTrash2,
} from "react-icons/fi";

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category?: string;
  priority?: string;
  status?: string;
  attachments?: Array<{
    filename: string;
    originalName?: string;
    url: string;
    size: number;
    mimeType: string;
  }>;
  createdAt: string;
  isRead?: boolean;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/contact`
      );
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/contact/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "read" }),
        }
      );

      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error("Error marking contact as read:", error);
    }
  };

  const deleteContact = async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this contact message?")
    ) {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
          }/api/contact/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchContacts();
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  const openContactModal = (contact: Contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    if (contact.status === "new") {
      markAsRead(contact._id);
    }
  };

  const unreadCount = contacts.filter((c) => c.status === "new").length;

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
              <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
              <p className="text-white/80">
                Manage and respond to customer inquiries
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <span className="text-white font-medium">
                Unread: {unreadCount}
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
                  Total Messages
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {contacts.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiMail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {unreadCount}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FiMessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Read</p>
                <p className="text-3xl font-bold text-green-600">
                  {
                    contacts.filter(
                      (c) =>
                        c.status === "read" ||
                        c.status === "responded" ||
                        c.status === "resolved"
                    ).length
                  }
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiUser className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
        {/* Messages Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Contact Messages
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                      className={`hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 cursor-pointer ${
                        contact.status === "new" ? "bg-blue-50" : ""
                      }`}
                      onClick={() => openContactModal(contact)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                contact.status === "new"
                                  ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                  : "bg-gradient-to-r from-[#450209] to-[#5a0a0d]"
                              }`}
                            >
                              <span className="text-white font-medium text-sm">
                                {contact.firstName
                                  ? contact.firstName[0].toUpperCase()
                                  : "N"}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div
                              className={`text-sm font-medium ${
                                contact.status === "new"
                                  ? "text-blue-900"
                                  : "text-gray-900"
                              }`}
                            >
                              {contact.firstName} {contact.lastName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FiMail className="mr-1 h-3 w-3" />
                              {contact.email}
                            </div>
                            {contact.phone && (
                              <div className="text-sm text-gray-500 flex items-center">
                                <FiPhone className="mr-1 h-3 w-3" />
                                {contact.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          <div className="font-medium">{contact.subject}</div>
                          <div className="text-gray-600">{contact.message}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            contact.status === "read" ||
                            contact.status === "responded" ||
                            contact.status === "resolved"
                              ? "bg-green-100 text-green-800"
                              : contact.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {contact.status === "new" ? "Unread" : contact.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                            className="text-[#450209] hover:text-[#5a0a0d] font-medium transition-colors duration-200"
                            title="View Message"
                          >
                            View
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteContact(contact._id);
                            }}
                            className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                            title="Delete Message"
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
                      No contact messages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Contact Details Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
              <h3 className="text-xl font-semibold text-gray-900">
                Contact Message Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors duration-200"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
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

                {selectedContact.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="text-gray-900">{selectedContact.phone}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Subject
                  </label>
                  <p className="text-gray-900">{selectedContact.subject}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Message
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                    {selectedContact.message}
                  </p>
                </div>

                {selectedContact.attachments &&
                  selectedContact.attachments.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Attachments
                      </label>
                      <div className="mt-2 space-y-2">
                        {selectedContact.attachments.map(
                          (attachment, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  <svg
                                    className="h-8 w-8 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {attachment.originalName ||
                                      attachment.filename}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {(attachment.size / 1024 / 1024).toFixed(2)}{" "}
                                    MB • {attachment.mimeType}
                                  </p>
                                </div>
                              </div>
                              <a
                                href={`${
                                  process.env.NEXT_PUBLIC_BACKEND_URL ||
                                  "http://localhost:10000"
                                }/${attachment.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Download
                              </a>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {selectedContact.category && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Category
                    </label>
                    <p className="text-gray-900 capitalize">
                      {selectedContact.category}
                    </p>
                  </div>
                )}

                {selectedContact.priority && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Priority
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedContact.priority === "urgent"
                          ? "bg-red-100 text-red-800"
                          : selectedContact.priority === "high"
                          ? "bg-orange-100 text-orange-800"
                          : selectedContact.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedContact.priority}
                    </span>
                  </div>
                )}

                {selectedContact.status && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedContact.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : selectedContact.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : selectedContact.status === "responded"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedContact.status}
                    </span>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Date Received
                  </label>
                  <p className="text-gray-900">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 p-6 border-t bg-white sticky bottom-0">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-all duration-200"
              >
                Close
              </button>
              <button
                onClick={() => deleteContact(selectedContact._id)}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 font-medium transition-all duration-200 shadow-lg"
              >
                Delete Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
