'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Grab the price and bedrooms from the URL that the calculator passed over
  const initialPrice = searchParams.get('price') || '0';
  const initialBedrooms = searchParams.get('bedrooms') || '2';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postcode: '',
    frequency: 'weekly',
    bedrooms: parseInt(initialBedrooms),
    bathrooms: 1,
    price: parseFloat(initialPrice),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        throw new Error('Failed to submit booking');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit your booking. Please try again or contact us.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto text-center py-12">
        <CardContent>
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#003366] mb-4">Booking Requested!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you, {formData.name}. We have received your booking request. Our team will contact you shortly to confirm your preferred date and time.
          </p>
          <Button onClick={() => router.push('/')} className="bg-[#003366] hover:bg-[#004080] h-12 px-8">
            Return Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div className="md:col-span-2">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-[#003366]">Complete Your Booking</CardTitle>
            <CardDescription>Enter your details to secure your cleaning service.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="07700 900000" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Address *</Label>
                  <Input required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="123 High Street" />
                </div>
                <div className="space-y-2">
                  <Label>Postcode *</Label>
                  <Input required value={formData.postcode} onChange={(e) => setFormData({...formData, postcode: e.target.value})} placeholder="BS1 2AB" className="uppercase" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Frequency *</Label>
                <Select value={formData.frequency} onValueChange={(val) => setFormData({...formData, frequency: val})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="fortnightly">Fortnightly</SelectItem>
                    <SelectItem value="one-off">One-off Clean</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-[#003366] hover:bg-[#004080] h-14 text-lg rounded-xl shadow-lg" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Confirm Booking Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card className="shadow-lg border-0 bg-gray-50 sticky top-24">
          <CardHeader>
            <CardTitle className="text-xl text-[#003366]">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Service</span>
              <span className="font-medium">Standard Clean</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Bedrooms</span>
              <span className="font-medium">{formData.bedrooms}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Bathrooms</span>
              <span className="font-medium">{formData.bathrooms}</span>
            </div>
            <div className="pt-4">
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-bold text-[#003366]">Total Quoted</span>
                <span className="text-3xl font-bold text-[#003366]">£{formData.price}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Payment is taken after the clean is completed.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb] py-16 px-4">
      <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#003366]" /></div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
}