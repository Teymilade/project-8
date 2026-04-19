import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SmartPricingCalculator } from '@/components/smart-pricing-calculator';
import { TrustedPartnersMarquee } from '@/components/trusted-partners-marquee';
import { Home, Building2, Key, Sparkles, CheckCircle2, Star, Users, Shield, Clock } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-[90vh] bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-[#003366] ml-2">Google Verified Business</span>
              </div>

              <div>
                <h1 className="text-5xl md:text-7xl font-bold text-[#003366] mb-6 leading-tight">
                  Come Home to Clean.
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                  Professional cleaning logistics for Bristol & Bath. You relax, we handle the details.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#003366] hover:bg-[#004080] text-white h-14 px-8 text-lg rounded-xl shadow-lg">
                  <Link href="/services/domestic">Get Instant Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-[#003366] text-[#003366] hover:bg-[#003366]/5 h-14 px-8 text-lg rounded-xl">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#003366] mb-1">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#003366] mb-1">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#003366] mb-1">24hr</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <SmartPricingCalculator />
            </div>
          </div>
        </div>
      </section>

      <TrustedPartnersMarquee />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">
              Why Choose Clean Logic?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine professional expertise with warm, personal service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-16 w-16 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-[#003366]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">Fully Vetted & Insured</h3>
                <p className="text-gray-600 leading-relaxed">
                  All our cleaners are DBS checked, professionally trained, and fully insured for your peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-16 w-16 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-[#003366]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">Flexible Scheduling</h3>
                <p className="text-gray-600 leading-relaxed">
                  Book weekly, fortnightly, or one-off cleans. We work around your schedule, not the other way around.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="h-16 w-16 bg-[#003366]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-[#003366]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">Quality Guaranteed</h3>
                <p className="text-gray-600 leading-relaxed">
                  Photo evidence of every job. Not happy? We'll come back and make it right, free of charge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional cleaning solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-0">
              <CardHeader>
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Home className="h-7 w-7 text-[#003366]" />
                </div>
                <CardTitle className="text-[#003366]">Domestic Cleaning</CardTitle>
                <CardDescription className="text-base">
                  Regular or one-off cleaning for your home
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    From £59 per clean
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Vetted professionals
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Flexible scheduling
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full border-[#003366] text-[#003366] hover:bg-[#003366]/5 rounded-xl">
                  <Link href="/services/domestic">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-0">
              <CardHeader>
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Building2 className="h-7 w-7 text-[#003366]" />
                </div>
                <CardTitle className="text-[#003366]">Commercial Cleaning</CardTitle>
                <CardDescription className="text-base">
                  Professional office and retail cleaning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Custom packages
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Fully insured teams
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Evening & weekend service
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full border-[#003366] text-[#003366] hover:bg-[#003366]/5 rounded-xl">
                  <Link href="/services/commercial">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-0">
              <CardHeader>
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Key className="h-7 w-7 text-[#003366]" />
                </div>
                <CardTitle className="text-[#003366]">Airbnb Turnovers</CardTitle>
                <CardDescription className="text-base">
                  Fast, reliable property turnarounds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    From £40 per turnover
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Monthly plans available
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Same-day service
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full border-[#003366] text-[#003366] hover:bg-[#003366]/5 rounded-xl">
                  <Link href="/services/airbnb">Get Vetted</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-0">
              <CardHeader>
                <div className="h-14 w-14 bg-[#003366]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles className="h-7 w-7 text-[#003366]" />
                </div>
                <CardTitle className="text-[#003366]">End of Tenancy</CardTitle>
                <CardDescription className="text-base">
                  Deep cleaning for property handovers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Deposit-back guarantee
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Photo evidence included
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    From £171
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full border-[#003366] text-[#003366] hover:bg-[#003366]/5 rounded-xl">
                  <Link href="/services/end-of-tenancy">Get Quote</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#003366] to-[#004080] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed">
            Get an instant quote and book your first clean in minutes
          </p>
          <Button asChild size="lg" className="bg-white text-[#003366] hover:bg-gray-100 h-14 px-8 text-lg rounded-xl shadow-lg">
            <Link href="/services/domestic">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
