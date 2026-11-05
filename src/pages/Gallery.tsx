import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { GalleryCategory, GalleryItem } from '../types';
import { Layers, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { gallery } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories: { label: string; slug: GalleryCategory | 'all' }[] = [
    { label: 'All Photos', slug: 'all' },
    { label: 'Biryani', slug: 'biryani' },
    { label: 'Non-Veg Starters', slug: 'non-veg-starters' },
    { label: 'Veg Starters', slug: 'veg-starters' },
    { label: 'Restaurant Interior', slug: 'restaurant-interior' },
    { label: 'Restaurant Exterior', slug: 'restaurant-exterior' },
  ];

  const filteredItems = gallery.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => 
        prev! === 0 ? filteredItems.length - 1 : prev! - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => 
        prev! === filteredItems.length - 1 ? 0 : prev! + 1
      );
    }
  };

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-amoga-cream dark:bg-[#120B0D] text-amoga-charcoal dark:text-[#F8ECE8] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block mb-1">
            Visual Highlights
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
            Our Restaurant &amp; Food Gallery
          </h1>
          <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] mt-2">
            Explore authentic food photography of our Hyderabadi biryanis, hot appetizers, and welcoming dining area in Khammam.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amoga-burgundy text-white shadow-md'
                    : 'bg-white dark:bg-white/10 hover:bg-amoga-creamDark dark:hover:bg-white/20 text-amoga-charcoal dark:text-white border border-amoga-creamDark dark:border-white/15'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-amoga-charcoal cursor-pointer shadow-md hover:shadow-amoga transition-all duration-300 border border-amoga-creamDark dark:border-white/10"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amoga-gold">
                  {item.categoryName}
                </span>
                <h4 className="font-serif text-xl font-bold mt-0.5">{item.title}</h4>
                {item.caption && (
                  <p className="text-xs text-white/80 line-clamp-2 mt-1">{item.caption}</p>
                )}
                <span className="text-[11px] font-semibold text-amoga-goldPale mt-2 flex items-center gap-1">
                  Click to view full photo
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image & Caption Card */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center text-center text-white"
            >
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="max-h-[65vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl mb-4 border border-white/10"
              />
              <span className="text-xs font-bold uppercase tracking-widest text-amoga-gold">
                {activeItem.categoryName}
              </span>
              <h3 className="font-serif text-2xl font-bold mt-1">{activeItem.title}</h3>
              {activeItem.caption && (
                <p className="text-xs sm:text-sm text-white/80 max-w-lg mt-1">{activeItem.caption}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

