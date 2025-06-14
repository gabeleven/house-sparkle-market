
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ServiceCategoryMenu } from './ServiceCategoryMenu';
import { useServiceSelection } from '@/hooks/useServiceSelection';
import { allServiceCategories } from '@/utils/serviceTypes';

interface HierarchicalServiceTypesSelectorProps {
  cleanerId: string;
}

export const HierarchicalServiceTypesSelector = ({ cleanerId }: HierarchicalServiceTypesSelectorProps) => {
  const { selectedServices, loading, error, handleServiceChange } = useServiceSelection(cleanerId);

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
            {allServiceCategories.map((category) => (
              <ServiceCategoryMenu
                key={category}
                category={category}
                selectedServices={selectedServices}
                onServiceChange={handleServiceChange}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </CardContent>
    </Card>
  );
};
