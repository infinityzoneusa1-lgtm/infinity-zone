export function Step3Section() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-50 items-center">
        {/* Column 3: Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden ">
            <img
              src="step-3.png"
              alt="Professional team in modern office"
              className="w-96 md:w-[500px] lg:w-[600px] h-80 md:h-96 lg:h-[400px] object-cover rounded-2xl mx-auto"
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-0 text-balance text-primary">
            Step 03{" "}
          </h2>
          <h2 className="text-3xl font-bold mb-6 text-balance text-black">
            Share Infinity Zone With Your Exclusive Link{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            Participate in Infinity Zone Campaigns and spread the word by
            sharing your personal affiliate link and codes across your preferred
            channels like videos, blogs, social media posts, podcasts, etc.
          </p>
        </div>
      </div>
    </section>
  );
}
