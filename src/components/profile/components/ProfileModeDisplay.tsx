
import React from 'react';
import { Users, Briefcase } from 'lucide-react';

interface ProfileModeDisplayProps {
  mode: 'customer' | 'cleaner';
  isActive: boolean;
}

export const ProfileModeDisplay = ({ mode, isActive }: ProfileModeDisplayProps) => {
  const isCustomer = mode === 'customer';
  const icon = isCustomer ? Users : Briefcase;
  const Icon = icon;
  
  const bgColor = isActive 
    ? (isCustomer ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600')
    : 'bg-muted-foreground/20 text-muted-foreground';

  const title = isCustomer ? 'Customer Mode' : 'Cleaner Mode';
  const description = isCustomer ? 'Book cleaning services' : 'Offer cleaning services';

  return (
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-full ${bgColor}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <span className={`font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
          {title}
        </span>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
