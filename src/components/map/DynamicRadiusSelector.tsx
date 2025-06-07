
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown, MapPin } from 'lucide-react';

interface DynamicRadiusSelectorProps {
  currentRadius: number;
  onRadiusChange: (radius: number) => void;
  searchLocation?: { lat: number; lng: number; address: string } | null;
}

const radiusOptions = [10, 25, 50, 100];

export const DynamicRadiusSelector = ({ currentRadius, onRadiusChange, searchLocation }: DynamicRadiusSelectorProps) => {
  if (!searchLocation) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="mb-4 h-auto p-3 flex items-center gap-2 hover:bg-muted/50">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <div className="text-left">
            <div className="font-medium text-foreground">
              Area: {searchLocation.address}
            </div>
            <div className="text-sm text-muted-foreground">
              Within {currentRadius}km radius • Click to modify
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-foreground mb-1">Search Radius</h4>
            <p className="text-sm text-muted-foreground">
              Choose how far to search from {searchLocation.address}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {radiusOptions.map((radius) => (
              <Button
                key={radius}
                variant={currentRadius === radius ? "default" : "outline"}
                size="sm"
                onClick={() => onRadiusChange(radius)}
                className={currentRadius === radius ? "bg-primary text-primary-foreground" : ""}
              >
                {radius}km
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
