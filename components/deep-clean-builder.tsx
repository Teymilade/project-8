'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateDeepCleanPrice, getPricingConfig, DEFAULT_CONFIG, PricingConfig } from '@/lib/pricing';
import { Home } from 'lucide-react';

export function DeepCleanBuilder() {
  const [rooms, setRooms] = useState(3);
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    async function fetchPricing() {
      const config = await getPricingConfig();
      setPricingConfig(config);
    }
    fetchPricing();
  }, []);

  const pricing = calculateDeepCleanPrice(rooms, pricingConfig);

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-[#003366]" />
          <CardTitle className="text-2xl text-[#003366]">Deep Clean Builder</CardTitle>
        </div>
        <CardDescription>
          £{pricingConfig.deep_clean_rate} per room - You choose how many
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="rooms" className="text-base font-semibold text-[#003366]">
            Total Rooms
          </Label>
          <Input
            id="rooms"
            type="number"
            min="1"
            max="20"
            value={rooms}
            onChange={(e) => setRooms(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-2 h-12 text-lg rounded-xl"
          />
        </div>

        <div className="bg-secondary/30 rounded-2xl p-6">
          <div className="text-sm text-muted-foreground mb-2">Total Price</div>
          <div className="flex items-baseline justify-between">
            <div className="text-5xl font-bold text-[#003366]">
              £{pricing.total}
            </div>
            <div className="text-right text-sm text-muted-foreground">
              {rooms} room{rooms !== 1 ? 's' : ''}<br />× £{pricingConfig.deep_clean_rate}
            </div>
          </div>
        </div>

        <Button className="w-full bg-[#003366] hover:bg-[#004080] text-white h-12 text-base font-semibold rounded-xl">
          Request Quote
        </Button>
      </CardContent>
    </Card>
  );
}