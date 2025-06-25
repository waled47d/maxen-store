import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.wallet': 'Wallet',
    'nav.dashboard': 'Dashboard',
    'nav.support': 'Support',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    
    // Home
    'home.title': 'Welcome to Maxen Store',
    'home.subtitle': 'Your Premium Digital Gaming Destination',
    'home.description': 'Discover game bundles, top-up cards, and streaming services with our secure coin-based system.',
    'home.getStarted': 'Get Started',
    'home.browseProducts': 'Browse Products',
    'home.featuredProducts': 'Featured Products',
    'home.popularCategories': 'Popular Categories',
    
    // Products
    'products.title': 'All Products',
    'products.filterBy': 'Filter by',
    'products.category': 'Category',
    'products.region': 'Region',
    'products.sortBy': 'Sort by',
    'products.price': 'Price',
    'products.rating': 'Rating',
    'products.newest': 'Newest First',
    'products.buyNow': 'Buy Now',
    'products.addToCart': 'Add to Cart',
    'products.outOfStock': 'Out of Stock',
    'products.coins': 'Coins',
    'products.instantDelivery': 'Instant Delivery',
    'products.manualDelivery': 'Manual Processing',
    
    // Wallet
    'wallet.title': 'My Wallet',
    'wallet.balance': 'Current Balance',
    'wallet.topUp': 'Top Up Coins',
    'wallet.history': 'Transaction History',
    'wallet.amount': 'Amount',
    'wallet.paymentMethod': 'Payment Method',
    'wallet.paypal': 'PayPal',
    'wallet.bankTransfer': 'Bank Transfer',
    'wallet.whatsapp': 'WhatsApp',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.recentOrders': 'Recent Orders',
    'dashboard.quickStats': 'Quick Stats',
    'dashboard.totalOrders': 'Total Orders',
    'dashboard.totalSpent': 'Total Spent',
    'dashboard.profile': 'Profile Settings',
    'dashboard.orders': 'Order History',
    'dashboard.tickets': 'Support Tickets',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.close': 'Close',
    'common.search': 'Search...',
    'common.viewAll': 'View All',
    'common.backToHome': 'Back to Home',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.wallet': 'المحفظة',
    'nav.dashboard': 'لوحة التحكم',
    'nav.support': 'الدعم',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    'nav.logout': 'تسجيل الخروج',
    
    // Home
    'home.title': 'مرحباً بك في متجر ماكسن',
    'home.subtitle': 'وجهتك المميزة للألعاب الرقمية',
    'home.description': 'اكتشف حزم الألعاب وبطاقات الشحن وخدمات البث مع نظام العملات الآمن.',
    'home.getStarted': 'ابدأ الآن',
    'home.browseProducts': 'تصفح المنتجات',
    'home.featuredProducts': 'المنتجات المميزة',
    'home.popularCategories': 'الفئات الشائعة',
    
    // Products
    'products.title': 'جميع المنتجات',
    'products.filterBy': 'تصفية حسب',
    'products.category': 'الفئة',
    'products.region': 'المنطقة',
    'products.sortBy': 'ترتيب حسب',
    'products.price': 'السعر',
    'products.rating': 'التقييم',
    'products.newest': 'الأحدث أولاً',
    'products.buyNow': 'شراء الآن',
    'products.addToCart': 'أضف للسلة',
    'products.outOfStock': 'غير متوفر',
    'products.coins': 'عملة',
    'products.instantDelivery': 'تسليم فوري',
    'products.manualDelivery': 'معالجة يدوية',
    
    // Wallet
    'wallet.title': 'محفظتي',
    'wallet.balance': 'الرصيد الحالي',
    'wallet.topUp': 'شحن العملات',
    'wallet.history': 'تاريخ المعاملات',
    'wallet.amount': 'المبلغ',
    'wallet.paymentMethod': 'طريقة الدفع',
    'wallet.paypal': 'PayPal',
    'wallet.bankTransfer': 'تحويل بنكي',
    'wallet.whatsapp': 'واتساب',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.welcome': 'مرحباً بعودتك',
    'dashboard.recentOrders': 'الطلبات الحديثة',
    'dashboard.quickStats': 'إحصائيات سريعة',
    'dashboard.totalOrders': 'إجمالي الطلبات',
    'dashboard.totalSpent': 'إجمالي المنفق',
    'dashboard.profile': 'إعدادات الملف الشخصي',
    'dashboard.orders': 'تاريخ الطلبات',
    'dashboard.tickets': 'تذاكر الدعم',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.close': 'إغلاق',
    'common.search': 'بحث...',
    'common.viewAll': 'عرض الكل',
    'common.backToHome': 'العودة للرئيسية',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}