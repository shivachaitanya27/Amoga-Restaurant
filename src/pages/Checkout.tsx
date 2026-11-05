import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, Bike, ShieldCheck } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, totalItems, subtotal, setIsCartOpen } = useCart();

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-amoga-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-amoga border border-amoga-creamDark">
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amoga-orangeDark hover:text-amoga-burgundy mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Browsing Menu</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amoga-burgundy">
              Order Checkout &amp; Delivery
            </h1>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
              <Bike className="w-3.5 h-3.5" />
              <span>Doorstep Delivery &amp; Pickup</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-amoga-charcoalLight mb-8">
            Review your bag items and confirm your order. After confirming, you will be redirected directly to WhatsApp with your itemized bill and live GPS navigation coordinates.
          </p>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-amoga-charcoalLight/40 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-amoga-charcoal mb-1">
                Your order bag is currently empty
              </h3>
              <p className="text-xs text-amoga-charcoalLight mb-6">
                Explore our 62 menu items to add biryanis and appetizers.
              </p>
              <Link
                to="/menu"
                className="px-6 py-3 rounded-xl bg-amoga-burgundy text-white text-xs font-bold shadow-amoga"
              >
                Go to Menu
              </Link>
            </div>
          ) : (
            <div>
              <div className="divide-y divide-amoga-creamDark/60 mb-6 bg-amoga-cream/20 p-4 rounded-2xl border border-amoga-creamDark">
                {cart.map((ci) => (
                  <div key={ci.item.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-2 h-2 rounded-full shrink-0" 
                          style={{ backgroundColor: ci.item.isVeg ? '#16a34a' : '#dc2626' }}
                        />
                        <span className="font-bold text-amoga-charcoal">
                          {ci.quantity} x {ci.item.name}
                        </span>
                      </div>
                      <span className="block text-[11px] text-amoga-charcoalLight ml-3.5">
                        ₹{ci.item.price} each
                      </span>
                    </div>
                    <span className="font-serif font-bold text-amoga-burgundy">
                      ₹{ci.item.price * ci.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t-2 border-amoga-charcoal/10 flex justify-between items-baseline mb-8">
                <span className="font-bold text-sm text-amoga-charcoal">Subtotal Payable on Delivery / Pickup:</span>
                <span className="font-serif text-3xl font-bold text-amoga-burgundy">
                  ₹{subtotal}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amoga-burgundy to-amoga-orange text-white font-bold text-sm shadow-amoga hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Open Order Drawer to Select Delivery / GPS &amp; WhatsApp Bill</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-amoga-charcoalLight mt-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero online prepay required. Pay Cash or UPI upon receiving hot food.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
