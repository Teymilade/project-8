'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { validatePostcode, getPostcodeErrorMessage } from '@/lib/validators';
import { Loader2 } from 'lucide-react';

export function AirbnbVettingForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    postcode: '',
    propertyType: '',
    linenService: 'no',
    turnaroundFrequency: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePostcode(formData.postcode)) {
      toast({
        title: 'Invalid Postcode',
        description: getPostcodeErrorMessage(),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/airbnb-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Application Submitted',
          description: 'Thank you! We will review your details and contact you within 24 hours.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyAddress: '',
          postcode: '',
          propertyType: '',
          linenService: 'no',
          turnaroundFrequency: '',
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit your application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Airbnb Vetting Application</CardTitle>
        <CardDescription>
          Tell us about your property and we'll get back to you with a tailored service plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="07123 456789"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Property Address *</Label>
            <Input
              id="address"
              required
              value={formData.propertyAddress}
              onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
              placeholder="123 High Street, Bristol"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postcode">Postcode *</Label>
            <Input
              id="postcode"
              required
              value={formData.postcode}
              onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
              placeholder="BS1 2AB"
              className="uppercase"
            />
            <p className="text-xs text-gray-500">We currently serve Bristol (BS) and Bath (BA) postcodes</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type *</Label>
            <Select
              value={formData.propertyType}
              onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="1-bed">1 Bedroom</SelectItem>
                <SelectItem value="2-bed">2 Bedrooms</SelectItem>
                <SelectItem value="3-bed">3 Bedrooms</SelectItem>
                <SelectItem value="4-bed+">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Linen Service Required? *</Label>
            <RadioGroup
              value={formData.linenService}
              onValueChange={(value) => setFormData({ ...formData, linenService: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="linen-yes" />
                <Label htmlFor="linen-yes" className="font-normal cursor-pointer">
                  Yes, include linen service
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="linen-no" />
                <Label htmlFor="linen-no" className="font-normal cursor-pointer">
                  No, cleaning only
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Expected Turnaround Frequency *</Label>
            <Select
              value={formData.turnaroundFrequency}
              onValueChange={(value) => setFormData({ ...formData, turnaroundFrequency: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="2-3-per-week">2-3 times per week</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="fortnightly">Fortnightly</SelectItem>
                <SelectItem value="as-needed">As needed (irregular)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#003366] hover:bg-[#004080] h-12 text-lg"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Submit Application
          </Button>

          <p className="text-xs text-center text-gray-500">
            We'll review your application and contact you within 24 hours with a tailored quote
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
