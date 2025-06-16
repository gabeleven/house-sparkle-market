
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
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
    if (path === '/analytics' || path === '/dashboard') return 'Business Analytics';
    if (path === '/analytics/insights') return 'Business Insights';
    if (path === '/analytics/reports') return 'Tax & Reports';
    if (path === '/analytics/intelligence') return 'Market Intelligence';
    if (path === '/analytics/performance') return 'Performance Dashboard';
    if (path === '/provider-dashboard') return 'Provider Dashboard';
    return null;
  };

  const pageTitle = getPageTitle();

  return (
    <header className="bg-black shadow-lg border-b border-gray-800 sticky top-0 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with App Icon */}
          <div className="flex items-center space-x-3 flex-shrink-0 mr-8">
            {/* App Icon with Shadow */}
            <div className="w-10 h-10 bg-gradient-to-br from-[#d50067] to-[#0067bd] rounded-lg flex items-center justify-center shadow-lg app-icon-shadow">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <HeaderLogo />
          </div>

          {/* Page Title for Analytics Pages */}
          {pageTitle && (
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-white">{pageTitle}</h1>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-end flex-1 space-x-1">
            <nav className="flex items-center space-x-1">
              <NavigationItems isLoggedIn={!!user} />
              
              {/* HOUSIE Pro - Always visible */}
              <Link to="/pricing" className="uber-nav-item text-white hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                HOUSIE Pro
              </Link>
            </nav>
            
            {/* Desktop Controls */}
            <div className="flex items-center space-x-3 ml-6">
              {/* Language Toggle */}
              <div className="flex-shrink-0">
                <LanguageToggle />
              </div>
              
              {/* User Menu - Desktop only */}
              <div className="flex-shrink-0">
                <UserMenu 
                  user={user} 
                  currentTier={currentTier} 
                  signOut={signOut}
                />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Language toggle for tablet only */}
            <div className="hidden md:flex lg:hidden items-center space-x-2">
              <LanguageToggle />
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 text-white hover:bg-gray-800"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
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
