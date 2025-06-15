
import React, { createContext, useContext, useEffect, useState } from 'react';
import { safeLocalStorage } from '../utils/safeStorage';

type IntensityTheme = 'vibrant' | 'matte';

interface IntensityThemeContextType {
  intensityTheme: IntensityTheme;
  toggleIntensityTheme: () => void;
}

const IntensityThemeContext = createContext<IntensityThemeContextType | undefined>(undefined);

export const IntensityThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [intensityTheme, setIntensityTheme] = useState<IntensityTheme>(() => {
    const savedIntensityTheme = safeLocalStorage.getItem('intensityTheme') as IntensityTheme;
    return savedIntensityTheme || 'vibrant';
  });

  useEffect(() => {
    // Apply intensity theme to document
    document.documentElement.classList.remove('vibrant', 'matte');
    document.documentElement.classList.add(intensityTheme);
    
    // Save to localStorage
    safeLocalStorage.setItem('intensityTheme', intensityTheme);
  }, [intensityTheme]);

  const toggleIntensityTheme = () => {
    setIntensityTheme(prev => prev === 'vibrant' ? 'matte' : 'vibrant');
  };

  return (
    <IntensityThemeContext.Provider value={{ intensityTheme, toggleIntensityTheme }}>
      {children}
    </IntensityThemeContext.Provider>
  );
};

export const useIntensityTheme = () => {
  const context = useContext(IntensityThemeContext);
  if (context === undefined) {
    throw new Error('useIntensityTheme must be used within an IntensityThemeProvider');
  }
  return context;
};
