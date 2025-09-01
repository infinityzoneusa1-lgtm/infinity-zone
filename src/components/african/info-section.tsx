import { Button } from "@/components/ui/button";
import Link from "next/link";

export function InfoSection() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Column 3: Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden ">
            <img
              src="/african-info.png"
              alt="Professional team in modern office"
              className="w-80 md:w-96 lg:w-120 h-64 md:h-72 lg:h-80 object-cover rounded-2xl mx-auto"
            />
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6 text-balance text-black">
            Africa Development Projects
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            We are dedicated to making a difference on the African continent.
            Our commitment to community development, sustainable projects, and
            partnerships is at the core of what we do. Infinity Zone LLC
            believes in empowering communities and creating lasting positive
            change.
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
