'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Message Sent',
          description: 'Thank you for contacting us! We will get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-[#003366] to-[#004080] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-200">
              Get in touch with our team for quotes, questions, or support
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have a question or need a custom quote? Fill out the form and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#003366]/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-[#003366]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">hello@cleanlogic.co.uk</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#003366]/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-[#003366]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">0117 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#003366]/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-[#003366]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Service Area</h3>
                    <p className="text-gray-600">Bristol & Bath</p>
                    <p className="text-gray-600 text-sm">BS & BA postcodes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#003366]/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-[#003366]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8am - 6pm</p>
                    <p className="text-gray-600">Saturday: 9am - 4pm</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Coverage Map</h3>
                <div className="bg-white rounded-lg p-4 border">
                  <p className="text-sm text-gray-600 mb-2">
                    We proudly serve the following areas:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bristol City Centre (BS1)</li>
                    <li>• Clifton & Cotham (BS8)</li>
                    <li>• Redland & Bishopston (BS6, BS7)</li>
                    <li>• Bath City Centre (BA1, BA2)</li>
                    <li>• And all surrounding BS & BA postcodes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll respond as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
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
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your cleaning needs..."
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#003366] hover:bg-[#004080] h-12 text-lg"
                      disabled={loading}
                    >
                      {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
