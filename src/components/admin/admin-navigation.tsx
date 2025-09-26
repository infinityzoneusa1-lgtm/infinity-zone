"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiFileText,
  FiMail,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: FiHome },
  { name: "Products", href: "/admin/products", icon: FiShoppingBag },
  { name: "Users", href: "/admin/users", icon: FiUsers },
  { name: "Applications", href: "/admin/applications", icon: FiFileText },
  { name: "Contact Messages", href: "/admin/contacts", icon: FiMail },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <div className="bg-white shadow-sm border-r min-h-screen w-64 fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link href="/admin/dashboard" className="flex items-center">
          <img src="/.jpg" alt="Infinity Zone" className="h-8 w-auto" />
          <span className="ml-2 text-xl font-bold text-gray-900">Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <div className="px-3 space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-purple-100 text-purple-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive
                      ? "text-purple-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t">
          <div className="space-y-1">
            <Link
              href="/admin/settings"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <FiSettings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Settings
            </Link>
            <Link
              href="/"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <FiLogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Back to Site
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
