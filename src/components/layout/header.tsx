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
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/70 sticky top-0 z-40 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="group transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="/web-logo.png"
                alt="Infinity Zone"
                width={200}
                height={60}
                className="h-12 md:h-14 lg:h-16 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className="relative px-4 py-2 text-gray-700 transition-all duration-200 font-medium text-sm xl:text-base tracking-wide rounded-lg hover:text-[#450209] hover:bg-gray-50 group"
            >
              <span className="relative z-10">HOME</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#450209] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link
              href="/about"
              className="relative px-4 py-2 text-gray-700 transition-all duration-200 font-medium text-sm xl:text-base tracking-wide rounded-lg hover:text-[#450209] hover:bg-gray-50 group"
            >
              <span className="relative z-10">ABOUT</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#450209] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link
              href="/shop"
              className="relative px-4 py-2 text-gray-700 transition-all duration-200 font-medium text-sm xl:text-base tracking-wide rounded-lg hover:text-[#450209] hover:bg-gray-50 group"
            >
              <span className="relative z-10">SHOP</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#450209] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>

            {/* Enhanced Services Dropdown */}
            <div className="relative group">
              <Link
                href="/services"
                className="relative px-4 py-2 text-gray-700 transition-all duration-200 font-medium text-sm xl:text-base tracking-wide rounded-lg hover:text-[#450209] hover:bg-gray-50 flex items-center group/link"
              >
                <span className="relative z-10">SERVICES</span>
                <svg
                  className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
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
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#450209] transition-all duration-300 group-hover/link:w-full group-hover/link:left-0"></span>
              </Link>

              {/* Enhanced Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-sm border border-gray-200/70 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                <div className="py-3">
                  <Link
                    href="/services"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-all duration-200 group/item"
                  >
                    <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                    <span>Our Services</span>
                  </Link>
                  <Link
                    href="/internship"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-all duration-200 group/item"
                  >
                    <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                    <span>Internship Program</span>
                  </Link>
                  <Link
                    href="/become-blogger"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-all duration-200 group/item"
                  >
                    <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                    <span>Become a Blogger</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="relative px-4 py-2 text-gray-700 transition-all duration-200 font-medium text-sm xl:text-base tracking-wide rounded-lg hover:text-[#450209] hover:bg-gray-50 group"
            >
              <span className="relative z-10">CONTACT</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#450209] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link
              href="/content-creator"
              className="relative px-4 py-2 text-gray-700 transition-all duration-200 font-medium text-sm xl:text-base tracking-wide rounded-lg hover:text-[#450209] hover:bg-gray-50 group"
            >
              <span className="relative z-10">CONTENT CREATOR</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#450209] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Enhanced Cart Icon with Dropdown - Desktop */}
            <div className="relative hidden md:block" ref={cartDropdownRef}>
              <Button
                variant="ghost"
                size="icon"
                className="relative p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
              >
                <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-[#450209] transition-colors duration-200" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </Button>

              {/* Enhanced Cart Dropdown */}
              {isCartDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-96 bg-white/95 backdrop-blur-sm border border-gray-200/70 rounded-xl shadow-xl z-50 transform transition-all duration-300">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        Shopping Cart
                      </h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {getTotalItems()}{" "}
                        {getTotalItems() === 1 ? "item" : "items"}
                      </span>
                    </div>

                    {cartItems.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Your cart is empty</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Add some products to get started
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-64 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow duration-200"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-14 h-14 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.title}
                                </p>
                                <p className="text-sm text-[#450209] font-semibold">
                                  ${item.price}
                                </p>
                              </div>
                              <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="p-1 hover:bg-white rounded transition-colors duration-150"
                                >
                                  <Minus className="w-3 h-3 text-gray-600" />
                                </button>
                                <span className="text-sm w-8 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="p-1 hover:bg-white rounded transition-colors duration-150"
                                >
                                  <Plus className="w-3 h-3 text-gray-600" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 hover:bg-red-50 rounded transition-colors duration-150 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-gray-200 mt-4 pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-gray-900">
                              Total:
                            </span>
                            <span className="text-xl font-bold text-[#450209]">
                              ${getTotalPrice().toFixed(2)}
                            </span>
                          </div>
                          <Link href="/checkout">
                            <Button
                              className="w-full bg-gradient-to-r from-[#450209] to-[#5a0a0d] hover:from-[#350107] hover:to-[#450209] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                              onClick={() => setIsCartDropdownOpen(false)}
                            >
                              Proceed to Checkout
                            </Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Cart Icon - Mobile */}
            <Link href={"/checkout"}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden bg-gradient-to-r from-[#450209] to-[#5a0a0d] hover:from-[#350107] hover:to-[#450209] p-2 relative rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Enhanced Call info - Desktop only */}
            <div className="hidden xl:flex items-center space-x-3 text-gray-700 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="p-2 bg-[#450209] rounded-lg">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500">
                  Call us 24/7
                </span>
                <span className="text-sm font-bold text-[#450209]">
                  +08 9229 8228
                </span>
              </div>
            </div>

            {/* Enhanced Phone - Tablet only */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex xl:hidden p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              <Phone className="w-5 h-5 text-gray-700 hover:text-[#450209]" />
            </Button>

            {/* Enhanced Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200/70 shadow-xl z-50 animate-in slide-in-from-top-2 duration-300">
            <nav className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-1">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 font-medium text-base hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-1 h-6 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  HOME
                </Link>
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 font-medium text-base hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-1 h-6 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  ABOUT
                </Link>
                <Link
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 font-medium text-base hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-1 h-6 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  SHOP
                </Link>

                {/* Enhanced Mobile Services with Dropdown */}
                <div className="space-y-1">
                  <button
                    onClick={() =>
                      setIsMobileServicesOpen(!isMobileServicesOpen)
                    }
                    className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 font-medium text-base hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <div className="w-1 h-6 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      SERVICES
                    </div>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
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
                    <div className="ml-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
                      <Link
                        href="/services"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-2 text-gray-600 font-medium text-sm hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        Our Services
                      </Link>
                      <Link
                        href="/internship"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-2 text-gray-600 font-medium text-sm hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        Internship Program
                      </Link>
                      <Link
                        href="/become-blogger"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-2 text-gray-600 font-medium text-sm hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        Become a Blogger
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 font-medium text-base hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-1 h-6 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  CONTACT
                </Link>
                <Link
                  href="/content-creator"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 font-medium text-base hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-1 h-6 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  CONTENT CREATOR
                </Link>

                {/* Enhanced Mobile Contact */}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-gray-700 bg-gray-50 px-4 py-3 rounded-lg">
                    <div className="p-2 bg-[#450209] rounded-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">
                        Call us 24/7
                      </span>
                      <span className="text-base font-bold text-[#450209]">
                        +08 9229 8228
                      </span>
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
