import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="bg-red-900 text-white py-12 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/footer-bg.png')" }}
    >
      <div className="absolute inset-0  "></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/main-logo.png"
                alt="Infinity Zone"
                className="w-40 h-auto object-contain block opacity-100 visible"
                draggable={false}
              />
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3 text-gray-200 hover:text-white transition-colors">
                <svg
                  className="w-5 h-5 mt-0.5 text-red-300 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="font-medium">Address:</p>
                  <p>1021 W Broadway Ave N</p>
                  <p>Minneapolis, MN 55411</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors">
                <svg
                  className="w-5 h-5 text-red-300 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <p className="font-medium">Phone:</p>
                  <a
                    href="tel:+12136529099"
                    className="hover:text-red-300 transition-colors"
                  >
                    +1 (213) 652-9099
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors">
                <svg
                  className="w-5 h-5 text-red-300 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <p className="font-medium">Email:</p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=info@infinityzonemarketplace.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-300 transition-colors"
                  >
                    info@infinityzonemarketplace.com
                  </a>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <a
                href="https://web.facebook.com/InfinityZonemarket/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@infinity_zone1?_t=8h1Q2bqjzMX&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-black rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.8-.26z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/infinityzone_gm/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Izonemarketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-red-600 rounded flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/about"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                About
              </Link>
              <Link
                href="/#professionals"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Our Team
              </Link>
              <Link
                href="/contact"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Contact Us
              </Link>
              <a
                href="/african"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                African Development Project
              </a>
              <a
                href="https://api.leadconnectorhq.com/widget/survey/TzGAXvmg6nRJCyvkzG8S"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Driver Application
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <div className="space-y-2 text-sm">
              <a
                href="/shop"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Shop
              </a>
              <a
                href="https://infinityzoneaffiliates.app.clientclub.net/login"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Affiliate login
              </a>
              <Link
                href="/privacy-policy"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Privacy Policy
              </Link>
              <a
                href="/services"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Real Estate
              </a>
              <a
                href="/affiliates"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Affiliates
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/terms-and-conditions"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Terms & Conditions
              </Link>
              <a
                href="/coming-soon"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Investments
              </a>
              <a
                href="/coming-soon"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Trucking
              </a>
              <Link
                href="/vendor-app"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Vendor Application
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm">
            <p className="text-gray-200">
              &copy; 2025 Infinity Zone. All rights reserved.
            </p>
            
            <div className="flex space-x-6 text-gray-200">
              <Link 
                href="/privacy-policy" 
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-and-conditions" 
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
