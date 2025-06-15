
import React, { createContext, useContext, useEffect, useState } from 'react';
import { safeLocalStorage } from '../utils/safeStorage';

type Theme = 'light' | 'dark' | 'pop-art';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  togglePopArt: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = safeLocalStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark', 'pop-art');
    document.documentElement.classList.add(theme);
    
    // Save to localStorage
    safeLocalStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const togglePopArt = () => {
    setTheme(prev => prev === 'pop-art' ? 'light' : 'pop-art');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, togglePopArt }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
