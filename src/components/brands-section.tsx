export function BrandsSection() {
  const brands = ["MOTIVES", "SHOP.COM", "LUMIERE", "ISOTONIX", "GOLFIN", "LAYERED", "SHOP.COM"]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">SHOP BY BRANDS</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="text-xl font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
