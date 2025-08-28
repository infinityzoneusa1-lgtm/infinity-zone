import { Button } from "@/components/ui/button"

export function FooterSection() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">Infinity Zone Real Estate</h3>
        <p className="text-lg mb-6">Where possibilities are unlimited</p>
        <div className="flex justify-center gap-6">
          <Button variant="outline" size="lg">
            Contact Us
          </Button>
          <Button variant="secondary" size="lg">
            View Listings
          </Button>
        </div>
      </div>
    </footer>
  )
}
