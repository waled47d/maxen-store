import React, { useState } from 'react';
import {
  Wallet as WalletIcon,
  Plus,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Smartphone,
  Building,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Wallet() {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('paypal');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Login</h2>
          <p className="text-gray-400">You need to be logged in to access your wallet.</p>
        </div>
      </div>
    );
  }

  const transactions = [
    {
      id: '1',
      type: 'topup',
      amount: 5000,
      description: 'PayPal Top-up',
      status: 'completed',
      date: '2024-01-20T10:30:00Z',
    },
    {
      id: '2',
      type: 'purchase',
      amount: -1999,
      description: 'Fortnite 2,800 V-Bucks',
      status: 'completed',
      date: '2024-01-20T11:15:00Z',
    },
    {
      id: '3',
      type: 'purchase',
      amount: -3999,
      description: 'Xbox Game Pass Ultimate 3 Months',
      status: 'completed',
      date: '2024-01-18T14:22:00Z',
    },
    {
      id: '4',
      type: 'topup',
      amount: 2000,
      description: 'Bank Transfer Top-up',
      status: 'completed',
      date: '2024-01-17T09:45:00Z',
    },
    {
      id: '5',
      type: 'purchase',
      amount: -1299,
      description: 'Netflix Premium Account 1 Month',
      status: 'processing',
      date: '2024-01-17T16:30:00Z',
    },
  ];

  const topUpOptions = [
    { amount: 1000, bonus: 0, popular: false },
    { amount: 2500, bonus: 100, popular: false },
    { amount: 5000, bonus: 300, popular: true },
    { amount: 10000, bonus: 750, popular: false },
    { amount: 25000, bonus: 2000, popular: false },
  ];

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: CreditCard,
      description: 'Instant payment via PayPal',
      fees: 'No fees',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building,
      description: 'Local bank transfer',
      fees: '1-3 business days',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Payment',
      icon: Smartphone,
      description: 'Manual payment via WhatsApp',
      fees: 'Manual processing',
    },
  ];

  const handleTopUp = async () => {
    if (!topUpAmount || isNaN(Number(topUpAmount)) || Number(topUpAmount) <= 0) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const amount = Number(topUpAmount);
      updateUser({ coinBalance: user.coinBalance + amount });
      setShowTopUpModal(false);
      setTopUpAmount('');
      setIsProcessing(false);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-dark-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t('wallet.title')}</h1>
          <p className="text-gray-400">Manage your coins and view transaction history</p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-electric rounded-xl p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white text-lg font-semibold mb-2">
                  {t('wallet.balance')}
                </h2>
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-bold text-white">
                    {user.coinBalance.toLocaleString()}
                  </span>
                  <span className="text-white/80 text-lg">coins</span>
                </div>
                <p className="text-white/60 text-sm mt-2">
                  ≈ ${(user.coinBalance / 100).toFixed(2)} USD
                </p>
              </div>
              <div className="text-white/20">
                <WalletIcon className="h-20 w-20" />
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => setShowTopUpModal(true)}
                className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 font-semibold"
              >
                <Plus className="h-5 w-5" />
                <span>{t('wallet.topUp')}</span>
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-200 border border-dark-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">This Month</p>
                <p className="text-2xl font-bold text-white">+7,000</p>
                <p className="text-electric-blue text-sm">coins added</p>
              </div>
              <div className="text-green-400">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="bg-dark-200 border border-dark-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">This Month</p>
                <p className="text-2xl font-bold text-white">-5,297</p>
                <p className="text-red-400 text-sm">coins spent</p>
              </div>
              <div className="text-red-400">
                <TrendingDown className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="bg-dark-200 border border-dark-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Transactions</p>
                <p className="text-2xl font-bold text-white">47</p>
                <p className="text-electric-cyan text-sm">all time</p>
              </div>
              <div className="text-electric-cyan">
                <Calendar className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-dark-200 border border-dark-300 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">{t('wallet.history')}</h3>
            <button className="text-electric-blue hover:text-electric-cyan transition-colors duration-200 text-sm">
              Export
            </button>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-dark-300 rounded-lg hover:bg-dark-400 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-lg ${
                      transaction.type === 'topup'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {transaction.type === 'topup' ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{transaction.description}</h4>
                    <p className="text-sm text-gray-400">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-400' : 'text-white'
                    }`}
                  >
                    {transaction.amount > 0 ? '+' : ''}
                    {Math.abs(transaction.amount).toLocaleString()} coins
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : transaction.status === 'processing'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Up Modal */}
        {showTopUpModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-200 border border-dark-300 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{t('wallet.topUp')}</h3>
                <button
                  onClick={() => setShowTopUpModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Quick Amounts */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Quick Top-up</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {topUpOptions.map((option) => (
                      <button
                        key={option.amount}
                        onClick={() => setTopUpAmount(option.amount.toString())}
                        className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                          option.popular
                            ? 'border-electric-blue bg-electric-blue/10 hover:bg-electric-blue/20'
                            : 'border-dark-300 bg-dark-300 hover:bg-dark-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold text-white">
                            {option.amount.toLocaleString()}
                          </span>
                          {option.popular && (
                            <span className="bg-electric-blue text-white text-xs px-2 py-1 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">
                          ${(option.amount / 100).toFixed(2)}
                        </p>
                        {option.bonus > 0 && (
                          <p className="text-green-400 text-sm font-medium">
                            +{option.bonus} bonus coins
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Or enter custom amount
                  </label>
                  <input
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    placeholder="Enter amount in coins"
                    className="w-full bg-dark-300 border border-dark-400 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  />
                </div>

                {/* Payment Methods */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Payment Method</h4>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedPaymentMethod === method.id
                            ? 'border-electric-blue bg-electric-blue/10'
                            : 'border-dark-300 bg-dark-300 hover:bg-dark-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedPaymentMethod === method.id}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3 flex-1">
                          <method.icon className="h-6 w-6 text-electric-blue" />
                          <div>
                            <h5 className="font-medium text-white">{method.name}</h5>
                            <p className="text-sm text-gray-400">{method.description}</p>
                            <p className="text-xs text-electric-blue">{method.fees}</p>
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 border-2 rounded-full ${
                            selectedPaymentMethod === method.id
                              ? 'border-electric-blue bg-electric-blue'
                              : 'border-gray-400'
                          }`}
                        >
                          {selectedPaymentMethod === method.id && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                {topUpAmount && (
                  <div className="bg-dark-300 rounded-lg p-4">
                    <h5 className="font-medium text-white mb-2">Order Summary</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount:</span>
                        <span className="text-white">{Number(topUpAmount).toLocaleString()} coins</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cost:</span>
                        <span className="text-white">${(Number(topUpAmount) / 100).toFixed(2)}</span>
                      </div>
                      {/* Add bonus calculation if applicable */}
                      <hr className="border-dark-400 my-2" />
                      <div className="flex justify-between font-medium">
                        <span className="text-white">Total coins:</span>
                        <span className="text-electric-blue">{Number(topUpAmount).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowTopUpModal(false)}
                    className="flex-1 bg-dark-300 border border-dark-400 text-white py-3 rounded-lg hover:bg-dark-400 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTopUp}
                    disabled={!topUpAmount || isProcessing}
                    className="flex-1 bg-gradient-electric text-white py-3 rounded-lg hover:shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Continue to Payment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}