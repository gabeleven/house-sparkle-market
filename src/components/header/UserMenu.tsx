
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, ChevronDown, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/contexts/LanguageContext';
import { SubscriptionTier, getMenuItems } from '@/types/subscription';

const iconMap = {
  User: () => import('lucide-react').then(mod => mod.User),
  Calendar: () => import('lucide-react').then(mod => mod.Calendar),
  CalendarCheck: () => import('lucide-react').then(mod => mod.CalendarCheck),
  BarChart3: () => import('lucide-react').then(mod => mod.BarChart3),
  FileText: () => import('lucide-react').then(mod => mod.FileText),
  Shield: () => import('lucide-react').then(mod => mod.Shield),
  BookOpen: () => import('lucide-react').then(mod => mod.BookOpen),
  MessageSquare: () => import('lucide-react').then(mod => mod.MessageSquare),
  TrendingUp: () => import('lucide-react').then(mod => mod.TrendingUp),
  Brain: () => import('lucide-react').then(mod => mod.Brain),
  Settings: () => import('lucide-react').then(mod => mod.Settings),
  Target: () => import('lucide-react').then(mod => mod.Target)
};

interface UserMenuProps {
  user: any;
  simulatedTier: SubscriptionTier;
  signOut: () => Promise<void>;
}

const UserMenu = ({ user, simulatedTier, signOut }: UserMenuProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const dropdownItems = getMenuItems(simulatedTier);

  const getIcon = (iconName: string) => {
    // For simplicity, using Settings as fallback for all icons in this refactor
    // The original dynamic import approach can be maintained if needed
    return <Settings className="w-4 h-4" />;
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/auth">
          <Button variant="ghost">Connexion</Button>
        </Link>
        <Link to="/auth">
          <Button>S'inscrire</Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <span>{user.email?.split('@')[0] || 'User'}</span>
          <Badge variant="outline" className="text-xs">
            {simulatedTier.toUpperCase()}
          </Badge>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {dropdownItems.map((item, index) => (
          <DropdownMenuItem key={item.path} asChild>
            <Link to={item.path} className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                {getIcon(item.icon)}
                <span>{item.labelKey}</span>
                {item.tierNote && (
                  <span className="text-xs text-muted-foreground">{item.tierNote}</span>
                )}
              </div>
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
  );
};

export default UserMenu;
