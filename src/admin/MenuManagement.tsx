import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { saveMenuItem, deleteMenuItem, seedAllDataToFirestore } from '../firebase/firestore';
import { uploadImageFile } from '../firebase/storage';
import { MenuItem, MenuCategorySlug, Category } from '../types';
import { DEFAULT_CATEGORIES } from '../data/defaultMenu';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Star, 
  Upload, 
  Database,
  Layers,
  Flame,
  Leaf,
  UtensilsCrossed,
  Soup,
  Sparkles,
  ChevronRight,
  Maximize2,
  SlidersHorizontal,
  Grid3X3,
  Grid2X2,
  List
} from 'lucide-react';

export type CardDensity = 'compact' | 'medium' | 'large' | 'list';

export const MenuManagement: React.FC = () => {
  const { menuItems, categories } = useRestaurant();
  const [search, setSearch] = useState('');
  
  // Card size / density adjustment state for Admin
  const [cardDensity, setCardDensity] = useState<CardDensity>(() => {
    try {
      return (localStorage.getItem('amoga_admin_card_density') as CardDensity) || 'medium';
    } catch {
      return 'medium';
    }
  });

  const handleSetCardDensity = (density: CardDensity) => {
    setCardDensity(density);
    try {
      localStorage.setItem('amoga_admin_card_density', density);
    } catch {}
  };
  
  // Default to first category so only the selected category is displayed to edit
  const [selectedCategory, setSelectedCategory] = useState<string>('non-veg-starters');
  
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [seedNotice, setSeedNotice] = useState<string | null>(null);

  // Dedicated Category Popup Modal State
  const [categoryPopup, setCategoryPopup] = useState<Category | null>(null);
  const [popupSearch, setPopupSearch] = useState('');

  // Active Category Object
  const activeCategory: Category = categories.find((c) => c.slug === selectedCategory) || categories[0] || DEFAULT_CATEGORIES[0];

  // Strictly filter items to ONLY the selected category
  const filteredItems = menuItems.filter((item) => {
    if (item.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    }
    return true;
  });

  // Items for the Category Popup Modal
  const categoryPopupItems = categoryPopup 
    ? menuItems.filter((item) => {
        if (item.category !== categoryPopup.slug) return false;
        if (popupSearch.trim()) {
          const q = popupSearch.toLowerCase();
          return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
        }
        return true;
      })
    : [];

  const handleOpenAddModal = (defaultCategory?: MenuCategorySlug) => {
    const catSlug = defaultCategory || (selectedCategory as MenuCategorySlug) || 'non-veg-starters';
    const catObj = categories.find((c) => c.slug === catSlug);
    setEditingItem({
      name: '',
      category: catSlug,
      categoryName: catObj ? catObj.name : 'Non-Veg Starters',
      price: 249,
      isVeg: catSlug.startsWith('veg'),
      imageUrl: '/images/chicken-starters.jpg',
      description: '',
      isAvailable: true,
      isFeatured: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      await saveMenuItem({ id: item.id, isAvailable: !item.isAvailable });
    } catch (e) {
      console.error("Failed to update availability:", e);
    }
  };

  const handleToggleFeatured = async (item: MenuItem) => {
    try {
      await saveMenuItem({ id: item.id, isFeatured: !item.isFeatured });
    } catch (e) {
      console.error("Failed to update featured:", e);
    }
  };

  const handleDeleteItem = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      try {
        await deleteMenuItem(id);
      } catch (e) {
        console.error("Failed to delete item:", e);
      }
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name || !editingItem.price) return;

    setIsSaving(true);
    try {
      const catObj = categories.find((c) => c.slug === editingItem.category);
      const categoryName = catObj ? catObj.name : 'Indian Specialties';

      await saveMenuItem({
        ...editingItem,
        categoryName
      });
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error("Failed to save menu item:", err);
      alert("Failed to save item. Check console.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadImageFile(file, 'menu');
      setEditingItem((prev) => (prev ? { ...prev, imageUrl: url } : null));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Could not upload image. Please enter an image URL directly.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSeedAll = async () => {
    if (window.confirm("Do you want to re-seed/restore all 62 default menu items to Cloud Firestore?")) {
      try {
        const res = await seedAllDataToFirestore();
        setSeedNotice(res.message);
        setTimeout(() => setSeedNotice(null), 5000);
      } catch (err: any) {
        setSeedNotice(err.message || "Seeding failed.");
      }
    }
  };

  const getCategoryCount = (slug: string) => {
    return menuItems.filter((m) => m.category === slug).length;
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
            Category Menu Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tap any category card below to manage and edit its dishes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleSeedAll}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
            title="Restore all 62 default items into Firestore"
          >
            <Database className="w-3.5 h-3.5 text-amoga-orangeDark" />
            <span>Reset 62 Dishes</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAddModal(activeCategory.slug as MenuCategorySlug)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white text-xs font-bold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Dish to {activeCategory.name}</span>
          </button>
        </div>
      </div>

      {seedNotice && (
        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
          {seedNotice}
        </div>
      )}

      {/* 5 CATEGORY SELECTOR CARDS - FULLY RESPONSIVE & NO HORIZONTAL SCROLLBAR */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-amoga-orangeDark" />
            <span>Select Category to Edit</span>
          </h2>
          <span className="text-[11px] text-slate-400">
            Tap a card to switch category
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat, idx) => {
            const count = getCategoryCount(cat.slug);
            const isSelected = selectedCategory === cat.slug;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setSearch('');
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left flex flex-col justify-between transition-all relative group shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#651B25] to-[#450e16] text-white border-amoga-burgundy ring-2 ring-amoga-orange/60 shadow-lg scale-[1.01]'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-amoga-orange'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 group-hover:bg-amoga-cream text-amoga-burgundy'
                    }`}>
                      {idx === 0 && <Flame className={`w-4 h-4 ${isSelected ? 'text-amoga-orange' : 'text-red-600'}`} />}
                      {idx === 1 && <Leaf className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`} />}
                      {idx === 2 && <UtensilsCrossed className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-amber-700'}`} />}
                      {idx === 3 && <Soup className={`w-4 h-4 ${isSelected ? 'text-green-300' : 'text-green-700'}`} />}
                      {idx === 4 && <Sparkles className={`w-4 h-4 ${isSelected ? 'text-orange-300' : 'text-orange-600'}`} />}
                    </div>

                    {isSelected ? (
                      <span className="px-2 py-0.5 rounded-full bg-amoga-orange text-white text-[10px] font-bold uppercase tracking-wider">
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold">
                        {count} items
                      </span>
                    )}
                  </div>

                  <h3 className={`font-bold text-xs sm:text-sm leading-snug ${isSelected ? 'text-white' : 'text-slate-800 group-hover:text-amoga-burgundy'}`}>
                    {cat.name}
                  </h3>
                  <span className={`text-[11px] font-medium block mt-0.5 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                    {count} {count === 1 ? 'dish' : 'dishes'}
                  </span>
                </div>

                <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[11px] font-bold ${
                  isSelected ? 'border-white/20 text-amoga-goldPale' : 'border-slate-100 text-amoga-orangeDark group-hover:text-amoga-burgundy'
                }`}>
                  <span>{isSelected ? 'Currently Viewing' : 'Edit This Category'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED CATEGORY FOCUS HEADER & ACTIONS - WRAP ON MOBILE */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amoga-cream text-amoga-burgundy border border-amoga-creamDark">
              Active Category
            </span>
            <span className="text-xs font-bold text-slate-600">
              {filteredItems.length} {filteredItems.length === 1 ? 'Dish' : 'Dishes'}
            </span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>{activeCategory.name}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
            {activeCategory.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search only in this category */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search in ${activeCategory.name}...`}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amoga-burgundy"
            />
          </div>

          {/* Quick Popup View Button */}
          <button
            type="button"
            onClick={() => {
              setCategoryPopup(activeCategory);
              setPopupSearch('');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            title="Open category dishes in popup modal"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Popup View</span>
          </button>

          {/* Add New Dish to this Category */}
          <button
            type="button"
            onClick={() => handleOpenAddModal(activeCategory.slug as MenuCategorySlug)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white text-xs font-bold shadow-sm transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Dish</span>
          </button>
        </div>
      </div>

      {/* QUICK CATEGORY SWITCHER TABS & CARD SIZE CONTROLS - FULL WRAP */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-1">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => {
            const isActive = selectedCategory === c.slug;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(c.slug);
                  setSearch('');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <span>{c.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {getCategoryCount(c.slug)}
                </span>
              </button>
            );
          })}
        </div>

        {/* CARD SIZE ADJUSTER CONTROLS FOR ADMIN */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 flex items-center gap-1.5 border-r border-slate-100">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amoga-orangeDark" />
              <span>Card Size</span>
            </span>

            <button
              type="button"
              onClick={() => handleSetCardDensity('compact')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                cardDensity === 'compact'
                  ? 'bg-amoga-burgundy text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Compact View (4 columns, small cards)"
            >
              <span>Compact</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetCardDensity('medium')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                cardDensity === 'medium'
                  ? 'bg-amoga-burgundy text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Standard View (3 columns, medium cards)"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Normal</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetCardDensity('large')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                cardDensity === 'large'
                  ? 'bg-amoga-burgundy text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Large View (2 columns, large cards with big pictures)"
            >
              <Grid2X2 className="w-3.5 h-3.5" />
              <span>Large</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetCardDensity('list')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                cardDensity === 'list'
                  ? 'bg-amoga-burgundy text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="List View (1 column, full-width rows)"
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>
        </div>
      </div>

      {/* DISHES LIST - ADJUSTABLE SIZE & DENSITY (COMPACT, NORMAL, LARGE, LIST) */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="text-xs text-slate-500 font-medium">
            No dishes found matching your search in <strong className="text-slate-800">{activeCategory.name}</strong>.
          </p>
          <button
            type="button"
            onClick={() => handleOpenAddModal(activeCategory.slug as MenuCategorySlug)}
            className="mt-3 inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-amoga-burgundy text-white text-xs font-bold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Dish to {activeCategory.name}</span>
          </button>
        </div>
      ) : cardDensity === 'list' ? (
        /* 1-COLUMN SPREADSHEET-STYLE HORIZONTAL ROWS */
        <div className="grid grid-cols-1 gap-2.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs ${
                item.isAvailable 
                  ? 'bg-white border-slate-200 hover:border-amoga-burgundy/40 hover:shadow-sm' 
                  : 'bg-slate-50 border-slate-200 opacity-80'
              }`}
            >
              {/* Left Section: Photo + Title + Badges + Description + Price */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative shrink-0">
                  <img
                    src={item.imageUrl || '/images/hero-biryani.jpg'}
                    alt={item.name}
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl object-cover border border-slate-200"
                  />
                  <span 
                    className={`absolute top-1 left-1 w-2.5 h-2.5 rounded-full border border-white shadow-sm ${
                      item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                    }`}
                    title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {item.name}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
                      item.isVeg 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                    {item.isFeatured && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>Popular</span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="font-serif font-black text-sm sm:text-base text-amoga-burgundy">
                      ₹{item.price}
                    </span>
                    {item.description && (
                      <span className="text-xs text-slate-400 truncate max-w-lg hidden sm:inline">
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section: Touch Controls */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 justify-between md:justify-end">
                <button
                  type="button"
                  onClick={() => handleToggleAvailability(item)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                    item.isAvailable
                      ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
                  title="Click to toggle Stock Status"
                >
                  {item.isAvailable ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{item.isAvailable ? 'In Stock' : 'Out of Stock'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEditModal(item)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amoga-cream text-slate-700 hover:text-amoga-burgundy text-xs font-bold transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleFeatured(item)}
                  className={`p-1.5 rounded-xl border transition-colors ${
                    item.isFeatured 
                      ? 'bg-amber-50 border-amber-300 text-amber-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500'
                  }`}
                  title={item.isFeatured ? 'Featured on Homepage' : 'Mark as Popular'}
                >
                  <Star className={`w-4 h-4 ${item.isFeatured ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id, item.name)}
                  className="p-1.5 rounded-xl border border-transparent hover:border-red-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete Dish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* GRID CARDS (COMPACT / NORMAL / LARGE) */
        <div className={`grid ${
          cardDensity === 'compact'
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5'
            : cardDensity === 'large'
            ? 'grid-cols-1 md:grid-cols-2 gap-4'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5'
        }`}>
          {filteredItems.map((item) => {
            const isCompact = cardDensity === 'compact';
            const isLarge = cardDensity === 'large';

            return (
              <div
                key={item.id}
                className={`border transition-all flex flex-col justify-between shadow-sm ${
                  isCompact ? 'p-3 rounded-xl gap-2' : isLarge ? 'p-5 sm:p-6 rounded-3xl gap-4' : 'p-4 rounded-2xl gap-3'
                } ${
                  item.isAvailable 
                    ? 'bg-white border-slate-200 hover:border-amoga-burgundy/40 hover:shadow-md' 
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}
              >
                {/* Top Section: Photo + Title + Badges + Price */}
                <div className={`flex items-start ${isCompact ? 'gap-2.5' : isLarge ? 'gap-4' : 'gap-3'}`}>
                  {/* Dish Thumbnail */}
                  <div className="relative shrink-0">
                    <img
                      src={item.imageUrl || '/images/hero-biryani.jpg'}
                      alt={item.name}
                      className={`object-cover border border-slate-200 ${
                        isCompact
                          ? 'w-12 h-12 rounded-lg'
                          : isLarge
                          ? 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl'
                          : 'w-16 h-16 sm:w-18 sm:h-18 rounded-xl'
                      }`}
                    />
                    <span 
                      className={`absolute top-1 left-1 w-2.5 h-2.5 rounded-full border border-white shadow-sm ${
                        item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                      }`}
                      title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    />
                  </div>

                  {/* Name, Category, Price */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className={`font-bold text-slate-900 leading-snug break-words ${
                        isCompact ? 'text-xs sm:text-sm line-clamp-1' : isLarge ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                      }`}>
                        {item.name}
                      </h4>
                      <span className={`font-serif font-black text-amoga-burgundy shrink-0 ml-1 ${
                        isCompact ? 'text-sm sm:text-base' : isLarge ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                      }`}>
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        item.isVeg 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {item.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>

                      {!isCompact && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600">
                          {item.categoryName}
                        </span>
                      )}

                      {item.isFeatured && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>Popular</span>
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className={`text-slate-500 mt-1.5 leading-relaxed break-words ${
                        isCompact
                          ? 'text-[11px] line-clamp-1 hidden sm:block'
                          : isLarge
                          ? 'text-xs sm:text-sm line-clamp-3'
                          : 'text-xs line-clamp-2'
                      }`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Section: Touch-Friendly Controls (Wrapped for Mobile) */}
                <div className={`pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5 ${
                  isCompact ? 'text-[11px]' : 'text-xs'
                }`}>
                  {/* Stock Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggleAvailability(item)}
                    className={`inline-flex items-center gap-1.5 rounded-xl font-bold transition-all active:scale-95 ${
                      isCompact ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
                    } ${
                      item.isAvailable
                        ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                    }`}
                    title="Click to toggle Stock Status"
                  >
                    {item.isAvailable ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{item.isAvailable ? 'In Stock' : 'Out'}</span>
                  </button>

                  {/* Actions (Edit, Popular, Delete) */}
                  <div className="flex flex-wrap items-center gap-1">
                    {/* Edit button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(item)}
                      className={`inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-amoga-cream text-slate-700 hover:text-amoga-burgundy font-bold transition-colors ${
                        isCompact ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
                      }`}
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Toggle Featured */}
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(item)}
                      className={`p-1.5 rounded-xl border transition-colors ${
                        item.isFeatured 
                          ? 'bg-amber-50 border-amber-300 text-amber-600' 
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500'
                      }`}
                      title={item.isFeatured ? 'Featured on Homepage' : 'Mark as Popular'}
                    >
                      <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-current' : ''}`} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id, item.name)}
                      className="p-1.5 rounded-xl border border-transparent hover:border-red-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Dish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DEDICATED CATEGORY ITEMS POPUP MODAL - ALSO MOBILE VERTICAL & WRAPPED */}
      {categoryPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl relative border border-slate-200 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1.5 rounded-lg bg-amoga-cream text-amoga-burgundy">
                    <Layers className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amoga-orangeDark">
                    Category Breakdown Popup
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>{categoryPopup.name}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-sans font-bold">
                    {categoryPopupItems.length} Dishes
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenAddModal(categoryPopup.slug)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Dish</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategoryPopup(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Quick Switcher Tabs Inside Popup - Wrapped */}
            <div className="py-2.5 border-b border-slate-100 flex flex-wrap items-center gap-1.5">
              {categories.map((c) => {
                const isActive = categoryPopup.slug === c.slug;
                const count = getCategoryCount(c.slug);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCategoryPopup(c);
                      setSelectedCategory(c.slug);
                      setPopupSearch('');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Popup Search Filter */}
            <div className="pt-2.5 pb-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={popupSearch}
                  onChange={(e) => setPopupSearch(e.target.value)}
                  placeholder={`Search dishes in ${categoryPopup.name}...`}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amoga-burgundy outline-none"
                />
              </div>
            </div>

            {/* Popup Vertical Card List - No Table, No Horizontal Scrollbar */}
            <div className="flex-1 overflow-y-auto mt-1 space-y-2.5 pr-1">
              {categoryPopupItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 transition-all flex flex-wrap items-center justify-between gap-2.5"
                >
                  <div className="flex items-center gap-2.5 min-w-[200px]">
                    <img
                      src={item.imageUrl || '/images/hero-biryani.jpg'}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                        {item.name}
                      </h5>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-bold text-xs text-amoga-burgundy">₹{item.price}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          item.isVeg ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {item.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 ml-auto">
                    {/* In stock toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleAvailability(item)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${
                        item.isAvailable
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.isAvailable ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-slate-400" />}
                      <span>{item.isAvailable ? 'In Stock' : 'Out'}</span>
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryPopup(null);
                        handleOpenEditModal(item);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amoga-burgundy hover:bg-slate-100"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id, item.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{categoryPopupItems.length} dishes in {categoryPopup.name}</span>
              <button
                type="button"
                onClick={() => setCategoryPopup(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT DISH MODAL */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative border border-slate-200 max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-slate-800 mb-1">
              {editingItem.id ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Dishes update immediately in your restaurant menu and Cloud Firestore.
            </p>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. Special Chicken Biryani"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amoga-burgundy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={editingItem.category || selectedCategory}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as MenuCategorySlug })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amoga-burgundy bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingItem.price || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    placeholder="279"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amoga-burgundy font-bold text-amoga-burgundy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Food Classification
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, isVeg: false })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      !editingItem.isVeg
                        ? 'bg-red-50 text-red-700 border-red-300 ring-2 ring-red-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    🔴 Non-Vegetarian
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, isVeg: true })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      editingItem.isVeg
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    🟢 Vegetarian
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Ingredients, preparation and flavour highlights..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amoga-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Food Image
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={editingItem.imageUrl || '/images/hero-biryani.jpg'}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={editingItem.imageUrl || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                      placeholder="Image URL or upload"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-[11px]"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold cursor-pointer transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Image to Storage'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingItem.isAvailable ?? true}
                    onChange={(e) => setEditingItem({ ...editingItem, isAvailable: e.target.checked })}
                    className="w-4 h-4 rounded text-amoga-burgundy focus:ring-amoga-burgundy"
                  />
                  <span>Mark as In Stock &amp; Available</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingItem.isFeatured ?? false}
                    onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                  />
                  <span>Popular / Highlight</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Dish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
