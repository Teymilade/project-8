import { EndOfTenancyForm } from '@/components/end-of-tenancy-form';
import { SmartPricingCalculator } from '@/components/smart-pricing-calculator';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Shield, Camera, Award, Star } from 'lucide-react';

export default function EndOfTenancyPage() {
  return (
    <div className="bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb]">
      <section className="bg-gradient-to-br from-[#003366] to-[#004080] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              End of Tenancy Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Get your deposit back guaranteed with our deep clean service
            </p>
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-200 ml-2">98% deposit return success rate</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Deposit Guarantee</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Get your full deposit back or we'll re-clean for free
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Inventory Compliant</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We follow inventory checklist standards
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Photo Evidence</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Comprehensive before & after documentation
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Fixed Pricing</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No hidden fees, transparent pricing
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mb-16">
            <SmartPricingCalculator />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-[#003366] mb-8">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                'Deep clean of all rooms',
                'Oven & appliance cleaning',
                'Inside all cupboards & drawers',
                'Bathroom descaling',
                'Window cleaning (interior)',
                'Carpet vacuuming',
                'Skirting boards & doors',
                'Light fixtures & switches',
                'Wall spot cleaning',
                'Balcony/patio cleaning',
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-center text-[#003366] mb-8">Book Your Clean</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Fill out the form below and we'll confirm your booking within 2 hours.
            </p>
            <EndOfTenancyForm />
          </div>
        </div>
      </section>
    </div>
  );
}
