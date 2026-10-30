import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { QuoteRequestModal } from '../../components/shared/QuoteRequestModal';
import {
  ShoppingBag,
  Filter,
  Search,
  X,
  Plus,
  Minus,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Sprout,
  Calculator,
  ArrowUpDown,
  Tag,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, clones, addToCart } = useApp();
  const [searchParams] = useSearchParams();

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedClone, setSelectedClone] = useState<string>(searchParams.get('clone') || 'All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'name'>('popularity');
  const [priceMax, setPriceMax] = useState<number>(50000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Per-card quantity selection state
  const [cardQuantities, setCardQuantities] = useState<Record<string, number>>({});

  // Quote Modal State
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [productForQuote, setProductForQuote] = useState<Product | null>(null);

  const categories = ['All', 'Clonal Teak Sapling', 'Commercial Bulk Pack', 'Trial Sample Kit'];

  const getQty = (product: Product) => {
    return cardQuantities[product.id] || product.minOrderQuantity || 1;
  };

  const setQty = (productId: string, val: number, min = 1) => {
    setCardQuantities(prev => ({
      ...prev,
      [productId]: Math.max(min, val),
    }));
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (p.status !== 'active') return false;
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedClone !== 'All' && p.cloneId !== selectedClone) return false;
        if (inStockOnly && p.stock <= 0) return false;
        if (p.price > priceMax) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchClone = p.cloneId.toLowerCase().includes(q);
          const matchDesc = p.shortDescription.toLowerCase().includes(q);
          if (!matchName && !matchClone && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.rating || 0) - (a.rating || 0);
      });
  }, [products, selectedCategory, selectedClone, inStockOnly, priceMax, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedClone('All');
    setInStockOnly(false);
    setPriceMax(50000);
    setSortBy('popularity');
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Header */}
      <section className="bg-[#082A21] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#063B2D]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C8A45D]">
              Direct Nursery Procurement
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Clonal Teak Saplings & Commercial Packs
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Certified micropropagated teak plantlets. Available in individual nursery root-trainers, commercial 1-acre bulk packs, and experimental multi-clone trial kits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setProductForQuote(null);
                setQuoteModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#063B2D] border border-[#48A868] text-white text-xs font-semibold flex items-center gap-2 shadow"
            >
              <Calculator className="w-4 h-4 text-[#C8A45D]" /> Request Custom Bulk Quote
            </button>
          </div>
        </div>
      </section>

      {/* Main Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="w-72 bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm hidden lg:block shrink-0 sticky top-28 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="font-serif font-bold text-sm text-[#063B2D] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#087F5B]" /> Filter Catalog
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] text-stone-500 hover:text-[#087F5B] font-medium"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-[#087F5B] text-white font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Clone Type Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Teak Clone Variety
              </label>
              <select
                value={selectedClone}
                onChange={e => setSelectedClone(e.target.value)}
                className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#087F5B]"
              >
                <option value="All">All Clones (MBT-1 to MBT-9)</option>
                {clones.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.id} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Max Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-stone-700 font-medium">
                <span>Max Price:</span>
                <span className="font-bold text-[#063B2D]">₹{priceMax.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={100}
                max={50000}
                step={250}
                value={priceMax}
                onChange={e => setPriceMax(parseInt(e.target.value))}
                className="w-full accent-[#087F5B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>₹100 (Single Sapling)</span>
                <span>₹50,000 (Bulk Pack)</span>
              </div>
            </div>

            {/* Availability Checkbox */}
            <div className="pt-2 border-t border-stone-200">
              <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="rounded text-[#087F5B] focus:ring-[#087F5B] w-4 h-4"
                />
                <span className="font-medium">Show Immediate In-Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Main Product Catalog Grid */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl p-4 border border-[#E2E4D8] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search clone name, ID, or traits..."
                  className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl pl-9 pr-8 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#087F5B]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort & Mobile Filter Toggle */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden px-3.5 py-2 rounded-xl bg-[#F1F2E8] text-xs font-semibold text-[#063B2D] flex items-center gap-1.5"
                >
                  <Filter className="w-3.5 h-3.5" /> Filters
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 whitespace-nowrap">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="bg-[#F8F7F1] border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-800 font-medium focus:outline-none focus:border-[#087F5B]"
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Drawer */}
            {mobileFilterOpen && (
              <div className="lg:hidden bg-white p-5 rounded-2xl border border-[#E2E4D8] space-y-4 animate-in slide-in-from-top-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-bold text-xs uppercase text-[#063B2D]">Mobile Filters</span>
                  <button onClick={() => setMobileFilterOpen(false)} className="text-stone-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`text-xs px-2.5 py-1 rounded-lg border ${
                          selectedCategory === c
                            ? 'bg-[#087F5B] text-white border-[#087F5B]'
                            : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Clone Variety</label>
                  <select
                    value={selectedClone}
                    onChange={e => setSelectedClone(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2 text-xs"
                  >
                    <option value="All">All Clones</option>
                    {clones.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.id} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-2 bg-[#063B2D] text-white text-xs font-semibold rounded-xl"
                >
                  Apply & Close
                </button>
              </div>
            )}

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs text-stone-500 px-1">
              <span>Showing {filteredProducts.length} plant listings</span>
              {(selectedCategory !== 'All' || selectedClone !== 'All' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-[#087F5B] font-medium hover:underline flex items-center gap-1"
                >
                  Clear all active filters <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E4D8] space-y-4">
                <Sprout className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="text-lg font-serif font-bold text-stone-700">No matching plants found</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try clearing your search terms, resetting price boundaries, or choosing another clone.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold"
                >
                  Reset Catalog Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const qty = getQty(product);
                  const isAvailable = product.stock > 0;

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-3xl border border-[#E2E4D8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="relative h-56 bg-stone-100 overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span className="px-2.5 py-1 rounded-full bg-[#082A21]/90 backdrop-blur-md text-[#C8A45D] text-[11px] font-bold border border-[#C8A45D]/40 shadow">
                              {product.cloneId}
                            </span>
                            <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px]">
                              {product.category}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow ${
                                isAvailable
                                  ? 'bg-[#22C55E]/90 text-white'
                                  : 'bg-amber-600 text-white'
                              }`}
                            >
                              {isAvailable ? `${product.stock.toLocaleString()} In Stock` : 'Advance Booking'}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                          <h3 className="font-serif font-bold text-base text-[#172820] group-hover:text-[#087F5B] transition-colors leading-snug">
                            {product.name}
                          </h3>
                          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                            {product.shortDescription}
                          </p>

                          <div className="text-[11px] text-stone-600 bg-[#F8F7F1] p-2.5 rounded-xl space-y-1">
                            <div className="flex justify-between">
                              <span className="text-stone-400">Height / Spec:</span>
                              <span className="font-medium text-stone-700">{product.height}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-stone-400">Min. Order:</span>
                              <span className="font-medium text-stone-700">{product.minOrderQuantity} Units</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Pricing & Actions */}
                      <div className="p-5 pt-0 space-y-3 border-t border-stone-100">
                        <div className="flex items-center justify-between pt-3">
                          <div>
                            <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                              Unit Price
                            </span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xl font-bold text-[#063B2D]">
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-stone-400 line-through">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Selector */}
                          <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 px-1 py-0.5">
                            <button
                              onClick={() => setQty(product.id, qty - (product.minOrderQuantity > 1 ? 50 : 1), product.minOrderQuantity)}
                              className="p-1 hover:text-[#087F5B]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-stone-800 px-2 min-w-8 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => setQty(product.id, qty + (product.minOrderQuantity > 1 ? 50 : 1))}
                              className="p-1 hover:text-[#087F5B]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            to={`/shop/${product.slug}`}
                            className="py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-center text-xs font-semibold transition-colors"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => addToCart(product, qty)}
                            className="py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#063B2D] text-white text-center text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            setProductForQuote(product);
                            setQuoteModalOpen(true);
                          }}
                          className="w-full py-2 rounded-xl bg-[#F1F2E8] hover:bg-[#E2E4D8] text-[#063B2D] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Calculator className="w-3.5 h-3.5 text-[#087F5B]" /> Request Bulk Quotation
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedProduct={
          productForQuote
            ? {
                id: productForQuote.id,
                name: productForQuote.name,
                cloneId: productForQuote.cloneId,
                price: productForQuote.price,
                defaultQty: productForQuote.minOrderQuantity * 10,
              }
            : undefined
        }
      />
    </div>
  );
};
