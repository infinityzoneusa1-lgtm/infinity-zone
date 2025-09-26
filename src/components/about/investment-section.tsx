import { Button } from "@/components/ui/button";
import Link from "next/link";

export function InvestmentSection() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Column 3: Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden ">
            <img
              src="/business.png"
              alt="Professional team in modern office"
              className="w-80 md:w-96 lg:w-120 h-64 md:h-72 lg:h-80 object-cover rounded-2xl mx-auto"
            />
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6 text-balance text-black">
            Invest in a Better Tomorrow:{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            Infinity Zone is proud to be involved in African development
            projects. We believe in creating lasting impact and growth across
            the continent, and we offer investment opportunities that make a
            difference. By partnering with us, you can contribute to the
            economic development of Africa while achieving financial success.
            Together, we can build a better tomorrow for communities and create
            a positive ripple effect across the continent.
          </p>
          <Link href="/coming-soon">
            <Button
              variant="default"
              size="lg"
              className="text-lg px-8 py-3 rounded-full"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
