export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
          <p className="text-gray-600">
            By accessing and using Clean Logic Solutions services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Services</h2>
          <p className="text-gray-600 mb-2">
            Clean Logic Solutions provides professional cleaning services including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Domestic cleaning (regular and one-off)</li>
            <li>Commercial cleaning</li>
            <li>Airbnb turnover cleaning</li>
            <li>End of tenancy deep cleaning</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Booking and Payment</h2>
          <p className="text-gray-600 mb-2">
            All bookings are subject to availability. Payment terms:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Domestic cleaning: Payment required at time of booking</li>
            <li>Commercial contracts: Monthly invoicing available</li>
            <li>Cancellations: 24 hours notice required for full refund</li>
            <li>Late cancellations (less than 24 hours): 50% charge applies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Service Coverage</h2>
          <p className="text-gray-600">
            Our services are currently available in Bristol (BS postcodes) and Bath (BA postcodes) only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Quality Guarantee</h2>
          <p className="text-gray-600">
            We guarantee the quality of our cleaning services. If you are not satisfied, please contact us within 24 hours and we will arrange a re-clean at no additional cost.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Liability</h2>
          <p className="text-gray-600">
            All our cleaners are fully insured with £5M public liability coverage. We are not liable for pre-existing damage or items not disclosed prior to cleaning.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Access Requirements</h2>
          <p className="text-gray-600">
            You must provide safe and reasonable access to the property. If access is not available at the scheduled time, a cancellation fee may apply.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
          <p className="text-gray-600">
            We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">9. Contact</h2>
          <p className="text-gray-600">
            For questions about these Terms of Service, contact us at hello@cleanlogic.co.uk or call 0117 123 4567.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString('en-GB')}
        </p>
      </div>
    </div>
  );
}
