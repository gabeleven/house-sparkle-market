
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="text-white hover:text-white hover:bg-gray-700 p-2 language-toggle"
      title={`Switch to ${language === 'fr' ? 'English' : 'Français'}`}
    >
      <Globe className="w-4 h-4" />
    </Button>
  );
};
