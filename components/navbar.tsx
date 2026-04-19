'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FIXED: Increased navbar height from h-20 to h-24 to make room for a bigger logo */}
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* FIXED: Increased image height to h-20 and bumped width constraint to 320 */}
              <Image
                src="/logo.png"
                alt="Clean Logic"
                width={320}
                height={80}
                className="h-14 sm:h-20 w-auto object-contain rounded-md" 
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#003366] font-medium transition">
              Home
            </Link>

            <div className="relative group">
              <button
                className="text-gray-700 hover:text-[#003366] font-medium transition flex items-center"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-xl py-3 border border-gray-100"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link href="/services/domestic" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#003366] transition">
                    Domestic Cleaning
                  </Link>
                  <Link href="/services/commercial" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#003366] transition">
                    Commercial Cleaning
                  </Link>
                  <Link href="/services/airbnb" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#003366] transition">
                    Airbnb Turnovers
                  </Link>
                  <Link href="/services/end-of-tenancy" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#003366] transition">
                    End of Tenancy
                  </Link>
                  <Link href="/services/student-accommodation" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#003366] transition">
                    Student Accommodation
                  </Link>
                  <Link href="/services/after-builders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#003366] transition">
                    After Builders Clean
                  </Link>
                  <Link href="/services/carpet-cleaning" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#003366] transition">
                    Carpet Cleaning
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="text-gray-700 hover:text-[#003366] font-medium transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#003366] font-medium transition">
              Contact
            </Link>
          </div>

          <div className="hidden md:block">
            <Button asChild className="bg-[#003366] hover:bg-[#004080] text-white">
              <Link href="/services/domestic">Get a Quote</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-gray-700 hover:text-[#003366] font-medium">
              Home
            </Link>
            <div className="space-y-2 pl-4">
              <Link href="/services/domestic" className="block text-gray-600 hover:text-[#003366]">
                Domestic Cleaning
              </Link>
              <Link href="/services/commercial" className="block text-gray-600 hover:text-[#003366]">
                Commercial Cleaning
              </Link>
              <Link href="/services/airbnb" className="block text-gray-600 hover:text-[#003366]">
                Airbnb Turnovers
              </Link>
              <Link href="/services/end-of-tenancy" className="block text-gray-600 hover:text-[#003366]">
                End of Tenancy
              </Link>
            </div>
            <Link href="/about" className="block text-gray-700 hover:text-[#003366] font-medium">
              About
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-[#003366] font-medium">
              Contact
            </Link>
            <Button asChild className="w-full bg-[#003366] hover:bg-[#004080] text-white mt-4">
              <Link href="/services/domestic">Get a Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}