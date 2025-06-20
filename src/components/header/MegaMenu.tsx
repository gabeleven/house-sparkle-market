
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Settings, BarChart3, MessageSquare, Calendar, Shield, Target, Brain, User, TrendingUp, Bell, FileText } from 'lucide-react';
import { SubscriptionTier } from '@/types/subscription';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MegaMenuProps {
  user: any;
  currentTier: SubscriptionTier;
  signOut: () => Promise<void>;
  trigger: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MegaMenu = ({ user, currentTier, signOut, trigger, isOpen, onOpenChange }: MegaMenuProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  // Defensive check to prevent rendering if no user
  if (!user) {
    return null;
  }

  const menuSections = [
    {
      title: "Gestion",
      items: [
        {
          path: '/my-profile',
          title: 'Mon Profil',
          description: 'Gérer vos informations personnelles',
          icon: <User className="w-5 h-5" />,
          color: 'text-[hsl(var(--pop-blue))]'
        },
        {
          path: '/calendar',
          title: 'Calendrier',
          description: getTierSpecificDesc(currentTier, 'calendar'),
          icon: <Calendar className="w-5 h-5" />,
          color: 'text-[hsl(var(--pop-orange))]'
        },
        {
          path: '/bookings',
          title: 'Réservations',
          description: getTierSpecificDesc(currentTier, 'bookings'),
          icon: <Calendar className="w-5 h-5" />,
          color: 'text-[hsl(var(--pop-blue))]'
        }
      ]
    },
    {
      title: "Analytics & Growth",
      items: [
        {
          path: '/dashboard',
          title: 'Dashboard',
          description: 'Vue d\'ensemble de votre activité',
          icon: <BarChart3 className="w-5 h-5" />,
          color: 'text-[hsl(var(--pop-orange))]'
        },
        ...(currentTier === 'PRO' || currentTier === 'PREMIUM' ? [
          {
            path: '/analytics/insights',
            title: 'Insights Avancées',
            description: 'Analyses détaillées de performance',
            icon: <TrendingUp className="w-5 h-5" />,
            color: 'text-[hsl(var(--pop-blue))]'
          },
          {
            path: '/analytics/reports',
            title: 'Rapports Professionnels',
            description: 'Rapports détaillés et exportables',
            icon: <FileText className="w-5 h-5" />,
            color: 'text-[hsl(var(--pop-orange))]'
          }
        ] : []),
        ...(currentTier === 'PREMIUM' ? [
          {
            path: '/analytics/intelligence',
            title: 'Business Intelligence',
            description: 'IA marketing + intelligence marché',
            icon: <Brain className="w-5 h-5" />,
            color: 'text-purple-500',
            showNotification: true
          },
          {
            path: '/analytics/performance',
            title: 'Performance Optimization',
            description: 'Optimisation intelligente des performances',
            icon: <Target className="w-5 h-5" />,
            color: 'text-green-500'
          }
        ] : [])
      ]
    },
    {
      title: "Communication & Support",
      items: [
        ...(currentTier !== 'FREE' ? [{
          path: '/chat',
          title: 'Messages',
          description: getTierSpecificDesc(currentTier, 'chat'),
          icon: <MessageSquare className="w-5 h-5" />,
          color: 'text-[hsl(var(--pop-blue))]'
        }] : []),
        {
          path: '/tax-compliance',
          title: 'Statut de Conformité',
          description: getTierSpecificDesc(currentTier, 'tax'),
          icon: <Shield className="w-5 h-5" />,
          color: 'text-[hsl(var(--pop-orange))]'
        },
        {
          path: '/settings',
          title: 'Paramètres',
          description: 'Configuration de votre compte',
          icon: <Settings className="w-5 h-5" />,
          color: 'text-muted-foreground'
        }
      ]
    }
  ];

  const filteredSections = menuSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  function getTierSpecificDesc(tier: SubscriptionTier, feature: string): string {
    const descriptions = {
      calendar: {
        'FREE': 'Calendrier de base',
        'STARTER': 'Calendrier synchronisé',
        'PRO': 'Calendrier professionnel',
        'PREMIUM': 'Calendrier IA'
      },
      bookings: {
        'FREE': 'Max 10 réservations/mois',
        'STARTER': 'Réservations illimitées',
        'PRO': 'Gestion avancée',
        'PREMIUM': 'Gestion intelligente'
      },
      chat: {
        'STARTER': 'Communications client',
        'PRO': 'Communications pro',
        'PREMIUM': 'Communications IA'
      },
      tax: {
        'FREE': 'Statut de base',
        'STARTER': 'Conformité avancée',
        'PRO': 'Suite fiscale complète',
        'PREMIUM': 'Optimisation fiscale IA'
      }
    };
    return descriptions[feature]?.[tier] || '';
  }

  const handleSignOutClick = async () => {
    await signOut();
    onOpenChange?.(false);
  };

  const handleLinkClick = () => {
    onOpenChange?.(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-96 p-0 bg-card border border-border shadow-2xl z-50"
        sideOffset={8}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-border bg-gradient-to-r from-[hsl(var(--pop-orange)/0.1)] to-[hsl(var(--pop-blue)/0.1)]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une fonctionnalité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-0 focus:ring-2 focus:ring-[hsl(var(--pop-orange))]"
            />
          </div>
        </div>

        {/* Menu Sections */}
        <div className="max-h-96 overflow-y-auto">
          {filteredSections.map((section, sectionIndex) => (
            <div key={section.title} className={sectionIndex > 0 ? 'border-t border-border' : ''}>
              <div className="p-3 bg-muted/50">
                <h3 className="font-semibold text-sm text-foreground">{section.title}</h3>
              </div>
              <div className="p-2">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleLinkClick}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
                  >
                    <div className={`${item.color} group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-sm text-foreground truncate">{item.title}</p>
                        {item.showNotification && (
                          <Bell className="w-3 h-3 text-[hsl(var(--pop-orange))] flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-3 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <Badge variant="outline" className="text-xs flex-shrink-0">
                {currentTier}
              </Badge>
              <span className="text-xs text-muted-foreground truncate">{user?.email?.split('@')[0]}</span>
            </div>
            <button
              onClick={handleSignOutClick}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 ml-2"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MegaMenu;
