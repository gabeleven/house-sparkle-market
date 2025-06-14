
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

export const UnauthenticatedProfileCard = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          Profile Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground text-center">
          Please log in to manage your profile mode.
        </p>
      </CardContent>
    </Card>
  );
};
