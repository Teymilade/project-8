import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { CheckCircle2, Users, Calendar, Shield, Star } from 'lucide-react';

export default function StudentAccommodationPage() {
  return (
    <div className="bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb]">
      <section className="bg-gradient-to-br from-[#003366] to-[#004080] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Student Accommodation
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Summer turnovers and HMO deep cleaning specialists
            </p>
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-200 ml-2">Trusted by landlords across Bristol</span>
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
                  <Calendar className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Summer Turnovers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Specialist summer deep clean service for HMOs
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Multi-Room Properties</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Experienced with large HMO turnarounds
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Deposit Standards</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Deep clean to inventory standards
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Fast Turnaround</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ready for new tenants quickly
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#003366] mb-8">What We Cover</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Full property deep clean',
                'Kitchen appliance descaling',
                'Bathroom sanitization',
                'Carpet deep cleaning',
                'Common area cleaning',
                'Individual room turnovers',
                'Window cleaning (interior)',
                'Waste removal & disposal',
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#003366] mb-6">Ready to Book?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Contact us for a tailored quote for your student property
            </p>
            <Button asChild size="lg" className="bg-[#003366] hover:bg-[#004080] text-white h-14 px-8 text-lg rounded-xl shadow-lg">
              <Link href="/contact">Request Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
