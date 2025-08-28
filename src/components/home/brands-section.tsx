export function BrandsSection() {
  const brands = [
    { name: "MOTIVES", style: "font-light tracking-widest" },
    { name: "SHOP•COM", style: "font-bold" },
    { name: "LUMIERE", style: "font-light tracking-widest" },
    { name: "isotonix", style: "font-bold text-blue-600" },
    { name: "gotim", style: "font-bold text-teal-600" },
    { name: "layered", style: "font-light tracking-wide" },
    { name: "SHOP•COM", style: "font-bold" }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center text-black mb-8 md:mb-12 tracking-wide">
          SHOP BY BRANDS
        </h2>
        
        {/* Top row */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 mb-4 md:mb-6">
          <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-widest text-gray-700 hover:text-black transition-colors cursor-pointer">
            MOTIVES
          </div>
          <div className="text-lg md:text-2xl lg:text-4xl font-bold text-gray-700 hover:text-black transition-colors cursor-pointer">
            SHOP•COM
          </div>
          <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-widest text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
            LUMIERE
          </div>
          <div className="text-lg md:text-2xl lg:text-4xl font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
            isotonix
          </div>
        </div>
        
        {/* Bottom row */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12">
          <div className="text-lg md:text-2xl lg:text-4xl font-bold text-teal-600 hover:text-teal-800 transition-colors cursor-pointer">
            gotrim
          </div>
          <div className="text-lg md:text-2xl lg:text-4xl font-light tracking-wide text-gray-700 hover:text-black transition-colors cursor-pointer">
            layered
          </div>
          <div className="text-lg md:text-2xl lg:text-4xl font-bold text-gray-700 hover:text-black transition-colors cursor-pointer">
            SHOP•COM
          </div>
        </div>
      </div>
    </section>
  )
}