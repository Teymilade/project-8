import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { CheckCircle2, HardHat, Sparkles, Shield, Star } from 'lucide-react';

export default function AfterBuildersPage() {
  return (
    <div className="bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb]">
      <section className="bg-gradient-to-br from-[#003366] to-[#004080] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              After Builders Clean
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Dust removal, paint splatter, and site safety specialists
            </p>
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-200 ml-2">Trusted by contractors across Bristol</span>
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
                  <HardHat className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Construction Clean-Up</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Specialist post-construction cleaning
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Dust Removal</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Thorough removal of all construction dust
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Paint Splatter</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Safe removal from all surfaces
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-[#003366]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#003366]">Site Safety</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Trained in construction site protocols
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#003366] mb-8">Services Included</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Construction dust removal',
                'Paint splatter cleaning',
                'Window cleaning (interior & exterior)',
                'Floor deep cleaning & polishing',
                'Fixture & fitting cleaning',
                'Debris removal',
                'Surface sanitization',
                'Final inspection & touch-ups',
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#003366]/5 to-[#004080]/5 rounded-2xl p-8 mb-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-[#003366] mb-4 text-center">Request a Site Visit</h3>
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              For after builders cleans, we require a site visit to provide an accurate quote. This ensures we bring the right equipment and allocate sufficient time for a thorough clean.
            </p>
            <div className="text-center">
              <Button asChild size="lg" className="bg-[#003366] hover:bg-[#004080] text-white h-14 px-8 text-lg rounded-xl shadow-lg">
                <Link href="/contact">Request Site Visit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
