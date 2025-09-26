export function PaymentPlanningSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Column 3: Image */}

        <div>
          <h2 className="text-4xl font-bold mb-6 text-balance text-white">
            Process Flow After Payment Received
          </h2>
          <p className="text-md leading-relaxed mb-6 text-white">
            1. Once payment is received we will send a confirmation email to
            notify you (in addition to any legal documents for signing).
            <br />
            Note: payments done in installments will only be confirmed after the
            final amount has been completed. <br />
            2. Agree to terms & conditions of the contract as stipulated in
            legal documents (use of DocuSign). <br />
            3. Commencement of property acquisition will take 3-4 months after
            receipt of payment. <br />
            4. Marketing personnel sends newsletters every 2 weeks to keep
            buyers informed on updates and other infinity zone promotional news
            like buying products from shops or investments. <br />
            5. When a house has been found within the period stated in bullet
            point - 3, the buyer will be informed via email. <br />
          </p>
          {/* <Button
            variant="default"
            size="lg"
            className="text-lg px-8 py-3 bg-red-800 rounded-full"
          >
            Learn More
          </Button> */}
        </div>
        <div className="relative">
          <div className="rounded-2xl overflow-hidden  ">
            <img
              src="/payment.png"
              alt="Professional team in modern office"
              className="w-80 md:w-96 lg:w-120 h-64 md:h-72 lg:h-120 object-fill rounded-2xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
