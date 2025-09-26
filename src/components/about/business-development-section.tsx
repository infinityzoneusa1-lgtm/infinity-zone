import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BusinessDevelopmentSection() {
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
            Elevate Your Business with Infinity Zone:
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            Join/ sign up our platform as a vendors and unlock the tools,
            technology, and support you need to thrive in e-commerce. With our
            marketplace, software, and operational assistance, success and
            clients are just a click away. Sign up now and unleash your online
            potential with Infinity Zone.
          </p>
          <Link href="/vendor-app">
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
