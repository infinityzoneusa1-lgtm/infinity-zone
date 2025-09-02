export function Step1Section() {
  return (
    <>
      {/* Header Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            How To Make Money With Infinity Zone Affiliate Program
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            4 Easy Steps
          </p>
        </div>
      </section>

      {/* Step 1 Content */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Column 1: Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="step-1.png"
                alt="Professional team in modern office"
                className="w-96 md:w-[500px] lg:w-[600px] h-80 md:h-96 lg:h-[400px] object-cover rounded-2xl mx-auto"
              />
            </div>
          </div>
          {/* Column 2: Content */}
          <div>
            <h2 className="text-xl font-bold mb-0 text-balance text-primary">
              Step 01
            </h2>
            <h2 className="text-3xl font-bold mb-6 text-balance text-black">
              Join Infinity Zone&apos;s Affiliate Program
            </h2>
            <p className="text-md leading-relaxed mb-6 text-black">
              Sign up and gain access to your exclusive affiliate account. Get
              your personalized affiliate link and code, and start your journey
              to earning commissions effortlessly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
