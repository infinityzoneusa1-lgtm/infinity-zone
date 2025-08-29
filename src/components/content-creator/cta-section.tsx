import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  const benefits = [
    "Access to exclusive beauty products",
    "Professional photography support",
    "Dedicated account manager",
    "Monthly creator meetups",
    "Performance-based bonuses",
    "Free shipping on all orders",
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-purple-900 via-red-900 to-pink-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Creator Journey?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of successful content creators who are already
            earning with our platform. Start creating amazing content today!
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 text-left"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-200">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Email Signup */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Get Early Access</h3>
            <p className="text-gray-300 mb-6">
              Be the first to know about new opportunities and exclusive creator
              events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              />
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2">
                <ArrowRight className="w-4 h-4 mr-2" />
                Join Waitlist
              </Button>
            </div>
          </div>

          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold">
              Apply Now
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-full text-lg"
            >
              Learn More
            </Button>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-6">
            <p className="text-sm text-gray-300">
              By applying, you agree to our{" "}
              <Link
                href="/terms-and-conditions"
                className="text-pink-400 hover:text-pink-300 underline"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-pink-400 hover:text-pink-300 underline"
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-pink-400 mb-1">
                98%
              </div>
              <div className="text-sm text-gray-300">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">
                24h
              </div>
              <div className="text-sm text-gray-300">Approval Time</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-pink-400 mb-1">
                $2K+
              </div>
              <div className="text-sm text-gray-300">Avg Monthly Earnings</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">
                24/7
              </div>
              <div className="text-sm text-gray-300">Creator Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
