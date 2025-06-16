
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const HeaderLogo = () => {
  const { togglePopArt } = useTheme();

  const handleSecondOClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    togglePopArt();
  };

  return (
    <Link to="/" className="flex items-center">
      <div className="h-8 w-auto overflow-hidden relative">
        <img 
          src="/lovable-uploads/7367af12-b329-4f27-8e85-408ec72b67d7.png" 
          alt="HOUSIE" 
          className="h-full w-auto object-contain"
        />
        {/* Invisible clickable area over the second "O" for theme toggle */}
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
