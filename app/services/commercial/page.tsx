import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { CheckCircle2, Building2, Clock, Shield, FileText, Star } from 'lucide-react';

export default function CommercialCleaningPage() {
  return (
    <div className="bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb]">
      <section className="bg-gradient-to-br from-[#003366] to-[#004080] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Commercial Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Professional office and retail cleaning for businesses in Bristol & Bath
            </p>
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-200 ml-2">Trusted by 100+ businesses</span>
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
                  <Building2 className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Multiple Sectors</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Offices, retail, healthcare, and more
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Fully Insured</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  £5M public liability insurance coverage
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Flexible Hours</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Daily, nightly, or weekend cleaning available
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Custom Contracts</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tailored cleaning schedules to fit your business
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-[#003366]">Our Services</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#003366]">Office Cleaning</h3>
                    <p className="text-gray-600 text-sm">Desks, floors, kitchens, and meeting rooms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#003366]">Retail Cleaning</h3>
                    <p className="text-gray-600 text-sm">Shop floors, changing rooms, and display areas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#003366]">Deep Cleaning</h3>
                    <p className="text-gray-600 text-sm">Comprehensive periodic deep cleans</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#003366]">Specialist Services</h3>
                    <p className="text-gray-600 text-sm">Carpet cleaning, window cleaning, and more</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-[#003366]">Request a Quote</CardTitle>
                <CardDescription>
                  Get detailed pricing for commercial cleaning services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our transparent pricing structure covers all types of commercial cleaning. Contact us for a custom quote tailored to your business needs.
                </p>
                <Button asChild className="w-full bg-[#003366] hover:bg-[#004080] rounded-xl">
                  <Link href="/contact">Request Custom Quote</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-br from-[#003366]/5 to-[#004080]/5 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-[#003366]">Ready to Discuss Your Needs?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Contact us today for a free consultation and site visit. We'll create a cleaning plan tailored to your business.
            </p>
            <Button asChild size="lg" className="bg-[#003366] hover:bg-[#004080] h-14 px-8 text-lg rounded-xl shadow-lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
