import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { CheckCircle2, Sparkles, Home, Star } from 'lucide-react';

export default function CarpetCleaningPage() {
  return (
    <div className="bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb]">
      <section className="bg-gradient-to-br from-[#003366] to-[#004080] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Carpet Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Professional carpet deep cleaning for homes and businesses
            </p>
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-200 ml-2">Fresh, clean carpets guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Deep Clean</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Professional hot water extraction method
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Home className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Quick Drying</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Fast drying times, minimal disruption
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Eco-Friendly</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Safe, non-toxic cleaning solutions
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#003366] mb-8">Simple Pricing</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="rounded-xl border-2 border-[#003366]/20">
                <CardContent className="pt-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#003366] mb-2">Per Room</h3>
                    <div className="text-5xl font-bold text-[#003366] mb-2">£39</div>
                    <p className="text-gray-600 text-sm">Standard room size</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Hot water extraction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Stain treatment included</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Deodorizing treatment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-2 border-[#003366]/20">
                <CardContent className="pt-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#003366] mb-2">Hallways</h3>
                    <div className="text-5xl font-bold text-[#003366] mb-2">£26-£39</div>
                    <p className="text-gray-600 text-sm">Depending on size</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">High-traffic treatment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Staircase included</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Spot treatment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#003366] mb-6">Ready to Book?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Contact us for a quote or to schedule your carpet cleaning
            </p>
            <Button asChild size="lg" className="bg-[#003366] hover:bg-[#004080] text-white h-14 px-8 text-lg rounded-xl shadow-lg">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
