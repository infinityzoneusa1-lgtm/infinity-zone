import { Button } from "@/components/ui/button";
import Link from "next/link";

export function InnovationSection() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Column 3: Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden ">
            <img
              src="/innovation.png"
              alt="Professional team in modern office"
              className="w-80 md:w-96 lg:w-120 h-64 md:h-72 lg:h-80 object-cover rounded-2xl mx-auto"
            />
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6 text-balance text-black">
            A Hub of Innovation and Collaboration:{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            Infinity Zone is more than just a collection of businesses. We are a
            vibrant community of entrepreneurs, united by a shared passion for
            innovation and growth. When you join Infinity Zone, you gain access
            to a supportive ecosystem that fosters creativity, collaboration,
            and continuous learning. Our team of experts is dedicated to
            providing you with the guidance and resources you need to navigate
            the entrepreneurial journey successfully.
          </p>
          <Link href="/contact">
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
