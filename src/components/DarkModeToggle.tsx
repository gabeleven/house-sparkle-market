
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const DarkModeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      <Switch 
        checked={isDark} 
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-green-600"
      />
      <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
    </div>
  );
};
