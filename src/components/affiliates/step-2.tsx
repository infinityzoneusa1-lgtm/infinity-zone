
export function Step2Section() {
  return (
    <section className="  bg-card">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-50 items-center">
        <div>
          <h2 className="text-xl font-bold mb-0 text-balance text-primary">
            Step 02{" "}
          </h2>
          <h2 className="text-3xl font-bold mb-6 text-balance text-black">
            Choose the Infinity Zone Category You Are Interested In Promoting.
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            Here, we will send you a welcome email. Please reply with your
            choice of category. Infinity Zone has four (4) line of business: The
            shop, Trucking, African Development Project (ADP) and the Real
            estate. Select which category you are interested in promoting and we
            will send you campaigns on your affiliate portal.
          </p>
        </div>
        {/* Column 3: Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden ">
            <img
              src="step-2.png"
              alt="Professional team in modern office"
              className="w-96 md:w-[500px] lg:w-[600px] h-80 md:h-96 lg:h-[400px] object-cover rounded-2xl mx-auto"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}
