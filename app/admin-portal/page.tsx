'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Calendar, Clock, Users, Plus, LogOut, Loader2, Trash2, PoundSterling, Mail, UserPlus } from 'lucide-react';
import { format } from 'date-fns';
import { getPricingConfig, DEFAULT_CONFIG, PricingConfig } from '@/lib/pricing';

interface StaffMember {
  id: string;
  full_name: string;
  role: string;
  phone: string;
  is_active: boolean;
}

interface Shift {
  id: string;
  staff_id: string;
  shift_date: string;
  scheduled_start: string;
  scheduled_end: string;
  location: string;
  notes: string | null;
  status: string;
  staff_profiles: {
    full_name: string;
  };
}

export default function AdminPortalPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, profile, signOut, loading: authLoading } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [pricing, setPricing] = useState<PricingConfig>(DEFAULT_CONFIG);
  
  // Dialog states
  const [isCreateShiftOpen, setIsCreateShiftOpen] = useState(false);
  const [isCreateStaffOpen, setIsCreateStaffOpen] = useState(false);

  // Form states
  const [newShift, setNewShift] = useState({
    staff_id: '',
    shift_date: format(new Date(), 'yyyy-MM-dd'),
    scheduled_start: '09:00',
    scheduled_end: '17:00',
    location: '',
    notes: '',
  });

  const [newStaff, setNewStaff] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'cleaner',
    password: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/cleaner-login');
      return;
    }

    if (user && profile) {
      if (!profile.is_active) {
        toast({
          title: 'Account Inactive',
          description: 'Your account has been deactivated.',
          variant: 'destructive',
        });
        signOut();
        router.push('/cleaner-login');
        return;
      }

      if (profile.role !== 'admin' && profile.role !== 'manager') {
        toast({
          title: 'Access Denied',
          description: 'You do not have permission to access this page.',
          variant: 'destructive',
        });
        router.push('/cleaner-portal');
        return;
      }

      loadData();
    }
  }, [user, profile, authLoading, router, toast, signOut]);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([loadStaff(), loadShifts(), loadPricing()]);
    setLoading(false);
  };

  const loadStaff = async () => {
    const { data, error } = await supabase
      .from('staff_profiles')
      .select('*')
      .order('full_name');

    if (data) setStaff(data);
  };

  const loadShifts = async () => {
    const { data, error } = await supabase
      .from('staff_shifts')
      .select(`*, staff_profiles (full_name)`)
      .gte('shift_date', format(new Date(), 'yyyy-MM-dd'))
      .order('shift_date')
      .order('scheduled_start');

    if (data) setShifts(data as any);
  };

  const loadPricing = async () => {
    const config = await getPricingConfig();
    setPricing(config);
  };

  const handleUpdatePricing = async (field: keyof PricingConfig, value: number) => {
    const { error } = await supabase
      .from('pricing_settings')
      .update({ [field]: value })
      .eq('id', 'default');

    if (error) {
      toast({ title: 'Error', description: 'Failed to update pricing', variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Pricing updated live on website' });
      setPricing({ ...pricing, [field]: value });
    }
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to create staff');

      toast({
        title: 'Success',
        description: 'Staff member created. They have been emailed their login details.',
      });

      setIsCreateStaffOpen(false);
      setNewStaff({ fullName: '', email: '', phone: '', role: 'cleaner', password: '' });
      loadStaff();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShift = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('staff_shifts')
      .insert([{
        ...newShift,
        created_by: user?.id,
      }]);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      const assignedStaff = staff.find(s => s.id === newShift.staff_id);
      
      // Attempt to send email notification
      try {
        await fetch('/api/notify-shift', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shiftDetails: newShift,
            staffName: assignedStaff?.full_name || 'Team Member',
            staffEmail: 'hello@cleanlogic.co.uk' // In production, this should pull the actual staff email
          })
        });
      } catch (err) {
        console.error("Could not send email", err);
      }

      toast({ title: 'Success', description: 'Shift created and notification sent' });
      setIsCreateShiftOpen(false);
      setNewShift({
        staff_id: '',
        shift_date: format(new Date(), 'yyyy-MM-dd'),
        scheduled_start: '09:00',
        scheduled_end: '17:00',
        location: '',
        notes: '',
      });
      loadShifts();
    }

    setLoading(false);
  };

  const handleDeleteShift = async (shiftId: string) => {
    if (!confirm('Are you sure you want to delete this shift?')) return;
    const { error } = await supabase.from('staff_shifts').delete().eq('id', shiftId);
    if (!error) {
      toast({ title: 'Success', description: 'Shift deleted' });
      loadShifts();
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/cleaner-login');
  };

  if (authLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#003366]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#003366]">Admin Portal</h1>
            <p className="text-gray-600 mt-1">Manage staff, shifts, and website pricing</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="rounded-xl">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="shifts" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="shifts">Shifts</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            {profile.role === 'admin' && <TabsTrigger value="pricing">Pricing</TabsTrigger>}
          </TabsList>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#003366]">Live Website Pricing</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-2xl shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg text-[#003366]">Deep Clean Rate</CardTitle>
                  <CardDescription>Price per room</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <PoundSterling className="h-5 w-5 text-gray-500" />
                    <Input 
                      type="number" 
                      value={pricing.deep_clean_rate} 
                      onChange={(e) => setPricing({...pricing, deep_clean_rate: Number(e.target.value)})} 
                    />
                  </div>
                  <Button onClick={() => handleUpdatePricing('deep_clean_rate', pricing.deep_clean_rate)} className="w-full bg-[#003366]">Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg text-[#003366]">Airbnb Base Price</CardTitle>
                  <CardDescription>Base price for 1 bedroom</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <PoundSterling className="h-5 w-5 text-gray-500" />
                    <Input 
                      type="number" 
                      value={pricing.airbnb_base} 
                      onChange={(e) => setPricing({...pricing, airbnb_base: Number(e.target.value)})} 
                    />
                  </div>
                  <Button onClick={() => handleUpdatePricing('airbnb_base', pricing.airbnb_base)} className="w-full bg-[#003366]">Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg text-[#003366]">Airbnb Per Extra Bed</CardTitle>
                  <CardDescription>Added per additional bedroom</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <PoundSterling className="h-5 w-5 text-gray-500" />
                    <Input 
                      type="number" 
                      value={pricing.airbnb_per_bedroom} 
                      onChange={(e) => setPricing({...pricing, airbnb_per_bedroom: Number(e.target.value)})} 
                    />
                  </div>
                  <Button onClick={() => handleUpdatePricing('airbnb_per_bedroom', pricing.airbnb_per_bedroom)} className="w-full bg-[#003366]">Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Shifts Tab */}
          <TabsContent value="shifts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-[#003366]">Upcoming Shifts</h2>
              <Dialog open={isCreateShiftOpen} onOpenChange={setIsCreateShiftOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#003366] hover:bg-[#004080] rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Shift
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Shift</DialogTitle>
                    <DialogDescription>Schedule a new shift for a staff member</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateShift} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Staff Member</Label>
                      <Select value={newShift.staff_id} onValueChange={(value) => setNewShift({ ...newShift, staff_id: value })} required>
                        <SelectTrigger><SelectValue placeholder="Select staff member" /></SelectTrigger>
                        <SelectContent>
                          {staff.filter(s => s.is_active && s.role === 'cleaner').map(s => (
                            <SelectItem key={s.id} value={s.id}>{s.full_name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" value={newShift.shift_date} onChange={(e) => setNewShift({ ...newShift, shift_date: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Input type="time" value={newShift.scheduled_start} onChange={(e) => setNewShift({ ...newShift, scheduled_start: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <Input type="time" value={newShift.scheduled_end} onChange={(e) => setNewShift({ ...newShift, scheduled_end: e.target.value })} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input value={newShift.location} onChange={(e) => setNewShift({ ...newShift, location: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <Textarea value={newShift.notes} onChange={(e) => setNewShift({ ...newShift, notes: e.target.value })} />
                    </div>
                    <Button type="submit" className="w-full bg-[#003366] hover:bg-[#004080]" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Shift
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {shifts.length === 0 ? (
                <p className="text-gray-500">No upcoming shifts scheduled.</p>
              ) : (
                shifts.map((shift) => (
                  <Card key={shift.id} className="rounded-2xl shadow-lg border-0">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-[#003366] flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            {shift.staff_profiles.full_name}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{format(new Date(shift.shift_date), 'MMM dd, yyyy')}</span>
                            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{shift.scheduled_start} - {shift.scheduled_end}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteShift(shift.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm"><span className="font-medium text-[#003366]">Location:</span> {shift.location}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Staff Tab with NEW Add Staff functionality */}
          <TabsContent value="staff" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-[#003366]">Staff Members</h2>
              
              <Dialog open={isCreateStaffOpen} onOpenChange={setIsCreateStaffOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#003366] hover:bg-[#004080] rounded-xl">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Staff
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                    <DialogDescription>Create an account and send them an email invite.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateStaff} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Full Name *</Label>
                      <Input required value={newStaff.fullName} onChange={(e) => setNewStaff({...newStaff, fullName: e.target.value})} placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input type="email" required value={newStaff.email} onChange={(e) => setNewStaff({...newStaff, email: e.target.value})} placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input type="tel" value={newStaff.phone} onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})} placeholder="07700 900000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Role *</Label>
                      <Select value={newStaff.role} onValueChange={(value) => setNewStaff({...newStaff, role: value})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cleaner">Cleaner</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Initial Password *</Label>
                      <Input type="text" required value={newStaff.password} onChange={(e) => setNewStaff({...newStaff, password: e.target.value})} placeholder="Create a secure password" />
                      <p className="text-xs text-gray-500">Must be at least 6 characters.</p>
                    </div>
                    <Button type="submit" className="w-full bg-[#003366] hover:bg-[#004080]" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create & Email Staff
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {staff.map((member) => (
                <Card key={member.id} className="rounded-2xl shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-[#003366] text-lg">{member.full_name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Badge variant="outline" className="capitalize">{member.role}</Badge>
                      <Badge variant={member.is_active ? 'default' : 'secondary'}>{member.is_active ? 'Active' : 'Inactive'}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}