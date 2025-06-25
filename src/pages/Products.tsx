import React, { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, Grid, List } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/ProductCard';
import { products, categories, regions } from '../data/mockData';
import { Product } from '../types';

export default function Products() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product: Product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !selectedCategory || product.category.slug === selectedCategory;
      const matchesRegion = !selectedRegion || product.region === selectedRegion;
      
      return matchesSearch && matchesCategory && matchesRegion;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
      default:
        // Keep default order for newest
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedRegion, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedRegion('');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-dark-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">{t('products.title')}</h1>
          <p className="text-gray-400">
            Discover {products.length} premium digital products across all categories
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-200 border border-dark-300 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-dark-200 border border-dark-300 px-4 py-2 rounded-lg text-gray-300 hover:text-electric-blue hover:border-electric-blue transition-all duration-200"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>

              {(selectedCategory || selectedRegion || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="bg-electric-blue text-white px-4 py-2 rounded-lg hover:bg-electric-cyan transition-colors duration-200"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-dark-200 border border-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              >
                <option value="newest">{t('products.newest')}</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-dark-200 border border-dark-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-electric-blue text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-200`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-electric-blue text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-200`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="bg-dark-200 border border-dark-300 rounded-lg p-6 space-y-4">
              <h3 className="text-white font-semibold mb-4">{t('products.filterBy')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">{t('products.category')}</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-dark-300 border border-dark-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Region Filter */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">{t('products.region')}</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-dark-300 border border-dark-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  >
                    <option value="">All Regions</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
            <button
              onClick={clearFilters}
              className="bg-electric-blue text-white px-6 py-3 rounded-lg hover:bg-electric-cyan transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}