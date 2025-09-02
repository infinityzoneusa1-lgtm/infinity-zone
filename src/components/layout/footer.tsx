import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="bg-red-900 text-white py-12 relative"
      style={{
        backgroundImage: "url('/footer-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0  "></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/web-logo.png"
                alt="Infinity Zone"
                className="w-48 h-auto"
              />
            </div>
            <div className="space-y-2 text-sm text-gray-200">
              <p>Address: 1234 Heaven Stress, Beverly</p>
              <p>Hill Old York- United State of Lorem</p>
              <p>Phone: 1234 5678 5876 - 3457 4656</p>
              <p>Email: Support1234@Onlife</p>
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
                className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
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
              <a
                href="#"
                className="block hover:text-gray-300 transition-colors text-gray-200"
              >
                Vendor Application
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
          <p className="text-gray-200">
            &copy; 2024 Infinity Zone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
