import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Clock, Tag } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      addToCart(product);
    }
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-dark-200 border border-dark-300 rounded-xl overflow-hidden hover:border-electric-blue hover:shadow-neon transition-all duration-300 group">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-2">
            {product.featured && (
              <span className="bg-gradient-electric px-2 py-1 rounded-full text-xs font-semibold text-white">
                Featured
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 px-2 py-1 rounded-full text-xs font-semibold text-white flex items-center space-x-1">
                <Tag className="h-3 w-3" />
                <span>-{discount}%</span>
              </span>
            )}
          </div>

          {/* Delivery Type */}
          <div className="absolute top-3 right-3">
            {product.deliveryType === 'instant' ? (
              <div className="bg-green-500 bg-opacity-90 px-2 py-1 rounded-full flex items-center space-x-1">
                <Zap className="h-3 w-3 text-white" />
                <span className="text-xs text-white font-medium">Instant</span>
              </div>
            ) : (
              <div className="bg-orange-500 bg-opacity-90 px-2 py-1 rounded-full flex items-center space-x-1">
                <Clock className="h-3 w-3 text-white" />
                <span className="text-xs text-white font-medium">Manual</span>
              </div>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-red-400 font-semibold">{t('products.outOfStock')}</span>
            </div>
          )}
        </div>

        <div className="p-4 space-y-3">
          {/* Category & Region */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-electric-blue font-medium">{product.category.name}</span>
            <span className="text-gray-400">{product.region}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-electric-blue transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-electric-blue font-bold text-lg">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-electric-blue text-sm">{t('products.coins')}</span>
              </div>
              {product.originalPrice && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-sm line-through">
                    {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-red-400 text-sm">{t('products.coins')}</span>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            {user && product.inStock && (
              <button
                onClick={handleAddToCart}
                className="bg-gradient-electric p-2 rounded-lg hover:shadow-neon transition-all duration-300 group/btn"
                title={t('products.addToCart')}
              >
                <ShoppingCart className="h-4 w-4 text-white group-hover/btn:scale-110 transition-transform duration-200" />
              </button>
            )}
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-dark-300 text-gray-400 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}