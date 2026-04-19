export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="text-gray-600">
            Clean Logic Solutions ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <p className="text-gray-600 mb-2">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Name, email address, and phone number</li>
            <li>Property address and postcode</li>
            <li>Service preferences and booking details</li>
            <li>Payment information (processed securely through Stripe)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-600 mb-2">We use your information to:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Provide and manage our cleaning services</li>
            <li>Process payments and send receipts</li>
            <li>Communicate with you about your bookings</li>
            <li>Improve our services and customer experience</li>
            <li>Send promotional communications (with your consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
          <p className="text-gray-600 mb-2">Under GDPR, you have the right to:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at hello@cleanlogic.co.uk
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString('en-GB')}
        </p>
      </div>
    </div>
  );
}
