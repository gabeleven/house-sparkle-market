
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/2822530e-b624-4881-8cbd-d4990783a2dc.png" 
              alt="Housie" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/comment-ca-marche" className="text-gray-700 hover:text-purple-600 transition-colors">
              Comment ça marche
            </Link>
            <Link to="/prestataires" className="text-gray-700 hover:text-purple-600 transition-colors">
              Devenir prestataire
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/my-profile">
                  <Button variant="ghost">Mon Profil</Button>
                </Link>
                <Link to="/chat">
                  <Button variant="ghost">Messages</Button>
                </Link>
                <Link to="/support">
                  <Button variant="ghost">Support</Button>
                </Link>
                <Button onClick={handleSignOut} variant="outline">
                  Déconnexion
                </Button>
              </div>
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
                className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Comment ça marche
              </Link>
              <Link 
                to="/prestataires" 
                className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Devenir prestataire
              </Link>
              {user ? (
                <>
                  <Link to="/my-profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Mon Profil</Button>
                  </Link>
                  <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Messages</Button>
                  </Link>
                  <Link to="/support" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Support</Button>
                  </Link>
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
