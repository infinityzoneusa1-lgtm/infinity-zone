"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function DibbaWealthSection() {
  const router = useRouter();

  const handleLearnMore = () => {
    // Navigate to the Dibba Container Storage product page (product ID 10)
    router.push("/services");
  };

  return (
    <section
      className="relative overflow-hidden py-8 md:py-12 lg:py-16"
      style={{ backgroundColor: "#450209", minHeight: "50vh" }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/product-bg.png" // 👈 apni background image
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Background Pattern/Texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            {/* Blue Label */}
            <div className="inline-block text-white text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-medium tracking-wider">
              DIBBA WEALTH
            </div>

            <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto lg:mx-0">
              Passionate about transforming ideas into reality and empowering
              individuals and businesses to reach their full potential. Dibba
              wealth specializes in Real Estate, Entrepreneurial hub, Arts &
              Culture, Mortgage, and BIG - Business Consultation, Insurance and
              Global Operations Group.
            </p>

            <Button
              variant="outline"
              size="lg"
              className="bg-white border-white text-black hover:bg-white hover:text-[#450209] transition-colors rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
            <Image
              src="/dibba.png"
              alt="Dibba Wealth Logo"
              width={300}
              height={200}
              className="w-48 sm:w-64 md:w-80 lg:w-auto h-auto max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
