'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateAirbnbPrice, getPricingConfig, DEFAULT_CONFIG, PricingConfig } from '@/lib/pricing';
import { Key } from 'lucide-react';

export function AirbnbPricingEngine() {
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    async function fetchPricing() {
      const config = await getPricingConfig();
      setPricingConfig(config);
    }
    fetchPricing();
  }, []);

  const monthlyPlans = [
    { bedrooms: 1, price: pricingConfig.airbnb_monthly_prices["1"] || 379, label: '1 Bedroom' },
    { bedrooms: 2, price: pricingConfig.airbnb_monthly_prices["2"] || 499, label: '2 Bedrooms' },
    { bedrooms: 3, price: pricingConfig.airbnb_monthly_prices["3"] || 599, label: '3 Bedrooms' },
    { bedrooms: 4, price: pricingConfig.airbnb_monthly_prices["4"] || 679, label: '4 Bedrooms' },
    { bedrooms: 5, price: pricingConfig.airbnb_monthly_prices["5"] || 749, label: '5 Bedrooms' },
  ];

  const perTurnoverPrice = selectedBedrooms ? calculateAirbnbPrice(selectedBedrooms, pricingConfig) : null;

  return (
    <div className="space-y-8">
      <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-[#003366] to-[#004080] text-white">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Key className="h-6 w-6" />
            <CardTitle className="text-2xl">Airbnb Pricing Engine</CardTitle>
          </div>
          <CardDescription className="text-gray-200">
            Choose your plan or get per-turnover pricing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4 text-lg">Monthly Plans</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthlyPlans.map((plan) => (
                <button
                  key={plan.bedrooms}
                  onClick={() => setSelectedBedrooms(plan.bedrooms)}
                  className={`p-4 rounded-xl transition-all ${
                    selectedBedrooms === plan.bedrooms
                      ? 'bg-white text-[#003366] shadow-lg scale-105'
                      : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{plan.label}</div>
                  <div className="text-2xl font-bold">£{plan.price}</div>
                  <div className="text-xs opacity-75 mt-1">per month</div>
                </button>
              ))}
            </div>
          </div>

          {selectedBedrooms && perTurnoverPrice && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-sm opacity-90 mb-2">Per-Turnover Price</div>
              <div className="flex items-baseline justify-between">
                <div className="text-4xl font-bold">
                  £{perTurnoverPrice.total}
                </div>
                <div className="text-sm opacity-90">
                  per clean
                </div>
              </div>
              {perTurnoverPrice.breakdown.map((item, index) => (
                <p key={index} className="text-sm opacity-75 mt-2">
                  {item}
                </p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedBedrooms && (
        <div className="text-center">
          <Button size="lg" className="bg-[#003366] hover:bg-[#004080] text-white h-12 px-8 rounded-xl shadow-lg">
            Get Started with {selectedBedrooms} Bedroom Plan
          </Button>
        </div>
      )}
    </div>
  );
}