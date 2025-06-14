
import React from 'react';
import { ProfileEditor } from './ProfileEditor';
import { QuickActions } from './QuickActions';

export const CustomerModeView = () => {
  return (
    <div className="space-y-6">
      <QuickActions />
      <ProfileEditor />
    </div>
  );
};
