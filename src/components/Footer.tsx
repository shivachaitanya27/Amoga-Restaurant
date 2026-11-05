import React from 'react';
import { Link } from 'react-router-dom';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  ExternalLink, 
  Shield, 
  Star,
  UtensilsCrossed,
  Image as ImageIcon,
  Users,
  Settings,
  ShoppingBag,
  CalendarDays,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, getWhatsAppUrl, getCallUrl } = useRestaurant();

  return (
    <footer className="bg-amoga-charcoal text-[#FFEDE9] pt-16 pb-12 border-t-4 border-amoga-burgundy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* STANDARD FOOTER LINKS & DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#544244]">
          {/* Col 1: Brand & About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amoga-burgundy to-amoga-orange flex items-center justify-center text-white font-serif text-xl font-bold">
                A
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-amoga-goldPale">
                {settings.restaurantName}
              </span>
            </div>
            
            <p className="text-sm text-[#D9C1C2] leading-relaxed mb-4">
              {settings.description}
            </p>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 w-fit">
              <div className="flex text-amoga-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">4.7 / 5.0</span>
              <span className="text-[11px] text-[#D9C1C2]">(505 Google Reviews)</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-amoga-goldPale mb-4">
              Explore Amoga
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D9C1C2]">
              <li>
                <Link to="/" className="hover:text-amoga-gold transition-colors">
                  Home &amp; Highlights
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-amoga-gold transition-colors">
                  Digital Food Menu (62 Items)
                </Link>
              </li>
              <li>
                <Link to="/book-table" className="hover:text-amoga-gold transition-colors">
                  Reserve a Table
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-amoga-gold transition-colors">
                  Special Offers &amp; Family Combos
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amoga-gold transition-colors">
                  Food &amp; Dining Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amoga-gold transition-colors">
                  Our Story &amp; Hospitality
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-amoga-gold transition-colors">
                  Customer Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Timings & Location */}
          <div>
            <h4 className="font-serif text-lg font-bold text-amoga-goldPale mb-4">
              Hours &amp; Location
            </h4>
            <div className="space-y-3.5 text-sm text-[#D9C1C2]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amoga-orange mt-0.5 shrink-0" />
                <div>
                  <span className="block font-semibold text-white">Open Every Day</span>
                  <span>{settings.openingTime} – {settings.closingTime} (Midnight)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amoga-orange mt-0.5 shrink-0" />
                <div>
                  <span className="block font-semibold text-white">Restaurant Address</span>
                  <span className="text-xs leading-relaxed block text-[#D9C1C2]">
                    {settings.address}
                  </span>
                </div>
              </div>

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amoga-gold hover:underline mt-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 4: Pre-Order & Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold text-amoga-goldPale mb-4">
              Connect With Us
            </h4>
            <p className="text-xs text-[#D9C1C2] leading-relaxed mb-4">
              Craving hot dum biryani or crisp starters? Order directly for home delivery or takeaway pickup.
            </p>

            <div className="space-y-2.5">
              <a
                href={getWhatsAppUrl("Hello Amoga, I would like to order food.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-md transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={getCallUrl()}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-amoga-orange" />
                <span>Call {settings.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9C1C2]">
          <p>© 2026 {settings.restaurantName}. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact &amp; Directions
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/admin" className="flex items-center gap-1 hover:text-white transition-colors text-amoga-gold font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
