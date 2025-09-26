import { Button } from "@/components/ui/button";

export function HomeownerSection() {
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
          <h2 className="text-4xl font-bold mb-6 text-balance text-black">
            Become a Homeowner in The USA{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            Are you looking to buy a house anywhere in the USA? Infinity Zone
            will carry out the necessary procedures and paperwork to ensure you
            find the best location and help you close the property.{" "}
          </p>
          {/* <Button
            variant="default"
            size="lg"
            className="text-lg px-8 py-3 rounded-full"
          >
            Apply Now{" "}
          </Button> */}
        </div>
      </div>
    </section>
  );
}
