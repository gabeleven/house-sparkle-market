
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
  const [providerId, setProviderId] = useState<string | null>(null);

  useEffect(() => {
    if (cleanerId) {
      console.log('ServiceTypesSelector: Loading services for user:', cleanerId);
      loadSelectedServices();
    }
  }, [cleanerId]);

  const verifyProviderProfile = async () => {
    try {
      console.log('ServiceTypesSelector: Verifying provider profile exists for:', cleanerId);
      const { data: provider, error } = await supabase
        .from('providers')
        .select('id')
        .eq('user_id', cleanerId)
        .maybeSingle();

      if (error) {
        console.error('Error checking provider profile:', error);
        setError('Unable to verify provider profile. Please refresh the page.');
        return null;
      }

      if (!provider) {
        console.error('Provider profile not found for:', cleanerId);
        setError('Provider profile not found. Please complete your profile setup first.');
        return null;
      }

      console.log('ServiceTypesSelector: Provider profile verified, ID:', provider.id);
      setProviderId(provider.id);
      return provider.id;
    } catch (error) {
      console.error('Error verifying provider profile:', error);
      setError('Unable to verify provider profile. Please refresh the page.');
      return null;
    }
  };

  const loadSelectedServices = async () => {
    try {
      setError(null);
      
      // First verify the provider profile exists and get the provider ID
      const providerIdResult = await verifyProviderProfile();
      if (!providerIdResult) {
        setLoading(false);
        return;
      }

      console.log('ServiceTypesSelector: Loading selected services for provider:', providerIdResult);
      const { data, error } = await supabase
        .from('provider_services')
        .select(`
          service_categories(name)
        `)
        .eq('provider_id', providerIdResult)
        .eq('is_available', true);

      if (error) {
        console.error('Error loading services:', error);
        setError('Failed to load service types. Please try again.');
      } else {
        const services = data?.map(item => item.service_categories?.name as ServiceType).filter(Boolean) || [];
        console.log('ServiceTypesSelector: Loaded services:', services);
        setSelectedServices(services);
      }
    } catch (error) {
      console.error('Error loading services:', error);
      setError('Failed to load service types. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceChange = async (serviceType: ServiceType, checked: boolean) => {
    if (!user || !providerId) {
      console.error('ServiceTypesSelector: No user or provider ID found');
      return;
    }

    console.log('ServiceTypesSelector: Changing service', serviceType, 'to', checked);

    try {
      if (checked) {
        // Get the service category ID
        const { data: category, error: categoryError } = await supabase
          .from('service_categories')
          .select('id')
          .eq('name', serviceType)
          .single();

        if (categoryError) {
          console.error('Error finding service category:', categoryError);
          throw categoryError;
        }

        // Add service
        const { error } = await supabase
          .from('provider_services')
          .insert({
            provider_id: providerId,
            service_category_id: category.id,
            is_available: true
          });

        if (error) throw error;
        setSelectedServices(prev => [...prev, serviceType]);
        console.log('ServiceTypesSelector: Added service:', serviceType);
      } else {
        // Get the service category ID
        const { data: category, error: categoryError } = await supabase
          .from('service_categories')
          .select('id')
          .eq('name', serviceType)
          .single();

        if (categoryError) {
          console.error('Error finding service category:', categoryError);
          throw categoryError;
        }

        // Remove service
        const { error } = await supabase
          .from('provider_services')
          .delete()
          .eq('provider_id', providerId)
          .eq('service_category_id', category.id);

        if (error) throw error;
        setSelectedServices(prev => prev.filter(s => s !== serviceType));
        console.log('ServiceTypesSelector: Removed service:', serviceType);
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
