import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  writeBatch 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { 
  MenuItem, 
  Order, 
  Booking, 
  Offer, 
  Review, 
  GalleryItem, 
  CustomerLead, 
  RestaurantSettings 
} from '../types';
import { 
  DEFAULT_MENU_ITEMS, 
  DEFAULT_CATEGORIES, 
  DEFAULT_SETTINGS, 
  DEFAULT_OFFERS, 
  DEFAULT_GALLERY, 
  DEFAULT_REVIEWS 
} from '../data/defaultMenu';

// SETTINGS
export const fetchSettings = async (): Promise<RestaurantSettings> => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'settings', 'restaurant_info'));
      if (snap.exists()) {
        return snap.data() as RestaurantSettings;
      }
    } catch (e) {
      console.warn("Error fetching Firestore settings, using defaults:", e);
    }
  }
  return DEFAULT_SETTINGS;
};

export const updateRestaurantSettings = async (settings: Partial<RestaurantSettings>): Promise<void> => {
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, 'settings', 'restaurant_info'), settings, { merge: true });
  }
};

// MENU ITEMS
export const subscribeToMenuItems = (callback: (items: MenuItem[]) => void): (() => void) => {
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, 'menuItems'));
    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const items: MenuItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as MenuItem);
        });
        callback(items);
      } else {
        callback(DEFAULT_MENU_ITEMS);
      }
    }, (error) => {
      console.warn("Firestore menuItems error, using defaults:", error);
      callback(DEFAULT_MENU_ITEMS);
    });
  }

  callback(DEFAULT_MENU_ITEMS);
  return () => {};
};

export const saveMenuItem = async (item: Partial<MenuItem> & { id?: string }): Promise<string> => {
  if (isFirebaseConfigured && db) {
    if (item.id) {
      const ref = doc(db, 'menuItems', item.id);
      await setDoc(ref, { ...item, updatedAt: new Date().toISOString() }, { merge: true });
      return item.id;
    } else {
      const ref = await addDoc(collection(db, 'menuItems'), {
        ...item,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return ref.id;
    }
  }
  return item.id || `item-${Date.now()}`;
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, 'menuItems', id));
  }
};

// Helper to safely strip undefined values so Cloud Firestore NEVER throws
const cleanForFirestore = <T>(obj: T): any => {
  if (obj === null || obj === undefined) return null;
  return JSON.parse(JSON.stringify(obj));
};

