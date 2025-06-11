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
import { IntensityThemeToggle } from '@/components/IntensityThemeToggle';

const Header = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [simulatedTier, setSimulatedTier] = useState<SubscriptionTier>(SubscriptionTier.FREE);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with mascot - positioned on the left */}
          <HeaderLogo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationItems isLoggedIn={!!user} />
            
            {/* Show additional links for non-logged in users */}
            {!user && (
              <>
                <Link to="/prestataires" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm">
                  HOUSIE Pro
                </Link>
                <Link to="/support" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm">
                  Support
                </Link>
              </>
            )}
            
            {/* Subscription Simulator - Only show when logged in */}
            {user && (
              <SubscriptionSimulator 
                currentTier={simulatedTier} 
                onTierChange={setSimulatedTier} 
              />
            )}
            
            {/* Intensity Theme Toggle */}
            <IntensityThemeToggle />
            
            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            <UserMenu 
              user={user} 
              simulatedTier={simulatedTier} 
              signOut={signOut}
            />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu
          isOpen={isMenuOpen}
          user={user}
          simulatedTier={simulatedTier}
          setSimulatedTier={setSimulatedTier}
          onClose={() => setIsMenuOpen(false)}
          handleSignOut={handleSignOut}
        />
      </div>
    </header>
  );
};

export default Header;
