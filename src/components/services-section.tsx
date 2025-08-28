import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  const services = [
    {
      title: "Personal Beauty Consultation",
      description: "Get expert advice tailored to your unique beauty needs",
      image: "/beauty-consultation-professional.png",
    },
    {
      title: "Makeup Application",
      description: "Professional makeup services for special occasions",
      image: "/makeup-application-professional-service.png",
    },
    {
      title: "Skincare Analysis",
      description: "Comprehensive skin analysis and treatment recommendations",
      image: "/skincare-analysis-professional.png",
    },
    {
      title: "Product Training",
      description: "Learn how to use your beauty products effectively",
      image: "/beauty-product-training-session.png",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">NOW LET'S GET YOU STARTED!</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold text-card-foreground text-balance">{service.title}</h3>
                <p className="text-muted-foreground text-sm text-pretty">{service.description}</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
