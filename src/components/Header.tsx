
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Bell, ChevronDown, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SubscriptionTier, getMenuItems } from '@/types/subscription';

const Header = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Mock user subscription - in a real app, this would come from user subscription data
  const userSubscription: SubscriptionTier = SubscriptionTier.FREE; // Default to free, can be changed dynamically
  
  // In a real app, you would fetch this from the user's subscription data

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const dropdownItems = getMenuItems(userSubscription);

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - positioned on the left with proper sizing */}
          <Link to="/" className="flex items-center">
            <div className="h-12 w-12 overflow-hidden rounded">
              <img 
                src="/lovable-uploads/9c75838a-e1e7-4d81-84b5-eac483f98d8f.png" 
                alt="Logo" 
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/comment-ca-marche" className="text-muted-foreground hover:text-primary transition-colors">
              Comment ça fonctionne
            </Link>
            <Link to="/browse-cleaners" className="text-muted-foreground hover:text-primary transition-colors">
              Trouver un service
            </Link>
            <Link to="/prestataires" className="text-muted-foreground hover:text-primary transition-colors">
              HOUSIE Pro
            </Link>
            {user && (
              <Link to="/bookings" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Bookings</span>
              </Link>
            )}
            <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </Link>
            
            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <span>{user.email?.split('@')[0] || 'User'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {dropdownItems.map((item, index) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center justify-between w-full">
                        <span>{t(item.labelKey)}</span>
                        {item.showNotification && (
                          <Bell className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button variant="ghost">Connexion</Button>
                </Link>
                <Link to="/auth">
                  <Button>S'inscrire</Button>
                </Link>
              </div>
            )}
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
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/comment-ca-marche" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Comment ça fonctionne
              </Link>
              <Link 
                to="/browse-cleaners" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Trouver un service
              </Link>
              <Link 
                to="/prestataires" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                HOUSIE Pro
              </Link>
              {user && (
                <Link 
                  to="/bookings" 
                  className="text-muted-foreground hover:text-primary transition-colors py-2 flex items-center space-x-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Bookings</span>
                </Link>
              )}
              <Link 
                to="/support" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
              
              {/* Mobile Language Toggle */}
              <div className="py-2">
                <LanguageToggle />
              </div>
              
              {/* Mobile Theme Toggle */}
              <div className="py-2">
                <ThemeToggle />
              </div>
              
              {user ? (
                <>
                  {dropdownItems.map((item) => (
                    <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        {t(item.labelKey)}
                        {item.showNotification && <Bell className="w-4 h-4 ml-2" />}
                      </Button>
                    </Link>
                  ))}
                  <Button onClick={handleSignOut} variant="outline" className="w-full justify-start">
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Connexion</Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-start">S'inscrire</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
