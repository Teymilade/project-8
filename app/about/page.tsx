import { CheckCircle2, Shield, Users, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#003366] to-[#004080] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Clean Logic Solutions
            </h1>
            <p className="text-xl text-gray-200">
              Technology-driven cleaning services for Bristol & Bath
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Clean Logic Solutions was founded with a simple mission: bring professional-grade logistics and technology to the cleaning industry.
                </p>
                <p>
                  We noticed that traditional cleaning companies often lacked transparency, reliability, and modern systems. So we built a company that operates like a tech startup—data-driven, customer-focused, and obsessed with quality.
                </p>
                <p>
                  Today, we serve hundreds of homes and businesses across Bristol and Bath, providing vetted cleaners, real-time tracking, and guaranteed results.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Why Choose Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Fully Vetted Team</h4>
                    <p className="text-sm text-gray-600">All cleaners are background checked and insured</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Photo Evidence</h4>
                    <p className="text-sm text-gray-600">Every job includes before and after documentation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Real-Time Tracking</h4>
                    <p className="text-sm text-gray-600">Know exactly when your cleaner checks in and out</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Transparent Pricing</h4>
                    <p className="text-sm text-gray-600">No hidden fees or surprise charges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-[#003366]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#003366]" />
              </div>
              <h3 className="text-3xl font-bold text-[#003366] mb-2">500+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>

            <div className="text-center">
              <div className="bg-[#003366]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-[#003366]" />
              </div>
              <h3 className="text-3xl font-bold text-[#003366] mb-2">5,000+</h3>
              <p className="text-gray-600">Cleans Completed</p>
            </div>

            <div className="text-center">
              <div className="bg-[#003366]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#003366]" />
              </div>
              <h3 className="text-3xl font-bold text-[#003366] mb-2">£5M</h3>
              <p className="text-gray-600">Insurance Coverage</p>
            </div>

            <div className="text-center">
              <div className="bg-[#003366]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-[#003366]" />
              </div>
              <h3 className="text-3xl font-bold text-[#003366] mb-2">4.9/5</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>

          <div className="bg-[#003366] text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-gray-200">
                  We never compromise on the quality of our cleaning services
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Transparency</h3>
                <p className="text-gray-200">
                  Clear pricing, open communication, and honest business practices
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-200">
                  Using technology to make cleaning services more reliable and efficient
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
