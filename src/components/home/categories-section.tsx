"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CategoriesSection() {
  const router = useRouter();

  const categories = [
    {
      title: "Transportation Services (Trucking)",
      description:
        "Efficient and reliable transportation solutions through our expert trucking services, delivering your cargo with precision and speed.",
      image: "/category-1.png",
      productId: 2, // Luxury Car Wheel - Alloy Rim
    },
    {
      title: "African Development Project (ADP)",
      description:
        "Elevating Africa through impactful development projects that empower communities and foster sustainable growth.",
      image: "/category-2.png",
      productId: 17, // Category 1 Beauty
    },
  ];

  const handleShopNow = (productId: number) => {
    router.push(`/coming-soon`);
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          CATEGORIES
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="relative overflow-hidden rounded-xl group py-0"
            >
              {/* Background Image */}
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 z-10 text-white space-y-2 sm:space-y-3">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                  {category.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-10 leading-relaxed">
                  {category.description}
                </p>

                <Button
                  variant="default"
                  size="sm"
                  className="bg-primary hover:bg-primary-700 text-white rounded-full py-3 sm:py-4 md:py-6 px-4 sm:px-5 md:px-6 text-xs sm:text-sm md:text-base"
                  onClick={() => handleShopNow(category.productId)}
                >
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
