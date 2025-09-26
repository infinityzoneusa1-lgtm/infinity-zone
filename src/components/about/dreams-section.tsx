import { Button } from "../ui/button";
import Link from "next/link";

export function DreamsSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Column 3: Image */}

        <div>
          <h2 className="text-4xl font-bold mb-6 text-balance text-white">
            Haul Your Dreams with Infinity Trucking:{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-white">
            For those who dream big on the road, Infinity Zone offers a thriving
            trucking division. We understand the importance of efficient
            logistics services for businesses, and we are committed to
            delivering top-tier transportation solutions. Join our trucking
            division and gain access to unparalleled opportunities in the
            industry, empowering you to build a successful and profitable
            trucking business.{" "}
          </p>
          <Link href="/coming-soon">
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
              src="/dreams.png"
              alt="Professional team in modern office"
              className="w-80 md:w-96 lg:w-120 h-64 md:h-72 lg:h-80 object-cover rounded-2xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
