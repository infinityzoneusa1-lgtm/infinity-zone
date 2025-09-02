export function AffiliateProgramDetails() {
  return (
    <section className="py-16 md:py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Affiliate Program Details
          </h2>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Program Agreement */}
          <div className="bg-white rounded-3xl border border-black p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
              Program Agreement
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Click here to download and view Affiliate Terms of Service before
              joining the program.
            </p>
          </div>

          {/* Commission */}
          <div className="bg-white rounded-3xl border border-black p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
              Commission
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Earn a flat 10% commission on every sale of Infinity Zone products
              that you refer. Get 10% commission on any corporate affiliate
              program. Such as shipping and trucking services, real estate
              services, and African development investment services.
            </p>
          </div>

          {/* Restrictions */}
          <div className="bg-white rounded-3xl border border-black p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
              Restrictions
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Running ads on promotional/contest sites are NOT allowed. This
              would lead to the suspension of the account.
            </p>
          </div>

          {/* Cookie Duration */}
          <div className="bg-white rounded-3xl border border-black p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
              Cookie Duration
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              365 days referral cookie life
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
