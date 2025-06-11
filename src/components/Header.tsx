
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Bell, ChevronDown, Calendar, BarChart3, User, CalendarCheck, FileText, Shield, BookOpen, MessageSquare, TrendingUp, Brain, Settings, Target } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import SubscriptionSimulator from '@/components/SubscriptionSimulator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SubscriptionTier, getMenuItems } from '@/types/subscription';

const iconMap = {
  User,
  Calendar,
  CalendarCheck,
  BarChart3,
  FileText,
  Shield,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Brain,
  Settings,
  Target
};

const Header = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [simulatedTier, setSimulatedTier] = useState<SubscriptionTier>(SubscriptionTier.FREE);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const dropdownItems = getMenuItems(simulatedTier);

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : <Settings className="w-4 h-4" />;
  };

  return (
    <header className="bg-background border-b-2 border-pop-orange sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Pop Art Logo Section */}
          <Link to="/" className="flex items-center space-x-4">
            {/* Orange/Blue Graffiti Wordmark */}
            <div className="h-12 w-auto">
              <img 
                src="https://raw.githubusercontent.com/rbnblndlrd/HOUSIE-MARKETPLACE/main/HOUSIE_MARKETPLACE.png" 
                alt="HOUSIE MARKETPLACE" 
                className="h-full w-auto object-contain brand-wordmark"
              />
            </div>
            
            {/* Pop Art Cleaning Lady Mascot */}
            <div className="hidden md:block h-16 w-16">
              <img 
                src="https://raw.githubusercontent.com/rbnblndlrd/HOUSIE-MARKETPLACE/main/Default_Female_character_with_blue_eyes_wearing_construction_h_1_8daf96c5-174c-4c3b-bdcb-2586d46308bd_0.png" 
                alt="HOUSIE Cleaning Expert" 
                className="h-full w-full object-contain mascot-pop"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/comment-ca-marche" className="text-foreground hover:text-pop-orange transition-colors text-sm font-medium">
              Comment ça marche
            </Link>
            <Link to="/browse-cleaners" className="text-foreground hover:text-pop-blue transition-colors text-sm font-medium">
              Trouver service
            </Link>
            <Link to="/prestataires" className="text-foreground hover:text-pop-orange transition-colors text-sm font-medium">
              HOUSIE Pro
            </Link>
            
            {/* Dashboards Dropdown - Only show if user is logged in */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1 text-sm hover:bg-pop-orange/10">
                    <BarChart3 className="w-4 h-4 text-pop-blue" />
                    <span>Tableaux de bord</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48 bg-card border-2 border-pop-orange shadow-xl">
                  <DropdownMenuItem asChild>
                    <Link to="/bookings" className="flex items-center space-x-2 w-full hover:bg-pop-orange/10">
                      <Calendar className="w-4 h-4 text-pop-blue" />
                      <span>Mes Réservations</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/provider-dashboard" className="flex items-center space-x-2 w-full hover:bg-pop-orange/10">
                      <BarChart3 className="w-4 h-4 text-pop-orange" />
                      <span>Tableau Prestataire</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <Link to="/tax-compliance" className="text-foreground hover:text-pop-blue transition-colors text-sm font-medium">
              Conformité
            </Link>
            <Link to="/support" className="text-foreground hover:text-pop-orange transition-colors text-sm font-medium">
              Support
            </Link>
            
            {/* Subscription Simulator - Only show when logged in */}
            {user && (
              <SubscriptionSimulator 
                currentTier={simulatedTier} 
                onTierChange={setSimulatedTier} 
              />
            )}
            
            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-pop-blue/10">
                    <span className="text-foreground">{user.email?.split('@')[0] || 'User'}</span>
                    <Badge className="badge-pop-orange text-xs">
                      {simulatedTier.toUpperCase()}
                    </Badge>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-card border-2 border-pop-blue shadow-xl">
                  {dropdownItems.map((item, index) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center justify-between w-full hover:bg-pop-blue/10">
                        <div className="flex items-center space-x-2">
                          {getIcon(item.icon)}
                          <span>{item.labelKey}</span>
                          {item.tierNote && (
                            <span className="text-xs text-muted-foreground">{item.tierNote}</span>
                          )}
                        </div>
                        {item.showNotification && (
                          <Bell className="w-4 h-4 text-pop-orange" />
                        )}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-pop-orange/20" />
                  <DropdownMenuItem onClick={handleSignOut} className="hover:bg-destructive/10">
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button variant="ghost" className="hover:bg-pop-blue/10">Connexion</Button>
                </Link>
                <Link to="/auth">
                  <Button className="btn-pop-orange">S'inscrire</Button>
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
              className="hover:bg-pop-orange/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-pop-orange/20 dots-pattern-sm">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/comment-ca-marche" 
                className="text-foreground hover:text-pop-orange transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Comment ça marche
              </Link>
              <Link 
                to="/browse-cleaners" 
                className="text-foreground hover:text-pop-blue transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Trouver service
              </Link>
              <Link 
                to="/prestataires" 
                className="text-foreground hover:text-pop-orange transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                HOUSIE Pro
              </Link>
              
              {/* Mobile Subscription Simulator */}
              {user && (
                <div className="py-2">
                  <SubscriptionSimulator 
                    currentTier={simulatedTier} 
                    onTierChange={setSimulatedTier} 
                  />
                </div>
              )}
              
              {/* Mobile Dashboard Links - Only show if user is logged in */}
              {user && (
                <>
                  <Link 
                    to="/bookings" 
                    className="text-foreground hover:text-pop-blue transition-colors py-2 flex items-center space-x-2 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calendar className="w-4 h-4 text-pop-blue" />
                    <span>Mes Réservations</span>
                  </Link>
                  <Link 
                    to="/provider-dashboard" 
                    className="text-foreground hover:text-pop-orange transition-colors py-2 flex items-center space-x-2 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart3 className="w-4 h-4 text-pop-orange" />
                    <span>Tableau Prestataire</span>
                  </Link>
                </>
              )}
              <Link 
                to="/tax-compliance" 
                className="text-foreground hover:text-pop-blue transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Conformité
              </Link>
              <Link 
                to="/support" 
                className="text-foreground hover:text-pop-orange transition-colors py-2 font-medium"
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
                      <Button variant="ghost" className="w-full justify-start hover:bg-pop-blue/10">
                        <div className="flex items-center space-x-2">
                          {getIcon(item.icon)}
                          <span>{item.labelKey}</span>
                          {item.tierNote && (
                            <span className="text-xs text-muted-foreground">{item.tierNote}</span>
                          )}
                        </div>
                        {item.showNotification && <Bell className="w-4 h-4 ml-2 text-pop-orange" />}
                      </Button>
                    </Link>
                  ))}
                  <Button onClick={handleSignOut} variant="outline" className="w-full justify-start border-destructive/50 hover:bg-destructive/10">
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start hover:bg-pop-blue/10">Connexion</Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-start btn-pop-orange">S'inscrire</Button>
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
