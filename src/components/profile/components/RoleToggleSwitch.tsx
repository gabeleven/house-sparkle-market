
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Users, Briefcase } from 'lucide-react';

interface RoleToggleSwitchProps {
  userRole: 'customer' | 'cleaner';
  loading: boolean;
  onToggle: () => void;
}

export const RoleToggleSwitch = ({ userRole, loading, onToggle }: RoleToggleSwitchProps) => {
  return (
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
        onCheckedChange={onToggle}
        disabled={loading}
      />
      
      <div className="flex items-center space-x-3">
        <span className={userRole === 'cleaner' ? 'font-medium' : 'text-muted-foreground'}>
          Cleaner
        </span>
        <Briefcase className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
};
