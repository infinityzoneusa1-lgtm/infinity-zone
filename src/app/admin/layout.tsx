"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { ProtectedRoute } from "@/components/admin/protected-route";
import {
  FiHome,
  FiPackage,
  FiShoppingBag,
  FiMail,
  FiFileText,
  FiSettings,
  FiVideo,
  FiLogOut,
  FiUser,
  FiUsers,
} from "react-icons/fi";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminContent({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: FiHome },
    { name: "Products", href: "/admin/products", icon: FiPackage },
    { name: "Applications", href: "/admin/applications", icon: FiFileText },
    {
      name: "Content Creators",
      href: "/admin/content-creators",
      icon: FiVideo,
    },
    { name: "Orders", href: "/admin/orders", icon: FiShoppingBag },
    { name: "Contacts", href: "/admin/contacts", icon: FiMail },
    ...(user?.role === "super_admin"
      ? [{ name: "Admin Users", href: "/admin/admin-users", icon: FiUsers }]
      : []),
    { name: "Settings", href: "/admin/settings", icon: FiSettings },
  ];

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="/web-logo.png"
                alt="Infinity Zone"
              />
              {/* <span className="ml-2 text-xl font-bold text-gray-900">
                Admin
              </span> */}
            </div>
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-8 w-auto"
              src="/web-logo.png"
              alt="Infinity Zone"
            />
            {/* <span className="ml-2 text-xl font-bold text-gray-900">Admin</span> */}
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-blue-100 text-blue-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActive
                          ? "text-blue-500"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User info and logout */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div className="flex items-center flex-1">
                  <div className="bg-red-100 rounded-full p-2">
                    <FiUser className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.role === "super_admin" ? "Super Admin" : "Admin"} •{" "}
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-3 flex-shrink-0 p-2 rounded-md text-gray-400 hover:text-red-600 hover:bg-gray-100 transition-colors"
                  title="Logout"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-medium text-gray-900">
                Admin Dashboard
              </h1>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FiLogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  // Don't wrap login page with auth
  if (pathname === "/admin/login") {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return (
    <AuthProvider>
      <ProtectedRoute>
        <AdminContent>{children}</AdminContent>
      </ProtectedRoute>
    </AuthProvider>
  );
}
