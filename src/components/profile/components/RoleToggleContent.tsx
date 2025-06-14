
import React from 'react';

interface RoleToggleContentProps {
  userRole: 'customer' | 'cleaner';
}

export const RoleToggleContent = ({ userRole }: RoleToggleContentProps) => {
  return (
    <p className="text-sm text-muted-foreground mt-3">
      {userRole === 'customer' 
        ? 'Switch to cleaner mode to offer cleaning services'
        : 'Switch to customer mode to book cleaning services'
      }
    </p>
  );
};
