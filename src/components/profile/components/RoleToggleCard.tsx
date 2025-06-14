
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { RoleToggleSwitch } from './RoleToggleSwitch';
import { RoleToggleContent } from './RoleToggleContent';
import { useRoleToggle } from '../hooks/useRoleToggle';

export const RoleToggleCard = () => {
  const { user } = useAuth();
  const { userRole, loading, handleRoleToggle } = useRoleToggle();

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Account Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please log in to manage your account type.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Account Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RoleToggleSwitch 
          userRole={userRole}
          loading={loading}
          onToggle={handleRoleToggle}
        />
        <RoleToggleContent userRole={userRole} />
      </CardContent>
    </Card>
  );
};
