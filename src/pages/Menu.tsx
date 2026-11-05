import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRestaurant } from '../context/RestaurantContext';
import { FoodCard, FoodCardDensity } from '../components/FoodCard';
import { MenuCategorySlug } from '../types';
import { 
  Search, 
  Flame, 
  Leaf, 
  UtensilsCrossed, 
  Soup, 
  Sparkles, 
  X,
  SlidersHorizontal,
  Layers,
  Grid3X3,
  Grid2X2,
  List
} from 'lucide-react';

export const Menu: React.FC = () => {
  const { menuItems, categories } = useRestaurant();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') as MenuCategorySlug | null;
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  // Customer Card Size / Density Option
  const [cardDensity, setCardDensity] = useState<FoodCardDensity>(() => {
    try {
      return (localStorage.getItem('amoga_public_card_density') as FoodCardDensity) || 'medium';
    } catch {
      return 'medium';
    }
  });

  const handleSetCardDensity = (density: FoodCardDensity) => {
    setCardDensity(density);
    try {
      localStorage.setItem('amoga_public_card_density', density);
    } catch {}
  };

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  // Filter menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Veg / Non-Veg filter
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'non-veg' && item.isVeg) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [menuItems, selectedCategory, dietFilter, searchQuery]);

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-amoga-cream dark:bg-[#120B0D] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold text-amoga-orangeDark dark:text-amoga-orange uppercase tracking-widest block mb-1">
            Cooked Fresh Daily
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
            Our Complete Menu
          </h1>
          <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#C5ACA8] mt-2">
            Explore all 62 authentic dishes, slow-dum biryanis, and sizzling starters. Add to cart for convenient takeaway pickup.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white dark:bg-[#1E1417] rounded-3xl p-4 sm:p-6 shadow-amoga dark:shadow-none border border-amoga-creamDark dark:border-white/10 mb-8 space-y-4 transition-colors">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-amoga-charcoalLight dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search biryanis, starters, fried rice..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-amoga-creamDark dark:border-white/10 bg-amoga-cream/30 dark:bg-black/30 text-xs sm:text-sm text-amoga-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-orange transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amoga-charcoalLight hover:text-amoga-charcoal dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Veg / Non-Veg Quick Toggles */}
            <div className="flex items-center gap-1.5 p-1 bg-amoga-cream dark:bg-white/5 rounded-xl border border-amoga-creamDark dark:border-white/10 w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  dietFilter === 'all'
                    ? 'bg-amoga-burgundy text-white shadow-sm'
                    : 'text-amoga-charcoal dark:text-slate-300 hover:bg-amoga-creamDark dark:hover:bg-white/10'
                }`}
              >
                All Dishes
              </button>
              <button
                type="button"
                onClick={() => setDietFilter('veg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  dietFilter === 'veg'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-white/10'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Pure Veg</span>
              </button>
              <button
                type="button"
                onClick={() => setDietFilter('non-veg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  dietFilter === 'non-veg'
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'text-red-800 dark:text-red-400 hover:bg-red-50 dark:hover:bg-white/10'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Non-Veg</span>
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="pt-2 border-t border-amoga-creamDark/60 dark:border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-amoga-burgundy text-white shadow-md'
                  : 'bg-amoga-cream dark:bg-white/5 hover:bg-amoga-creamDark dark:hover:bg-white/10 text-amoga-charcoal dark:text-slate-300 border border-amoga-creamDark dark:border-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Categories (62)</span>
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amoga-burgundy text-white shadow-md'
                      : 'bg-amoga-cream dark:bg-white/5 hover:bg-amoga-creamDark dark:hover:bg-white/10 text-amoga-charcoal dark:text-slate-300 border border-amoga-creamDark dark:border-white/10'
                  }`}
                >
                  {cat.slug === 'non-veg-starters' && <Flame className="w-3.5 h-3.5 text-red-500" />}
                  {cat.slug === 'veg-starters' && <Leaf className="w-3.5 h-3.5 text-emerald-500" />}
                  {cat.slug === 'non-veg-biryanis' && <UtensilsCrossed className="w-3.5 h-3.5 text-amber-500" />}
                  {cat.slug === 'veg-biryanis' && <Soup className="w-3.5 h-3.5 text-green-500" />}
                  {cat.slug === 'veg-rice' && <Sparkles className="w-3.5 h-3.5 text-orange-500" />}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Card Size Options for Live Website */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-amoga-charcoalLight dark:text-slate-400 px-1">
          <div className="flex items-center gap-3">
            <span>
              Showing <strong className="text-amoga-charcoal dark:text-white font-bold">{filteredItems.length}</strong> items
            </span>
            {(searchQuery || selectedCategory !== 'all' || dietFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  handleCategorySelect('all');
                  setDietFilter('all');
                }}
                className="text-amoga-orangeDark dark:text-amoga-orange hover:underline font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Card Size / Density Switcher */}
          <div className="flex items-center gap-1 bg-white dark:bg-[#1E1417] p-1 rounded-xl border border-amoga-creamDark dark:border-white/10 shadow-2xs self-start sm:self-auto">
            <span className="text-[10px] font-bold text-amoga-charcoalLight dark:text-slate-400 uppercase tracking-wider px-2 flex items-center gap-1 border-r border-amoga-creamDark/60 dark:border-white/10">
              <SlidersHorizontal className="w-3 h-3 text-amoga-orangeDark dark:text-amoga-orange" />
              <span>Card Size</span>
            </span>

            <button
              type="button"
              onClick={() => handleSetCardDensity('compact')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                cardDensity === 'compact'
                  ? 'bg-amoga-burgundy text-white shadow-xs'
                  : 'text-amoga-charcoal dark:text-slate-300 hover:bg-amoga-cream dark:hover:bg-white/10'
              }`}
              title="Compact View (Dense grid, smaller cards)"
            >
              <span>Compact</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetCardDensity('medium')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                cardDensity === 'medium'
                  ? 'bg-amoga-burgundy text-white shadow-xs'
                  : 'text-amoga-charcoal dark:text-slate-300 hover:bg-amoga-cream dark:hover:bg-white/10'
              }`}
              title="Normal View (Balanced cards)"
            >
              <Grid3X3 className="w-3 h-3" />
              <span>Normal</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetCardDensity('large')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                cardDensity === 'large'
                  ? 'bg-amoga-burgundy text-white shadow-xs'
                  : 'text-amoga-charcoal dark:text-slate-300 hover:bg-amoga-cream dark:hover:bg-white/10'
              }`}
              title="Large View (Spacious cards with big images)"
            >
              <Grid2X2 className="w-3 h-3" />
              <span>Large</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetCardDensity('list')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                cardDensity === 'list'
                  ? 'bg-amoga-burgundy text-white shadow-xs'
                  : 'text-amoga-charcoal dark:text-slate-300 hover:bg-amoga-cream dark:hover:bg-white/10'
              }`}
              title="List View (Single-column food rows)"
            >
              <List className="w-3 h-3" />
              <span>List</span>
            </button>
          </div>
        </div>

        {/* Food Grid / List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#1E1417] rounded-3xl border border-amoga-creamDark dark:border-white/10 p-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amoga-creamDark/60 dark:bg-white/10 flex items-center justify-center text-amoga-charcoalLight dark:text-slate-400 mx-auto mb-4">
              <Search className="w-8 h-8 opacity-40" />
            </div>
            <h3 className="font-serif text-xl font-bold text-amoga-charcoal dark:text-white mb-1">
              No Dishes Found
            </h3>
            <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-slate-400 max-w-sm mx-auto mb-6">
              We couldn't find any dishes matching your search. Try adjusting your search term or category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                handleCategorySelect('all');
                setDietFilter('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-amoga-burgundy text-white text-xs font-bold shadow-amoga cursor-pointer"
            >
              Show All Dishes
            </button>
          </div>
        ) : (
          <div className={
            cardDensity === 'compact'
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4'
              : cardDensity === 'large'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'
              : cardDensity === 'list'
              ? 'grid grid-cols-1 gap-3 sm:gap-4 max-w-4xl mx-auto'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          }>
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} density={cardDensity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

