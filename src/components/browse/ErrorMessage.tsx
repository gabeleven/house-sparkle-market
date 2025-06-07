
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorMessageProps {
  error: Error;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <p className="text-destructive">
          Error loading cleaners: {error.message || 'Unknown error'}. Please try again.
        </p>
      </CardContent>
    </Card>
  );
};
