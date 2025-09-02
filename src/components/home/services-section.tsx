"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function ServicesSection() {
  const services = [
    {
      title: "Vendors' Application",
      description:
        "Join our vibrant online marketplace as a Vendor and effortlessly showcase your products to a global audience.",
      image: "/Container-1.png",
      label: "VENDOR",
      labelColor: "bg-primary",
      link: "/vendor-app",
    },
    {
      title: "Drivers' Application",
      description:
        "Empower your journey and potential to lucrative opportunities to drive for locals.",
      image: "/Container-2.png",
      label: "DRIVER",
      labelColor: "bg-primary",
      link: "https://api.leadconnectorhq.com/widget/survey/TzGAXvmg6nRJCyvkzG8S",
    },
    {
      title: "Investors' Page",
      description:
        "Explore Partnership opportunities and learn from a diverse portfolio.",
      image: "/Container-3.png",
      label: "INVESTOR",
      labelColor: "bg-primary",
      link: "/coming-soon",
    },
    {
      title: "Affiliate Programs",
      description:
        "Unlock earning potential. Join our Affiliate Marketing program and turn your influence into income.",
      image: "/Container-4.png",
      label: "AFFILIATE",
      labelColor: "bg-primary",
      link: "https://infinityzoneaffiliates.app.clientclub.net/login",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-black mb-12 tracking-wide">
          NOW LET&apos;S GET YOU STARTED!
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="py-0 bg-white border border-gray-300 hover:shadow-lg transition-shadow rounded-xl overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Image with label */}
                <div className="relative h-80 overflow-hidden rounded-t-xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute top-4 left-4 ${service.labelColor} text-white px-3 py-1 text-xs font-bold rounded`}
                  >
                    {service.label}
                  </div>
                </div>

                {/* Content - Light Grey Background */}
                <div className="p-6 bg-gray-50 h-52 flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-black mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Button fixed at bottom left */}
                  <div className="flex justify-start mt-auto">
                    <Link href={service.link}>
                      <Button className="text-white font-medium py-3 px-8 rounded-full text-sm uppercase tracking-wide">
                        CLICK NOW
                      </Button>
                    </Link>
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
