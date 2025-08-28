import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ProfessionalsSection() {
  const professionals = [
    {
      name: "Sarah Johnson",
      title: "Senior Beauty Consultant",
      image: "/professional-beauty-consultant-woman.png",
    },
    {
      name: "Michael Chen",
      title: "Skincare Specialist",
      image: "/professional-skincare-specialist-man.png",
    },
  ]

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-card-foreground mb-12">PROFESSIONALS</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {professionals.map((professional, index) => (
            <Card key={index} className="bg-background border-border text-center">
              <CardContent className="p-6 space-y-4">
                <img
                  src={professional.image || "/placeholder.svg"}
                  alt={professional.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{professional.name}</h3>
                  <p className="text-muted-foreground">{professional.title}</p>
                </div>
                <Button variant="outline" size="sm">
                  Book Consultation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
