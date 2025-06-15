
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const HeaderLogo = () => {
  const { togglePopArt } = useTheme();

  const handleSecondOClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    togglePopArt();
  };

  return (
    <Link to="/" className="flex items-center">
      <div className="h-10 w-auto overflow-hidden relative logo-text-blue">
        <img 
          src="https://raw.githubusercontent.com/gabeleven/Housie_Media/main/header_logo.png" 
          alt="HOUSIE" 
          className="h-full w-auto object-contain"
          style={{
            filter: 'brightness(0) saturate(100%) invert(29%) sepia(95%) saturate(4826%) hue-rotate(211deg) brightness(91%) contrast(95%)'
          }}
        />
        {/* Invisible clickable area over the second "O" */}
        <div 
          className="absolute top-0 left-[70%] w-[15%] h-full cursor-pointer hover:bg-white hover:bg-opacity-10 transition-all duration-200 rounded-full"
          onClick={handleSecondOClick}
          title="🎨"
        />
      </div>
    </Link>
  );
};

export default HeaderLogo;
