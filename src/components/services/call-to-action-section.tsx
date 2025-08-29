import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <section className="py-16 md:py-20 bg-red-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Transform Your
            <br />
            <span className="text-red-200">Lifestyle Today?</span>
          </h2>
          <p className="text-red-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Don&apos;t wait any longer. Join thousands of satisfied customers
            who have already discovered the luxury lifestyle they deserve. Get
            started with our expert team today.
          </p>

          <div className="grid md:grid-cols-3 gap-8 my-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-red-900 text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Consultation</h3>
              <p className="text-red-200 text-sm">
                Get expert advice tailored to your needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-red-900 text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Selection</h3>
              <p className="text-red-200 text-sm">
                Choose from our premium collection
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-red-900 text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Delivery</h3>
              <p className="text-red-200 text-sm">
                Enjoy your new luxury lifestyle
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-white text-red-900 hover:bg-red-50 px-10 py-4 rounded-full text-lg font-semibold">
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-900 px-10 py-4 rounded-full text-lg"
            >
              Contact Us Today
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-red-200 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
