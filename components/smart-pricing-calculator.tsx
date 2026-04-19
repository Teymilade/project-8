'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // This is required to make buttons change pages!
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateStandardPrice, calculateEndOfTenancyPrice, getPricingConfig, DEFAULT_CONFIG, PricingConfig } from '@/lib/pricing';
import { Calculator } from 'lucide-react';

export function SmartPricingCalculator() {
  const router = useRouter(); // Initializes the router
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [serviceType, setServiceType] = useState<'standard' | 'end-of-tenancy'>('standard');
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    async function fetchPricing() {
      const config = await getPricingConfig();
      setPricingConfig(config);
    }
    fetchPricing();
  }, []);

  const standardPricing = calculateStandardPrice({ bedrooms, bathrooms }, pricingConfig);
  const endOfTenancyPricing = calculateEndOfTenancyPrice({ bedrooms, bathrooms }, pricingConfig);
  const currentPricing = serviceType === 'standard' ? standardPricing : endOfTenancyPricing;

  return (
    <Card className="w-full max-w-lg backdrop-blur-sm bg-white/95 shadow-2xl rounded-2xl border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-[#003366]" />
          <CardTitle className="text-2xl text-[#003366]">Instant Quote</CardTitle>
        </div>
        <CardDescription className="text-base">
          Get your price in seconds
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={serviceType} onValueChange={(value) => setServiceType(value as 'standard' | 'end-of-tenancy')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-secondary/50 p-1 rounded-xl">
            <TabsTrigger value="standard" className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Standard Clean
            </TabsTrigger>
            <TabsTrigger value="end-of-tenancy" className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              End of Tenancy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="mt-6 space-y-5">
            <div>
              <Label className="text-base font-semibold text-[#003366]">Bedrooms: {bedrooms}</Label>
              <div className="mt-3">
                <Slider
                  value={[bedrooms]}
                  onValueChange={(value) => setBedrooms(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-6 space-y-3">
              <div className="text-sm text-muted-foreground mb-2">Your Price</div>
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-5xl font-bold text-[#003366]">
                    £{standardPricing.total}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Per clean</p>
                </div>
              </div>
            </div>

            {/* Book Now Button - Routes to Booking Page with URL Parameters */}
            <Button 
              onClick={() => router.push(`/book?bedrooms=${bedrooms}&price=${standardPricing.total}`)}
              className="w-full bg-[#003366] hover:bg-[#004080] text-white h-12 text-base font-semibold rounded-xl shadow-lg"
            >
              Book Now
            </Button>
          </TabsContent>

          <TabsContent value="end-of-tenancy" className="mt-6 space-y-5">
            <div>
              <Label className="text-base font-semibold text-[#003366]">Bedrooms: {bedrooms}</Label>
              <div className="mt-3">
                <Slider
                  value={[bedrooms]}
                  onValueChange={(value) => setBedrooms(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-6 space-y-3">
              <div className="text-sm text-muted-foreground mb-2">Your Price</div>
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-5xl font-bold text-[#003366]">
                    £{endOfTenancyPricing.total}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">One-time deep clean</p>
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="text-lg">✓</span>
                  <span>Deposit Return Guarantee</span>
                </div>
              </div>
            </div>

            {/* Get Quote Button - Routes to End of Tenancy form */}
            <Button 
              onClick={() => router.push('/services/end-of-tenancy')}
              className="w-full bg-[#003366] hover:bg-[#004080] text-white h-12 text-base font-semibold rounded-xl shadow-lg"
            >
              Get Quote
            </Button>
          </TabsContent>
        </Tabs>

        <p className="text-xs text-center text-muted-foreground px-2">
          Available in Bristol (BS) & Bath (BA) postcodes
        </p>
      </CardContent>
    </Card>
  );
}