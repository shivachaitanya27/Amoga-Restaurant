import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useRestaurant } from '../context/RestaurantContext';
import { createOrder } from '../firebase/firestore';
import { Order, OrderType } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  Bike,
  Navigation,
  MapPin,
  CheckCircle2,
  Loader2,
  UtensilsCrossed
} from 'lucide-react';
import { OrderConfirmationModal } from './OrderConfirmationModal';
import { generateWhatsAppBillText } from '../utils/billFormatter';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    addToCart, 
    decreaseQuantity, 
    removeFromCart, 
    clearCart, 
    totalItems, 
    subtotal 
  } = useCart();
  const { settings, getWhatsAppUrl } = useRestaurant();

  const [orderType, setOrderType] = useState<OrderType>('Home Delivery');
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pickupTime, setPickupTime] = useState('In 30 to 45 Minutes');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Geolocation state
  const [locationCoords, setLocationCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handleShareLocation = () => {
    setLocationError('');
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setLocationCoords(coords);
        setIsGettingLocation(false);
      },
      (error) => {
        setIsGettingLocation(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Location permission was denied. Please enter address manually.');
        } else {
          setLocationError('Unable to retrieve location. Please enter address manually.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };



  const handleBrowseMenu = () => {
    setIsCartOpen(false);
    navigate('/menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitOrder = (e?: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter your name.');
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setFormError('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    if (orderType === 'Home Delivery' && !deliveryAddress.trim()) {
      setFormError('Please provide your complete delivery address in Khammam.');
      return;
    }

    if (cart.length === 0) {
      setFormError('Your cart is empty. Please add items from our menu.');
      return;
    }

    setIsSubmitting(true);

    const fullAddress = orderType === 'Home Delivery'
      ? `${deliveryAddress.trim()}${landmark.trim() ? ` (Landmark: ${landmark.trim()})` : ''}`
      : undefined;

    const mapsUrl = locationCoords 
      ? `https://maps.google.com/?q=${locationCoords.latitude},${locationCoords.longitude}`
      : undefined;

    const orderId = `AMG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const placedOrder: Order = {
      id: orderId,
      customerName: customerName.trim(),
      mobile: cleanMobile,
      orderType,
      deliveryAddress: fullAddress,
      locationCoords: locationCoords || undefined,
      googleMapsLocationUrl: mapsUrl,
      items: cart.map((ci) => ({
        id: ci.item.id,
        name: ci.item.name,
        price: ci.item.price,
        quantity: ci.quantity,
        isVeg: ci.item.isVeg
      })),
      totalAmount: subtotal,
      pickupTime,
      specialInstructions: specialInstructions.trim(),
      status: 'New',
      createdAt: new Date().toISOString()
    };

    // 1. Immediately launch WhatsApp synchronously within user gesture (zero lag, no popup block delay)
    const waBillMessage = generateWhatsAppBillText(placedOrder, settings.restaurantName);
    const waUrl = getWhatsAppUrl(waBillMessage);
    try {
      window.open(waUrl, '_blank');
    } catch (openErr) {
      console.warn("Direct WhatsApp open blocked by browser popup settings:", openErr);
    }

    // 2. Instantly update UI state with zero lag
    setConfirmedOrder(placedOrder);
    setIsCartOpen(false);
    clearCart();
    setIsSubmitting(false);

    // 3. Fire celebratory confetti asynchronously via requestAnimationFrame
    requestAnimationFrame(() => {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    });

    // 4. Save order to Firestore & localStorage in background without blocking
    createOrder(placedOrder).catch((orderErr) => {
      console.warn("Background order save warning:", orderErr);
    });
  };

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10 pointer-events-none">
            <div className="w-screen max-w-lg bg-white dark:bg-[#160D10] text-amoga-charcoal dark:text-[#F8ECE8] shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-right duration-300 border-l dark:border-white/10">
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-amoga-creamDark dark:border-white/10 flex items-center justify-between bg-amoga-cream/50 dark:bg-[#1E1216]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-amoga-burgundy text-white shadow-sm">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-amoga-burgundy dark:text-amoga-goldPale leading-tight">
                      Your Order Bag
                    </h3>
                    <span className="text-xs text-amoga-charcoalLight dark:text-white/60">
                      {totalItems} {totalItems === 1 ? 'item' : 'items'} selected • Khammam
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-amoga-creamDark dark:hover:bg-white/10 text-amoga-charcoal dark:text-white transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items & Checkout Form */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-amoga-creamDark/60 dark:bg-white/10 flex items-center justify-center text-amoga-charcoalLight dark:text-white/60 mx-auto mb-4">
                      <ShoppingBag className="w-8 h-8 opacity-40" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-amoga-charcoal dark:text-[#F8ECE8] mb-1">
                      Your bag is empty
                    </h4>
                    <p className="text-xs text-amoga-charcoalLight dark:text-white/70 max-w-xs mx-auto mb-6">
                      Explore our 62 freshly prepared biryanis, hot starters and combos!
                    </p>
                    <button
                      type="button"
                      onClick={handleBrowseMenu}
                      className="px-6 py-3 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white text-xs sm:text-sm font-bold shadow-amoga transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto active:scale-95"
                    >
                      <UtensilsCrossed className="w-4 h-4 text-amoga-gold" />
                      <span>Browse Menu (62 Dishes)</span>
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <h4 className="font-serif text-sm font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider">
                          Selected Dishes
                        </h4>
                        <button
                          type="button"
                          onClick={handleBrowseMenu}
                          className="text-xs font-bold text-amoga-burgundy dark:text-amoga-gold hover:text-amoga-orangeDark transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add More Dishes</span>
                        </button>
                      </div>
                      <div className="divide-y divide-amoga-creamDark/60 dark:divide-white/10 bg-amoga-cream/30 dark:bg-white/5 border border-amoga-creamDark dark:border-white/10 rounded-2xl p-3">
                        {cart.map((ci) => (
                          <div key={ci.item.id} className="py-2.5 flex items-center gap-3">
                            <img
                              src={ci.item.imageUrl || '/images/hero-biryani.jpg'}
                              alt={ci.item.name}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-amoga-creamDark dark:border-white/10"
                            />

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span 
                                  className="w-2 h-2 rounded-full shrink-0" 
                                  style={{ backgroundColor: ci.item.isVeg ? '#16a34a' : '#dc2626' }}
                                />
                                <h5 className="font-bold text-xs sm:text-sm text-amoga-charcoal dark:text-[#F8ECE8] truncate">
                                  {ci.item.name}
                                </h5>
                              </div>
                              <span className="text-xs font-serif font-bold text-amoga-burgundy dark:text-amoga-goldPale">
                                ₹{ci.item.price} each
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="inline-flex items-center rounded-lg bg-white dark:bg-black/40 text-amoga-charcoal dark:text-white border border-amoga-creamDark dark:border-white/15">
                                <button
                                  type="button"
                                  onClick={() => decreaseQuantity(ci.item.id)}
                                  className="px-2 py-1 hover:bg-amoga-cream dark:hover:bg-white/10 text-xs"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-1.5 text-xs font-bold min-w-[16px] text-center">
                                  {ci.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => addToCart(ci.item)}
                                  className="px-2 py-1 hover:bg-amoga-cream dark:hover:bg-white/10 text-xs"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(ci.item.id)}
                                className="text-amoga-charcoalLight/60 dark:text-white/40 hover:text-red-500 p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details & Delivery Form */}
                    <div className="pt-2">
                      <h4 className="font-serif text-base font-bold text-amoga-burgundy dark:text-amoga-goldPale mb-3">
                        Choose Delivery or Takeaway
                      </h4>

                      {/* Order Type Toggle */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <button
                          type="button"
                          onClick={() => setOrderType('Home Delivery')}
                          className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-2.5 ${
                            orderType === 'Home Delivery'
                              ? 'border-amoga-burgundy dark:border-amoga-gold bg-amoga-burgundy/5 dark:bg-amoga-gold/10 text-amoga-burgundy dark:text-amoga-goldPale'
                              : 'border-amoga-creamDark dark:border-white/10 bg-white dark:bg-white/5 text-amoga-charcoal dark:text-white/80'
                          }`}
                        >
                          <Bike className="w-5 h-5 text-amoga-orangeDark shrink-0" />
                          <div>
                            <strong className="block text-xs font-bold leading-tight">Home Delivery</strong>
                            <span className="text-[10px] text-amoga-charcoalLight dark:text-white/60">Deliver to doorstep</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setOrderType('Takeaway pickup')}
                          className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-2.5 ${
                            orderType === 'Takeaway pickup'
                              ? 'border-amoga-burgundy dark:border-amoga-gold bg-amoga-burgundy/5 dark:bg-amoga-gold/10 text-amoga-burgundy dark:text-amoga-goldPale'
                              : 'border-amoga-creamDark dark:border-white/10 bg-white dark:bg-white/5 text-amoga-charcoal dark:text-white/80'
                          }`}
                        >
                          <ShoppingBag className="w-5 h-5 text-amoga-burgundy dark:text-amoga-gold shrink-0" />
                          <div>
                            <strong className="block text-xs font-bold leading-tight">Takeaway Pickup</strong>
                            <span className="text-[10px] text-amoga-charcoalLight dark:text-white/60">Pickup hot at counter</span>
                          </div>
                        </button>
                      </div>

                      {formError && (
                        <div className="p-2.5 mb-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-900/60">
                          {formError}
                        </div>
                      )}

                      <form onSubmit={handleSubmitOrder} id="cart-order-form" className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => {
                              setCustomerName(e.target.value);
                              if (formError) setFormError('');
                            }}
                            placeholder="e.g. Shiva Chaitanya"
                            className="w-full px-3 py-2 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-amoga-charcoal dark:text-white text-xs focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1">
                            Mobile Number (WhatsApp) *
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-2.5 py-2 rounded-l-xl border border-r-0 border-amoga-creamDark dark:border-white/15 bg-amoga-creamDark/60 dark:bg-white/10 text-xs font-bold text-amoga-charcoal dark:text-white">
                              +91
                            </span>
                            <input
                              type="tel"
                              maxLength={10}
                              value={mobile}
                              onChange={(e) => {
                                setMobile(e.target.value.replace(/\D/g, ''));
                                if (formError) setFormError('');
                              }}
                              placeholder="9550382281"
                              className="w-full px-3 py-2 rounded-r-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-amoga-charcoal dark:text-white text-xs focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                            />
                          </div>
                        </div>

                        {/* Home Delivery Specific Fields: Address & Live GPS Location */}
                        {orderType === 'Home Delivery' && (
                          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 space-y-3 animate-in fade-in">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-amoga-orangeDark" />
                                <span>Delivery Address in Khammam *</span>
                              </span>

                              {/* GPS Button */}
                              <button
                                type="button"
                                onClick={handleShareLocation}
                                disabled={isGettingLocation}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-sm transition-all"
                                title="Pin your exact location on Google Maps for the delivery rider"
                              >
                                {isGettingLocation ? (
                                  <>
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    <span>Locating...</span>
                                  </>
                                ) : (
                                  <>
                                    <Navigation className="w-3 h-3" />
                                    <span>Share GPS Location</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {locationCoords && (
                              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold flex items-center justify-between border border-emerald-300 dark:border-emerald-800">
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  <span>Live GPS Coordinates Attached ({locationCoords.latitude.toFixed(4)}, {locationCoords.longitude.toFixed(4)})</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setLocationCoords(null)}
                                  className="text-emerald-700 dark:text-emerald-300 hover:underline text-[10px]"
                                >
                                  Clear
                                </button>
                              </div>
                            )}

                            {locationError && (
                              <p className="text-[11px] text-red-600 dark:text-red-400 font-medium">
                                {locationError}
                              </p>
                            )}

                            <div>
                              <input
                                type="text"
                                value={deliveryAddress}
                                onChange={(e) => {
                                  setDeliveryAddress(e.target.value);
                                  if (formError) setFormError('');
                                }}
                                placeholder="House / Flat No., Street, Colony, Area in Khammam"
                                className="w-full px-3 py-2 rounded-xl border border-amber-200 dark:border-white/15 bg-white dark:bg-black/40 text-amoga-charcoal dark:text-white text-xs focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                              />
                            </div>

                            <div>
                              <input
                                type="text"
                                value={landmark}
                                onChange={(e) => setLandmark(e.target.value)}
                                placeholder="Nearby landmark (e.g. Near Mayuri Center / GP Reddy Sweet)"
                                className="w-full px-3 py-2 rounded-xl border border-amber-200 dark:border-white/15 bg-white dark:bg-black/40 text-amoga-charcoal dark:text-white text-xs focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-[11px] font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1">
                            {orderType === 'Home Delivery' ? 'Preferred Delivery Slot *' : 'Preferred Pickup Time *'}
                          </label>
                          <select
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-[#1E1216] text-amoga-charcoal dark:text-white text-xs focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                          >
                            <option className="dark:bg-[#1E1216]">In 30 to 45 Minutes (Fastest)</option>
                            <option className="dark:bg-[#1E1216]">In 1 Hour</option>
                            <option className="dark:bg-[#1E1216]">Lunch Slot (12:30 PM - 2:00 PM)</option>
                            <option className="dark:bg-[#1E1216]">Dinner Slot (7:30 PM - 9:30 PM)</option>
                            <option className="dark:bg-[#1E1216]">Late Night Slot (10:00 PM - 11:30 PM)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1">
                            Special Instructions (Optional)
                          </label>
                          <input
                            type="text"
                            value={specialInstructions}
                            onChange={(e) => setSpecialInstructions(e.target.value)}
                            placeholder="e.g. Medium spicy, extra lemon & raita"
                            className="w-full px-3 py-2 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-amoga-charcoal dark:text-white text-xs focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                          />
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer & Direct WhatsApp CTA */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-amoga-creamDark dark:border-white/10 bg-amoga-cream/40 dark:bg-[#1E1216] space-y-3">
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-amoga-charcoalLight dark:text-white/60">
                      <span>Subtotal</span>
                      <span className="font-bold text-amoga-charcoal dark:text-white">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-amoga-charcoalLight dark:text-white/60">
                      <span>Delivery &amp; Packaging</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE / INCLUDED</span>
                    </div>
                    <div className="pt-2 border-t border-amoga-creamDark dark:border-white/10 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-amoga-charcoal dark:text-white">Total Bill Payable:</span>
                      <span className="font-serif text-2xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
                        ₹{subtotal}
                      </span>
                    </div>
                  </div>

                  {/* Form Error Banner - Shown right above the button so user always sees it */}
                  {formError && (
                    <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-bold border border-red-300 dark:border-red-900 flex items-center gap-2 animate-bounce">
                      <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleSubmitOrder()}
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amoga-burgundy via-amoga-burgundyLight to-amoga-orange text-white font-bold text-sm shadow-amoga hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Confirming Order...' : 'Confirm Order & Send Bill to WhatsApp'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-amoga-charcoalLight/70 dark:text-white/50 text-center">
                    <ShieldAlert className="w-3.5 h-3.5 text-amoga-orange shrink-0" />
                    <span>Redirects directly to WhatsApp with your itemized bill! Pay Cash / UPI.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal Receipt */}
      {confirmedOrder && (
        <OrderConfirmationModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
        />
      )}
    </>
  );
};
