import Link from "next/link";

export function BrandsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-3xl font-bold text-center text-black mb-8 md:mb-12 tracking-wide">
          SHOP BY BRANDS
        </h2>

        {/* Top row */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 mb-4 md:mb-6">
          <Link
            href="https://www.motivescosmetics.com/allidiscount"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-widest text-gray-700 hover:text-black transition-colors cursor-pointer">
              MOTIVES
            </div>
          </Link>
          <Link
            href="https://www.shopglobal.com/allidiscount"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-lg md:text-2xl lg:text-4xl font-bold text-gray-700 hover:text-black transition-colors cursor-pointer text-center">
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
          >
            <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-widest text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              LUMIERE
            </div>
          </Link>
          <Link
            href="https://www.isotonix.com/allidiscount"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-lg md:text-2xl lg:text-4xl font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
              isotonix
            </div>
          </Link>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12">
          <Link
            href="https://www.gotrim.com/allidiscount"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-lg md:text-2xl lg:text-4xl font-bold text-teal-600 hover:text-teal-800 transition-colors cursor-pointer">
              gotrim
            </div>
          </Link>
          <Link
            href="https://www.getlayered.com/allidiscount"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-wide text-gray-700 hover:text-black transition-colors cursor-pointer">
              layered
            </div>
          </Link>
          <Link
            href="https://www.shop.com/allidiscount"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-lg md:text-2xl lg:text-4xl font-bold text-gray-700 hover:text-black transition-colors cursor-pointer text-center">
              <div>SHOP•COM</div>
              <div className="text-xs md:text-sm lg:text-lg font-normal">
                (Marketplace)
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
