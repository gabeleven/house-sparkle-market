
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'pop-art';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  togglePopArt: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if we're in the browser before accessing localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('theme') as Theme;
      return savedTheme || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark', 'pop-art');
    document.documentElement.classList.add(theme);
    
    // Save to localStorage only in browser
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', theme);
    }
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
