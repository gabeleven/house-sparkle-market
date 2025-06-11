
import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationItemsProps {
  isLoggedIn?: boolean;
}

const NavigationItems = ({ isLoggedIn = false }: NavigationItemsProps) => {
  if (isLoggedIn) {
    return (
      <>
        <Link to="/provider-dashboard" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
          Dashboard
        </Link>
        <Link to="/browse-cleaners" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm">
          Services
        </Link>
        <Link to="/chat" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm">
          Messages
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to="/browse-cleaners" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm">
        Services
      </Link>
      <Link to="/comment-ca-marche" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm">
        À Propos
      </Link>
      <Link to="/auth" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
        Connexion
      </Link>
    </>
  );
};

export default NavigationItems;
