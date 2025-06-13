
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="h-10 w-auto overflow-hidden">
        <img 
          src="https://raw.githubusercontent.com/gabeleven/Housie_Media/main/header_logo.png" 
          alt="HOUSIE" 
          className="h-full w-auto object-contain"
        />
      </div>
    </Link>
  );
};

export default HeaderLogo;
