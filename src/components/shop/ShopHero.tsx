import Image from 'next/image';

export function ShopHero() {
  return (
    <section className="relative bg-gradient-to-r from-[#450209] to-[#6b0a0a] text-white py-16">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Premium Products
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100">
          Discover our curated collection of high-quality products designed to elevate your lifestyle
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
          <span className="bg-white/20 px-4 py-2 rounded-full">✓ Quality Guaranteed</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">✓ Fast Shipping</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">✓ Secure Payment</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">✓ 24/7 Support</span>
        </div>
      </div>
    </section>
  );
}