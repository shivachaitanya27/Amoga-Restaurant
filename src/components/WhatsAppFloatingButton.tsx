import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { useCart } from '../context/CartContext';
import { MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { getWhatsAppUrl } = useRestaurant();
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  return (
    <>
      {/* Mobile Sticky Order Bar (shows when items are in cart) */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-amoga-burgundy via-amoga-burgundyDark to-amoga-orange p-3 shadow-2xl animate-in slide-in-from-bottom duration-300 sm:hidden">
          <div className="flex items-center justify-between text-white px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                {totalItems}
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-amoga-goldPale">Subtotal</span>
                <span className="font-serif font-bold text-base">₹{subtotal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amoga-goldPale text-amoga-burgundyDark text-xs font-bold shadow-md active:scale-95 transition-transform"
            >
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <aside
        aria-label="Contact options"
        className={`fixed z-30 right-4 sm:right-6 transition-all duration-300 flex flex-col items-end gap-3 ${
          totalItems > 0 ? 'bottom-20 sm:bottom-6' : 'bottom-6'
        }`}
      >
        <a
          href={getWhatsAppUrl("Hello Amoga, I would like to enquire about menu and order pickup.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Order on WhatsApp"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="hidden sm:inline font-bold text-sm tracking-wide pr-1">
            Order on WhatsApp
          </span>
        </a>
      </aside>
    </>
  );
};

