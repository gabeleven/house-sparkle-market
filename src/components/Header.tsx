import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Mock user role - in a real app, this would come from user profile data
  // Changed from const to let to allow dynamic assignment
  let userRole: 'starter' | 'professional' | 'premium' = 'starter';
  
  // In a real app, you would fetch this from the user's profile data
  // For now, we'll keep it as starter but the type allows for all values

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getDropdownItems = () => {
    const baseItems = [
      { label: 'Messages', path: '/chat', showNotification: true },
      { label: 'Mon Profil', path: '/my-profile' },
    ];

    if (userRole === 'professional') {
      return [
        ...baseItems,
        { label: 'My Dashboard', path: '/dashboard' },
        { label: 'Bookmarks', path: '/bookmarks' },
        { label: 'Position', path: '/position' },
      ];
    }

    if (userRole === 'premium') {
      return [
        ...baseItems,
        { label: 'My Dashboard', path: '/dashboard' },
        { label: 'Bookmarks', path: '/bookmarks' },
        { label: 'Position', path: '/position' },
      ];
    }

    // Default starter items
    return [
      ...baseItems,
      { label: 'Bookmarks', path: '/bookmarks' },
    ];
  };

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
              <img 
                src="/lovable-uploads/7e996b12-8e81-4588-9463-feb35fd38aec.png" 
                alt="Housie Cleaner" 
                className="w-8 h-8 object-contain rounded-full"
              />
            </div>
            <span className="text-xl font-bold text-foreground">HOUSIE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/comment-ca-marche" className="text-muted-foreground hover:text-primary transition-colors">
              Comment ça marche
            </Link>
            <Link to="/browse-cleaners" className="text-muted-foreground hover:text-primary transition-colors">
              Trouver un service
            </Link>
            <Link to="/prestataires" className="text-muted-foreground hover:text-primary transition-colors">
              Devenir prestataire
            </Link>
            <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <span>{user.email?.split('@')[0] || 'User'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {getDropdownItems().map((item, index) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center justify-between w-full">
                        <span>{item.label}</span>
                        {item.showNotification && (
                          <Bell className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Déconnexion
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
                Comment ça marche
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
                Devenir prestataire
              </Link>
              <Link 
                to="/support" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
              {user ? (
                <>
                  {getDropdownItems().map((item) => (
                    <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        {item.label}
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
