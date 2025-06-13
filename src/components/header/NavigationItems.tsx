
import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationItemsProps {
  isLoggedIn?: boolean;
}

const NavigationItems = ({ isLoggedIn = false }: NavigationItemsProps) => {
  if (isLoggedIn) {
    return (
      <>
        <Link to="/analytics" className="uber-nav-item text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm font-medium">
          Dashboard
        </Link>
        <Link to="/browse-cleaners" className="uber-nav-item text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm">
          Services
        </Link>
        <Link to="/chat" className="uber-nav-item text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm">
          Messages
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to="/browse-cleaners" className="uber-nav-item text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm">
        Services
      </Link>
      <Link to="/comment-ca-marche" className="uber-nav-item text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm">
        À Propos
      </Link>
      <Link to="/auth" className="uber-nav-item text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm font-medium">
        Connexion
      </Link>
    </>
  );
};

export default NavigationItems;
