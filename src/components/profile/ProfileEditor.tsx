
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
import { isValidProfileData, isValidCustomerProfileData } from '@/utils/typeGuards';
import { ServiceTypesSelector } from './ServiceTypesSelector';
import { 
  validatePhone, 
  validateHourlyRate, 
  validateYearsExperience,
  validateServiceRadius,
  formatPhoneNumber
} from '@/utils/validation';

interface ProfileData {
  full_name: string;
  phone_number: string;
  business_name?: string;
  bio?: string;
  address?: string;
  service_radius_km?: number;
  years_experience?: number;
  hourly_rate?: number;
  banner_image_url?: string;
  is_featured?: boolean;
}

export const ProfileEditor = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    phone_number: '',
    business_name: '',
    bio: '',
    address: '',
    service_radius_km: 10,
    years_experience: 0,
    hourly_rate: 25,
    banner_image_url: '',
    is_featured: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userRole, setUserRole] = useState<string>('customer');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (user) {
      console.log('ProfileEditor: Loading profile for user:', user.id);
      loadProfile();
    }
  }, [user]);

  const ensureProviderProfile = async (userId: string) => {
    console.log('Creating provider profile for user:', userId);
    const { error } = await supabase
      .from('providers')
      .upsert({
        user_id: userId,
        service_radius_km: 25,
        years_experience: 0,
        hourly_rate: 25.00,
        is_featured: false,
        is_profile_complete: false
      });

    if (error) {
      console.error('Error ensuring provider profile:', error);
      throw error;
    }
    console.log('Provider profile created successfully');
  };

  const ensureCustomerProfile = async (userId: string) => {
    console.log('Creating customer profile for user:', userId);
    const { error } = await supabase
      .from('customer_profiles')
      .upsert({
        id: userId,
        preferred_contact_method: 'email',
        location_permission_granted: false,
        looking_for_cleaning: false,
        urgency_level: 'flexible'
      });

    if (error) {
      console.error('Error ensuring customer profile:', error);
      throw error;
    }
    console.log('Customer profile created successfully');
  };

  const loadProfile = async () => {
    if (!user) return;

    try {
      console.log('Loading profile data for user:', user.id);
      
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
        const userRoleValue = profileData.user_role || 'customer';
        console.log('User role detected:', userRoleValue);
        setUserRole(userRoleValue);

        // Set basic profile fields with null safety
        setProfile(prev => ({
          ...prev,
          full_name: profileData.full_name || '',
          phone_number: profileData.phone_number || ''
        }));

        // Get role-specific data
        if (userRoleValue === 'cleaner') {
          console.log('Loading provider-specific data...');
          const { data: providerData, error: providerError } = await supabase
            .from('providers')
            .select('*')
            .eq('user_id', user.id as any)
            .maybeSingle();

          if (providerError && providerError.code !== 'PGRST116') {
            console.error('Provider profile error:', providerError);
          }

          // If no provider profile exists, create one
          if (!providerData) {
            console.log('No provider profile found, creating one...');
            await ensureProviderProfile(user.id);
            // Reload the provider data
            const { data: newProviderData } = await supabase
              .from('providers')
              .select('*')
              .eq('user_id', user.id as any)
              .single();
            
            if (newProviderData) {
              console.log('Provider profile loaded:', newProviderData);
              setProfile(prev => ({
                ...prev,
                business_name: newProviderData.business_name || '',
                bio: newProviderData.bio || '',
                address: newProviderData.address || '',
                service_radius_km: newProviderData.service_radius_km || 25,
                years_experience: newProviderData.years_experience || 0,
                hourly_rate: newProviderData.hourly_rate || 25,
                banner_image_url: newProviderData.banner_image_url || '',
                is_featured: newProviderData.is_featured || false
              }));
            }
          } else {
            console.log('Existing provider profile loaded:', providerData);
            setProfile(prev => ({
              ...prev,
              business_name: providerData.business_name || '',
              bio: providerData.bio || '',
              address: providerData.address || '',
              service_radius_km: providerData.service_radius_km || 25,
              years_experience: providerData.years_experience || 0,
              hourly_rate: providerData.hourly_rate || 25,
              banner_image_url: providerData.banner_image_url || '',
              is_featured: providerData.is_featured || false
            }));
          }
        } else {
          console.log('User is customer, checking for customer profile...');
          const { data: customerData, error: customerError } = await supabase
            .from('customer_profiles')
            .select('*')
            .eq('id', user.id as any)
            .maybeSingle();

          if (customerError && customerError.code !== 'PGRST116') {
            console.error('Customer profile error:', customerError);
          }

          // If no customer profile exists, create one
          if (!customerData) {
            console.log('No customer profile found, creating one...');
            await ensureCustomerProfile(user.id);
          }
        }
      } else {
        console.warn('Invalid or missing profile data, setting defaults');
        setProfile({
          full_name: '',
          phone_number: '',
          business_name: '',
          bio: '',
          address: '',
          service_radius_km: 25,
          years_experience: 0,
          hourly_rate: 25,
          banner_image_url: '',
          is_featured: false
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

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    console.log('Validating form with values:', {
      phone_number: profile.phone_number,
      hourly_rate: profile.hourly_rate,
      years_experience: profile.years_experience,
      service_radius_km: profile.service_radius_km,
      userRole
    });

    if (profile.phone_number && !validatePhone(profile.phone_number)) {
      errors.phone_number = "Invalid phone number format";
    }

    if (userRole === 'cleaner') {
      const hourlyRate = Number(profile.hourly_rate);
      const yearsExp = Number(profile.years_experience);
      const radius = Number(profile.service_radius_km);

      console.log('Cleaner validation - converted values:', {
        hourlyRate,
        yearsExp,
        radius
      });

      if (profile.hourly_rate !== undefined && !validateHourlyRate(hourlyRate)) {
        errors.hourly_rate = "Hourly rate must be greater than $0";
      }

      if (profile.years_experience !== undefined && !validateYearsExperience(yearsExp)) {
        errors.years_experience = "Years of experience must be between 0 and 50";
      }

      if (profile.service_radius_km !== undefined && !validateServiceRadius(radius)) {
        errors.service_radius_km = "Service radius must be between 1 and 100 km";
      }
    }

    console.log('Validation errors:', errors);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!user) return;

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the form errors before saving",
        variant: "destructive"
      });
      return;
    }

    console.log('Saving profile for user:', user.id, 'role:', userRole);
    setSaving(true);
    try {
      // Update basic profile with proper typing
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone_number: profile.phone_number || null
        } as any)
        .eq('id', user.id as any);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }

      // Update role-specific data
      if (userRole === 'cleaner') {
        const providerProfileData = {
          user_id: user.id,
          business_name: profile.business_name || null,
          bio: profile.bio || null,
          address: profile.address || null,
          service_radius_km: Number(profile.service_radius_km) || 25,
          years_experience: Number(profile.years_experience) || 0,
          hourly_rate: Number(profile.hourly_rate) || 25,
          banner_image_url: profile.banner_image_url || null,
          is_profile_complete: true
        };

        console.log('Saving provider profile with data:', providerProfileData);

        const { error: providerError } = await supabase
          .from('providers')
          .upsert(providerProfileData as any);

        if (providerError) {
          console.error('Provider profile update error:', providerError);
          throw providerError;
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setProfile(prev => ({ ...prev, phone_number: formatted }));
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === '') {
      setProfile(prev => ({ ...prev, hourly_rate: undefined }));
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setProfile(prev => ({ ...prev, hourly_rate: numValue }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  console.log('Rendering ProfileEditor with userRole:', userRole, 'profile:', profile);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
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
                onChange={handlePhoneChange}
                placeholder="(514) 123-4567"
              />
              {validationErrors.phone_number && (
                <p className="text-sm text-destructive mt-1">{validationErrors.phone_number}</p>
              )}
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
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell customers about your cleaning services..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Service Area</Label>
                  <Input
                    id="address"
                    value={profile.address || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="e.g. Montreal, Toronto, Vancouver"
                  />
                </div>
                <div>
                  <Label htmlFor="service_radius_km">Service Radius (km)</Label>
                  <Input
                    id="service_radius_km"
                    type="number"
                    min="1"
                    max="100"
                    value={profile.service_radius_km || 25}
                    onChange={(e) => setProfile(prev => ({ ...prev, service_radius_km: parseInt(e.target.value) || 25 }))}
                  />
                  {validationErrors.service_radius_km && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.service_radius_km}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="years_experience">Years of Experience</Label>
                  <Input
                    id="years_experience"
                    type="number"
                    min="0"
                    max="50"
                    value={profile.years_experience || 0}
                    onChange={(e) => setProfile(prev => ({ ...prev, years_experience: parseInt(e.target.value) || 0 }))}
                  />
                  {validationErrors.years_experience && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.years_experience}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="hourly_rate"
                      type="number"
                      min="0.01"
                      step="0.01"
                      max="1000"
                      value={profile.hourly_rate !== undefined ? profile.hourly_rate : ''}
                      onChange={handleRateChange}
                      className="pl-10"
                      placeholder="25.00"
                    />
                  </div>
                  {validationErrors.hourly_rate && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.hourly_rate}</p>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
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
