'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth-context';
import { Loader2, Lock, Mail } from 'lucide-react';

export default function CleanerLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, profile, signIn, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user && profile && !authLoading) {
      if (profile.role === 'admin' || profile.role === 'manager') {
        router.push('/admin-portal');
      } else {
        router.push('/cleaner-portal');
      }
    }
  }, [user, profile, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    } else {
      toast({
        title: 'Success',
        description: 'Welcome back! Redirecting to your portal...',
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#003366]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border-0">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-[#003366] rounded-2xl flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl text-[#003366]">Staff Portal</CardTitle>
            <CardDescription className="mt-2">
              Sign in with your staff account credentials
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#003366] font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@cleanlogic.com"
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#003366] font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#003366] hover:bg-[#004080] h-12 rounded-xl text-base"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Contact your manager if you've forgotten your password
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
