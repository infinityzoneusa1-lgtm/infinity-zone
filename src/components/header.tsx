"use client"

import { Search, Phone, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/web-logo.png"
              alt="Infinity Zone Logo"
              width={200}
              height={60}
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
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
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <Input 
                placeholder="Search for products..." 
                className="w-80 pr-10 border-gray-300 rounded-full bg-gray-50 focus:bg-white" 
                style={{ borderColor: '#450209' }}
              />
              <Button 
                size="sm" 
                className="absolute right-1 rounded-full h-8 w-8 p-0"
                style={{ backgroundColor: '#450209' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#350107'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#450209'}
              >
                <Search className="w-4 h-4 text-white" />
              </Button>
            </div>

            {/* Call info */}
            <div className="hidden lg:flex items-center space-x-2 text-gray-700">
              <Phone className="w-4 h-4" />
              <div className="flex flex-col">
                <span className="text-xs font-medium">Call us 24/7</span>
                <span className="text-sm font-bold">+08 9229 8228</span>
              </div>
            </div>

            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
