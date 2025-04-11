import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">PromptGen Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium ${isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
            >
              Home
            </Link>
            <Link 
              to="/generate" 
              className={`text-sm font-medium ${isActive('/generate') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
            >
              Generate Prompt
            </Link>
            <Link 
              to="/model-status" 
              className={`text-sm font-medium ${isActive('/model-status') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
            >
              Model Status
            </Link>
            <Link 
              to="/docs" 
              className={`text-sm font-medium ${isActive('/docs') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
            >
              Documentation
            </Link>
          </nav>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 space-y-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/generate" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/generate') ? 'bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'}`}
              onClick={closeMenu}
            >
              Generate Prompt
            </Link>
            <Link 
              to="/model-status" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/model-status') ? 'bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'}`}
              onClick={closeMenu}
            >
              Model Status
            </Link>
            <Link 
              to="/docs" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/docs') ? 'bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'}`}
              onClick={closeMenu}
            >
              Documentation
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;