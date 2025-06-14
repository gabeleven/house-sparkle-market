
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ServiceType, 
  ServiceCategory,
  serviceCategoryLabels,
  serviceCategoryIcons,
  servicesByCategory,
  serviceTypeLabels,
  serviceTypeIcons
} from '@/utils/serviceTypes';
import { useAuth } from '@/hooks/useAuth';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

interface HierarchicalServiceTypesSelectorProps {
  cleanerId: string;
}

export const HierarchicalServiceTypesSelector = ({ cleanerId }: HierarchicalServiceTypesSelectorProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [providerId, setProviderId] = useState<string | null>(null);

  useEffect(() => {
    if (cleanerId) {
      console.log('HierarchicalServiceTypesSelector: Loading services for user:', cleanerId);
      loadSelectedServices();
    }
  }, [cleanerId]);

  const verifyProviderProfile = async () => {
    try {
      console.log('HierarchicalServiceTypesSelector: Verifying provider profile exists for:', cleanerId);
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

      console.log('HierarchicalServiceTypesSelector: Provider profile verified, ID:', provider.id);
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
      
      const providerIdResult = await verifyProviderProfile();
      if (!providerIdResult) {
        setLoading(false);
        return;
      }

      console.log('HierarchicalServiceTypesSelector: Loading selected services for provider:', providerIdResult);
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
        console.log('HierarchicalServiceTypesSelector: Loaded services:', services);
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
      console.error('HierarchicalServiceTypesSelector: No user or provider ID found');
      return;
    }

    console.log('HierarchicalServiceTypesSelector: Changing service', serviceType, 'to', checked);

    try {
      if (checked) {
        const { data: category, error: categoryError } = await supabase
          .from('service_categories')
          .select('id')
          .eq('name', serviceType)
          .single();

        if (categoryError) {
          console.error('Error finding service category:', categoryError);
          throw categoryError;
        }

        const { error } = await supabase
          .from('provider_services')
          .insert({
            provider_id: providerId,
            service_category_id: category.id,
            is_available: true
          });

        if (error) throw error;
        setSelectedServices(prev => [...prev, serviceType]);
        console.log('HierarchicalServiceTypesSelector: Added service:', serviceType);
      } else {
        const { data: category, error: categoryError } = await supabase
          .from('service_categories')
          .select('id')
          .eq('name', serviceType)
          .single();

        if (categoryError) {
          console.error('Error finding service category:', categoryError);
          throw categoryError;
        }

        const { error } = await supabase
          .from('provider_services')
          .delete()
          .eq('provider_id', providerId)
          .eq('service_category_id', category.id);

        if (error) throw error;
        setSelectedServices(prev => prev.filter(s => s !== serviceType));
        console.log('HierarchicalServiceTypesSelector: Removed service:', serviceType);
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

  const getCategoryServiceCount = (category: ServiceCategory) => {
    const categoryServices = servicesByCategory[category];
    return categoryServices.filter(service => selectedServices.includes(service)).length;
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
        <NavigationMenu className="w-full max-w-none">
          <NavigationMenuList className="flex-wrap justify-start space-x-2">
            {Object.entries(servicesByCategory).map(([category, services]) => {
              const CategoryIcon = serviceCategoryIcons[category as ServiceCategory];
              const selectedCount = getCategoryServiceCount(category as ServiceCategory);
              
              return (
                <NavigationMenuItem key={category}>
                  <NavigationMenuTrigger className="h-auto px-4 py-3 bg-background hover:bg-accent/50 data-[state=open]:bg-accent/50">
                    <div className="flex items-center space-x-2">
                      <CategoryIcon className="w-4 h-4 text-primary" />
                      <span className="font-medium">
                        {serviceCategoryLabels[category as ServiceCategory]}
                      </span>
                      {selectedCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full ml-2">
                          {selectedCount}
                        </span>
                      )}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </NavigationMenuTrigger>
                  
                  <NavigationMenuContent className="min-w-[400px] p-4 bg-background border shadow-lg">
                    <div className="grid grid-cols-2 gap-4">
                      {services.map((serviceType) => {
                        const ServiceIcon = serviceTypeIcons[serviceType];
                        const isSelected = selectedServices.includes(serviceType);
                        
                        return (
                          <div 
                            key={serviceType} 
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer"
                            onClick={() => handleServiceChange(serviceType, !isSelected)}
                          >
                            <Checkbox
                              id={`${category}-${serviceType}`}
                              checked={isSelected}
                              onChange={() => {}} // Handled by parent div click
                              className="pointer-events-none" // Prevent double handling
                            />
                            <Label 
                              htmlFor={`${category}-${serviceType}`}
                              className="flex items-center space-x-2 cursor-pointer flex-1 pointer-events-none"
                            >
                              <ServiceIcon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{serviceTypeLabels[serviceType]}</span>
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </CardContent>
    </Card>
  );
};
