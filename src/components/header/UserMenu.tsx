
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Settings, BarChart3, MessageSquare, Calendar, Shield, Target, Brain, User, TrendingUp, Bell, FileText, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SubscriptionTier } from '@/types/subscription';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  user: any;
  currentTier: SubscriptionTier;
  signOut: () => Promise<void>;
}

const UserMenu = ({ user, currentTier, signOut }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Defensive check to prevent rendering if no user
  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/auth">
          <Button variant="ghost" className="text-sm">Connexion</Button>
        </Link>
        <Link to="/auth?tab=signup">
          <Button className="pop-orange-btn text-sm">S'inscrire</Button>
        </Link>
      </div>
    );
  }

  const userDisplayName = user.email?.split('@')[0] || 'User';

  const handleSignOutClick = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

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

  const menuItems = [
    {
      section: "Gestion",
      items: [
        {
          path: '/my-profile',
          title: 'Mon Profil',
          icon: <User className="w-4 h-4" />,
        },
        {
          path: '/calendar',
          title: 'Calendrier',
          icon: <Calendar className="w-4 h-4" />,
        },
        {
          path: '/bookings',
          title: 'Réservations',
          icon: <Calendar className="w-4 h-4" />,
        }
      ]
    },
    {
      section: "Analytics & Growth",
      items: [
        {
          path: '/dashboard',
          title: 'Dashboard',
          icon: <BarChart3 className="w-4 h-4" />,
        },
        ...(currentTier === 'PRO' || currentTier === 'PREMIUM' ? [
          {
            path: '/analytics/insights',
            title: 'Insights Avancées',
            icon: <TrendingUp className="w-4 h-4" />,
          },
          {
            path: '/analytics/reports',
            title: 'Rapports Professionnels',
            icon: <FileText className="w-4 h-4" />,
          }
        ] : []),
        ...(currentTier === 'PREMIUM' ? [
          {
            path: '/analytics/intelligence',
            title: 'Business Intelligence',
            icon: <Brain className="w-4 h-4" />,
            showNotification: true
          },
          {
            path: '/analytics/performance',
            title: 'Performance Optimization',
            icon: <Target className="w-4 h-4" />,
          }
        ] : [])
      ]
    },
    {
      section: "Communication & Support",
      items: [
        ...(currentTier !== 'FREE' ? [{
          path: '/chat',
          title: 'Messages',
          icon: <MessageSquare className="w-4 h-4" />,
        }] : []),
        {
          path: '/tax-compliance',
          title: 'Statut de Conformité',
          icon: <Shield className="w-4 h-4" />,
        },
        {
          path: '/settings',
          title: 'Paramètres',
          icon: <Settings className="w-4 h-4" />,
        }
      ]
    }
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center p-1 hover:bg-accent/50 rounded-full"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback className="bg-[hsl(var(--pop-blue))] text-white text-sm">
              {userDisplayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 bg-card border border-border shadow-xl z-50 animate-none data-[state=open]:animate-none data-[state=closed]:animate-none data-[side=bottom]:animate-none data-[side=left]:animate-none data-[side=right]:animate-none data-[side=top]:animate-none"
        sideOffset={8}
        style={{
          animationDuration: '0s',
          animationDelay: '0s'
        }}
      >
        {/* User Info Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="bg-[hsl(var(--pop-blue))] text-white">
                {userDisplayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{userDisplayName}</p>
              <Badge variant="outline" className="text-xs mt-1">
                {currentTier}
              </Badge>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="max-h-96 overflow-y-auto">
          {menuItems.map((section, sectionIndex) => (
            <div key={section.section}>
              <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-4 py-2">
                {section.section}
              </DropdownMenuLabel>
              {section.items.map((item) => (
                <DropdownMenuItem key={item.path} asChild className="px-4 py-2 cursor-pointer">
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 w-full"
                  >
                    <div className="text-muted-foreground">
                      {item.icon}
                    </div>
                    <span className="flex-1 text-sm">{item.title}</span>
                    {item.showNotification && (
                      <Bell className="w-3 h-3 text-[hsl(var(--pop-orange))]" />
                    )}
                  </Link>
                </DropdownMenuItem>
              ))}
              {sectionIndex < menuItems.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </div>

        {/* Footer */}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleSignOutClick}
          className="px-4 py-3 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-3" />
          <span className="text-sm">Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
