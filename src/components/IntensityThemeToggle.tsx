
import React from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useIntensityTheme } from '../contexts/IntensityThemeContext';
import { Zap, Sparkles } from 'lucide-react';

export const IntensityThemeToggle = () => {
  const { intensityTheme, toggleIntensityTheme } = useIntensityTheme();

  return (
    <div className="flex items-center space-x-3 bg-card border border-border rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center space-x-2">
        <Sparkles className="h-4 w-4 text-intensity-primary" />
        <Switch
          id="intensity-toggle"
          checked={intensityTheme === 'matte'}
          onCheckedChange={toggleIntensityTheme}
          className="data-[state=checked]:bg-intensity-secondary data-[state=unchecked]:bg-intensity-primary"
        />
        <Zap className="h-4 w-4 text-intensity-secondary" />
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-xs font-medium text-muted-foreground">
          {intensityTheme === 'vibrant' ? 'Vibrant' : 'Matte'}
        </span>
      </div>
      <Label htmlFor="intensity-toggle" className="sr-only">
        Toggle between Vibrant and Matte intensity themes
      </Label>
    </div>
  );
};
