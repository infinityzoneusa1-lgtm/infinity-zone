import Image from "next/image";
import Link from "next/link";

export function AffiliatesHeroSection() {
  return (
    <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[400px] md:min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/shop.png"
          alt="Beauty makeup products and brushes"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Content Container */}
          <div className="flex justify-center">
            {/* Main Content Box */}
            <div
              className="bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg 
              p-6 md:p-8 lg:p-12 xl:p-16 
              w-full max-w-2xl md:max-w-3xl lg:max-w-4xl
              flex flex-col items-center justify-center text-center 
              min-h-[300px] md:min-h-[350px] lg:min-h-[400px]
              mx-auto shadow-2xl"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl   font-bold text-white mb-4 md:mb-0 leading-tight">
                Earn Money By
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl  font-bold text-white mb-6 md:mb-6 leading-tight">
                Promoting Infinity Zone
              </h2>
              <p className="text-white text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl">
                Join our affiliate program now and earn commissions. Turn your
                passion into profit - join today and start earning!
              </p>
              <Link href="https://infinityzoneaffiliates.app.clientclub.net/">
                <button className="mt-6 md:mt-8 bg-primary hover:bg-primary/80 text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  JOIN THE AFFILIATE PROGRAM
                </button>
              </Link>
              <p className="text-white/80 text-sm md:text-base mt-4">
                Already an Affiliate?{" "}
                <Link href="https://infinityzoneaffiliates.app.clientclub.net/login">
                  {" "}
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer underline">
                    Login here
                  </span>
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
