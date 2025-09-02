import { Button } from "../ui/button";
import Link from "next/link";

export function SustainabilitySection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Column 3: Image */}

        <div>
          <h2 className="text-4xl font-bold mb-6 text-balance text-white">
            Sustainability and Inclusivity:{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-white">
            At Infinity Zone, we prioritize sustainability and inclusivity. We
            believe in conducting business in a way that benefits both people
            and the planet. Through our African development projects, we aim to
            drive positive change, promote economic growth, and uplift
            communities. We embrace diversity and welcome entrepreneurs from all
            backgrounds, cultures, and perspectives. By fostering an inclusive
            environment, we celebrate the power of diverse ideas and
            experiences.
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
              src="/sustainability.png"
              alt="Professional team in modern office"
              className="w-80 md:w-96 lg:w-120 h-64 md:h-72 lg:h-80 object-cover rounded-2xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
