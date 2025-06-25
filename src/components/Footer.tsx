import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Mail, MessageCircle, Shield, CreditCard, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-gaming border-t border-dark-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-electric rounded-lg">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-electric bg-clip-text text-transparent">
                Maxen Store
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted premium digital gaming destination. Secure transactions, instant delivery, and 24/7 support for all your gaming needs.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-electric-blue">
                <Shield className="h-4 w-4" />
                <span className="text-xs">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-electric-cyan">
                <Zap className="h-4 w-4" />
                <span className="text-xs">Instant delivery</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-electric-blue transition-colors duration-200">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/how-to-buy" className="text-gray-400 hover:text-electric-blue transition-colors duration-200">
                  How to Buy
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="text-gray-400 hover:text-electric-blue transition-colors duration-200">
                  Top Up Coins
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-electric-blue transition-colors duration-200">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=fortnite" className="text-gray-400 hover:text-electric-blue transition-colors duration-200">
                  Fortnite
                </Link>
              </li>
              <li>
                <Link to="/products?category=xbox" className="text-gray-400 hover:text-electric-blue transition-colors duration-200">
                  Xbox
                </Link>
              </li>
              <li>
                <Link to="/products?category=playstation" className="text-gray-400 hover:text-electric-blue transition-colors duration-200">
                  PlayStation
                </Link>
              </li>
              <li>
                <Link to="/products?category=netflix" className="text-gray-400 hover:text-electric-blue transition-colors duration-200">
                  Streaming Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-electric-blue transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-electric-blue transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-electric-blue transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-electric-blue transition-colors duration-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-8 border-t border-dark-300">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Accepted Payments:</span>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 bg-dark-200 px-3 py-1 rounded-full">
                  <CreditCard className="h-4 w-4 text-electric-blue" />
                  <span className="text-xs text-gray-300">PayPal</span>
                </div>
                <div className="flex items-center space-x-1 bg-dark-200 px-3 py-1 rounded-full">
                  <CreditCard className="h-4 w-4 text-electric-cyan" />
                  <span className="text-xs text-gray-300">Bank Transfer</span>
                </div>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Maxen Store. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}