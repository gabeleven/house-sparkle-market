import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, BarChart3, MessageSquare, Settings, User } from 'lucide-react';
import { SubscriptionTier } from '@/types/subscription';
import SubscriptionSimulator from '@/components/SubscriptionSimulator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { IntensityThemeToggle } from '@/components/IntensityThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  user: any;
  simulatedTier: SubscriptionTier;
  setSimulatedTier: (tier: SubscriptionTier) => void;
  onClose: () => void;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ 
  isOpen, 
  user, 
  simulatedTier, 
  setSimulatedTier, 
  onClose, 
  handleSignOut 
}: MobileMenuProps) => {
  if (!isOpen) return null;

  const essentialMenuItems = [
    { path: '/my-profile', title: 'Profil', icon: <User className="w-4 h-4" /> },
    { path: '/provider-dashboard', title: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { path: '/bookings', title: 'Réservations', icon: <Calendar className="w-4 h-4" /> },
    { path: '/chat', title: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
    { path: '/settings', title: 'Paramètres', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="md:hidden py-4 border-t bg-card/50 backdrop-blur-sm">
      <div className="flex flex-col space-y-3">
        {/* User Info */}
        {user && (
          <div className="px-4 py-2 bg-accent/30 rounded-lg mx-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{user.email?.split('@')[0]}</span>
              <Badge variant="outline" className="text-xs">
                {simulatedTier.toUpperCase()}
              </Badge>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        {user ? (
          <>
            {/* Essential menu items for logged in users */}
            {essentialMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-accent rounded-lg mx-2 transition-colors"
                onClick={onClose}
              >
                <span className="text-[hsl(var(--pop-blue))]">{item.icon}</span>
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            ))}
            
            {/* Mobile Subscription Simulator */}
            <div className="px-4 py-2">
              <SubscriptionSimulator 
                currentTier={simulatedTier} 
                onTierChange={setSimulatedTier} 
              />
            </div>
          </>
        ) : (
          <>
            {/* Navigation for non-logged in users */}
            <Link 
              to="/browse-cleaners" 
              className="text-muted-foreground hover:text-primary transition-colors py-2 px-4"
              onClick={onClose}
            >
              Services
            </Link>
            <Link 
              to="/comment-ca-marche" 
              className="text-muted-foreground hover:text-primary transition-colors py-2 px-4"
              onClick={onClose}
            >
              À Propos
            </Link>
            <Link 
              to="/prestataires" 
              className="text-muted-foreground hover:text-primary transition-colors py-2 px-4"
              onClick={onClose}
            >
              HOUSIE Pro
            </Link>
            <Link 
              to="/support" 
              className="text-muted-foreground hover:text-primary transition-colors py-2 px-4"
              onClick={onClose}
            >
              Support
            </Link>
          </>
        )}
        
        {/* Mobile Intensity Theme Toggle */}
        <div className="px-4 py-2">
          <IntensityThemeToggle />
        </div>
        
        {/* Mobile Language Toggle */}
        <div className="px-4 py-2">
          <LanguageToggle />
        </div>
        
        {/* Mobile Theme Toggle */}
        <div className="px-4 py-2">
          <ThemeToggle />
        </div>
        
        {/* Auth Actions */}
        {user ? (
          <Button 
            onClick={handleSignOut} 
            variant="outline" 
            className="mx-4 justify-start"
          >
            Déconnexion
          </Button>
        ) : (
          <div className="flex flex-col space-y-2 px-4">
            <Link to="/auth" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                Connexion
              </Button>
            </Link>
            <Link to="/auth" onClick={onClose}>
              <Button className="pop-orange-btn w-full justify-start">
                S'inscrire
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
