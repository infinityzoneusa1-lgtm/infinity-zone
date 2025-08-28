import { Button } from "@/components/ui/button"

export function ProductShowcase() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/product-bg.png" // 👈 yaha apni background image lagani hai
          alt="Background"
          className="w-full h-full object-cover"
        />
       </div>

      {/* Content */}
      <div className="relative container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Product Image */}
          <div className="relative flex justify-center">
            <img
              src="/colostrum-skincare-product-luxury-packaging.png"
              alt="Prime Colostrum Product"
              className="w-full max-w-sm h-auto relative z-10"
            />
            {/* Decorative shape (jaise screenshot mein red overlay hai) */}
            <div className="absolute -left-10 top-1/4 w-40 h-40 bg-primary/30 rounded-lg -z-0"></div>
          </div>
          
          {/* Right: Product Text */}
          <div className="    rounded-lg space-y-6">
            <h2 className="text-4xl font-bold text-white">Prime™</h2>
            <h3 className="text-xl font-semibold text-white">Colostrum with Lion&apos;s Mane</h3>
            <p className="text-gray-200 text-lg leading-relaxed">
             Provides phenomenal support for your cognition, gut, energy and overall immune health! Prime Colostrum pairs the unique properties of bovine-derived colostrum with Lion’s Mane mushrooms, which are both recognized as powerful superfoods that may help maintain a youthful metabolism. Benefits include support a healthy immune system, supports gut health, supports cognitive health, may help support stress response. No added sugar, preservatives or artificial colors
            </p>
            <Button
  size="lg"
  className="bg-white text-black hover:bg-gray-200 rounded-full"
>
  Shop Now
</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
