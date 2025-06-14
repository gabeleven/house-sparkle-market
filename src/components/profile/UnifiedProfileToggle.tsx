
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Star } from 'lucide-react';
import { useUnifiedProfileToggle } from './hooks/useUnifiedProfileToggle';
import { UnifiedProfileSwitch } from './components/UnifiedProfileSwitch';
import { UnifiedProfileDescription } from './components/UnifiedProfileDescription';
import { UnauthenticatedProfileCard } from './components/UnauthenticatedProfileCard';

interface UnifiedProfileToggleProps {
  onModeChange: (mode: 'customer' | 'cleaner') => void;
}

export const UnifiedProfileToggle = ({ onModeChange }: UnifiedProfileToggleProps) => {
  const { user } = useAuth();
  const { userRole, loading, handleModeToggle } = useUnifiedProfileToggle(onModeChange);

  // Don't render if user is not authenticated
  if (!user) {
    return <UnauthenticatedProfileCard />;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          Profile Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UnifiedProfileSwitch 
          userRole={userRole}
          loading={loading}
          onToggle={handleModeToggle}
        />
        <UnifiedProfileDescription userRole={userRole} />
      </CardContent>
    </Card>
  );
};
