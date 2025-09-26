"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ProfessionalsSection() {
  const router = useRouter();

  const professionals = [
    {
      name: "Fatoumata Dibba",
      title: "Business Development Consultant",
      image: "/professional.png",
      productId: 15, // Professional Beauty Consultant
    },
    {
      name: "Blessing Essien",
      title: "Executive Support Corporate",
      image: "/professional-2.png",
      productId: 16, // Professional Skincare Specialist
    },
  ];

  const handleGetConnected = (productId: number) => {
    if (productId === 15) {
      // Fatoumata Dibba
      router.push(`/fatoumata-dibba`);
    } else if (productId === 16) {
      // Blessing Essien
      router.push(`/blessing-essien`);
    } else {
      router.push(`/contact`);
    }
  };

  return (
    <section id="professionals" className="py-8 md:py-16 bg-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-red-900 mb-8 md:mb-12">
          PROFESSIONALS
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
          {professionals.map((professional, index) => (
            <Card
              key={index}
              className="bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-center">
                  {/* Image - appears first on mobile (top), last on desktop (right) */}
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 mt-4 sm:mt-0 sm:order-2 sm:mr-4 md:mr-6">
                    <img
                      src={professional.image || "/placeholder.svg"}
                      alt={professional.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {/* Content - appears second on mobile (bottom), first on desktop (left) */}
                  <div className="flex-1 p-4 md:p-8 text-center sm:text-left sm:order-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                      {professional.name}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">
                      {professional.title}
                    </p>
                    <Button
                      className="bg-red-900 hover:bg-red-800 text-white px-4 md:px-6 py-2 rounded-md text-xs md:text-sm font-medium w-full sm:w-auto"
                      onClick={() => handleGetConnected(professional.productId)}
                    >
                      GET CONNECTED
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
