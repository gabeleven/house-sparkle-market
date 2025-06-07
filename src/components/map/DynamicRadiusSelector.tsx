
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface DynamicRadiusSelectorProps {
  currentRadius: number;
  onRadiusChange: (radius: number) => void;
  searchLocation?: { lat: number; lng: number; address: string } | null;
}

const radiusOptions = [10, 25, 50, 100];

export const DynamicRadiusSelector = ({ currentRadius, onRadiusChange, searchLocation }: DynamicRadiusSelectorProps) => {
  if (!searchLocation) return null;

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Search Radius</h4>
            <p className="text-sm text-gray-600">
              Within {currentRadius}km of {searchLocation.address}
            </p>
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
