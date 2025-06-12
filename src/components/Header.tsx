
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import SubscriptionSimulator from '@/components/SubscriptionSimulator';
import { SubscriptionTier } from '@/types/subscription';
import HeaderLogo from '@/components/header/HeaderLogo';
import NavigationItems from '@/components/header/NavigationItems';
import UserMenu from '@/components/header/UserMenu';
import MobileMenu from '@/components/header/MobileMenu';

const Header = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [simulatedTier, setSimulatedTier] = useState<SubscriptionTier>('FREE');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false); // Close mobile menu on sign out
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Always visible */}
          <HeaderLogo />

          {/* Desktop Navigation - Only visible on md+ screens */}
          <div className="hidden md:flex items-center justify-end flex-1 space-x-4">
            <nav className="flex items-center space-x-6">
              <NavigationItems isLoggedIn={!!user} />
              
              {/* Show additional links for non-logged in users */}
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
              {/* Subscription Simulator - Only show when logged in */}
              {user && (
                <div className="flex-shrink-0">
                  <SubscriptionSimulator 
                    currentTier={simulatedTier} 
                    onTierChange={setSimulatedTier} 
                  />
                </div>
              )}
              
              {/* Language Toggle */}
              <div className="flex-shrink-0">
                <LanguageToggle />
              </div>
              
              {/* Theme Toggle */}
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
              
              {/* User Menu */}
              <UserMenu 
                user={user} 
                simulatedTier={simulatedTier} 
                signOut={signOut}
              />
            </div>
          </div>

          {/* Mobile menu button - Only visible on smaller screens */}
          <div className="flex md:hidden items-center">
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

        {/* Mobile Navigation - Only shows on smaller screens when menu is open */}
        <MobileMenu
          isOpen={isMenuOpen}
          user={user}
          simulatedTier={simulatedTier}
          setSimulatedTier={setSimulatedTier}
          onClose={closeMobileMenu}
          handleSignOut={handleSignOut}
        />
      </div>
    </header>
  );
};

export default Header;
