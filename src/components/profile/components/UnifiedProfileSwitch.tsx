
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { ProfileModeDisplay } from './ProfileModeDisplay';

interface UnifiedProfileSwitchProps {
  userRole: 'customer' | 'cleaner';
  loading: boolean;
  onToggle: () => void;
}

export const UnifiedProfileSwitch = ({ userRole, loading, onToggle }: UnifiedProfileSwitchProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
      <ProfileModeDisplay mode="customer" isActive={userRole === 'customer'} />
      
      <Switch
        id="mode-toggle"
        checked={userRole === 'cleaner'}
        onCheckedChange={onToggle}
        disabled={loading}
      />
      
      <ProfileModeDisplay mode="cleaner" isActive={userRole === 'cleaner'} />
    </div>
  );
};
