export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  coinBalance: number;
  language: 'en' | 'ar';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in coins
  originalPrice?: number;
  category: ProductCategory;
  region: string;
  image: string;
  tags: string[];
  deliveryType: 'instant' | 'manual';
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: string;
  deliveryType: 'instant' | 'manual';
  createdAt: string;
  completedAt?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'topup' | 'purchase' | 'refund';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface Language {
  code: 'en' | 'ar';
  name: string;
  flag: string;
}