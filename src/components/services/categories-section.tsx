import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CategoriesSection() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Column 3: Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden ">
            <img
              src="/home-owner.png"
              alt="Professional team in modern office"
              className="w-80 md:w-96 lg:w-120 h-64 md:h-72 lg:h-80 object-cover rounded-2xl mx-auto"
            />
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6 text-balance text-primary text-black">
            Purchase Categories{" "}
          </h2>
          <h2 className="text-3xl font-bold mb-6 text-balance text-black">
            Individual & Infinity Zone
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            Discover the path to homeownership with Infinity Zone Real Estate!
            With a starting price of $300k Minimum, you can now own your
            individual house in the USA. Our expert team will guide you through
            the entire process, from property selection to acquisition, ensuring
            a seamless experience tailored to your preferences. Plus, we have
            partnered with the DibAfric Mortgage team to streamline the buying
            process, making it even easier to secure your dream home. Please
            note that the market value of the property can be affected by
            location (management fee applies).
          </p>
          <Link
            href="https://link.apisystem.tech/widget/survey/60Q4OqGy51t7sGU6U24M"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="default"
              size="lg"
              className="text-lg px-8 py-3 rounded-full"
            >
              Apply Now{" "}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
