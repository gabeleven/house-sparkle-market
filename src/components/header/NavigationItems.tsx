
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationItems = () => {
  return (
    <>
      <Link to="/comment-ca-marche" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm">
        Comment ça marche
      </Link>
      <Link to="/browse-cleaners" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm">
        Trouver service
      </Link>
      <Link to="/prestataires" className="nav-link-pop text-muted-foreground hover:text-primary transition-colors text-sm">
        HOUSIE Pro
      </Link>
    </>
  );
};

export default NavigationItems;
