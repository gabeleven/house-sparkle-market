
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Palette } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-3 bg-card border border-border rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4 text-[hsl(var(--pop-orange))]" />
        <Switch
          id="theme-toggle"
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
          className="data-[state=checked]:bg-[hsl(var(--pop-blue))] data-[state=unchecked]:bg-[hsl(var(--pop-orange))]"
        />
        <Moon className="h-4 w-4 text-[hsl(var(--pop-blue))]" />
      </div>
      <div className="flex items-center space-x-1">
        <Palette className="h-3 w-3 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">
          {theme === 'light' ? 'Pop' : 'Pro'}
        </span>
      </div>
      <Label htmlFor="theme-toggle" className="sr-only">
        Toggle between Pop Art and Professional theme
      </Label>
    </div>
  );
};
