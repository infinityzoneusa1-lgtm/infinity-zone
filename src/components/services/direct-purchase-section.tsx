import { Button } from "../ui/button";

export function DirectPurchaseSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Column 3: Image */}

        <div>
          <h2 className="text-4xl font-bold mb-6 text-balance text-white">
            Group Purchase
          </h2>
          <p className="text-md leading-relaxed mb-6 text-white">
            With our innovative group purchasing model, you can now purchase a
            house as a group with up to four individuals, sharing the joy and
            responsibilities of homeownership.
          </p>
          <h2 className="text-3xl font-bold mb-6 text-balance text-white">
            Why choose Infinity Zone Real Estate Group Purchase?{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-white">
            1. Affordable Homeownership: By pooling resources with your group,
            you can afford a home that may have been out of reach as an
            individual buyer. <br />
            2. Shared Investment: Spread the financial burden and risks of
            homeownership among your group members, making it more manageable
            for everyone. <br />
            3. Collaborative Decision-Making: Work together with your group to
            find the perfect home that meets everyone&apos;s needs and
            preferences. <br />
            4. Simplified Process: Our experienced team will guide you through
            the entire group purchasing process, ensuring a seamless and
            stress-free experience. <br />
            <br />
            Whether you&apos;re a group of friends, family members, or
            like-minded individuals, Infinity Zone Real Estate Group Purchase
            offers a unique opportunity to achieve your homeownership dreams
            together. <br />
            We have partnered with the DibAfric Mortgage team to streamline the
            buying process, making it even easier to secure your dream home.{" "}
            <br />
            Please note that the market value of the property can be affected by
            location (management fee applies). <br />
          </p>
          <Button
            variant="default"
            size="lg"
            className="text-lg px-8 py-3 bg-red-800 rounded-full"
          >
            Apply Now
          </Button>
        </div>
        <div className="relative">
          <div className="rounded-2xl overflow-hidden  ">
            <img
              src="/Group.png"
              alt="Professional team in modern office"
              className="w-80 md:w-96 lg:w-150 h-64 md:h-72 lg:h-150 object-cover rounded-3xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
