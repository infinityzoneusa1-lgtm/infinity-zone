import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CommunitySection() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Column 3: Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden ">
            <img
              src="/community.png"
              alt="Professional team in modern office"
              className="w-80 md:w-96 lg:w-120 h-64 md:h-72 lg:h-80 object-cover rounded-2xl mx-auto"
            />
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6 text-balance text-black">
            Join the Infinity Zone Community:{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            Embark on a transformative journey towards success by joining
            Infinity Zone. Together, we can push boundaries, overcome obstacles,
            and create a world where possibilities truly are limitless. Whether
            you’re an e-commerce enthusiast, a trucking entrepreneur, an impact
            investor, or a real estate enthusiast, Infinity Zone is your partner
            in realizing your dreams. Join our dynamic ecosystem today and
            unlock the entrepreneurial opportunities that await you. Welcome to
            Infinity Zone.
          </p>
          <Link href="/contact">
            <Button
              variant="default"
              size="lg"
              className="text-lg px-8 py-3 rounded-full"
            >
              Join Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
