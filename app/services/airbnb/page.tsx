import { AirbnbVettingForm } from '@/components/airbnb-vetting-form';
import { AirbnbPricingEngine } from '@/components/airbnb-pricing-engine';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, Camera, Key, Star } from 'lucide-react';

export default function AirbnbPage() {
  return (
    <div className="bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb]">
      <section className="bg-gradient-to-br from-[#003366] to-[#004080] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Airbnb Turnover Logistics
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Fast, reliable turnovers for short-let properties
            </p>
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-200 ml-2">Trusted by 50+ hosts</span>
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
                  <Clock className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Same-Day Turnovers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ready for your next guest within hours
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
                  Before & after photos for every clean
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Key className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Key Management</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Secure key collection & return service
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Quality Checks</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every clean inspected before completion
                </p>
              </CardContent>
            </Card>
          </div>

          <AirbnbPricingEngine />

          <div className="mt-16">
            <h2 className="text-4xl font-bold text-center text-[#003366] mb-8">Get Vetted Today</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join our network of trusted Airbnb hosts. Complete the form below and we'll be in touch within 24 hours.
            </p>
            <AirbnbVettingForm />
          </div>
        </div>
      </section>
    </div>
  );
}