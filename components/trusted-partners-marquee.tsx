'use client';

import { Building2 } from 'lucide-react';

export function TrustedPartnersMarquee() {
  const partners = [
    'Savills',
    'Knight Frank',
    'CJ Hole',
    'Purple Frog',
    'Bristol Digs',
    'Savills',
    'Knight Frank',
    'CJ Hole',
    'Purple Frog',
    'Bristol Digs',
  ];

  return (
    <section className="py-12 bg-secondary/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#003366]">
          Trusted by Bristol & Bath's Leading Agents
        </h2>
      </div>

      <div className="relative">
        <div className="flex items-center space-x-12 animate-marquee">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 flex-shrink-0 px-6 py-4 bg-white rounded-xl shadow-sm"
            >
              <Building2 className="h-8 w-8 text-gray-400" />
              <span className="text-xl font-semibold text-gray-600 whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
