import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
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
      <div className="relative z-10 h-full flex items-start">
        <div className="pl-0 flex items-start h-full">
          {/* Main Content Box */}
          <div className="bg-black/60 border border-black/20 rounded-lg p-6 h-[486px] w-[420px] flex flex-col justify-center ml-0 mt-8">
        <span className="inline-block text-white py-2 rounded text-sm font-medium tracking-wider">
          BEAUTY PRODUCT
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          End of Year
          <br />
          Sale Deals
        </h1>
          </div>
        </div>
      </div>
       
    </section>
  )
}
