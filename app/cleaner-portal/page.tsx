'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Clock, MapPin, Upload, CheckCircle2, LogOut, User, Loader2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Shift {
  id: string;
  location: string;
  shift_date: string;
  scheduled_start: string;
  scheduled_end: string;
  actual_check_in: string | null;
  actual_check_out: string | null;
  notes: string | null;
  status: 'scheduled' | 'in_progress' | 'completed';
}

export default function CleanerPortalPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [photos, setPhotos] = useState<{ [key: string]: File[] }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/cleaner-login');
      return;
    }

    if (user && profile && !profile.is_active) {
      toast({
        title: 'Account Inactive',
        description: 'Your account has been deactivated. Please contact your manager.',
        variant: 'destructive',
      });
      signOut();
      router.push('/cleaner-login');
      return;
    }

    if (user) {
      loadShifts();
    }
  }, [user, profile, authLoading, router, toast, signOut]);

  const loadShifts = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('staff_shifts')
      .select('*')
      .eq('staff_id', user.id)
      .gte('shift_date', format(new Date(), 'yyyy-MM-dd'))
      .order('shift_date')
      .order('scheduled_start');

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load shifts',
        variant: 'destructive',
      });
    } else if (data) {
      setShifts(data);
    }
    setLoading(false);
  };

  const handleCheckIn = async (shiftId: string) => {
    const { error } = await supabase
      .from('staff_shifts')
      .update({
        actual_check_in: new Date().toISOString(),
        status: 'in_progress',
      })
      .eq('id', shiftId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to check in',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Checked In',
        description: 'You have successfully checked in to this shift.',
      });
      loadShifts();
    }
  };

  const handlePhotoUpload = (shiftId: string, files: FileList) => {
    const newPhotos = Array.from(files);
    setPhotos({
      ...photos,
      [shiftId]: [...(photos[shiftId] || []), ...newPhotos],
    });
    toast({
      title: 'Photos Uploaded',
      description: `${newPhotos.length} photo(s) added successfully.`,
    });
  };

  const handleCheckOut = async (shiftId: string) => {
    if (!photos[shiftId] || photos[shiftId].length === 0) {
      toast({
        title: 'Photos Required',
        description: 'Please upload at least one photo before checking out.',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('staff_shifts')
      .update({
        actual_check_out: new Date().toISOString(),
        status: 'completed',
      })
      .eq('id', shiftId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to check out',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Checked Out',
        description: 'Shift completed successfully!',
      });
      loadShifts();
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/cleaner-login');
  };

  if (authLoading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#003366]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#fefdfb] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#003366]">Staff Portal</h1>
            <p className="text-gray-600 mt-1">Manage your shifts and check-ins</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="rounded-xl border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Card className="mb-8 rounded-2xl shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-[#003366] rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-[#003366]">{profile.full_name}</CardTitle>
                <CardDescription>
                  <span className="capitalize">{profile.role}</span> • {user?.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#003366]" />
            </div>
          ) : shifts.length === 0 ? (
            <Card className="rounded-2xl shadow-lg border-0">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming shifts scheduled</p>
              </CardContent>
            </Card>
          ) : (
            shifts.map((shift) => (
              <Card key={shift.id} className="rounded-2xl shadow-lg border-0">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2 text-[#003366]">
                        <MapPin className="h-5 w-5" />
                        <span>{shift.location}</span>
                      </CardTitle>
                      <CardDescription className="flex flex-col space-y-1">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(shift.shift_date), 'EEEE, MMM dd, yyyy')}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {shift.scheduled_start} - {shift.scheduled_end}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        shift.status === 'completed'
                          ? 'default'
                          : shift.status === 'in_progress'
                          ? 'secondary'
                          : 'outline'
                      }
                      className="rounded-xl"
                    >
                      {shift.status === 'completed'
                        ? 'Completed'
                        : shift.status === 'in_progress'
                        ? 'In Progress'
                        : 'Scheduled'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {shift.notes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                      <p className="text-sm text-blue-800">
                        <strong>Notes:</strong> {shift.notes}
                      </p>
                    </div>
                  )}

                  {shift.actual_check_in && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                      <p className="text-sm text-green-800">
                        <strong>Checked in at:</strong> {new Date(shift.actual_check_in).toLocaleTimeString()}
                      </p>
                    </div>
                  )}

                  {shift.status === 'scheduled' && (
                    <Button
                      className="w-full bg-[#003366] hover:bg-[#004080] rounded-xl h-12"
                      onClick={() => handleCheckIn(shift.id)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Check In
                    </Button>
                  )}

                  {shift.status === 'in_progress' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#003366]">Upload Photo Evidence</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#003366] transition">
                          <input
                            type="file"
                            id={`photos-${shift.id}`}
                            accept="image/*"
                            multiple
                            onChange={(e) => e.target.files && handlePhotoUpload(shift.id, e.target.files)}
                            className="hidden"
                          />
                          <label htmlFor={`photos-${shift.id}`} className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-700">
                              Click to upload photos
                            </p>
                            <p className="text-xs text-gray-500">
                              {photos[shift.id]?.length || 0} photo(s) uploaded
                            </p>
                          </label>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 rounded-xl h-12"
                        onClick={() => handleCheckOut(shift.id)}
                        disabled={!photos[shift.id] || photos[shift.id].length === 0}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Check Out & Complete
                      </Button>
                    </>
                  )}

                  {shift.status === 'completed' && shift.actual_check_out && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                      <p className="text-sm text-green-800">
                        <strong>Checked out at:</strong> {new Date(shift.actual_check_out).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-green-800 mt-1">
                        <strong>Photos uploaded:</strong> {photos[shift.id]?.length || 0}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
