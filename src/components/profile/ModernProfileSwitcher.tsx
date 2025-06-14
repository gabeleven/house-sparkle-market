
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase } from 'lucide-react';

interface ModernProfileSwitcherProps {
  currentMode: 'customer' | 'cleaner';
  onModeChange: (mode: 'customer' | 'cleaner') => void;
  loading?: boolean;
}

export const ModernProfileSwitcher: React.FC<ModernProfileSwitcherProps> = ({
  currentMode,
  onModeChange,
  loading = false
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold mb-2">Profile Mode</h2>
          <p className="text-sm text-muted-foreground">
            Switch between customer and service provider views
          </p>
        </div>
        
        <ToggleGroup
          type="single"
          value={currentMode}
          onValueChange={(value) => {
            if (value && (value === 'customer' || value === 'cleaner')) {
              onModeChange(value);
            }
          }}
          className="grid grid-cols-2 w-full"
          disabled={loading}
        >
          <ToggleGroupItem
            value="customer"
            className="flex items-center gap-2 py-4 px-6 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 data-[state=on]:border-blue-200"
          >
            <Users className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Customer</div>
              <div className="text-xs text-muted-foreground">Book services</div>
            </div>
          </ToggleGroupItem>
          
          <ToggleGroupItem
            value="cleaner"
            className="flex items-center gap-2 py-4 px-6 data-[state=on]:bg-green-100 data-[state=on]:text-green-700 data-[state=on]:border-green-200"
          >
            <Briefcase className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Provider</div>
              <div className="text-xs text-muted-foreground">Offer services</div>
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};
