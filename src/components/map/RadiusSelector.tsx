
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface RadiusSelectorProps {
  currentRadius: number;
  onRadiusChange: (radius: number) => void;
  userLocation?: { latitude: number; longitude: number } | null;
}

const radiusOptions = [5, 10, 25, 50];

export const RadiusSelector = ({ currentRadius, onRadiusChange, userLocation }: RadiusSelectorProps) => {
  if (!userLocation) return null;

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Search Radius</h4>
            <p className="text-sm text-gray-600">Adjust how far to look for cleaners</p>
          </div>
          
          <div className="flex gap-2">
            {radiusOptions.map((radius) => (
              <Button
                key={radius}
                variant={currentRadius === radius ? "default" : "outline"}
                size="sm"
                onClick={() => onRadiusChange(radius)}
                className={currentRadius === radius ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {radius}km
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
