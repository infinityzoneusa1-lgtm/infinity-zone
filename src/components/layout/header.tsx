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
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect, useRef } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const { state, dispatch } = useCart();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/70 sticky top-0 z-40 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 py-2">
            <Link
              href="/"
              className="group transition-transform duration-200 hover:scale-105"
            >
              <img
                src="/main-logo.png"
                alt="Infinity Zone"
                className="h-14 w-auto object-contain block opacity-100 visible"
                draggable={false}
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
              <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-sm border border-gray-200/70 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                <div className="py-3">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    Our Services
                  </div>
                  <Link
                    href="/services"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-all duration-200 group/item"
                  >
                    <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                    <span>Professional Services</span>
                  </Link>
                  <Link
                    href="/professionals"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-all duration-200 group/item"
                  >
                    <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                    <span>Find Professionals</span>
                  </Link>
                  
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 mt-2">
                    Partnership Programs
                  </div>
                  <Link
                    href="/vendor-app"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-all duration-200 group/item"
                  >
                    <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                    <span>Become a Vendor</span>
                  </Link>
                  <Link
                    href="/affiliates"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-all duration-200 group/item"
                  >
                    <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                    <span>Affiliate Program</span>
                  </Link>
                  
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 mt-2">
                    Content & Careers
                  </div>
                  <Link
                    href="/become-blogger"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-all duration-200 group/item"
                  >
                    <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                    <span>Blogger Program</span>
                  </Link>
                  <Link
                    href="/content-creator"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-all duration-200 group/item"
                  >
                    <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                    <span>Content Creator</span>
                  </Link>
                  <Link
                    href="/internship"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#450209] transition-all duration-200 group/item"
                  >
                    <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                    <span>Internship Program</span>
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
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Enhanced Cart Icon with Dropdown - Desktop */}
            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                className="relative p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              >
                <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-[#450209] transition-colors duration-200" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                    {state.items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>


            </div>

            {/* Enhanced Cart Icon - Mobile */}
            <Link href={"/checkout"}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden bg-gradient-to-r from-[#450209] to-[#5a0a0d] hover:from-[#350107] hover:to-[#450209] p-2 relative rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                    {state.items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </Link>

            {/* Enhanced Call info - Desktop only */}
            <a
              href="tel:+12136529099"
              className="hidden xl:flex items-center space-x-3 text-gray-700 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              <div className="p-2 bg-[#450209] rounded-lg">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500">
                  Call us 24/7
                </span>
                <span className="text-sm font-bold text-[#450209]">
                  +1 (213) 652-9099
                </span>
              </div>
            </a>

            {/* Enhanced Phone - Tablet only */}
            <a href="tel:+12136529099" aria-label="Call us at +1 213 652 9099">
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex xl:hidden p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <Phone className="w-5 h-5 text-gray-700 hover:text-[#450209]" />
              </Button>
            </a>

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
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Our Services
                      </div>
                      <Link
                        href="/services"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-2 text-gray-600 font-medium text-sm hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        Professional Services
                      </Link>
                      <Link
                        href="/professionals"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-2 text-gray-600 font-medium text-sm hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        Find Professionals
                      </Link>
                      
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-3">
                        Partnership Programs
                      </div>
                      <Link
                        href="/vendor-app"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-2 text-gray-600 font-medium text-sm hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        Become a Vendor
                      </Link>
                      <Link
                        href="/affiliates"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-2 text-gray-600 font-medium text-sm hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        Affiliate Program
                      </Link>
                      
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-3">
                        Content & Careers
                      </div>
                      <Link
                        href="/become-blogger"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-2 text-gray-600 font-medium text-sm hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        Blogger Program
                      </Link>
                      <Link
                        href="/content-creator"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-2 text-gray-600 font-medium text-sm hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        Content Creator
                      </Link>
                      <Link
                        href="/internship"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-2 text-gray-600 font-medium text-sm hover:text-[#450209] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-[#450209] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        Internship Program
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

                {/* Enhanced Mobile Contact */}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <a
                    href="tel:+12136529099"
                    className="flex items-center space-x-4 text-gray-700 bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="p-2 bg-[#450209] rounded-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">
                        Call us 24/7
                      </span>
                      <span className="text-base font-bold text-[#450209]">
                        +1 (213) 652-9099
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
