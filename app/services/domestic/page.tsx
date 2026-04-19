import { SmartPricingCalculator } from '@/components/smart-pricing-calculator';
import { CheckCircle2, Shield, Clock, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function DomesticCleaningPage() {
  return (
    <div className="bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb]">
      <section className="bg-gradient-to-br from-[#003366] to-[#004080] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Domestic Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Professional, reliable cleaning for your home in Bristol & Bath
            </p>
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-200 ml-2">Rated 5.0 by our customers</span>
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
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Vetted Cleaners</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All cleaners are DBS checked and fully insured
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Quality Guaranteed</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Not satisfied? We'll come back and make it right
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Flexible Scheduling</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Weekly, fortnightly, or one-off cleaning services
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Same Cleaner</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Build a relationship with your dedicated cleaner
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <SmartPricingCalculator />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-[#003366] mb-12">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Dusting all surfaces',
              'Vacuuming & mopping floors',
              'Kitchen cleaning & sanitizing',
              'Bathroom deep clean',
              'Bedroom tidying',
              'Living areas organization',
              'Window sills & ledges',
              'Trash removal',
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}