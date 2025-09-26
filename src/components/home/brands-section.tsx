"use client";

import Link from "next/link";
import "@/styles/animations.css";

export function BrandsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full px-4">
        <h2 className="text-xl md:text-3xl font-bold text-center text-black mb-8 md:mb-12 tracking-wide">
          SHOP BY BRANDS
        </h2>

        {/* Horizontal Scrolling Row */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-8 md:space-x-12 lg:space-x-16">
            <Link
              href="https://www.motivescosmetics.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-widest text-gray-700 hover:text-black transition-colors cursor-pointer whitespace-nowrap">
                MOTIVES
              </div>
            </Link>
            <Link
              href="https://www.shopglobal.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-bold text-gray-700 hover:text-black transition-colors cursor-pointer text-center whitespace-nowrap">
                <div>SHOP•COM</div>
                <div className="text-xs md:text-sm lg:text-lg font-normal">
                  (Global)
                </div>
              </div>
            </Link>
            <Link
              href="https://www.lumieredevie.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-widest text-gray-500 hover:text-gray-700 transition-colors cursor-pointer whitespace-nowrap">
                LUMIERE
              </div>
            </Link>
            <Link
              href="https://www.isotonix.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer whitespace-nowrap">
                isotonix
              </div>
            </Link>
            <Link
              href="https://www.gotrim.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-bold text-teal-600 hover:text-teal-800 transition-colors cursor-pointer whitespace-nowrap">
                gotrim
              </div>
            </Link>
            <Link
              href="https://www.getlayered.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-wide text-gray-700 hover:text-black transition-colors cursor-pointer whitespace-nowrap">
                layered
              </div>
            </Link>
            <Link
              href="https://www.shop.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-bold text-gray-700 hover:text-black transition-colors cursor-pointer text-center whitespace-nowrap">
                <div>SHOP•COM</div>
                <div className="text-xs md:text-sm lg:text-lg font-normal">
                  (Marketplace)
                </div>
              </div>
            </Link>

            {/* Duplicate for seamless loop */}
            <Link
              href="https://www.motivescosmetics.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-widest text-gray-700 hover:text-black transition-colors cursor-pointer whitespace-nowrap">
                MOTIVES
              </div>
            </Link>
            <Link
              href="https://www.shopglobal.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-bold text-gray-700 hover:text-black transition-colors cursor-pointer text-center whitespace-nowrap">
                <div>SHOP•COM</div>
                <div className="text-xs md:text-sm lg:text-lg font-normal">
                  (Global)
                </div>
              </div>
            </Link>
            <Link
              href="https://www.lumieredevie.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-widest text-gray-500 hover:text-gray-700 transition-colors cursor-pointer whitespace-nowrap">
                LUMIERE
              </div>
            </Link>
            <Link
              href="https://www.isotonix.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer whitespace-nowrap">
                isotonix
              </div>
            </Link>
            <Link
              href="https://www.gotrim.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-bold text-teal-600 hover:text-teal-800 transition-colors cursor-pointer whitespace-nowrap">
                gotrim
              </div>
            </Link>
            <Link
              href="https://www.getlayered.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-wide text-gray-700 hover:text-black transition-colors cursor-pointer whitespace-nowrap">
                layered
              </div>
            </Link>
            <Link
              href="https://www.shop.com/allidiscount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-bold text-gray-700 hover:text-black transition-colors cursor-pointer text-center whitespace-nowrap">
                <div>SHOP•COM</div>
                <div className="text-xs md:text-sm lg:text-lg font-normal">
                  (Marketplace)
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
