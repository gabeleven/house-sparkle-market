
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ServiceType, serviceTypeLabels, serviceTypeIcons, allServiceTypes } from '@/utils/serviceTypes';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle } from 'lucide-react';

interface ServiceTypesSelectorProps {
  cleanerId: string;
}

export const ServiceTypesSelector = ({ cleanerId }: ServiceTypesSelectorProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cleanerId) {
      loadSelectedServices();
    }
  }, [cleanerId]);

  const verifyCleanerProfile = async () => {
    try {
      const { data: cleanerProfile, error } = await supabase
        .from('cleaner_profiles')
        .select('id')
        .eq('id', cleanerId)
        .maybeSingle();

      if (error) {
        console.error('Error checking cleaner profile:', error);
        setError('Unable to verify cleaner profile. Please refresh the page.');
        return false;
      }

      if (!cleanerProfile) {
        setError('Cleaner profile not found. Please complete your profile setup first.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error verifying cleaner profile:', error);
      setError('Unable to verify cleaner profile. Please refresh the page.');
      return false;
    }
  };

  const loadSelectedServices = async () => {
    try {
      setError(null);
      
      // First verify the cleaner profile exists
      const profileExists = await verifyCleanerProfile();
      if (!profileExists) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('cleaner_service_types')
        .select('service_type')
        .eq('cleaner_id', cleanerId);

      if (error) {
        console.error('Error loading services:', error);
        setError('Failed to load service types. Please try again.');
      } else {
        setSelectedServices(data?.map(item => item.service_type as ServiceType) || []);
      }
    } catch (error) {
      console.error('Error loading services:', error);
      setError('Failed to load service types. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceChange = async (serviceType: ServiceType, checked: boolean) => {
    if (!user) return;

    try {
      if (checked) {
        // Add service
        const { error } = await supabase
          .from('cleaner_service_types')
          .insert({
            cleaner_id: cleanerId,
            service_type: serviceType
          });

        if (error) throw error;
        setSelectedServices(prev => [...prev, serviceType]);
      } else {
        // Remove service
        const { error } = await supabase
          .from('cleaner_service_types')
          .delete()
          .eq('cleaner_id', cleanerId)
          .eq('service_type', serviceType);

        if (error) throw error;
        setSelectedServices(prev => prev.filter(s => s !== serviceType));
      }

      toast({
        title: "Success",
        description: `Service ${checked ? 'added' : 'removed'} successfully`
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Services Offered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Services Offered</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services Offered</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allServiceTypes.map((serviceType) => {
            const Icon = serviceTypeIcons[serviceType];
            return (
              <div key={serviceType} className="flex items-center space-x-3">
                <Checkbox
                  id={serviceType}
                  checked={selectedServices.includes(serviceType)}
                  onCheckedChange={(checked) => 
                    handleServiceChange(serviceType, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={serviceType} 
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                  <span>{serviceTypeLabels[serviceType]}</span>
                </Label>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
