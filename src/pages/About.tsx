import React from 'react';
import { Link } from 'react-router-dom';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Clock, 
  MapPin, 
  Star,
  UtensilsCrossed,
  ArrowRight
} from 'lucide-react';

export const About: React.FC = () => {
  const { settings } = useRestaurant();

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-amoga-cream dark:bg-[#120B0D] text-amoga-charcoal dark:text-[#F8ECE8] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block mb-1">
            Our Heritage &amp; Hospitality
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
            Good Food, Made for Family
          </h1>
          <p className="text-sm sm:text-base text-amoga-charcoalLight dark:text-[#CBB5B1] mt-3 leading-relaxed">
            Welcome to Amoga Family Restaurant, located at Mayuri Center, Balaji Nagar, Khammam. We take immense pride in crafting genuine Indian hospitality, slow-cooked Hyderabadi biryanis, and comforting family feasts.
          </p>
        </div>

        {/* Narrative & Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-amoga-creamDark dark:border-white/10 bg-white dark:bg-[#1A1114]">
              <img
                src="/images/restaurant-interior.jpg"
                alt="Amoga Family Restaurant dining hall"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white dark:bg-[#1A1114] p-4 sm:p-5 rounded-2xl shadow-xl border border-amoga-creamDark dark:border-white/10 max-w-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-amoga-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-sm text-amoga-charcoal dark:text-white">4.7 / 5.0</span>
              </div>
              <p className="text-xs text-amoga-charcoalLight dark:text-white/60">
                Over 505 satisfied Google diners praising our biryani and attentive service.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block">
              The Amoga Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
              A Warm Table Where Everyone Belongs
            </h2>
            <p className="text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed">
              Amoga Family Restaurant offers delicious and freshly prepared food with a special focus on biryanis, starters and family combos. Enjoy a pleasant dining atmosphere, friendly service, generous portions and delicious food at reasonable prices.
            </p>
            <p className="text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed">
              Every dish that leaves our kitchen is cooked fresh to order using carefully ground spices, long aged basmati rice, tender poultry, and farm-fresh vegetables. We believe that family meals should be generous, flavourful, and affordable.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1114] border border-amoga-creamDark dark:border-white/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-amoga-burgundy dark:text-red-400 flex items-center justify-center mb-2">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-amoga-charcoal dark:text-white">Slow Dum Cooking</h4>
                <p className="text-xs text-amoga-charcoalLight dark:text-white/60 mt-0.5">Sealed handis locking in deep aromas and tenderness.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1114] border border-amoga-creamDark dark:border-white/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amoga-orangeDark flex items-center justify-center mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-amoga-charcoal dark:text-white">Family Dining</h4>
                <p className="text-xs text-amoga-charcoalLight dark:text-white/60 mt-0.5">Spacious AC seating designed for memorable gatherings.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
              Why Diners Choose Amoga
            </h3>
            <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] mt-1">
              Commitment to quality and hospitality in Khammam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1A1114] rounded-2xl p-6 border border-amoga-creamDark dark:border-white/10 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amoga-cream dark:bg-white/10 text-amoga-burgundy dark:text-amoga-goldPale flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-amoga-charcoal dark:text-white mb-2">
                Uncompromised Freshness
              </h4>
              <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed">
                We never cut corners on food hygiene or ingredient freshness. Meat and vegetables are procured fresh daily.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1A1114] rounded-2xl p-6 border border-amoga-creamDark dark:border-white/10 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amoga-cream dark:bg-white/10 text-amoga-orangeDark flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-amoga-charcoal dark:text-white mb-2">
                Generous Portions
              </h4>
              <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed">
                Our family packs and biryani combos are created to satisfy hearty appetites without stretching your wallet.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1A1114] rounded-2xl p-6 border border-amoga-creamDark dark:border-white/10 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amoga-cream dark:bg-white/10 text-amoga-burgundy dark:text-amoga-goldPale flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-amoga-charcoal dark:text-white mb-2">
                Respectful Service
              </h4>
              <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed">
                Led by owner Shiva Chaitanya, our dedicated service crew treats every guest like an honored family member.
              </p>
            </div>
          </div>
        </div>

        {/* Location & Visit CTA */}
        <div className="bg-gradient-to-r from-amoga-burgundyDark to-amoga-burgundy rounded-3xl p-8 sm:p-12 text-white shadow-amoga-lg text-center max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amoga-goldPale block mb-2">
            Located in Khammam
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold mb-3">
            Come Dine With Us Today
          </h3>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto mb-6">
            Shop, Hotel, Vishnu Residency, Opp. GP Reddy Sweet, Mayuri Center, Balaji Nagar, Khammam. Open every day from 11:00 AM to 12:00 AM.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/book-table"
              className="px-6 py-3 rounded-xl bg-amoga-gold hover:bg-amoga-goldLight text-amoga-burgundyDark font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Reserve a Family Table
            </Link>
            <Link
              to="/menu"
              className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm transition-all"
            >
              Explore 62 Menu Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

