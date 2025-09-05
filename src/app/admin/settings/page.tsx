"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiSave,
  FiMail,
  FiCamera,
} from "react-icons/fi";
import Image from "next/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000";

export default function SettingsPage() {
  const { user, logout, updateUser } = useAuth();
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Profile form state
  const [profileData, setProfileData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Initialize profile data when user loads
  useEffect(() => {
    if (user) {
      setProfileData({
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, [user]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/auth/users/${user?.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: profileData.email,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Profile updated successfully!");

        // Update user context with new data
        updateUser({
          email: profileData.email,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
        });
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      setPasswordLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      setPasswordLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/auth/change-password`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password updated successfully! Please login again.");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        // Logout user after successful password change
        setTimeout(() => {
          logout();
        }, 2000);
      } else {
        setError(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Password update error:", error);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-3 md:px-6 lg:px-8 py-6 md:py-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#450209] to-[#5a0a0d] rounded-2xl shadow-xl p-4 md:p-8 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Settings</h1>
              <p className="text-white/80 text-sm md:text-base">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 md:px-6 py-2 md:py-3">
              <span className="text-white font-medium text-sm md:text-base">
                {user?.role === "super_admin" ? "Super Admin" : "Admin"}
              </span>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 shadow-lg">
            <p className="text-sm text-green-600 font-medium">{success}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow-lg">
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          {/* Profile Information */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <div className="mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center">
                <FiUser className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Profile Information
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                Update your email and personal details
              </p>
            </div>

            <form
              onSubmit={handleProfileUpdate}
              className="space-y-3 md:space-y-4"
            >
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiMail className="inline mr-1 h-3 w-3 md:h-4 md:w-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent text-sm md:text-base"
                  required
                />
              </div>

              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent text-sm md:text-base"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                  className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent text-sm md:text-base"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={profileLoading}
                className="w-full flex items-center justify-center px-4 py-2 md:py-3 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-[#450209] to-[#5a0a0d] hover:from-[#5a0a0d] hover:to-[#450209] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#450209] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {profileLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <FiSave className="mr-2 h-4 w-4" />
                )}
                Update Profile
              </button>
            </form>
          </div>

          {/* Password Change */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <div className="mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center">
                <FiLock className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Change Password
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                Update your password to keep your account secure
              </p>
            </div>

            <form
              onSubmit={handlePasswordUpdate}
              className="space-y-3 md:space-y-4"
            >
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiLock className="inline mr-1 h-3 w-3 md:h-4 md:w-4" />
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 md:py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent text-sm md:text-base"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPasswords.current ? (
                      <FiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 md:py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent text-sm md:text-base"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPasswords.new ? (
                      <FiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 md:py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent text-sm md:text-base"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPasswords.confirm ? (
                      <FiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full flex items-center justify-center px-4 py-2 md:py-3 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-[#450209] to-[#5a0a0d] hover:from-[#5a0a0d] hover:to-[#450209] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#450209] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {passwordLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <FiLock className="mr-2 h-4 w-4" />
                )}
                Update Password
              </button>
            </form>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gray-50 rounded-xl p-3 md:p-4">
              <label className="block text-xs md:text-sm font-medium text-gray-500">
                Username
              </label>
              <p className="mt-1 text-base md:text-lg font-medium text-gray-900">
                @{user?.username}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 md:p-4">
              <label className="block text-xs md:text-sm font-medium text-gray-500">
                Role
              </label>
              <p className="mt-2">
                <span
                  className={`inline-flex items-center px-2 md:px-3 py-1 text-xs md:text-sm font-medium rounded-full ${
                    user?.role === "super_admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {user?.role === "super_admin" ? "Super Admin" : "Admin"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
