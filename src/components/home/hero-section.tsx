import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[400px] md:min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/header-bg.png"
          alt="Beauty makeup products and brushes"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Content Container */}
          <div className="flex justify-start">
            {/* Left Overlay Box */}
            <div
              className="bg-black/60 border border-black/20 rounded-none 
                            p-4 md:p-6 lg:p-8 xl:p-10 
                            w-full sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[550px] 
                            flex flex-col justify-center 
                            h-auto min-h-[250px] md:min-h-[300px] lg:h-[350px]
                            mx-auto sm:mx-0"
            >
              <span className="inline-block text-white py-1 md:py-2 rounded text-xs md:text-sm font-medium tracking-wider mb-2 md:mb-0">
                BEAUTY PRODUCT
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
                End of Year
                <br />
                Sale Deals
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
