import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Clean Logic Solutions | Bristol & Bath Cleaning',
  description: 'Professional, reliable, and vetted domestic and commercial cleaning logistics for Bristol and Bath. You relax, we handle the details.',
  openGraph: {
    title: 'Clean Logic Solutions',
    description: 'Professional cleaning logistics for Bristol & Bath.',
    url: 'https://clean-logic.vercel.app', // Change this to your live domain
    siteName: 'Clean Logic',
    images: [
      {
        url: '/logo.png', // This tells iMessage/WhatsApp to use your new logo!
        width: 1200,
        height: 630,
        alt: 'Clean Logic Solutions Logo',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clean Logic Solutions',
    description: 'Professional cleaning logistics for Bristol & Bath.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
