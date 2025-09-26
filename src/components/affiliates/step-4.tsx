import Link from "next/link";

export function Step4Section() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-50 items-center">
        {/* Column 3: Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden ">
            <img
              src="step-1.png"
              alt="Professional team in modern office"
              className="w-96 md:w-[500px] lg:w-[600px] h-80 md:h-96 lg:h-[400px] object-cover rounded-2xl mx-auto"
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-0 text-balance text-primary">
            Step 04{" "}
          </h2>
          <h2 className="text-3xl font-bold mb-6 text-balance text-black">
            Earn commission on every sale{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            Get paid a 10% commission on every sale you bring. Here&apos;s how
            it works:
            <br />
            If you select the Shop as your promoting category, you will earn
            commission on each sale made. (Please note: you have to make sure
            that your affiliate link is clicked on when you promote so we can
            track your progress and pay you for your hard work).
            <br />
            For the Trucking and ADP, you earn a $50 from every investor you
            refer. Investors can either donate a truck, buy a truck in the name
            of infinity zone or invest money for the purchase of the truck. Same
            applies to investors who want to invest in the development projects
            in Africa such as borehole drilling, agriculture, construction, etc.
            Please note that until the deal is closed, before funds are released
            from this category.
            <br />
            For Real Estate, you earn $50 on each house owner who buys a house.
            Please note that until the deal is closed, before funds are released
            from this category.
          </p>
        </div>
      </div>

      {/* Centered Button */}
      <div className="flex justify-center mt-8 md:mt-12">
        <Link href="https://infinityzoneaffiliates.app.clientclub.net/">
          <button className="bg-primary hover:bg-primary/80 text-white px-8 py-3 md:px-12 md:py-2 rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Earning
          </button>
        </Link>
      </div>
    </section>
  );
}
