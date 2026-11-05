import React from 'react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { Plus, Minus, ShoppingBag } from 'lucide-react';

export type FoodCardDensity = 'compact' | 'medium' | 'large' | 'list';

interface FoodCardProps {
  item: MenuItem;
  density?: FoodCardDensity;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, density = 'medium' }) => {
  const { getItemQuantity, addToCart, decreaseQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  // 1. HORIZONTAL LIST DENSITY (SWIGGY/ZOMATO STYLE DISH ROWS)
  if (density === 'list') {
    return (
      <div className={`bg-white dark:bg-[#1C1215] rounded-2xl p-4 sm:p-5 shadow-amoga hover:shadow-amoga-lg transition-all duration-300 flex items-center justify-between gap-4 border border-amoga-creamDark/60 dark:border-white/10 group ${!item.isAvailable ? 'opacity-60 grayscale-[40%]' : ''}`}>
        {/* Left Side: Veg Tag, Name, Price, Description */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-4 h-4 rounded-xs border-2 flex items-center justify-center shrink-0 shadow-2xs"
              style={{ borderColor: item.isVeg ? '#16a34a' : '#dc2626' }}
              title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.isVeg ? '#16a34a' : '#dc2626' }}
              />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amoga-orangeDark">
              {item.categoryName.replace(' Items', '')}
            </span>
          </div>

          <h3 className="font-serif text-base sm:text-lg font-bold text-amoga-charcoal dark:text-[#F8ECE8] group-hover:text-amoga-orangeDark transition-colors leading-tight mb-1">
            {item.name}
          </h3>

          <div className="font-serif text-lg sm:text-xl font-bold text-amoga-burgundy dark:text-amoga-goldPale mb-1.5">
            ₹{item.price}
          </div>

          {item.description && (
            <p className="text-xs text-amoga-charcoalLight dark:text-[#CBB5B1] line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Right Side: Photo + Overlaid Add/Quantity Stepper */}
        <div className="relative shrink-0 flex flex-col items-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-amoga-creamDark/40 dark:bg-black/40 border border-amoga-creamDark dark:border-white/10">
            <img
              src={item.imageUrl || '/images/hero-biryani.jpg'}
              alt={item.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/hero-biryani.jpg';
              }}
            />
            {!item.isAvailable && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center rounded-2xl">
                <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Stepper / Add button anchored at bottom of thumbnail */}
          <div className="absolute -bottom-2.5 shadow-md">
            {item.isAvailable ? (
              quantity > 0 ? (
                <div className="inline-flex items-center rounded-xl bg-amoga-burgundy text-white overflow-hidden text-xs shadow-md border border-white dark:border-white/20">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2.5 py-1 hover:bg-amoga-burgundyDark transition-colors active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-1.5 font-bold text-xs min-w-[16px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="px-2.5 py-1 hover:bg-amoga-burgundyDark transition-colors active:scale-95"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => addToCart(item)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white dark:bg-[#25181C] text-amoga-burgundy dark:text-amoga-goldPale hover:bg-amoga-cream dark:hover:bg-white/10 border border-amoga-creamDark dark:border-white/15 text-xs font-bold transition-all shadow-md active:scale-95 hover:text-amoga-orangeDark"
                >
                  <Plus className="w-3 h-3 text-amoga-orangeDark" />
                  <span>ADD</span>
                </button>
              )
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  // 2. GRID DENSITIES (COMPACT, MEDIUM, LARGE)
  const isCompact = density === 'compact';
  const isLarge = density === 'large';

  return (
    <div className={`bg-white dark:bg-[#1C1215] transition-all duration-300 flex flex-col justify-between border border-amoga-creamDark/60 dark:border-white/10 group shadow-amoga hover:shadow-amoga-lg ${
      isCompact 
        ? 'rounded-xl p-3 sm:p-3.5' 
        : isLarge 
        ? 'rounded-3xl p-5 sm:p-6' 
        : 'rounded-2xl p-4 sm:p-5'
    } ${!item.isAvailable ? 'opacity-60 grayscale-[40%]' : ''}`}>
      <div>
        {/* Image & Badges */}
        <div className={`relative rounded-xl overflow-hidden bg-amoga-creamDark/40 dark:bg-black/40 ${
          isCompact ? 'aspect-[4/3] mb-2.5' : isLarge ? 'aspect-[16/10] mb-4' : 'aspect-[4/3] mb-4'
        }`}>
          <img
            src={item.imageUrl || '/images/hero-biryani.jpg'}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/hero-biryani.jpg';
            }}
          />
          
          {/* Veg / Non-Veg Indicator */}
          <div 
            className={`absolute rounded-xs bg-white/95 dark:bg-[#1C1215]/95 backdrop-blur-sm border-2 flex items-center justify-center shadow-sm ${
              isCompact ? 'bottom-2 right-2 w-4 h-4' : 'bottom-3 right-3 w-5 h-5'
            }`}
            style={{ borderColor: item.isVeg ? '#16a34a' : '#dc2626' }}
            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          >
            <span 
              className={isCompact ? 'w-2 h-2 rounded-full' : 'w-2.5 h-2.5 rounded-full'}
              style={{ backgroundColor: item.isVeg ? '#16a34a' : '#dc2626' }}
            />
          </div>

          {/* Category Pill */}
          <span className={`absolute px-2 py-0.5 rounded-full bg-white/90 dark:bg-[#1C1215]/90 backdrop-blur-sm text-amoga-orangeDark font-bold uppercase tracking-wider shadow-sm ${
            isCompact ? 'top-2 left-2 text-[9px]' : 'top-3 left-3 text-[11px]'
          }`}>
            {item.categoryName.replace(' Items', '')}
          </span>

          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Name */}
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[10px] sm:text-xs font-semibold text-amoga-charcoalLight/80 dark:text-white/60 uppercase tracking-wider">
            {item.isVeg ? 'Pure Veg' : 'Non-Veg'}
          </span>
          <span className={`font-serif font-bold text-amoga-burgundy dark:text-amoga-goldPale ${
            isCompact ? 'text-lg sm:text-xl' : isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}>
            ₹{item.price}
          </span>
        </div>

        <h3 className={`font-serif font-bold text-amoga-charcoal dark:text-[#F8ECE8] group-hover:text-amoga-orangeDark transition-colors leading-snug mb-1 ${
          isCompact ? 'text-sm sm:text-base line-clamp-1' : isLarge ? 'text-xl sm:text-2xl' : 'text-lg line-clamp-1'
        }`}>
          {item.name}
        </h3>

        {item.description && (
          <p className={`text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed mb-3 ${
            isCompact 
              ? 'text-[11px] line-clamp-1 hidden sm:block' 
              : isLarge 
              ? 'text-sm line-clamp-3' 
              : 'text-xs sm:text-sm line-clamp-2'
          }`}>
            {item.description}
          </p>
        )}
      </div>

      {/* Action / Stepper */}
      <div className={`border-t border-amoga-creamDark/40 dark:border-white/10 flex items-center justify-between ${
        isCompact ? 'pt-2' : 'pt-2.5'
      }`}>
        <span className="text-[10px] sm:text-[11px] text-amoga-charcoalLight/70 dark:text-white/50">
          Freshly prepared
        </span>

        {item.isAvailable ? (
          quantity > 0 ? (
            <div className="inline-flex items-center rounded-xl bg-amoga-burgundy text-white overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => decreaseQuantity(item.id)}
                className={`hover:bg-amoga-burgundyDark transition-colors active:scale-95 ${
                  isCompact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5'
                }`}
                aria-label="Decrease quantity"
              >
                <Minus className={isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
              </button>
              <span className={`font-bold min-w-[18px] text-center ${isCompact ? 'px-1.5 text-xs' : 'px-2 text-sm'}`}>
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => addToCart(item)}
                className={`hover:bg-amoga-burgundyDark transition-colors active:scale-95 ${
                  isCompact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5'
                }`}
                aria-label="Increase quantity"
              >
                <Plus className={isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                addToCart(item);
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl bg-amoga-burgundy hover:bg-amoga-orangeDark text-white font-semibold transition-all duration-200 active:scale-95 shadow-sm ${
                isCompact ? 'px-3 py-1 text-xs' : 'px-3.5 py-1.5 text-xs sm:text-sm'
              }`}
            >
              <ShoppingBag className={isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
              <span>Add</span>
            </button>
          )
        ) : (
          <span className="text-xs text-amoga-charcoalLight font-medium">Unavailable</span>
        )}
      </div>
    </div>
  );
};

