"use client";

import {
  Search,
  Phone,
  Menu,
  X,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/contexts/cart-context";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const {
    cartItems,
    getTotalItems,
    getTotalPrice,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const cartDropdownRef = useRef<HTMLDivElement>(null);

  // Close cart dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCartDropdownOpen(false);
      }
    }

    if (isCartDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartDropdownOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 relative">
      <div className="container mx-auto px-4 py-2 md:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <Image
                src="/web-logo.png"
                alt="Infinity Zone Logo"
                width={200}
                height={60}
                className="h-12 md:h-16 lg:h-20 w-auto object-contain cursor-pointer"
              />
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              href="/"
              className="text-gray-700 transition-colors font-medium text-sm tracking-wide hover:text-[#450209]"
            >
              HOME
            </Link>
            <Link
              href="/about"
              className="text-gray-700 transition-colors font-medium text-sm tracking-wide hover:text-[#450209]"
            >
              ABOUT
            </Link>
            <Link
              href="/shop"
              className="text-gray-700 transition-colors font-medium text-sm tracking-wide hover:text-[#450209]"
            >
              SHOP
            </Link>
            <div className="relative group">
              <Link
                href="/services"
                className="text-gray-700 transition-colors font-medium text-sm tracking-wide flex items-center hover:text-[#450209]"
              >
                SERVICES
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-colors"
                  >
                    Our Services
                  </Link>
                  <Link
                    href="/internship"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-colors"
                  >
                    Internship Program
                  </Link>
                  <Link
                    href="/become-blogger"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-colors"
                  >
                    Become a Blogger
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="text-gray-700 transition-colors font-medium text-sm tracking-wide hover:text-[#450209]"
            >
              CONTACT
            </Link>
            <Link
              href="/content-creator"
              className="text-gray-700 transition-colors font-medium text-sm tracking-wide hover:text-[#450209]"
            >
              CONTENT CREATOR
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Cart Icon with Dropdown - Desktop */}
            <div className="relative hidden md:block" ref={cartDropdownRef}>
              <Button
                variant="ghost"
                size="icon"
                className="p-2 relative"
                onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>

              {/* Cart Dropdown */}
              {isCartDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Shopping Cart
                    </h3>

                    {cartItems.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">
                        No items in cart
                      </p>
                    ) : (
                      <>
                        <div className="max-h-60 overflow-y-auto space-y-3">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-3 p-2 border border-gray-100 rounded"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  ${item.price}
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-1 hover:bg-gray-100 rounded text-red-600 ml-2"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-gray-200 mt-3 pt-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold">
                              Total: ${getTotalPrice().toFixed(2)}
                            </span>
                          </div>
                          <Link href="/checkout">
                            <Button
                              className="w-full bg-primary hover:bg-primary/90 text-white"
                              onClick={() => setIsCartDropdownOpen(false)}
                            >
                              Pay Now
                            </Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Search - Desktop/Tablet */}
            {/**
            <div className="hidden md:flex items-center relative">
              <Input
                placeholder="Search for products..."
                className="w-48 lg:w-64 xl:w-80 pr-10 border-gray-300 rounded-full bg-gray-50 focus:bg-white text-sm"
                style={{ borderColor: "#450209" }}
              />
              <Button
                size="sm"
                className="absolute right-1 rounded-full h-7 w-7 lg:h-8 lg:w-8 p-0"
                style={{ backgroundColor: "#450209" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#350107")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#450209")
                }
              >
                <Search className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </Button>
            </div>

           // Search - Mobile  
            <Button variant="ghost" size="icon" className="md:hidden p-2">
              <Search className="w-5 h-5 text-gray-700" />
            </Button>
            */}
            {/* Cart Icon - Mobile */}
            <Link href={"/checkout"}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden bg-primary p-2 relative"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            {/* Call info - Desktop only */}
            <div className="hidden xl:flex items-center space-x-2 text-gray-700">
              <Phone className="w-4 h-4" />
              <div className="flex flex-col">
                <span className="text-xs font-medium">Call us 24/7</span>
                <span className="text-sm font-bold">+08 9229 8228</span>
              </div>
            </div>

            {/* Phone - Tablet only */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex xl:hidden p-2"
            >
              <Phone className="w-5 h-5 text-gray-700" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="text-gray-700 font-medium text-base hover:text-[#450209] transition-colors"
                >
                  HOME
                </Link>
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="text-gray-700 font-medium text-base hover:text-[#450209] transition-colors"
                >
                  ABOUT
                </Link>

                {/* Mobile Services with Dropdown */}
                <div className="space-y-2">
                  <button
                    onClick={() =>
                      setIsMobileServicesOpen(!isMobileServicesOpen)
                    }
                    className="flex items-center justify-between w-full text-left text-gray-700 font-medium text-base hover:text-[#450209] transition-colors"
                  >
                    SERVICES
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isMobileServicesOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isMobileServicesOpen && (
                    <div className="pl-4 space-y-2">
                      <Link
                        href="/services"
                        onClick={closeMobileMenu}
                        className="block text-gray-600 font-medium text-sm hover:text-[#450209] transition-colors"
                      >
                        Our Services
                      </Link>
                      <Link
                        href="/internship"
                        onClick={closeMobileMenu}
                        className="block text-gray-600 font-medium text-sm hover:text-[#450209] transition-colors"
                      >
                        Internship Program
                      </Link>
                      <Link
                        href="/become-blogger"
                        onClick={closeMobileMenu}
                        className="block text-gray-600 font-medium text-sm hover:text-[#450209] transition-colors"
                      >
                        Become a Blogger
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="text-gray-700 font-medium text-base hover:text-[#450209] transition-colors"
                >
                  CONTACT
                </Link>
                <Link
                  href="/content-creator"
                  onClick={closeMobileMenu}
                  className="text-gray-700 font-medium text-base hover:text-[#450209] transition-colors"
                >
                  CONTENT CREATOR
                </Link>

                {/** Mobile Search
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center relative">
                    <Input
                      placeholder="Search for products..."
                      className="w-full pr-10 border-gray-300 rounded-full bg-gray-50 focus:bg-white"
                      style={{ borderColor: "#450209" }}
                    />
                    <Button
                      size="sm"
                      className="absolute right-1 rounded-full h-8 w-8 p-0"
                      style={{ backgroundColor: "#450209" }}
                    >
                      <Search className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </div>
                */}

                {/* Mobile Contact */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Phone className="w-5 h-5" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Call us 24/7</span>
                      <span className="text-base font-bold">+08 9229 8228</span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
