"use client"

import { Search, Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 relative">
      <div className="container mx-auto px-4 py-2 md:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Image
              src="/web-logo.png"
              alt="Infinity Zone Logo"
              width={200}
              height={60}
              className="h-12 md:h-16 lg:h-20 w-auto object-contain"
            />
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href="#" className="text-gray-700 transition-colors font-medium text-sm tracking-wide hover:text-[#450209]">
              HOME
            </a>
            <a href="#" className="text-gray-700 transition-colors font-medium text-sm tracking-wide hover:text-[#450209]">
              ABOUT
            </a>
            <div className="relative group">
              <a href="#" className="text-gray-700 transition-colors font-medium text-sm tracking-wide flex items-center hover:text-[#450209]">
                SERVICES
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
            <a href="#" className="text-gray-700 transition-colors font-medium text-sm tracking-wide hover:text-[#450209]">
              CONTACT
            </a>
            <a href="#" className="text-gray-700 transition-colors font-medium text-sm tracking-wide hover:text-[#450209]">
              CONTENT CREATOR
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search - Desktop/Tablet */}
            <div className="hidden md:flex items-center relative">
              <Input 
                placeholder="Search for products..." 
                className="w-48 lg:w-64 xl:w-80 pr-10 border-gray-300 rounded-full bg-gray-50 focus:bg-white text-sm" 
                style={{ borderColor: '#450209' }}
              />
              <Button 
                size="sm" 
                className="absolute right-1 rounded-full h-7 w-7 lg:h-8 lg:w-8 p-0"
                style={{ backgroundColor: '#450209' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#350107'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#450209'}
              >
                <Search className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </Button>
            </div>

            {/* Search - Mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden p-2"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </Button>

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
                <a href="#" className="text-gray-700 font-medium text-base hover:text-[#450209] transition-colors">
                  HOME
                </a>
                <a href="#" className="text-gray-700 font-medium text-base hover:text-[#450209] transition-colors">
                  ABOUT
                </a>
                <a href="#" className="text-gray-700 font-medium text-base hover:text-[#450209] transition-colors">
                  SERVICES
                </a>
                <a href="#" className="text-gray-700 font-medium text-base hover:text-[#450209] transition-colors">
                  CONTACT
                </a>
                <a href="#" className="text-gray-700 font-medium text-base hover:text-[#450209] transition-colors">
                  CONTENT CREATOR
                </a>
                
                {/* Mobile Search */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center relative">
                    <Input 
                      placeholder="Search for products..." 
                      className="w-full pr-10 border-gray-300 rounded-full bg-gray-50 focus:bg-white" 
                      style={{ borderColor: '#450209' }}
                    />
                    <Button 
                      size="sm" 
                      className="absolute right-1 rounded-full h-8 w-8 p-0"
                      style={{ backgroundColor: '#450209' }}
                    >
                      <Search className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </div>

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
  )
}
