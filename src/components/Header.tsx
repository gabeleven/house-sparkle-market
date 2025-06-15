import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import HeaderLogo from './header/HeaderLogo';
import NavigationItems from './header/NavigationItems';
import { ThemeToggle } from './ThemeToggle';
import { IntensityThemeToggle } from './IntensityThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-black text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <HeaderLogo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavigationItems isLoggedIn={!!user} />
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageToggle />
            <ThemeToggle />
            <IntensityThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-300">
                  Bonjour, {user.user_metadata?.full_name || user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  Déconnexion
                </Button>
              </div>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-gray-800"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 rounded-lg mt-2">
              <NavigationItems isLoggedIn={!!user} />
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Thème</span>
                    <ThemeToggle />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Intensité</span>
                    <IntensityThemeToggle />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Langue</span>
                    <LanguageToggle />
                  </div>
                </div>
              </div>

              {user && (
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-gray-300">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="text-white border-white hover:bg-white hover:text-black w-fit"
                    >
                      Déconnexion
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
