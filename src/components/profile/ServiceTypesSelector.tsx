
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ServiceType, serviceTypeLabels, serviceTypeIcons, allServiceTypes } from '@/utils/serviceTypes';
import { useAuth } from '@/hooks/useAuth';

interface ServiceTypesSelectorProps {
  cleanerId: string;
}

export const ServiceTypesSelector = ({ cleanerId }: ServiceTypesSelectorProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSelectedServices();
  }, [cleanerId]);

  const loadSelectedServices = async () => {
    try {
      const { data, error } = await supabase
        .from('cleaner_service_types')
        .select('service_type')
        .eq('cleaner_id', cleanerId);

      if (error) throw error;

      setSelectedServices(data?.map(item => item.service_type as ServiceType) || []);
    } catch (error) {
      console.error('Error loading services:', error);
      toast({
        title: "Error",
        description: "Failed to load service types",
        variant: "destructive"
      });
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
