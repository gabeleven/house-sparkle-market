
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import HeaderLogo from '@/components/header/HeaderLogo';
import NavigationItems from '@/components/header/NavigationItems';
import UserMenu from '@/components/header/UserMenu';
import MobileMenu from '@/components/header/MobileMenu';

const Header = () => {
  const { user, signOut } = useAuth();
  const { currentTier } = useSubscription();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/analytics') return 'Business Analytics';
    if (path === '/analytics/insights') return 'Business Insights';
    if (path === '/analytics/reports') return 'Tax & Reports';
    if (path === '/analytics/intelligence') return 'Market Intelligence';
    if (path === '/analytics/performance') return 'Performance Dashboard';
    return null;
  };

  const pageTitle = getPageTitle();

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Always visible */}
          <HeaderLogo />

          {/* Page Title for Analytics Pages */}
          {pageTitle && (
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>
            </div>
          )}

          {/* Desktop Navigation - Only visible on large screens */}
          <div className="hidden lg:flex items-center justify-end flex-1 space-x-4">
            <nav className="flex items-center space-x-6">
              <NavigationItems isLoggedIn={!!user} />
              
              {/* Additional links for non-logged in users */}
              {!user && (
                <>
                  <Link to="/prestataires" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm whitespace-nowrap">
                    HOUSIE Pro
                  </Link>
                  <Link to="/support" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm whitespace-nowrap">
                    Support
                  </Link>
                </>
              )}
            </nav>
            
            {/* Desktop Controls */}
            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <div className="flex-shrink-0">
                <LanguageToggle />
              </div>
              
              {/* Theme Toggle */}
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
              
              {/* User Menu - Desktop only, with defensive check */}
              <div className="flex-shrink-0">
                <UserMenu 
                  user={user} 
                  currentTier={currentTier} 
                  signOut={signOut}
                />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Controls - Only visible on smaller screens */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Theme and Language toggles for tablet only */}
            <div className="hidden md:flex lg:hidden items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Only shows when menu is open AND on smaller screens */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <MobileMenu
              isOpen={isMenuOpen}
              user={user}
              currentTier={currentTier}
              onClose={closeMobileMenu}
              handleSignOut={handleSignOut}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
