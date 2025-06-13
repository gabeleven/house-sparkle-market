
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center border border-gray-600 rounded-md">
      <Button
        variant={language === 'fr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('fr')}
        className="rounded-r-none border-r border-gray-600 text-white hover:text-white hover:bg-gray-700"
      >
        FR
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="rounded-l-none text-white hover:text-white hover:bg-gray-700"
      >
        EN
      </Button>
    </div>
  );
};
