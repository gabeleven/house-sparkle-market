
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Maximize2 } from 'lucide-react';

interface BaseWidgetProps {
  title: string;
  children: React.ReactNode;
  onConfigure?: () => void;
  onExpand?: () => void;
  className?: string;
}

export const BaseWidget = ({ 
  title, 
  children, 
  onConfigure, 
  onExpand, 
  className = "" 
}: BaseWidgetProps) => {
  return (
    <Card className={`bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-shadow ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex gap-1">
          {onConfigure && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onConfigure}
              className="h-8 w-8 p-0"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
          {onExpand && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onExpand}
              className="h-8 w-8 p-0"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
