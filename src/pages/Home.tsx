import React from 'react';
import { Link } from 'react-router-dom';
import { useRestaurant } from '../context/RestaurantContext';
import { useCart } from '../context/CartContext';
import { FoodCard } from '../components/FoodCard';
import { 
  Flame, 
  Leaf, 
  UtensilsCrossed, 
  Soup, 
  Sparkles, 
  Star, 
  Clock, 
  ShieldCheck, 
  Users, 
  HeartHandshake, 
  ArrowRight, 
  MessageCircle, 
  MapPin, 
  Navigation,
  CheckCircle2,
  Phone
} from 'lucide-react';

export const Home: React.FC = () => {
  const { settings, categories, popularDishes, offers, reviews, gallery, getWhatsAppUrl, getCallUrl } = useRestaurant();
  const { setIsCartOpen } = useCart();

  const specialDish = settings.todaysSpecial;

  return (
    <div className="pt-20 bg-amoga-creamLight dark:bg-[#120B0D] text-amoga-charcoal dark:text-[#F8ECE8] transition-colors">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-amoga-charcoal text-white">
        {/* Hero Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-biryani.jpg"
            alt="Amoga Hyderabadi Dum Biryani"
            className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amoga-burgundyDark/95 via-amoga-burgundy/85 to-black/60 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-amoga-goldPale text-xs font-bold uppercase tracking-widest shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amoga-gold" />
                <span>Biryani &amp; Family Dining • Khammam</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Experience the Taste of <span className="text-amoga-goldPale italic">Happiness.</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-white/90 max-w-xl font-normal leading-relaxed">
                Delicious Biryanis, Authentic Indian Flavours &amp; Memorable Family Dining. Slow-cooked with premium spices in Mayuri Center, Khammam.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/menu"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amoga-gold to-amoga-goldLight hover:brightness-110 text-amoga-burgundyDark font-bold text-sm sm:text-base shadow-xl flex items-center gap-2 active:scale-95 transition-all"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Explore Our Menu</span>
                </Link>

                <a
                  href={getWhatsAppUrl("Hello Amoga, I would like to order biryani for pickup.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md text-white font-bold text-sm sm:text-base flex items-center gap-2 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Social Proof Stats */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="flex text-amoga-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div>
                    <span className="font-bold text-sm block leading-none">4.7 / 5.0</span>
                    <span className="text-[11px] text-white/70">505 Google Reviews</span>
                  </div>
                </div>

                <div className="h-8 w-px bg-white/20 hidden sm:block" />

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amoga-gold" />
                  <div>
                    <span className="font-bold text-sm block leading-none">11:00 AM – 12:00 AM</span>
                    <span className="text-[11px] text-white/70">Open Everyday (Midnight)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative mx-auto max-w-sm">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-amoga-charcoal">
                  <img
                    src="/images/chicken-starters.jpg"
                    alt="Hot Sizzling Starters at Amoga"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="p-6 bg-gradient-to-t from-amoga-charcoal via-amoga-charcoal/90 to-transparent">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amoga-gold">
                      Chef's Signature
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mt-1">
                      Crispy Chicken 65 &amp; Starters
                    </h3>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed">
                      Sizzling hot, tempered with fresh curry leaves and fragrant spices.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-serif text-xl font-bold text-amoga-goldPale">₹279</span>
                      <Link
                        to="/menu"
                        className="px-3.5 py-1.5 rounded-lg bg-amoga-orange hover:bg-amoga-orangeLight text-white text-xs font-bold transition-colors"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating pill badge */}
                <div className="absolute -bottom-4 -left-6 bg-white dark:bg-[#1C1215] text-amoga-charcoal dark:text-[#F8ECE8] p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-amoga-creamDark dark:border-white/10 animate-bounce-slow">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold text-xs">Fresh Ingredients</span>
                    <span className="text-[10px] text-amoga-charcoalLight dark:text-white/60">Slow-dum cooked daily</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RESTAURANT HIGHLIGHTS STRIP */}
      <section className="bg-amoga-creamLight dark:bg-[#160D10] py-6 border-b border-amoga-creamDark/60 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#1C1215] shadow-sm border border-amoga-creamDark/40 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-amoga-burgundy dark:text-red-400 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-amoga-charcoal dark:text-[#F8ECE8]">Fresh &amp; Delicious</h4>
                <p className="text-[11px] text-amoga-charcoalLight dark:text-white/60">Cooked fresh to order</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#1C1215] shadow-sm border border-amoga-creamDark/40 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amoga-orangeDark flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-amoga-charcoal dark:text-[#F8ECE8]">Family Friendly</h4>
                <p className="text-[11px] text-amoga-charcoalLight dark:text-white/60">Warm &amp; pleasant ambience</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#1C1215] shadow-sm border border-amoga-creamDark/40 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-amoga-charcoal dark:text-[#F8ECE8]">Quality Ingredients</h4>
                <p className="text-[11px] text-amoga-charcoalLight dark:text-white/60">Long basmati &amp; pure ghee</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#1C1215] shadow-sm border border-amoga-creamDark/40 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-amoga-charcoal dark:text-[#F8ECE8]">Affordable Prices</h4>
                <p className="text-[11px] text-amoga-charcoalLight dark:text-white/60">Generous family portions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOOD CATEGORIES */}
      <section className="py-16 sm:py-20 bg-amoga-cream dark:bg-[#140C0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block mb-1">
                Authentic Flavours
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
                Explore Our Food Categories
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-amoga-orangeDark hover:text-amoga-burgundy dark:hover:text-amoga-gold transition-colors"
            >
              <span>View Full Menu (62 Items)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                to={`/menu?category=${cat.slug}`}
                className="group bg-white dark:bg-[#1C1215] rounded-2xl p-5 border border-amoga-creamDark/80 dark:border-white/10 shadow-sm hover:shadow-amoga transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amoga-creamDark to-amoga-cream dark:from-white/10 dark:to-white/5 flex items-center justify-center text-amoga-burgundy dark:text-amoga-goldPale mb-4 group-hover:scale-110 transition-transform">
                    {idx === 0 && <Flame className="w-6 h-6 text-red-600" />}
                    {idx === 1 && <Leaf className="w-6 h-6 text-emerald-600" />}
                    {idx === 2 && <UtensilsCrossed className="w-6 h-6 text-amber-700 dark:text-amber-400" />}
                    {idx === 3 && <Soup className="w-6 h-6 text-green-700 dark:text-green-400" />}
                    {idx === 4 && <Sparkles className="w-6 h-6 text-orange-600" />}
                  </div>
                  <h3 className="font-serif text-base font-bold text-amoga-charcoal dark:text-[#F8ECE8] group-hover:text-amoga-orangeDark transition-colors mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-amoga-creamDark/40 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-amoga-burgundy dark:text-amoga-gold">
                  <span>Browse Dishes</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR DISHES SECTION */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#120B0D] border-y border-amoga-creamDark/60 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block mb-1">
                Khammam's Favorites
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
                Selected Popular Dishes
              </h2>
              <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] mt-1">
                Our most loved biryanis, signature starters, and family feasts.
              </p>
            </div>
            <Link
              to="/menu"
              className="px-4 py-2 rounded-xl bg-amoga-cream dark:bg-white/10 hover:bg-amoga-creamDark dark:hover:bg-white/20 text-amoga-charcoal dark:text-white text-xs font-bold border border-amoga-creamDark dark:border-white/15 transition-colors w-fit"
            >
              See All 62 Dishes
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDishes.slice(0, 8).map((dish) => (
              <FoodCard key={dish.id} item={dish} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. TODAY'S SPECIAL PROMO BANNER */}
      {specialDish && (
        <section className="py-12 bg-amoga-cream dark:bg-[#140C0F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amoga-burgundyDark via-amoga-burgundy to-amoga-orange p-8 sm:p-12 text-white shadow-amoga-lg">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amoga-goldPale text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amoga-gold" />
                    <span>Today's Special Dish</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
                    {specialDish.title}
                  </h3>

                  <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                    {specialDish.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <span className="text-xs uppercase tracking-widest text-amoga-goldPale block">
                      Today's Special Price:
                    </span>
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                      ₹{specialDish.price}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-start lg:items-end">
                  <a
                    href={getWhatsAppUrl(`Hello Amoga, I would like to order Today's Special: ${specialDish.title} (₹${specialDish.price}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amoga-gold hover:bg-amoga-goldLight text-amoga-burgundyDark font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Order this on WhatsApp</span>
                  </a>

                  <Link
                    to="/book-table"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Reserve a Table</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. ABOUT PREVIEW & HOSPITALITY */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#120B0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amoga-creamDark dark:border-white/10">
                <img
                  src="/images/restaurant-interior.jpg"
                  alt="Inside Amoga Family Restaurant"
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating review count badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-amoga-burgundy text-white p-4 rounded-2xl shadow-xl max-w-xs border-2 border-white dark:border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-amoga-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-sm">4.7 / 5.0</span>
                </div>
                <p className="text-[11px] text-[#D9C1C2]">
                  Rated by 505 satisfied food lovers in Khammam.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block">
                Family Dining Experience
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-amoga-burgundy dark:text-amoga-goldPale leading-snug">
                Good Food, <span className="italic font-normal text-amoga-orangeDark">Made for Family.</span>
              </h2>

              <p className="text-sm sm:text-base text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed">
                Amoga Family Restaurant in Mayuri Center, Khammam is known for its slow-cooked Hyderabadi dum biryani, flavorful starters, and generous family packs. Diners appreciate the homely taste, clean ambience, and attentive staff.
              </p>

              <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed">
                Whether you sit in our comfortable air-conditioned dining area with your family or place a takeaway pre-order for pickup, we ensure your food arrives piping hot and full of authentic Indian aroma.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3">
                <div className="p-3.5 rounded-xl bg-amoga-cream dark:bg-white/5 border border-amoga-creamDark dark:border-white/10">
                  <span className="font-serif text-2xl font-bold text-amoga-burgundy dark:text-amoga-goldPale block">62</span>
                  <span className="text-xs text-amoga-charcoalLight dark:text-white/60">Dishes on Menu</span>
                </div>
                <div className="p-3.5 rounded-xl bg-amoga-cream dark:bg-white/5 border border-amoga-creamDark dark:border-white/10">
                  <span className="font-serif text-2xl font-bold text-amoga-orangeDark block">4.7 ★</span>
                  <span className="text-xs text-amoga-charcoalLight dark:text-white/60">Google Rating</span>
                </div>
                <div className="p-3.5 rounded-xl bg-amoga-cream dark:bg-white/5 border border-amoga-creamDark dark:border-white/10 col-span-2 sm:col-span-1">
                  <span className="font-serif text-2xl font-bold text-amoga-burgundy dark:text-amoga-goldPale block">7 Days</span>
                  <span className="text-xs text-amoga-charcoalLight dark:text-white/60">11 AM to Midnight</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amoga-burgundy dark:text-amoga-gold hover:text-amoga-orangeDark transition-colors"
                >
                  <span>Learn more about our kitchen</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GALLERY PREVIEW */}
      <section className="py-16 sm:py-20 bg-amoga-cream dark:bg-[#140C0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block mb-1">
              Visual Highlights
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
              Moments at Amoga
            </h2>
            <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] mt-1">
              A glimpse of our biryanis, appetizers and welcoming family dining atmosphere.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gallery.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md bg-amoga-charcoal border border-amoga-creamDark dark:border-white/10"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amoga-gold">
                    {item.categoryName}
                  </span>
                  <h4 className="font-serif text-lg font-bold">{item.title}</h4>
                  {item.caption && (
                    <p className="text-xs text-white/80 line-clamp-2 mt-0.5">{item.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="px-6 py-3 rounded-xl bg-white dark:bg-white/10 hover:bg-amoga-creamDark dark:hover:bg-white/20 text-amoga-charcoal dark:text-white text-xs sm:text-sm font-bold border border-amoga-creamDark dark:border-white/15 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>View Complete Gallery</span>
              <ArrowRight className="w-4 h-4 text-amoga-orangeDark" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#120B0D] border-t border-amoga-creamDark/60 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block mb-1">
              Guest Feedback
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
              Words From Our Diners
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="flex text-amoga-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-amoga-charcoal dark:text-white">
                4.7 / 5.0 (505 Google Reviews)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] mt-2 italic">
              "Diners appreciate the delicious and fresh food, especially the biryani and various combos. Customers also highlight the pleasant ambience, attentive service, reasonable prices and generous portion sizes."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-amoga-cream/40 dark:bg-white/5 rounded-2xl p-6 border border-amoga-creamDark dark:border-white/10 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex text-amoga-orange mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-amoga-charcoal dark:text-[#F8ECE8] leading-relaxed italic mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-amoga-creamDark dark:border-white/10">
                  <div className="w-9 h-9 rounded-full bg-amoga-burgundy text-white flex items-center justify-center font-bold text-sm">
                    {rev.customerName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-amoga-charcoal dark:text-white">
                      {rev.customerName}
                    </h5>
                    <span className="text-[10px] text-amoga-charcoalLight dark:text-white/60 uppercase tracking-wider">
                      Verified Diner
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://maps.app.goo.gl/31x4pAkP6A7Q6eR67"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amoga-cream dark:bg-white/10 hover:bg-amoga-creamDark dark:hover:bg-white/20 text-amoga-charcoal dark:text-white text-xs sm:text-sm font-bold border border-amoga-creamDark dark:border-white/15 transition-colors shadow-sm"
            >
              <span>Read All 505 Reviews on Google Maps</span>
              <ArrowRight className="w-4 h-4 text-amoga-orangeDark" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. LOCATION & GET DIRECTIONS */}
      <section className="py-16 sm:py-20 bg-amoga-cream dark:bg-[#140C0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block">
                Find Us in Khammam
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
                Visit Amoga Restaurant
              </h2>

              <div className="space-y-4 pt-2 text-sm text-amoga-charcoal dark:text-[#F8ECE8]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amoga-orangeDark shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Address</strong>
                    <span className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed">
                      {settings.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amoga-orangeDark shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Timings</strong>
                    <span className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1]">
                      {settings.openingTime} – {settings.closingTime} (Every day)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amoga-orangeDark shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Contact &amp; Reservations</strong>
                    <span className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1]">
                      +91 {settings.phone} / WhatsApp {settings.whatsapp}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 active:scale-95 transition-all"
                >
                  <Navigation className="w-4 h-4 text-amoga-gold" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={getCallUrl()}
                  className="px-5 py-3 rounded-xl bg-white dark:bg-white/10 hover:bg-amoga-creamDark dark:hover:bg-white/20 text-amoga-charcoal dark:text-white text-xs sm:text-sm font-bold border border-amoga-creamDark dark:border-white/15 flex items-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-amoga-orangeDark" />
                  <span>Call {settings.phone}</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden shadow-amoga border border-amoga-creamDark dark:border-white/10 aspect-[16/10] bg-white dark:bg-[#1C1215]">
                <iframe
                  title="Amoga Family Restaurant Location Map"
                  src="https://maps.google.com/maps?q=Mayuri%20Center%2C%20Balaji%20Nagar%2C%20Khammam%2C%20Telangana%20507001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

