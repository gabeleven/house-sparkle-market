
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUnifiedProfileToggle = (onModeChange: (mode: 'customer' | 'cleaner') => void) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<'customer' | 'cleaner'>('customer');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      console.log('UnifiedProfileToggle: Loading user role for:', user.id);
      loadUserRole();
    }
  }, [user]);

  const loadUserRole = async () => {
    if (!user) return;

    try {
      // Use RLS-compliant query - only authenticated users can see their own profile
      const { data, error } = await supabase
        .from('profiles')
        .select('user_role')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        const role = data.user_role || 'customer';
        console.log('UnifiedProfileToggle: Loaded user role:', role);
        setUserRole(role);
        onModeChange(role);
      } else if (error) {
        console.error('Error loading user role:', error);
        toast({
          title: "Error",
          description: "Failed to load user role",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error loading user role:', error);
      toast({
        title: "Error",
        description: "Failed to load user role",
        variant: "destructive"
      });
    }
  };

  const createProviderProfile = async (userId: string) => {
    console.log('UnifiedProfileToggle: Creating provider profile for:', userId);
    const { error } = await supabase
      .from('providers')
      .upsert({
        user_id: userId,
        service_radius_km: 10,
        years_experience: 0,
        hourly_rate: 25.00,
        is_featured: false,
        is_profile_complete: false
      });

    if (error) {
      console.error('Error creating provider profile:', error);
      throw error;
    }
    console.log('UnifiedProfileToggle: Provider profile created successfully');
  };

  const createCustomerProfile = async (userId: string) => {
    console.log('UnifiedProfileToggle: Creating customer profile for:', userId);
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
      console.error('Error creating customer profile:', error);
      throw error;
    }
    console.log('UnifiedProfileToggle: Customer profile created successfully');
  };

  const handleModeToggle = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to change your profile mode",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const newRole = userRole === 'customer' ? 'cleaner' : 'customer';
    console.log('UnifiedProfileToggle: Switching role from', userRole, 'to', newRole);

    try {
      // Update the user role in profiles table - RLS ensures user can only update their own profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ user_role: newRole })
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      // Create the appropriate role-specific profile record
      if (newRole === 'cleaner') {
        await createProviderProfile(user.id);
      } else {
        await createCustomerProfile(user.id);
      }

      setUserRole(newRole);
      onModeChange(newRole);
      toast({
        title: "Mode Switched",
        description: `You are now in ${newRole} mode`
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to switch mode",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    userRole,
    loading,
    handleModeToggle
  };
};
