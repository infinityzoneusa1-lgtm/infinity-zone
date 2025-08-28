import { Button } from "@/components/ui/button"
import Image from "next/image"

export function DibbaWealthSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#450209", height: "50vh" }} // 👈 sirf 50% height
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/product-bg.png" // 👈 apni background image
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Background Pattern/Texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="grid md:grid-cols-2 gap-12 items-center h-full">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Blue Label */}
            <div className="inline-block text-white text-4xl font-medium tracking-wider">
              DIBBA WEALTH
            </div>

            <p className="text-white text-lg leading-relaxed max-w-4xl">
  Passionate about transforming ideas into reality and empowering individuals 
  and businesses to reach their full potential. Dibba wealth specializes in 
  Real Estate, Entrepreneurial hub, Arts & Culture, Mortgage, and BIG - 
  Business Consultation, Insurance and Global Operations Group.
</p>


              <Button
  variant="outline"
  size="lg"
  className="bg-white border-white text-black hover:bg-white hover:text-[#450209] transition-colors rounded-full px-8"
>
  Learn More
</Button>

            </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <Image
              src="/dibba.png"
              alt="Dibba Wealth Logo"
              width={300}
              height={200}
              className="w-auto h-auto max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
