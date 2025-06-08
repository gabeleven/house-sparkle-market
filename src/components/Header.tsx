
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPin, User, LogOut, MessageCircle, ChevronDown, HelpCircle, Bookmark, Calendar, DollarSign, BarChart3 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useUnreadCounts } from "@/hooks/useUnreadCounts";

const Header = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { messages: unreadMessages, supportTickets, loading: countsLoading } = useUnreadCounts();

  // Mock subscription level - in real app this would come from user profile/subscription data
  // For now, let's assume users have different subscription levels
  const getUserSubscriptionLevel = () => {
    // This is a mock function - replace with actual subscription logic
    if (!user) return 'free';
    // You can add logic here to determine subscription from user metadata or separate table
    // For demo purposes, let's cycle through different levels based on user ID
    const userId = user.id;
    if (userId.endsWith('1') || userId.endsWith('2')) return 'premium';
    if (userId.endsWith('3') || userId.endsWith('4')) return 'professional';
    return 'free';
  };

  const subscriptionLevel = getUserSubscriptionLevel();

  const getDropdownMenuItems = () => {
    const baseItems = [
      {
        icon: MessageCircle,
        label: `Messages ${!countsLoading && unreadMessages > 0 ? `(${unreadMessages})` : ''}`,
        onClick: () => navigate('/chat')
      },
      {
        icon: User,
        label: 'My Profile',
        onClick: () => navigate('/my-profile')
      }
    ];

    const professionalItems = [
      {
        icon: Bookmark,
        label: 'Bookmarks',
        onClick: () => navigate('/bookmarks')
      },
      {
        icon: Calendar,
        label: 'Calendar',
        onClick: () => navigate('/calendar')
      },
      {
        icon: DollarSign,
        label: 'My Earnings',
        onClick: () => navigate('/earnings')
      },
      {
        icon: MapPin,
        label: 'Position',
        onClick: () => navigate('/position')
      }
    ];

    const premiumItems = [
      {
        icon: BarChart3,
        label: 'My Analytics',
        onClick: () => navigate('/analytics')
      }
    ];

    let items = [...baseItems];

    if (subscriptionLevel === 'professional' || subscriptionLevel === 'premium') {
      items = [...items, ...professionalItems];
    }

    if (subscriptionLevel === 'premium') {
      items = [...items, ...premiumItems];
    }

    return items;
  };

  const handleSignOut = async () => {
    console.log('Header: Initiating sign out...');
    await signOut();
    navigate('/');
  };

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
            <a href="/prestataires" className="text-muted-foreground hover:text-primary transition-colors">
              Housie Pro
            </a>
            <a href="/support" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </a>
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
                  {getDropdownMenuItems().map((item, index) => (
                    <DropdownMenuItem key={index} onClick={item.onClick}>
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </DropdownMenuItem>
                  ))}
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
