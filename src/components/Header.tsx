
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPin, User, LogOut, MessageCircle, ChevronDown, HelpCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    console.log('Header: Initiating sign out...');
    await signOut();
    navigate('/');
  };

  // Mock unread message count - in a real app this would come from a hook
  const unreadMessages = 3;
  const supportTickets = 7;

  console.log('Header: Rendering with user:', user?.id || 'no user', 'loading:', loading);

  return (
    <header className="bg-background shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-green-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-bold text-foreground">HOUSIE</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/comment-ca-marche" className="text-muted-foreground hover:text-primary transition-colors">
              Comment ça marche
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              À propos
            </a>
            {user && (
              <a href="/prestataires" className="text-muted-foreground hover:text-primary transition-colors">
                Housie Pro
              </a>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {!loading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <span className="text-sm text-foreground">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/chat')}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Messages {unreadMessages > 0 && `(${unreadMessages})`}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/my-profile')}>
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Support {supportTickets > 0 && `(${supportTickets})`}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : !loading ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                  <User className="w-4 h-4 mr-2" />
                  Se connecter
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => navigate('/auth?type=cleaner')}>
                  Nous rejoindre
                </Button>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
