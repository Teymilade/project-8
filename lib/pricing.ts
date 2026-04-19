import { supabase } from '@/lib/supabase';

export type CleaningFrequency = 'weekly' | 'fortnightly' | 'one-off';
export type ServiceType = 'standard' | 'end-of-tenancy' | 'deep-clean' | 'airbnb';

export interface PricingInput {
  bedrooms: number;
  bathrooms: number;
  frequency?: CleaningFrequency;
}

export interface PricingResult {
  basePrice: number;
  bedroomCost: number;
  bathroomCost: number;
  subtotal: number;
  surcharge: number;
  total: number;
  breakdown: string[];
}

export interface AirbnbPricingResult {
  basePrice: number;
  additionalBedrooms: number;
  total: number;
  monthlyPrice: number;
  breakdown: string[];
}

export interface PricingConfig {
  standard_prices: Record<string, number>;
  end_of_tenancy_prices: Record<string, number>;
  airbnb_monthly_prices: Record<string, number>;
  deep_clean_rate: number;
  airbnb_base: number;
  airbnb_per_bedroom: number;
}

export const DEFAULT_CONFIG: PricingConfig = {
  standard_prices: { "1": 59, "2": 72, "3": 92, "4": 112, "5": 131 },
  end_of_tenancy_prices: { "1": 171, "2": 210, "3": 263, "4": 315, "5": 381 },
  airbnb_monthly_prices: { "1": 379, "2": 499, "3": 599, "4": 679, "5": 749 },
  deep_clean_rate: 40,
  airbnb_base: 40,
  airbnb_per_bedroom: 22
};

export async function getPricingConfig(): Promise<PricingConfig> {
  const { data, error } = await supabase
    .from('pricing_settings')
    .select('*')
    .eq('id', 'default')
    .single();

  if (error || !data) {
    return DEFAULT_CONFIG;
  }
  return data as PricingConfig;
}

export function calculateStandardPrice(input: PricingInput, config: PricingConfig = DEFAULT_CONFIG): PricingResult {
  const bedrooms = Math.min(Math.max(input.bedrooms, 1), 10);
  let basePrice = config.standard_prices[bedrooms.toString()] || config.standard_prices["5"];

  if (bedrooms > 5) {
    basePrice = config.standard_prices["5"] + (bedrooms - 5) * 20;
  }

  return {
    basePrice,
    bedroomCost: 0,
    bathroomCost: 0,
    subtotal: basePrice,
    surcharge: 0,
    total: basePrice,
    breakdown: [`${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}: £${basePrice}`],
  };
}

export function calculateEndOfTenancyPrice(input: PricingInput, config: PricingConfig = DEFAULT_CONFIG): PricingResult {
  const bedrooms = Math.min(Math.max(input.bedrooms, 1), 10);
  let basePrice = config.end_of_tenancy_prices[bedrooms.toString()] || config.end_of_tenancy_prices["5"];

  if (bedrooms > 5) {
    basePrice = config.end_of_tenancy_prices["5"] + (bedrooms - 5) * 50;
  }

  return {
    basePrice,
    bedroomCost: 0,
    bathroomCost: 0,
    subtotal: basePrice,
    surcharge: 0,
    total: basePrice,
    breakdown: [`${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}: £${basePrice}`],
  };
}

export function calculateDeepCleanPrice(rooms: number, config: PricingConfig = DEFAULT_CONFIG): PricingResult {
  const total = rooms * config.deep_clean_rate;
  return {
    basePrice: config.deep_clean_rate,
    bedroomCost: 0,
    bathroomCost: 0,
    subtotal: total,
    surcharge: 0,
    total,
    breakdown: [`${rooms} room${rooms !== 1 ? 's' : ''} × £${config.deep_clean_rate}: £${total}`],
  };
}

export function calculateAirbnbPrice(bedrooms: number, config: PricingConfig = DEFAULT_CONFIG): AirbnbPricingResult {
  const adjustedBedrooms = Math.max(bedrooms, 1);
  const additionalBedrooms = Math.max(adjustedBedrooms - 1, 0);
  const total = config.airbnb_base + (additionalBedrooms * config.airbnb_per_bedroom);
  
  let monthlyPrice = config.airbnb_monthly_prices[adjustedBedrooms.toString()] || config.airbnb_monthly_prices["5"];
  if (adjustedBedrooms > 5) {
    monthlyPrice = config.airbnb_monthly_prices["5"] + (adjustedBedrooms - 5) * 80;
  }

  const breakdown: string[] = [`Base price (1 bed): £${config.airbnb_base}`];
  if (additionalBedrooms > 0) {
    breakdown.push(`${additionalBedrooms} additional bedroom${additionalBedrooms !== 1 ? 's' : ''}: £${additionalBedrooms * config.airbnb_per_bedroom}`);
  }

  return {
    basePrice: config.airbnb_base,
    additionalBedrooms: additionalBedrooms * config.airbnb_per_bedroom,
    total,
    monthlyPrice,
    breakdown,
  };
}

export function formatFrequency(frequency: CleaningFrequency): string {
  const map: Record<CleaningFrequency, string> = {
    weekly: 'Weekly',
    fortnightly: 'Fortnightly',
    'one-off': 'One-off',
  };
  return map[frequency];
}

export function validatePostcode(postcode: string): boolean {
  const cleaned = postcode.trim().toUpperCase().replace(/\s/g, '');
  return cleaned.startsWith('BS') || cleaned.startsWith('BA');
}