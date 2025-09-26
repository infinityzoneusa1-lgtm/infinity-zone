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
  FiMenu,
  FiX,
  FiBell,
  FiSearch,
} from "react-icons/fi";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminContent({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-pulse">
          <div className="h-16 bg-white/50 backdrop-blur-sm border-b border-gray-200/50"></div>
          <div className="flex">
            <div className="hidden md:block w-64 h-screen bg-white/50"></div>
            <div className="flex-1 p-6">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white/95 backdrop-blur-sm">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
                title="Close sidebar"
              >
                <FiX className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <SidebarContent
                navigation={navigation}
                pathname={pathname}
                user={user}
                handleLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white/95 backdrop-blur-sm border-r border-gray-200/70 shadow-xl">
          <SidebarContent
            navigation={navigation}
            pathname={pathname}
            user={user}
            handleLogout={handleLogout}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200/70 shadow-sm">
          <div className="px-3 py-3 md:px-6 md:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0 flex-1">
                <button
                  className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 mr-2"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar menu"
                  title="Open sidebar menu"
                >
                  <FiMenu className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
                  {getPageTitle(pathname)}
                </h1>
              </div>

              <div className="flex items-center space-x-2 md:space-x-3">
                {/* User dropdown */}
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.role === "super_admin" ? "Super Admin" : "Admin"}
                    </p>
                  </div>
                  <div className="h-7 w-7 md:h-8 md:w-8 bg-gradient-to-r from-[#450209] to-[#5a0a0d] rounded-full flex items-center justify-center">
                    <FiUser className="h-3 w-3 md:h-4 md:w-4 text-white" />
                  </div>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-2 md:px-3 py-1.5 md:py-2 border border-transparent text-xs md:text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#450209] to-[#5a0a0d] hover:from-[#350107] hover:to-[#450209] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#450209] transition-all duration-200 transform hover:scale-105"
                >
                  <FiLogOut className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="ml-1 md:ml-2 hidden sm:block">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-3 md:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

// Sidebar component
function SidebarContent({ navigation, pathname, user, handleLogout }: any) {
  return (
    <div className="flex flex-col flex-grow bg-white/95 backdrop-blur-sm border-r border-gray-200/70 shadow-xl">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-4 md:px-6 py-4 md:py-6 border-b border-gray-200/50">
        <img
          className="h-8 md:h-10 w-auto"
          src="/.jpg"
          alt="Infinity Zone"
        />
      </div>

      {/* Navigation */}
      <div className="mt-4 md:mt-6 flex-grow flex flex-col">
        <nav className="flex-1 px-3 md:px-4 space-y-1 md:space-y-2">
          {navigation.map((item: any) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 md:px-4 py-2 md:py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#450209] to-[#5a0a0d] text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:text-[#450209] hover:bg-gray-50 hover:transform hover:scale-105"
                }`}
              >
                <item.icon
                  className={`mr-3 md:mr-4 flex-shrink-0 h-4 w-4 md:h-5 md:w-5 transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-[#450209]"
                  }`}
                />
                <span className="font-medium text-sm md:text-base">
                  {item.name}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full opacity-75"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="flex-shrink-0 border-t border-gray-200/50 p-3 md:p-4">
          <div className="flex items-center">
            <div className="flex items-center flex-1 min-w-0">
              <div className="bg-gradient-to-r from-[#450209] to-[#5a0a0d] rounded-full p-2 md:p-3">
                <FiUser className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
              <div className="ml-2 md:ml-3 flex-1 min-w-0">
                <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role === "super_admin" ? "Super Admin" : "Admin"}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get page title
function getPageTitle(pathname: string): string {
  const pathSegments = pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  const titleMap: { [key: string]: string } = {
    dashboard: "Dashboard",
    products: "Products",
    applications: "Applications",
    "content-creators": "Content Creators",
    orders: "Orders",
    contacts: "Contacts",
    "admin-users": "Admin Users",
    settings: "Settings",
    add: "Add Product",
    edit: "Edit Product",
  };

  return titleMap[lastSegment] || "Admin Dashboard";
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
