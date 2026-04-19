'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { validatePostcode, getPostcodeErrorMessage } from '@/lib/validators';
import { Loader2, Upload, X, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function EndOfTenancyForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    propertyAddress: '',
    postcode: '',
    propertyType: '',
    moveOutDate: '',
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

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

    if (photos.length < 3) {
      toast({
        title: 'Photos Required',
        description: 'Please upload at least 3 photos of the property before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Upload photos to Supabase Storage
      const uploadedUrls = [];
      const folderId = crypto.randomUUID(); // Group photos for this booking

      for (const file of photos) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${folderId}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('eot-photos')
          .upload(fileName, file);

        if (!uploadError && data) {
          const { data: publicUrlData } = supabase.storage
            .from('eot-photos')
            .getPublicUrl(fileName);
          uploadedUrls.push(publicUrlData.publicUrl);
        }
      }

      // 2. Submit booking data to your API
      const response = await fetch('/api/end-of-tenancy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          photoCount: photos.length,
          photoUrls: uploadedUrls
        }),
      });

      if (response.ok) {
        toast({
          title: 'Quote Request Submitted',
          description: 'Thank you! We will review the photos and contact you with a quote within 24 hours.',
        });
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          propertyAddress: '',
          postcode: '',
          propertyType: '',
          moveOutDate: '',
        });
        setPhotos([]);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to submit your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">End of Tenancy Deep Clean</CardTitle>
        <CardDescription>
          Upload photos of the property and we'll provide a tailored quote
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
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
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
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
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

          <div className="grid md:grid-cols-2 gap-4">
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
              <p className="text-xs text-gray-500">Bristol (BS) or Bath (BA) only</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="moveOutDate">Move Out Date *</Label>
              <Input
                id="moveOutDate"
                type="date"
                required
                value={formData.moveOutDate}
                onChange={(e) => setFormData({ ...formData, moveOutDate: e.target.value })}
              />
            </div>
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
                <SelectItem value="1-bed">1 Bedroom Flat</SelectItem>
                <SelectItem value="2-bed">2 Bedroom Flat/House</SelectItem>
                <SelectItem value="3-bed">3 Bedroom House</SelectItem>
                <SelectItem value="4-bed+">4+ Bedroom House</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Property Photos * (Minimum 3 required)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#003366] transition">
              <input
                type="file"
                id="photos"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <label htmlFor="photos" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Click to upload photos
                </p>
                <p className="text-xs text-gray-500">
                  Upload at least 3 photos showing the current state of the property
                </p>
              </label>
            </div>

            {photos.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  {photos.length >= 3 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <span className="h-4 w-4" />
                  )}
                  <span className={photos.length >= 3 ? 'text-green-600 font-medium' : 'text-gray-600'}>
                    {photos.length} photo{photos.length !== 1 ? 's' : ''} uploaded
                    {photos.length < 3 && ` (${3 - photos.length} more required)`}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Why photos?</strong> Photos help us provide an accurate quote and ensure we're prepared for the job. This prevents unexpected "disaster zone" situations for our cleaners.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#003366] hover:bg-[#004080] h-12 text-lg"
            disabled={loading || photos.length < 3}
          >
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Submit for Quote
          </Button>

          <p className="text-xs text-center text-gray-500">
            We'll review your photos and contact you within 24 hours with a detailed quote
          </p>
        </form>
      </CardContent>
    </Card>
  );
}