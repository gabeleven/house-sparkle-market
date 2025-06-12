
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  User, 
  Brain,
  TrendingUp,
  FileText,
  Target
} from 'lucide-react';
import { SubscriptionTier } from '@/types/subscription';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';

interface MobileMenuProps {
  isOpen: boolean;
  user: any;
  currentTier: SubscriptionTier;
  onClose: () => void;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ 
  isOpen, 
  user, 
  currentTier, 
  onClose, 
  handleSignOut 
}: MobileMenuProps) => {
  // Defensive check - prevent rendering if not open
  if (!isOpen) return null;

  const essentialMenuItems = [
    { path: '/my-profile', title: 'Profil', icon: <User className="w-4 h-4" /> },
    { path: '/provider-dashboard', title: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { path: '/bookings', title: 'Réservations', icon: <Calendar className="w-4 h-4" /> },
    { path: '/chat', title: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  // Analytics menu items based on subscription tier
  const getAnalyticsItems = () => {
    const items = [];
    
    if (currentTier === 'PRO' || currentTier === 'PREMIUM') {
      items.push(
        { path: '/analytics/insights', title: 'Insights', icon: <TrendingUp className="w-4 h-4" /> },
        { path: '/analytics/reports', title: 'Rapports', icon: <FileText className="w-4 h-4" /> }
      );
    }
    
    if (currentTier === 'PREMIUM') {
      items.push(
        { path: '/analytics/intelligence', title: 'Intelligence', icon: <Brain className="w-4 h-4" /> },
        { path: '/analytics/performance', title: 'Performance', icon: <Target className="w-4 h-4" /> }
      );
    }
    
    return items;
  };

  const analyticsItems = getAnalyticsItems();

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="block py-4 border-t bg-card/95 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
      <div className="flex flex-col space-y-3">
        {/* User Info */}
        {user && (
          <div className="px-4 py-2 bg-accent/30 rounded-lg mx-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium truncate">{user.email?.split('@')[0]}</span>
              <Badge variant="outline" className="text-xs flex-shrink-0">
                {currentTier}
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
                onClick={handleLinkClick}
              >
                <span className="text-[hsl(var(--pop-blue))] flex-shrink-0">{item.icon}</span>
                <span className="text-sm font-medium truncate">{item.title}</span>
              </Link>
            ))}

            {/* Analytics section for qualified tiers */}
            {analyticsItems.length > 0 && (
              <>
                <div className="px-4 py-2 mx-2">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Analytics
                  </h3>
                </div>
                {analyticsItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-accent rounded-lg mx-2 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span className="text-[hsl(var(--pop-orange))] flex-shrink-0">{item.icon}</span>
                    <span className="text-sm font-medium truncate">{item.title}</span>
                  </Link>
                ))}
              </>
            )}

            {/* Settings */}
            <Link
              to="/settings"
              className="flex items-center space-x-3 px-4 py-3 hover:bg-accent rounded-lg mx-2 transition-colors"
              onClick={handleLinkClick}
            >
              <span className="text-[hsl(var(--pop-blue))] flex-shrink-0">
                <Settings className="w-4 h-4" />
              </span>
              <span className="text-sm font-medium truncate">Paramètres</span>
            </Link>
          </>
        ) : (
          <>
            {/* Navigation for non-logged in users */}
            <Link 
              to="/browse-cleaners" 
              className="text-muted-foreground hover:text-primary transition-colors py-2 px-4 block truncate"
              onClick={handleLinkClick}
            >
              Services
            </Link>
            <Link 
              to="/comment-ca-marche" 
              className="text-muted-foreground hover:text-primary transition-colors py-2 px-4 block truncate"
              onClick={handleLinkClick}
            >
              À Propos
            </Link>
            <Link 
              to="/prestataires" 
              className="text-muted-foreground hover:text-primary transition-colors py-2 px-4 block truncate"
              onClick={handleLinkClick}
            >
              HOUSIE Pro
            </Link>
            <Link 
              to="/support" 
              className="text-muted-foreground hover:text-primary transition-colors py-2 px-4 block truncate"
              onClick={handleLinkClick}
            >
              Support
            </Link>
          </>
        )}
        
        {/* Mobile Controls - Only show on small screens */}
        <div className="space-y-2 px-4 md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Langue</span>
            <LanguageToggle />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Thème</span>
            <ThemeToggle />
          </div>
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
            <Link to="/auth" onClick={handleLinkClick}>
              <Button variant="ghost" className="w-full justify-start">
                Connexion
              </Button>
            </Link>
            <Link to="/auth" onClick={handleLinkClick}>
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
