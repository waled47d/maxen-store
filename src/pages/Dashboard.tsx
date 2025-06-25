import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Wallet,
  ShoppingBag,
  MessageSquare,
  Settings,
  TrendingUp,
  Star,
  Clock,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Login</h2>
          <Link
            to="/login"
            className="bg-gradient-electric px-6 py-3 rounded-lg text-white font-semibold hover:shadow-neon transition-all duration-300"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Orders',
      value: '12',
      icon: ShoppingBag,
      color: 'text-electric-blue',
      bg: 'bg-electric-blue/10 border-electric-blue/30',
    },
    {
      title: 'Total Spent',
      value: '15,750',
      suffix: 'coins',
      icon: CreditCard,
      color: 'text-electric-cyan',
      bg: 'bg-electric-cyan/10 border-electric-cyan/30',
    },
    {
      title: 'Account Level',
      value: 'Gold',
      icon: Star,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10 border-yellow-400/30',
    },
    {
      title: 'Member Since',
      value: '2024',
      icon: Clock,
      color: 'text-green-400',
      bg: 'bg-green-400/10 border-green-400/30',
    },
  ];

  const recentOrders = [
    {
      id: '1',
      product: 'Fortnite 2,800 V-Bucks',
      price: 1999,
      status: 'completed',
      date: '2024-01-20',
    },
    {
      id: '2',
      product: 'Xbox Game Pass Ultimate 3 Months',
      price: 3999,
      status: 'completed',
      date: '2024-01-18',
    },
    {
      id: '3',
      product: 'Netflix Premium Account 1 Month',
      price: 1299,
      status: 'processing',
      date: '2024-01-17',
    },
  ];

  const quickActions = [
    {
      title: 'Top Up Coins',
      description: 'Add coins to your wallet',
      icon: Wallet,
      link: '/wallet',
      color: 'text-electric-blue',
      bg: 'bg-electric-blue/10 hover:bg-electric-blue/20 border-electric-blue/30',
    },
    {
      title: 'Browse Products',
      description: 'Discover new digital content',
      icon: ShoppingBag,
      link: '/products',
      color: 'text-electric-cyan',
      bg: 'bg-electric-cyan/10 hover:bg-electric-cyan/20 border-electric-cyan/30',
    },
    {
      title: 'Support Center',
      description: 'Get help and support',
      icon: MessageSquare,
      link: '/support',
      color: 'text-green-400',
      bg: 'bg-green-400/10 hover:bg-green-400/20 border-green-400/30',
    },
    {
      title: 'Account Settings',
      description: 'Manage your profile',
      icon: Settings,
      link: '/profile',
      color: 'text-orange-400',
      bg: 'bg-orange-400/10 hover:bg-orange-400/20 border-orange-400/30',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('dashboard.welcome')}, {user.name}! 👋
          </h1>
          <p className="text-gray-400">
            Manage your account, track orders, and explore new digital content.
          </p>
        </div>

        {/* Coin Balance Card */}
        <div className="bg-gradient-electric rounded-xl p-6 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white text-lg font-semibold mb-1">Current Balance</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-white">
                    {user.coinBalance.toLocaleString()}
                  </span>
                  <span className="text-white/80">coins</span>
                </div>
              </div>
              <div className="text-white/20">
                <Wallet className="h-16 w-16" />
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/wallet"
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <span>Top Up Coins</span>
                <TrendingUp className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bg} border rounded-xl p-6 transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  {stat.suffix && (
                    <span className="text-sm text-gray-400">{stat.suffix}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-dark-200 border border-dark-300 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.bg} border rounded-lg p-4 transition-all duration-300 hover:scale-105 group`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${action.bg}`}>
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-electric-blue transition-colors duration-200">
                        {action.title}
                      </h4>
                      <p className="text-xs text-gray-400">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-dark-200 border border-dark-300 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Orders</h3>
              <Link
                to="/orders"
                className="text-electric-blue hover:text-electric-cyan transition-colors duration-200 text-sm"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-dark-300 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-white text-sm">{order.product}</h4>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-electric-blue font-semibold text-sm">
                      {order.price.toLocaleString()} coins
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-orange-500/20 text-orange-400'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}