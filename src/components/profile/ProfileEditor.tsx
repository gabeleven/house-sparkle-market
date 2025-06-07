
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MapPin, DollarSign } from 'lucide-react';

interface ProfileData {
  full_name: string;
  phone_number: string;
  business_name?: string;
  brief_description?: string;
  service_area_city?: string;
  service_radius_km?: number;
  years_experience?: number;
  hourly_rate?: number;
  latitude?: number;
  longitude?: number;
}

export const ProfileEditor = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    phone_number: '',
    business_name: '',
    brief_description: '',
    service_area_city: '',
    service_radius_km: 10,
    years_experience: 0,
    hourly_rate: 0
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userRole, setUserRole] = useState<string>('customer');

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      // Get basic profile info
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      setUserRole(profileData.user_role || 'customer');

      // Get role-specific data
      if (profileData.user_role === 'cleaner') {
        const { data: cleanerData } = await supabase
          .from('cleaner_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (cleanerData) {
          setProfile({
            full_name: profileData.full_name || '',
            phone_number: profileData.phone_number || '',
            business_name: cleanerData.business_name || '',
            brief_description: cleanerData.brief_description || '',
            service_area_city: cleanerData.service_area_city || '',
            service_radius_km: cleanerData.service_radius_km || 10,
            years_experience: cleanerData.years_experience || 0,
            hourly_rate: 25, // Default rate
            latitude: cleanerData.latitude,
            longitude: cleanerData.longitude
          });
        } else {
          setProfile(prev => ({
            ...prev,
            full_name: profileData.full_name || '',
            phone_number: profileData.phone_number || ''
          }));
        }
      } else {
        const { data: customerData } = await supabase
          .from('customer_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile({
          full_name: profileData.full_name || '',
          phone_number: profileData.phone_number || '',
          latitude: customerData?.latitude,
          longitude: customerData?.longitude
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      // Update basic profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone_number: profile.phone_number
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update role-specific data
      if (userRole === 'cleaner') {
        const { error: cleanerError } = await supabase
          .from('cleaner_profiles')
          .upsert({
            id: user.id,
            business_name: profile.business_name,
            brief_description: profile.brief_description,
            service_area_city: profile.service_area_city,
            service_radius_km: profile.service_radius_km,
            years_experience: profile.years_experience,
            latitude: profile.latitude,
            longitude: profile.longitude,
            is_profile_complete: true
          });

        if (cleanerError) throw cleanerError;
      } else {
        const { error: customerError } = await supabase
          .from('customer_profiles')
          .upsert({
            id: user.id,
            latitude: profile.latitude,
            longitude: profile.longitude
          });

        if (customerError) throw customerError;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setProfile(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          toast({
            title: "Location updated",
            description: "Your location has been saved"
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location error",
            description: "Could not get your location",
            variant: "destructive"
          });
        }
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={profile.full_name}
              onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              value={profile.phone_number}
              onChange={(e) => setProfile(prev => ({ ...prev, phone_number: e.target.value }))}
            />
          </div>
        </div>

        {userRole === 'cleaner' && (
          <>
            <div>
              <Label htmlFor="business_name">Business Name</Label>
              <Input
                id="business_name"
                value={profile.business_name}
                onChange={(e) => setProfile(prev => ({ ...prev, business_name: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="brief_description">Brief Description</Label>
              <Textarea
                id="brief_description"
                value={profile.brief_description}
                onChange={(e) => setProfile(prev => ({ ...prev, brief_description: e.target.value }))}
                placeholder="Tell customers about your cleaning services..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service_area_city">Service Area City</Label>
                <Input
                  id="service_area_city"
                  value={profile.service_area_city}
                  onChange={(e) => setProfile(prev => ({ ...prev, service_area_city: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="service_radius_km">Service Radius (km)</Label>
                <Input
                  id="service_radius_km"
                  type="number"
                  value={profile.service_radius_km}
                  onChange={(e) => setProfile(prev => ({ ...prev, service_radius_km: parseInt(e.target.value) }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="years_experience">Years of Experience</Label>
                <Input
                  id="years_experience"
                  type="number"
                  value={profile.years_experience}
                  onChange={(e) => setProfile(prev => ({ ...prev, years_experience: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="hourly_rate"
                    type="number"
                    value={profile.hourly_rate}
                    onChange={(e) => setProfile(prev => ({ ...prev, hourly_rate: parseFloat(e.target.value) }))}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-gray-600">
                {profile.latitude && profile.longitude 
                  ? `Location saved (${profile.latitude.toFixed(4)}, ${profile.longitude.toFixed(4)})` 
                  : 'No location set'
                }
              </p>
            </div>
            <Button variant="outline" onClick={requestLocation}>
              <MapPin className="w-4 h-4 mr-2" />
              Update Location
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
