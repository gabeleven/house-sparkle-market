
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <Switch
        id="theme-toggle"
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
      />
      <Moon className="h-4 w-4" />
      <Label htmlFor="theme-toggle" className="sr-only">
        Toggle dark mode
      </Label>
    </div>
  );
};
