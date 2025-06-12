
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SubscriptionTier } from '@/types/subscription';
import MegaMenu from './MegaMenu';

interface UserMenuProps {
  user: any;
  currentTier: SubscriptionTier;
  signOut: () => Promise<void>;
}

const UserMenu = ({ user, currentTier, signOut }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const truncateText = (text: string, maxLength: number = 15) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

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

  const handleMenuToggle = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div ref={menuRef} className="relative">
      <MegaMenu
        user={user}
        currentTier={currentTier}
        signOut={signOut}
        isOpen={isOpen}
        onOpenChange={handleMenuToggle}
        trigger={
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 hover:bg-accent/50"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="bg-[hsl(var(--pop-blue))] text-white text-sm">
                {userDisplayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium truncate max-w-[100px]">
                {truncateText(userDisplayName)}
              </span>
              <Badge variant="outline" className="text-xs px-2 py-0.5 flex-shrink-0">
                {currentTier}
              </Badge>
            </div>
            <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        }
      />
    </div>
  );
};

export default UserMenu;
