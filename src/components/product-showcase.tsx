import { Button } from "@/components/ui/button"

export function ProductShowcase() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="/colostrum-skincare-product-luxury-packaging.png"
              alt="Prime Colostrum Product"
              className="w-full max-w-md mx-auto h-auto"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-card-foreground">Prime™</h2>
            <h3 className="text-2xl font-semibold text-secondary">COLOSTRUM with Luxury Skincare</h3>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              Experience the revolutionary power of colostrum-infused skincare. Our Prime collection combines nature's
              most potent ingredients with cutting-edge beauty science to deliver unparalleled results. Transform your
              skin with this luxury treatment that nourishes, rejuvenates, and protects.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
