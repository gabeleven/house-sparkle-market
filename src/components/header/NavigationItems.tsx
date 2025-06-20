
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItemsProps {
  isLoggedIn?: boolean;
}

const NavigationItems = ({ isLoggedIn = false }: NavigationItemsProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (isLoggedIn) {
    return (
      <>
        {currentPath !== '/analytics' && (
          <Link to="/analytics" className="uber-nav-item text-white hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm font-medium">
            Dashboard
          </Link>
        )}
        {currentPath !== '/browse-services' && currentPath !== '/browse-providers' && (
          <Link to="/browse-services" className="uber-nav-item text-white hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm">
            Services
          </Link>
        )}
        {currentPath !== '/roadmap' && (
          <Link to="/roadmap" className="uber-nav-item text-white hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm">
            Roadmap
          </Link>
        )}
      </>
    );
  }

  return (
    <>
      {currentPath !== '/browse-services' && currentPath !== '/browse-providers' && (
        <Link to="/browse-services" className="uber-nav-item text-white hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm">
          Services
        </Link>
      )}
      {currentPath !== '/roadmap' && (
        <Link to="/roadmap" className="uber-nav-item text-white hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm">
          Roadmap
        </Link>
      )}
      {currentPath !== '/support' && (
        <Link to="/support" className="uber-nav-item text-white hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm">
          Support
        </Link>
      )}
      {currentPath !== '/auth' && (
        <Link to="/auth" className="uber-nav-item text-white hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg text-sm font-medium">
          Connexion
        </Link>
      )}
    </>
  );
};

export default NavigationItems;
