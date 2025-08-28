import { Button } from "@/components/ui/button"

export function DibbaWealthSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">DIBBA WEALTH</h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed text-pretty">
              Unlock exclusive beauty investments and premium product collections. Join our wealth program for access to
              limited edition items, early releases, and personalized beauty consultations.
            </p>
            <Button variant="secondary" size="lg">
              Join Now
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center">
              <div className="text-4xl font-bold text-secondary-foreground">DW</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
