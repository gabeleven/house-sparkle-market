
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Navigation, RotateCcw } from 'lucide-react';

interface MapControlsProps {
  cleanerCount: number;
  onRecenter: () => void;
  onCenterOnUser: () => void;
  onClose?: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  cleanerCount,
  onRecenter,
  onCenterOnUser,
  onClose
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onRecenter}
        className="text-xs"
      >
        <RotateCcw className="w-3 h-3 mr-1" />
        Center
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onCenterOnUser}
        className="text-xs"
      >
        <Navigation className="w-3 h-3 mr-1" />
        My Location
      </Button>
      {onClose && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="text-xs"
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};
