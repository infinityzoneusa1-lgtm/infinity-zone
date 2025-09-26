import { Button } from "../ui/button";
import Link from "next/link";

export function CustomerBenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-20 items-center">
        {/* Column 3: Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden  ">
            <img
              src="/Group2.png"
              alt="Professional team in modern office"
              className="w-80 md:w-96 lg:w-150 h-64 md:h-72 lg:h-150 object-cover rounded-3xl mx-auto"
            />
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6 text-balance text-black">
            Purchase on Behalf of Customer{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            At Infinity Zone Real Estate, we specialize in purchasing properties
            on behalf of our customers and investing them as rental homes. With
            our expertise and resources, we take the hassle out of property
            investment, allowing you to enjoy passive income and long-term
            financial growth.
          </p>
          <h2 className="text-3xl font-bold mb-6 text-balance text-black">
            Why choose Infinity Zone Real Estate for your investment needs?{" "}
          </h2>
          <p className="text-md leading-relaxed mb-6 text-black">
            1. <strong>Expertise:</strong> Our team of real estate professionals
            has years of experience in property acquisition, management, and
            rental strategies. <br />
            2. <strong>Hassle-Free Investment:</strong> Let us handle the entire
            process, from property selection to tenant management, while you sit
            back and watch your investment grow. <br />
            3. <strong>Financial Stability:</strong> Rental properties provide a
            steady stream of income and offer a reliable way to diversify your
            investment portfolio. <br />
            4. <strong>Personalized Service:</strong> We understand that every
            investor has unique goals and preferences. That&apos;s why we tailor
            our services to meet your specific needs and objectives. <br />
            We have partnered with the DibAfric Mortgage team to streamline the
            buying process, making it even easier to secure your dream home.{" "}
            <br />
            Please note that the market value of the property can be affected by
            location (management fee applies). <br />
            Click the &quot;Apply now&quot; button and our team will guide you
            every step of the way. <br />
          </p>
          <Link
            href="https://link.apisystem.tech/widget/survey/60Q4OqGy51t7sGU6U24M"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="default"
              size="lg"
              className="text-lg px-8 py-3 bg-primary rounded-full"
            >
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
