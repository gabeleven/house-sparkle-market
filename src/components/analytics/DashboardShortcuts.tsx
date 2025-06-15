
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const DashboardShortcuts = () => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          Component Deprecated
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          This component has been replaced by the new customizable widget system. 
          Please use the WidgetGrid component instead.
        </p>
      </CardContent>
    </Card>
  );
};
