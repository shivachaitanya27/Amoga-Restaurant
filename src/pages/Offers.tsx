import React from 'react';
import { Link } from 'react-router-dom';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  Sparkles, 
  Gift, 
  Tag, 
  MessageCircle, 
  ArrowRight, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export const Offers: React.FC = () => {
  const { offers, settings, getWhatsAppUrl } = useRestaurant();
  const specialDish = settings.todaysSpecial;
  const activeOffers = offers.filter((o) => o.isActive);

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-amoga-cream dark:bg-[#120B0D] text-amoga-charcoal dark:text-[#F8ECE8] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block mb-1">
            Exclusive Deals &amp; Specials
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
            Offers &amp; Today's Special
          </h1>
          <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] mt-2">
            Save on delicious biryani combos and family packs when you dine-in or pre-order on WhatsApp in Khammam.
          </p>
        </div>

        {/* 1. Today's Special Feature Card */}
        {specialDish && (
          <div className="mb-14">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amoga-burgundyDark via-amoga-burgundy to-amoga-orange p-8 sm:p-12 text-white shadow-amoga-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-amoga-goldPale text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amoga-gold" />
                    <span>Today's Chef Selection</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    {specialDish.title}
                  </h2>

                  <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
                    {specialDish.description}
                  </p>

                  <div className="flex items-baseline gap-3 pt-2">
                    <span className="text-xs uppercase tracking-widest text-amoga-goldPale">Special Price:</span>
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                      ₹{specialDish.price}
                    </span>
                    <span className="text-xs text-white/70">
                      (Includes aromatic salan &amp; raita)
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3 justify-center items-start lg:items-end">
                  <a
                    href={getWhatsAppUrl(`Hello Amoga, I would like to order Today's Special: ${specialDish.title} (₹${specialDish.price}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amoga-gold hover:bg-amoga-goldLight text-amoga-burgundyDark font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Order on WhatsApp</span>
                  </a>

                  <Link
                    to="/menu"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>View All Biryanis</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Active Promotional Offers Grid */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-amoga-burgundy dark:text-amoga-goldPale mb-6">
            Current Promotional Deals
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white dark:bg-[#1A1114] rounded-3xl p-6 sm:p-8 border border-amoga-creamDark dark:border-white/10 shadow-amoga flex flex-col justify-between relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amoga-orangeDark flex items-center justify-center">
                      <Gift className="w-6 h-6" />
                    </div>
                    {offer.discountPercent && (
                      <span className="px-3 py-1 rounded-full bg-amoga-orange/10 dark:bg-amoga-orange/20 text-amoga-orangeDark dark:text-amoga-gold font-bold text-xs uppercase tracking-wider">
                        {offer.discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-amoga-charcoal dark:text-[#F8ECE8] mb-2">
                    {offer.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed mb-6">
                    {offer.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-amoga-creamDark dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  {offer.code && (
                    <div className="flex items-center gap-2 bg-amoga-cream dark:bg-white/10 px-3 py-1.5 rounded-xl border border-dashed border-amoga-burgundy/40 dark:border-amoga-gold/40">
                      <Tag className="w-3.5 h-3.5 text-amoga-burgundy dark:text-amoga-goldPale" />
                      <span className="font-mono font-bold text-xs text-amoga-burgundy dark:text-amoga-goldPale">
                        {offer.code}
                      </span>
                    </div>
                  )}

                  <a
                    href={getWhatsAppUrl(`Hello Amoga, I would like to avail the offer: "${offer.title}"${offer.code ? ` with code ${offer.code}` : ''}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amoga-orangeDark hover:text-amoga-burgundy dark:hover:text-amoga-gold transition-colors"
                  >
                    <span>Claim on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

