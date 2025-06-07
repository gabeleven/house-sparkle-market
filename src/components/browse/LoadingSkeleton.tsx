
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-muted rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-3 bg-muted rounded w-1/4"></div>
              <div className="h-8 bg-muted rounded w-1/3"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
