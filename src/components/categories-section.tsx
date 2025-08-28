import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CategoriesSection() {
  const categories = [
    {
      title: "Tire & Wheel Packages",
      description: "Complete wheel and tire solutions",
      image: "/luxury-car-wheels-and-tires.png",
    },
    {
      title: "Get the Best Priced",
      description: "Premium products at competitive prices",
      image: "/luxury-car-premium-products.png",
    },
  ]

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">CATEGORIES</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="bg-primary-foreground text-primary overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-balance">{category.title}</h3>
                  <p className="text-muted-foreground text-pretty">{category.description}</p>
                  <Button variant="default" size="sm">
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
