import { Button } from "@/components/ui/button";
import Link from "next/link";

export function WelcomeSection() {
  return (
    <section className="py-16 md:py-20 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid lg:grid-cols-3 gap-4 md:gap-6 items-center">
        {/* Column 1: Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            Welcome To Infinity Zone,
            <br />
            Where Possibilities Are
            <br />
            Limitless!
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-gray-200">
            We are not just another e-commerce platform; we are a dynamic
            ecosystem that empowers visionary entrepreneurs to turn their ideas
            into prosperous ventures. Our mission is to provide a haven for
            dreamers, innovators, and change makers like you, offering a wide
            range of opportunities across multiple lines of business.
          </p>
        </div>

        {/* Column 2: Buttons */}
        <div className="flex flex-col space-y-2 items-center">
          <Link href="/#professionals">
            <Button className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold rounded-full w-[200px] transition-all duration-200 shadow-lg">
              OUR TEAM
            </Button>
          </Link>
          <Link href="/affiliates">
            <Button className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold rounded-full w-[200px] transition-all duration-200 shadow-lg">
              AFFILIATES
            </Button>
          </Link>
          <Link href="/coming-soon">
            <Button className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold rounded-full w-[200px] transition-all duration-200 shadow-lg">
              FARMERS
            </Button>
          </Link>
          <Link href="/coming-soon">
            <Button className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold rounded-full w-[200px] transition-all duration-200 shadow-lg">
              DRIVERS
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold rounded-full w-[200px] transition-all duration-200 shadow-lg">
              COMMUNITY MEMBERS
            </Button>
          </Link>
        </div>

        {/* Column 3: Image */}
        <div className="relative">
          <div className="rounded-4xl overflow-hidden shadow-2xl">
            <img
              src="/welcome.png"
              alt="Professional team in modern office"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
