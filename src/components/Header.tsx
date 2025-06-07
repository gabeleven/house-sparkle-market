
import { Button } from "@/components/ui/button";
import { MapPin, User, LogOut, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-green-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">HOUSIE</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/comment-ca-marche" className="text-gray-600 hover:text-purple-600 transition-colors">
              Comment ça marche
            </a>
            <a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">
              À propos
            </a>
            {user && (
              <>
                <a href="/prestataires" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Prestataires
                </a>
                <a href="/chat" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Messages
                </a>
              </>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={() => navigate('/chat')} className="hidden md:flex">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Messages
                </Button>
                <span className="text-sm text-gray-600 hidden md:block">
                  Bonjour, {user.user_metadata?.full_name || user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Déconnexion</span>
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                  <User className="w-4 h-4 mr-2" />
                  Se connecter
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/auth?type=cleaner')}>
                  Nous rejoindre
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