// ORDERS
export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
  const generatedId = `AMG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
  const fullOrder: Order = {
    ...order,
    id: generatedId,
    createdAt: new Date().toISOString(),
    status: 'New'
  };

  // Always save to local fallback storage first so orders are never lost
  try {
    const existing: Order[] = JSON.parse(localStorage.getItem('amoga_local_orders') || '[]');
    const updated = [fullOrder, ...existing.filter((o) => o.id !== generatedId)];
    localStorage.setItem('amoga_local_orders', JSON.stringify(updated.slice(0, 50)));
    // Dispatch custom event for immediate same-window admin alert
    window.dispatchEvent(new CustomEvent('amoga_new_order_placed', { detail: fullOrder }));
  } catch (err) {
    console.warn("Local orders cache write warning:", err);
  }

  // Attempt write to Cloud Firestore with sanitized fields (non-blocking background sync)
  if (isFirebaseConfigured && db) {
    try {
      const cleanOrder = cleanForFirestore(fullOrder);
      setDoc(doc(db, 'orders', generatedId), cleanOrder).catch((err) => {
        console.warn("Firestore order write warning (pending console DB creation or offline):", err);
      });
    } catch (err) {
      console.warn("Firestore sync warning:", err);
    }
  }

  return fullOrder;
};

export const subscribeToOrders = (callback: (orders: Order[]) => void): (() => void) => {
  const getLocalOrders = (): Order[] => {
    try {
      return JSON.parse(localStorage.getItem('amoga_local_orders') || '[]');
    } catch {
      return [];
    }
  };

  const notifyMerged = (firestoreOrders: Order[] = []) => {
    const local = getLocalOrders();
    const map = new Map<string, Order>();
    firestoreOrders.forEach(o => map.set(o.id, o));
    local.forEach(o => { if (!map.has(o.id)) map.set(o.id, o); });
    callback(Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  let unsubFirestore = () => {};
  let currentFirestoreOrders: Order[] = [];

  if (isFirebaseConfigured && db) {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    unsubFirestore = onSnapshot(q, (snapshot) => {
      const orders: Order[] = [];
      snapshot.forEach((docSnap) => {
        orders.push(docSnap.data() as Order);
      });
      currentFirestoreOrders = orders;
      notifyMerged(orders);
    }, (err) => {
      console.warn("Firestore orders listener fallback:", err);
      callback(getLocalOrders());
    });
  } else {
    callback(getLocalOrders());
  }

  // Cross-tab and local event listeners so admin hears sound instantly
  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'amoga_local_orders' || e.key === null) {
      notifyMerged(currentFirestoreOrders);
    }
  };
  const handleLocalEvent = () => {
    notifyMerged(currentFirestoreOrders);
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener('amoga_new_order_placed', handleLocalEvent);

  return () => {
    unsubFirestore();
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('amoga_new_order_placed', handleLocalEvent);
  };
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<void> => {
  // Update local storage fallback first
  try {
    const existing: Order[] = JSON.parse(localStorage.getItem('amoga_local_orders') || '[]');
    const updated = existing.map((o) => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem('amoga_local_orders', JSON.stringify(updated));
  } catch (e) {}

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status,
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Firestore updateOrderStatus fallback:", e);
    }
  }
};

// BOOKINGS
export const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> => {
  const generatedId = `BK-${Date.now().toString().slice(-6)}`;
  const fullBooking: Booking = {
    ...booking,
    id: generatedId,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  // Local fallback
  try {
    const existing: Booking[] = JSON.parse(localStorage.getItem('amoga_local_bookings') || '[]');
    localStorage.setItem('amoga_local_bookings', JSON.stringify([fullBooking, ...existing]));
  } catch (e) {}

  if (isFirebaseConfigured && db) {
    try {
      const cleanBooking = cleanForFirestore(fullBooking);
      setDoc(doc(db, 'bookings', generatedId), cleanBooking).catch((e) => {
        console.warn("Firestore booking write fallback:", e);
      });
    } catch (e) {
      console.warn("Firestore booking write fallback:", e);
    }
  }

  return fullBooking;
};

export const subscribeToBookings = (callback: (bookings: Booking[]) => void): (() => void) => {
  const getLocalBookings = (): Booking[] => {
    try {
      return JSON.parse(localStorage.getItem('amoga_local_bookings') || '[]');
    } catch {
      return [];
    }
  };

  if (isFirebaseConfigured && db) {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const bookings: Booking[] = [];
      snapshot.forEach((docSnap) => {
        bookings.push(docSnap.data() as Booking);
      });
      const local = getLocalBookings();
      const map = new Map<string, Booking>();
      bookings.forEach(b => map.set(b.id, b));
      local.forEach(b => { if (!map.has(b.id)) map.set(b.id, b); });
      callback(Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, (err) => {
      console.warn("Firestore bookings listener fallback:", err);
      callback(getLocalBookings());
    });
  }

  callback(getLocalBookings());
  return () => {};
};

export const updateBookingStatus = async (bookingId: string, status: Booking['status']): Promise<void> => {
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, 'bookings', bookingId), { status });
  }
};

// CUSTOMER LEADS & LOYALTY
export const saveCustomerLead = async (name: string, phone: string, consent: boolean): Promise<void> => {
  if (isFirebaseConfigured && db) {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const ref = doc(db, 'customers', cleanPhone);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        id: cleanPhone,
        name,
        phone: cleanPhone,
        consent,
        registeredAt: new Date().toISOString(),
        totalCompletedOrders: 0,
        loyaltyPoints: 50 // Welcome bonus points
      });
    }
  }
};

export const subscribeToCustomers = (callback: (customers: CustomerLead[]) => void): (() => void) => {
  if (isFirebaseConfigured && db) {
    return onSnapshot(collection(db, 'customers'), (snapshot) => {
      const list: CustomerLead[] = [];
      snapshot.forEach((docSnap) => list.push(docSnap.data() as CustomerLead));
      callback(list);
    });
  }
  return () => {};
};

// OFFERS
export const subscribeToOffers = (callback: (offers: Offer[]) => void): (() => void) => {
  if (isFirebaseConfigured && db) {
    return onSnapshot(collection(db, 'offers'), (snapshot) => {
      if (!snapshot.empty) {
        const list: Offer[] = [];
        snapshot.forEach((docSnap) => list.push({ id: docSnap.id, ...docSnap.data() } as Offer));
        callback(list);
      } else {
        callback(DEFAULT_OFFERS);
      }
    });
  }
  callback(DEFAULT_OFFERS);
  return () => {};
};

export const saveOffer = async (offer: Partial<Offer> & { id?: string }): Promise<string> => {
  if (isFirebaseConfigured && db) {
    if (offer.id) {
      await setDoc(doc(db, 'offers', offer.id), offer, { merge: true });
      return offer.id;
    } else {
      const ref = await addDoc(collection(db, 'offers'), {
        ...offer,
        createdAt: new Date().toISOString()
      });
      return ref.id;
    }
  }
  return offer.id || `offer-${Date.now()}`;
};

export const deleteOffer = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, 'offers', id));
  }
};

// REVIEWS
export const subscribeToReviews = (callback: (reviews: Review[]) => void): (() => void) => {
  if (isFirebaseConfigured && db) {
    return onSnapshot(collection(db, 'reviews'), (snapshot) => {
      if (!snapshot.empty) {
        const list: Review[] = [];
        snapshot.forEach((docSnap) => list.push({ id: docSnap.id, ...docSnap.data() } as Review));
        callback(list);
      } else {
        callback(DEFAULT_REVIEWS);
      }
    });
  }
  callback(DEFAULT_REVIEWS);
  return () => {};
};

export const submitCustomerReview = async (review: Omit<Review, 'id' | 'createdAt' | 'isApproved' | 'source'>): Promise<string> => {
  const newReview: Review = {
    ...review,
    id: `rev-${Date.now()}`,
    source: 'website',
    isApproved: false, // Moderate before public display
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, 'reviews', newReview.id), newReview);
  }
  return newReview.id;
};

export const updateReviewApproval = async (id: string, isApproved: boolean): Promise<void> => {
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, 'reviews', id), { isApproved });
  }
};

export const deleteReview = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, 'reviews', id));
  }
};

// GALLERY
export const subscribeToGallery = (callback: (items: GalleryItem[]) => void): (() => void) => {
  if (isFirebaseConfigured && db) {
    return onSnapshot(collection(db, 'gallery'), (snapshot) => {
      if (!snapshot.empty) {
        const list: GalleryItem[] = [];
        snapshot.forEach((docSnap) => list.push({ id: docSnap.id, ...docSnap.data() } as GalleryItem));
        callback(list);
      } else {
        callback(DEFAULT_GALLERY);
      }
    });
  }
  callback(DEFAULT_GALLERY);
  return () => {};
};

export const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<string> => {
  const id = `gal-${Date.now()}`;
  const fullItem: GalleryItem = {
    ...item,
    id,
    createdAt: new Date().toISOString()
  };
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, 'gallery', id), fullItem);
  }
  return id;
};

export const deleteGalleryItem = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, 'gallery', id));
  }
};

// SEED ALL 62 ITEMS TO FIRESTORE WITH ONE CLICK
export const seedAllDataToFirestore = async (): Promise<{ count: number; message: string }> => {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured yet. Please configure .env with your Firebase project keys first.");
  }

  // Batch 1: Settings & Categories
  const batch1 = writeBatch(db);
  batch1.set(doc(db, 'settings', 'restaurant_info'), DEFAULT_SETTINGS);

  DEFAULT_CATEGORIES.forEach((cat) => {
    batch1.set(doc(db, 'categories', cat.id), cat);
  });

  DEFAULT_OFFERS.forEach((off) => {
    batch1.set(doc(db, 'offers', off.id), off);
  });

  DEFAULT_GALLERY.forEach((g) => {
    batch1.set(doc(db, 'gallery', g.id), g);
  });

  DEFAULT_REVIEWS.forEach((r) => {
    batch1.set(doc(db, 'reviews', r.id), r);
  });

  await batch1.commit();

  // Firestore batches have 500 operations max. 62 items fit in one batch!
  const batch2 = writeBatch(db);
  DEFAULT_MENU_ITEMS.forEach((item) => {
    batch2.set(doc(db, 'menuItems', item.id), item);
  });
  await batch2.commit();

  return {
    count: DEFAULT_MENU_ITEMS.length,
    message: `Successfully seeded all ${DEFAULT_MENU_ITEMS.length} menu items, categories, settings, and initial gallery photos into Cloud Firestore!`
  };
};
