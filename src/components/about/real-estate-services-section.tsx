import { Button } from "../ui/button";
import Link from "next/link";

export function RealEstateServicesSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Column 3: Image */}

        <div>
          <h2 className="text-4xl font-bold mb-6 text-balance text-white">
            Real Estate, Real Opportunities:{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-white">
            Explore a world of real estate possibilities with Infinity Zone.
            Whether you’re looking for your dream home or seeking lucrative
            investment opportunities, we are your trusted partner. Our team of
            real estate experts will guide you through the process, helping you
            find the perfect property that aligns with your goals. With Infinity
            Zone, you can unlock the potential of real estate and build wealth
            over time.
          </p>
          <Link href="/services">
            <Button
              variant="default"
              size="lg"
              className="text-lg px-8 py-3 bg-red-800 rounded-full"
            >
              Learn More
            </Button>
          </Link>
        </div>
        <div className="relative">
          <div className="rounded-2xl overflow-hidden  ">
            <img
              src="/real-estate.png"
              alt="Professional team in modern office"
              className="w-80 md:w-96 lg:w-120 h-64 md:h-72 lg:h-80 object-cover rounded-2xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
