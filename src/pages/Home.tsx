import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Shield, CreditCard, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const featuredProducts = products.filter(product => product.featured).slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-gaming overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {t('home.title')}
              </h1>
              <p className="text-xl md:text-2xl text-electric-blue font-semibold">
                {t('home.subtitle')}
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t('home.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <Link
                  to="/register"
                  className="bg-gradient-electric px-8 py-4 rounded-lg text-white font-semibold hover:shadow-neon-strong transition-all duration-300 transform hover:scale-105"
                >
                  {t('home.getStarted')}
                </Link>
              ) : (
                <Link
                  to="/wallet"
                  className="bg-gradient-electric px-8 py-4 rounded-lg text-white font-semibold hover:shadow-neon-strong transition-all duration-300 transform hover:scale-105"
                >
                  Top Up Coins
                </Link>
              )}
              <Link
                to="/products"
                className="border-2 border-electric-blue text-electric-blue px-8 py-4 rounded-lg font-semibold hover:bg-electric-blue hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <span>{t('home.browseProducts')}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Gamepad2 className="h-16 w-16 text-electric-blue animate-pulse-slow" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Star className="h-12 w-12 text-electric-cyan animate-pulse-slow" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 group">
              <div className="mx-auto w-16 h-16 bg-gradient-electric rounded-full flex items-center justify-center group-hover:shadow-neon transition-all duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Instant Delivery</h3>
              <p className="text-gray-400">Get your digital products delivered instantly to your account with our automated system.</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="mx-auto w-16 h-16 bg-gradient-electric rounded-full flex items-center justify-center group-hover:shadow-neon transition-all duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Secure Payments</h3>
              <p className="text-gray-400">Shop with confidence using our secure coin-based system and trusted payment methods.</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="mx-auto w-16 h-16 bg-gradient-electric rounded-full flex items-center justify-center group-hover:shadow-neon transition-all duration-300">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Multiple Payment Options</h3>
              <p className="text-gray-400">Pay with PayPal, bank transfer, or manual payment methods for your convenience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-gradient-gaming">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{t('home.popularCategories')}</h2>
            <p className="text-gray-400 text-lg">Explore our most popular gaming categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="bg-dark-200 border border-dark-300 rounded-xl p-6 text-center hover:border-electric-blue hover:shadow-neon transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-electric-blue transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">{t('home.featuredProducts')}</h2>
              <p className="text-gray-400 text-lg">Hand-picked products with the best value</p>
            </div>
            <Link
              to="/products"
              className="text-electric-blue hover:text-electric-cyan transition-colors duration-200 flex items-center space-x-2"
            >
              <span>{t('common.viewAll')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-electric">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Gaming?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of satisfied customers and get instant access to your favorite digital content.
          </p>
          {!user ? (
            <Link
              to="/register"
              className="bg-white text-electric-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          ) : (
            <Link
              to="/products"
              className="bg-white text-electric-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}