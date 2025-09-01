"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CategoriesSection() {
  const router = useRouter();

  const categories = [
    {
      title: "Tire & Wheel Packages",
      description: "Wheels & Tires - Now 15% Savings",
      image: "/category-2.png",
      productId: 2, // Luxury Car Wheel - Alloy Rim
    },
    {
      title: "Get the Best Priced",
      description: "Free shipping over $99",
      image: "/category-1.png",
      productId: 17, // Category 1 Beauty
    },
  ];

  const handleShopNow = (productId: number) => {
    router.push(`/coming-soon`);
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">CATEGORIES</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="relative overflow-hidden rounded-xl group py-0"
            >
              {/* Background Image */}
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-start p-6 z-10 text-white space-y-2">
                <h3 className="text-3xl font-bold">{category.title}</h3>
                <p className="text-sm mb-10">{category.description}</p>

                <Button
                  variant="default"
                  size="sm"
                  className="bg-primary hover:bg-primary-700 text-white rounded-full py-6 px-6"
                  onClick={() => handleShopNow(category.productId)}
                >
                  Shop Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
