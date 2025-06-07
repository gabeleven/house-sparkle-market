import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, DollarSign } from 'lucide-react';
import { isValidProfileData, isValidCleanerProfileData, isValidCustomerProfileData } from '@/utils/typeGuards';
import { ServiceTypesSelector } from './ServiceTypesSelector';

interface ProfileData {
  full_name: string;
  phone_number: string;
  business_name?: string;
  brief_description?: string;
  service_area_city?: string;
  service_radius_km?: number;
  years_experience?: number;
  hourly_rate?: number;
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
    hourly_rate: 25
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
      // Get basic profile info with proper error handling
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id as any)
        .maybeSingle();

      if (profileError) {
        console.error('Profile error:', profileError);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      if (profileData && isValidProfileData(profileData)) {
        // Safe type checking for user_role
        const userRoleValue = profileData.user_role || 'customer';
        setUserRole(userRoleValue);

        // Get role-specific data
        if (userRoleValue === 'cleaner') {
          const { data: cleanerData, error: cleanerError } = await supabase
            .from('cleaner_profiles')
            .select('*')
            .eq('id', user.id as any)
            .maybeSingle();

          if (cleanerError && cleanerError.code !== 'PGRST116') {
            console.error('Cleaner profile error:', cleanerError);
          }

          if (cleanerData && isValidCleanerProfileData(cleanerData)) {
            setProfile({
              full_name: profileData.full_name || '',
              phone_number: profileData.phone_number || '',
              business_name: cleanerData.business_name || '',
              brief_description: cleanerData.brief_description || '',
              service_area_city: cleanerData.service_area_city || '',
              service_radius_km: cleanerData.service_radius_km || 10,
              years_experience: cleanerData.years_experience || 0,
              hourly_rate: cleanerData.hourly_rate || 25
            });
          } else {
            setProfile(prev => ({
              ...prev,
              full_name: profileData.full_name || '',
              phone_number: profileData.phone_number || ''
            }));
          }
        } else {
          const { data: customerData, error: customerError } = await supabase
            .from('customer_profiles')
            .select('*')
            .eq('id', user.id as any)
            .maybeSingle();

          if (customerError && customerError.code !== 'PGRST116') {
            console.error('Customer profile error:', customerError);
          }

          setProfile({
            full_name: profileData.full_name || '',
            phone_number: profileData.phone_number || ''
          });
        }
      } else {
        // Handle case where profile data is invalid or missing
        console.warn('Invalid or missing profile data');
        setProfile({
          full_name: '',
          phone_number: '',
          business_name: '',
          brief_description: '',
          service_area_city: '',
          service_radius_km: 10,
          years_experience: 0,
          hourly_rate: 25
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
      // Update basic profile with proper typing
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone_number: profile.phone_number
        } as any)
        .eq('id', user.id as any);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }

      // Update role-specific data
      if (userRole === 'cleaner') {
        const cleanerProfileData = {
          id: user.id,
          business_name: profile.business_name || null,
          brief_description: profile.brief_description || null,
          service_area_city: profile.service_area_city || null,
          service_radius_km: profile.service_radius_km || 10,
          years_experience: profile.years_experience || 0,
          hourly_rate: Number(profile.hourly_rate) || 25,
          is_profile_complete: true
        };

        console.log('Saving cleaner profile with hourly_rate:', cleanerProfileData.hourly_rate);

        const { error: cleanerError } = await supabase
          .from('cleaner_profiles')
          .upsert(cleanerProfileData as any);

        if (cleanerError) {
          console.error('Cleaner profile update error:', cleanerError);
          throw cleanerError;
        }
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

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty string for temporary states while typing
    if (value === '') {
      setProfile(prev => ({ ...prev, hourly_rate: undefined }));
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setProfile(prev => ({ ...prev, hourly_rate: numValue }));
    }
  };

  const isRateValid = () => {
    return userRole !== 'cleaner' || (profile.hourly_rate !== undefined && profile.hourly_rate > 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
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
                  value={profile.business_name || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, business_name: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="brief_description">Brief Description</Label>
                <Textarea
                  id="brief_description"
                  value={profile.brief_description || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, brief_description: e.target.value }))}
                  placeholder="Tell customers about your cleaning services..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="service_area_city">Service Area City</Label>
                  <Input
                    id="service_area_city"
                    value={profile.service_area_city || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, service_area_city: e.target.value }))}
                    placeholder="e.g. Montreal, Toronto, Vancouver"
                  />
                </div>
                <div>
                  <Label htmlFor="service_radius_km">Service Radius (km)</Label>
                  <Input
                    id="service_radius_km"
                    type="number"
                    min="1"
                    value={profile.service_radius_km || 10}
                    onChange={(e) => setProfile(prev => ({ ...prev, service_radius_km: parseInt(e.target.value) || 10 }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="years_experience">Years of Experience</Label>
                  <Input
                    id="years_experience"
                    type="number"
                    min="0"
                    value={profile.years_experience || 0}
                    onChange={(e) => setProfile(prev => ({ ...prev, years_experience: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="hourly_rate"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={profile.hourly_rate !== undefined ? profile.hourly_rate : ''}
                      onChange={handleRateChange}
                      className="pl-10"
                      placeholder="25.00"
                    />
                  </div>
                  {!isRateValid() && (
                    <p className="text-sm text-red-500 mt-1">Rate must be greater than $0</p>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving || !isRateValid()}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {userRole === 'cleaner' && user && (
        <ServiceTypesSelector cleanerId={user.id} />
      )}
    </div>
  );
};
