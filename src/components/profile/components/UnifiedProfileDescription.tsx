
import React from 'react';

interface UnifiedProfileDescriptionProps {
  userRole: 'customer' | 'cleaner';
}

export const UnifiedProfileDescription = ({ userRole }: UnifiedProfileDescriptionProps) => {
  return (
    <p className="text-sm text-muted-foreground mt-3 text-center">
      {userRole === 'customer' 
        ? 'Switch to cleaner mode to start offering cleaning services and build your business'
        : 'Switch to customer mode to book cleaning services from other professionals'
      }
    </p>
  );
};
