import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MenuItem, 
  Category, 
  RestaurantSettings, 
  Offer, 
  GalleryItem, 
  Review 
} from '../types';
import { 
  DEFAULT_SETTINGS, 
  DEFAULT_CATEGORIES, 
  DEFAULT_MENU_ITEMS, 
  DEFAULT_OFFERS, 
  DEFAULT_GALLERY, 
  DEFAULT_REVIEWS 
} from '../data/defaultMenu';
import { 
  fetchSettings, 
  subscribeToMenuItems, 
  subscribeToOffers, 
  subscribeToGallery, 
  subscribeToReviews,
  updateRestaurantSettings
} from '../firebase/firestore';

interface RestaurantContextType {
  settings: RestaurantSettings;
  updateSettingsState: (newSettings: Partial<RestaurantSettings>) => Promise<void>;
  categories: Category[];
  menuItems: MenuItem[];
  popularDishes: MenuItem[];
  offers: Offer[];
  gallery: GalleryItem[];
  reviews: Review[];
  loading: boolean;
  getWhatsAppUrl: (message?: string) => string;
  getCallUrl: () => string;
}

const RestaurantContext = createContext<RestaurantContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettingsState: async () => {},
  categories: DEFAULT_CATEGORIES,
  menuItems: DEFAULT_MENU_ITEMS,
  popularDishes: [],
  offers: DEFAULT_OFFERS,
  gallery: DEFAULT_GALLERY,
  reviews: DEFAULT_REVIEWS,
  loading: true,
  getWhatsAppUrl: () => '',
  getCallUrl: () => '',
});

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<RestaurantSettings>(DEFAULT_SETTINGS);
  const [categories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  const [offers, setOffers] = useState<Offer[]>(DEFAULT_OFFERS);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [loading, setLoading] = useState(true);

  // Load live settings
  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      try {
        const s = await fetchSettings();
        if (isMounted) setSettings(s);
      } catch (err) {
        console.warn("Failed to load settings:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadSettings();
    return () => { isMounted = false; };
  }, []);

  // Subscribe to live menuItems
  useEffect(() => {
    const unsub = subscribeToMenuItems((items) => {
      if (items && items.length > 0) {
        setMenuItems(items);
      }
    });
    return () => unsub();
  }, []);

  // Subscribe to live offers
  useEffect(() => {
    const unsub = subscribeToOffers((liveOffers) => {
      setOffers(liveOffers);
    });
    return () => unsub();
  }, []);

  // Subscribe to gallery
  useEffect(() => {
    const unsub = subscribeToGallery((liveGallery) => {
      setGallery(liveGallery);
    });
    return () => unsub();
  }, []);

  // Subscribe to reviews
  useEffect(() => {
    const unsub = subscribeToReviews((liveReviews) => {
      setReviews(liveReviews);
    });
    return () => unsub();
  }, []);

  const updateSettingsState = async (newSettings: Partial<RestaurantSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    await updateRestaurantSettings(newSettings);
  };

  const getWhatsAppUrl = (customMessage?: string) => {
    const cleanNumber = (settings.whatsapp || "9550382281").replace(/\D/g, '');
    const fullNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
    const text = customMessage 
      ? encodeURIComponent(customMessage) 
      : encodeURIComponent(`Hello ${settings.restaurantName}, I would like to enquire about your menu and table availability.`);
    return `https://wa.me/${fullNumber}?text=${text}`;
  };

  const getCallUrl = () => {
    const cleanNumber = (settings.phone || "9550382281").replace(/\D/g, '');
    return `tel:+91${cleanNumber.slice(-10)}`;
  };

  const popularDishes = menuItems.filter((i) => i.isFeatured && i.isAvailable);

  return (
    <RestaurantContext.Provider
      value={{
        settings,
        updateSettingsState,
        categories,
        menuItems,
        popularDishes,
        offers,
        gallery,
        reviews,
        loading,
        getWhatsAppUrl,
        getCallUrl
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);

