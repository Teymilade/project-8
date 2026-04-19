import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#003366] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Clean Logic Solutions</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional cleaning logistics for Bristol & Bath. You relax, we handle the details.
            </p>
            <p className="text-gray-300 text-sm mt-4">
              Company Reg: 12345678
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/domestic" className="text-gray-300 hover:text-white transition">
                  Domestic Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/commercial" className="text-gray-300 hover:text-white transition">
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/airbnb" className="text-gray-300 hover:text-white transition">
                  Airbnb Turnovers
                </Link>
              </li>
              <li>
                <Link href="/services/end-of-tenancy" className="text-gray-300 hover:text-white transition">
                  End of Tenancy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cleaner-login" className="text-gray-300 hover:text-white transition text-xs opacity-70">
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <p className="text-gray-300 text-sm mb-4">
              Serving Bristol & Bath
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Clean Logic Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
