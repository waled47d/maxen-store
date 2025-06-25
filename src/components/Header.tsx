import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gamepad2,
  User,
  ShoppingCart,
  Wallet,
  Menu,
  X,
  Globe,
  LogOut,
  Settings,
  Search,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
    setIsLanguageOpen(false);
  };

  return (
    <header className="bg-gradient-gaming border-b border-dark-300 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-electric rounded-lg group-hover:shadow-neon transition-all duration-300">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-electric bg-clip-text text-transparent">
              Maxen Store
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="w-full bg-dark-200 border border-dark-300 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/products"
              className="text-gray-300 hover:text-electric-blue transition-colors duration-200"
            >
              {t('nav.products')}
            </Link>
            
            {user && (
              <>
                <Link
                  to="/wallet"
                  className="flex items-center space-x-1 text-gray-300 hover:text-electric-blue transition-colors duration-200"
                >
                  <Wallet className="h-4 w-4" />
                  <span>{t('nav.wallet')}</span>
                </Link>
                
                <Link
                  to="/cart"
                  className="relative text-gray-300 hover:text-electric-blue transition-colors duration-200"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-electric-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              </>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 text-gray-300 hover:text-electric-blue transition-colors duration-200"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase">{language}</span>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-dark-200 border border-dark-300 rounded-lg shadow-lg">
                  <button
                    onClick={toggleLanguage}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:text-electric-blue hover:bg-dark-300 transition-colors duration-200"
                  >
                    {language === 'en' ? 'العربية' : 'English'}
                  </button>
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-electric-blue transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden lg:block">{user.name}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-200 border border-dark-300 rounded-lg shadow-lg">
                    <div className="px-4 py-3 border-b border-dark-300">
                      <p className="text-sm text-gray-300">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                      <p className="text-sm text-electric-blue font-semibold">
                        {user.coinBalance} {t('products.coins')}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-electric-blue hover:bg-dark-300 transition-colors duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>{t('nav.dashboard')}</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:text-red-400 hover:bg-dark-300 transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t('nav.logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-electric-blue transition-colors duration-200"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-electric px-4 py-2 rounded-lg text-white font-semibold hover:shadow-neon transition-all duration-300"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-electric-blue transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-300">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('common.search')}
                  className="w-full bg-dark-200 border border-dark-300 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                />
              </div>

              <Link
                to="/products"
                className="text-gray-300 hover:text-electric-blue transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.products')}
              </Link>

              {user ? (
                <>
                  <Link
                    to="/wallet"
                    className="flex items-center space-x-2 text-gray-300 hover:text-electric-blue transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Wallet className="h-4 w-4" />
                    <span>{t('nav.wallet')}</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-gray-300 hover:text-electric-blue transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>{t('nav.dashboard')}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-left text-gray-300 hover:text-red-400 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-electric-blue transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-electric px-4 py-2 rounded-lg text-white font-semibold hover:shadow-neon transition-all duration-300 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}

              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-gray-300 hover:text-electric-blue transition-colors duration-200"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}