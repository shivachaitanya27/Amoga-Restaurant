export type MenuCategorySlug = 
  | 'non-veg-starters'
  | 'veg-starters'
  | 'non-veg-biryanis'
  | 'veg-biryanis'
  | 'veg-rice';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategorySlug;
  categoryName: string;
  price: number;
  isVeg: boolean;
  imageUrl: string;
  description: string;
  isAvailable: boolean;
  isFeatured?: boolean; // For popular dishes on homepage
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  slug: MenuCategorySlug;
  name: string;
  iconName: string;
  description: string;
  colorBg: string;
}

export type OrderStatus = 'New' | 'Confirmed' | 'Preparing' | 'Ready for Pickup' | 'Completed' | 'Cancelled';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

export type OrderType = 'Takeaway pickup' | 'Home Delivery';

export interface Order {
  id: string;
  customerName: string;
  mobile: string;
  orderType: OrderType;
  deliveryAddress?: string;
  locationCoords?: {
    latitude: number;
    longitude: number;
  };
  googleMapsLocationUrl?: string;
  items: OrderItem[];
  totalAmount: number;
  pickupTime: string; // or deliveryTime
  specialInstructions?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Rejected' | 'Completed';
export type BookingMode = 'Dine-in' | 'Takeaway pickup';

export interface Booking {
  id: string;
  customerName: string;
  mobile: string;
  date: string;
  time: string;
  guests: string;
  mode: BookingMode;
  specialRequests?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code?: string;
  discountPercent?: number;
  imageUrl?: string;
  validTill?: string;
  isActive: boolean;
  createdAt?: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  source: 'website' | 'google';
  isApproved: boolean;
  createdAt: string;
}

export type GalleryCategory = 'biryani' | 'veg-starters' | 'non-veg-starters' | 'restaurant-interior' | 'restaurant-exterior';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryName: string;
  imageUrl: string;
  caption?: string;
  createdAt?: string;
}

export interface CustomerLead {
  id: string;
  name: string;
  phone: string;
  consent: boolean;
  registeredAt: string;
  totalCompletedOrders: number;
  loyaltyPoints: number;
  lastOrderDate?: string;
}

export interface TodaysSpecial {
  title: string;
  description: string;
  price: number;
  isVeg: boolean;
  imageUrl?: string;
}

export interface RestaurantSettings {
  restaurantName: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  address: string;
  openingTime: string;
  closingTime: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  googleRating: number;
  reviewCount: number;
  description: string;
  todaysSpecial: TodaysSpecial;
  loyaltyPointsRate: number; // Points per ₹100
}

