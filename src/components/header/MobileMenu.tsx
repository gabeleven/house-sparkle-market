
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, BarChart3, Bell, Settings } from 'lucide-react';
import { SubscriptionTier, getMenuItems } from '@/types/subscription';
import SubscriptionSimulator from '@/components/SubscriptionSimulator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';

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

  const dropdownItems = getMenuItems(simulatedTier);

  const getIcon = (iconName: string) => {
    // Simplified icon handling for mobile menu
    return <Settings className="w-4 h-4" />;
  };

  return (
    <div className="md:hidden py-4 border-t">
      <div className="flex flex-col space-y-3">
        <Link 
          to="/comment-ca-marche" 
          className="text-muted-foreground hover:text-primary transition-colors py-2"
          onClick={onClose}
        >
          Comment ça marche
        </Link>
        <Link 
          to="/browse-cleaners" 
          className="text-muted-foreground hover:text-primary transition-colors py-2"
          onClick={onClose}
        >
          Trouver service
        </Link>
        <Link 
          to="/prestataires" 
          className="text-muted-foreground hover:text-primary transition-colors py-2"
          onClick={onClose}
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
              className="text-muted-foreground hover:text-primary transition-colors py-2 flex items-center space-x-1"
              onClick={onClose}
            >
              <Calendar className="w-4 h-4" />
              <span>Mes Réservations</span>
            </Link>
            <Link 
              to="/provider-dashboard" 
              className="text-muted-foreground hover:text-primary transition-colors py-2 flex items-center space-x-1"
              onClick={onClose}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Tableau Prestataire</span>
            </Link>
          </>
        )}
        <Link 
          to="/tax-compliance" 
          className="text-muted-foreground hover:text-primary transition-colors py-2"
          onClick={onClose}
        >
          Conformité
        </Link>
        <Link 
          to="/support" 
          className="text-muted-foreground hover:text-primary transition-colors py-2"
          onClick={onClose}
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
              <Link key={item.path} to={item.path} onClick={onClose}>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="flex items-center space-x-2">
                    {getIcon(item.icon)}
                    <span>{item.labelKey}</span>
                    {item.tierNote && (
                      <span className="text-xs text-muted-foreground">{item.tierNote}</span>
                    )}
                  </div>
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
            <Link to="/auth" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">Connexion</Button>
            </Link>
            <Link to="/auth" onClick={onClose}>
              <Button className="w-full justify-start">S'inscrire</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
