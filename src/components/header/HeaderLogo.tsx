
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3">
      <div className="h-12 w-28 overflow-hidden">
        <img 
          src="https://raw.githubusercontent.com/rbnblndlrd/HOUSIE-MARKETPLACE/main/HOUSIEMARKETPLACE-FONT1.svg" 
          alt="HOUSIE MARKETPLACE" 
          className="h-full w-full object-contain"
        />
      </div>
      <div className="h-12 w-12 overflow-hidden">
        <img 
          src="https://raw.githubusercontent.com/rbnblndlrd/HOUSIE-MARKETPLACE/main/mascot_originale.svg" 
          alt="HOUSIE Cleaning Mascot" 
          className="h-full w-full object-contain"
        />
      </div>
    </Link>
  );
};

export default HeaderLogo;
