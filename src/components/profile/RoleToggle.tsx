
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Users, Briefcase } from 'lucide-react';

export const RoleToggle = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<'customer' | 'cleaner'>('customer');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserRole();
    }
  }, [user]);

  const loadUserRole = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_role')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        setUserRole(data.user_role || 'customer');
      }
    } catch (error) {
      console.error('Error loading user role:', error);
    }
  };

  const createCleanerProfile = async (userId: string) => {
    const { error } = await supabase
      .from('cleaner_profiles')
      .upsert({
        id: userId,
        service_radius_km: 10,
        years_experience: 0,
        hourly_rate: 25.00,
        before_after_photos: [],
        service_badges: [],
        is_featured: false,
        is_profile_complete: false
      });

    if (error) {
      console.error('Error creating cleaner profile:', error);
      throw error;
    }
  };

  const createCustomerProfile = async (userId: string) => {
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
  };

  const handleRoleToggle = async () => {
    if (!user) return;

    setLoading(true);
    const newRole = userRole === 'customer' ? 'cleaner' : 'customer';

    try {
      // Update the user role in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ user_role: newRole })
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      // Create the appropriate role-specific profile record
      if (newRole === 'cleaner') {
        await createCleanerProfile(user.id);
      } else {
        await createCustomerProfile(user.id);
      }

      setUserRole(newRole);
      toast({
        title: "Role Updated",
        description: `You are now registered as a ${newRole}`
      });

      // Refresh the page to update the profile editor
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Account Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className={userRole === 'customer' ? 'font-medium' : 'text-muted-foreground'}>
              Customer
            </span>
          </div>
          
          <Switch
            id="role-toggle"
            checked={userRole === 'cleaner'}
            onCheckedChange={handleRoleToggle}
            disabled={loading}
          />
          
          <div className="flex items-center space-x-3">
            <span className={userRole === 'cleaner' ? 'font-medium' : 'text-muted-foreground'}>
              Cleaner
            </span>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-3">
          {userRole === 'customer' 
            ? 'Switch to cleaner mode to offer cleaning services'
            : 'Switch to customer mode to book cleaning services'
          }
        </p>
      </CardContent>
    </Card>
  );
};
