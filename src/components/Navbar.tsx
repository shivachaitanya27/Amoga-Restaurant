import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useRestaurant } from '../context/RestaurantContext';
import { useTheme } from '../context/ThemeContext';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  CalendarDays,
  Sparkles,
  QrCode,
  Bike,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { QRMenuModal } from './QRMenuModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const location = useLocation();
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const { settings, getCallUrl } = useRestaurant();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu (62)', path: '/menu' },
    { label: 'Offers', path: '/offers', badge: 'Special' },
    { label: 'Book Table', path: '/book-table' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#1A1114]/95 backdrop-blur-md shadow-amoga dark:shadow-none py-2.5 border-b border-amoga-creamDark/60 dark:border-white/10'
            : 'bg-amoga-cream/95 dark:bg-[#150D10]/95 backdrop-blur-sm py-3.5 border-b border-amoga-creamDark/40 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* BRAND LOGO */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amoga-burgundy via-amoga-burgundyDark to-amoga-orange flex items-center justify-center text-white shadow-md font-serif text-xl sm:text-2xl font-bold group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-amoga-burgundy dark:text-amoga-goldPale leading-tight">
                  Amoga
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-amoga-orangeDark dark:text-amoga-orange leading-none">
                  Family Restaurant
                </span>
              </div>
            </Link>

            {/* CENTER NAV LINKS - PROPERLY ALIGNED & SPACED */}
            <nav className="hidden xl:flex items-center gap-1 bg-white/70 dark:bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-amoga-creamDark/80 dark:border-white/10 shadow-sm">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amoga-burgundy text-white shadow-sm'
                        : 'text-amoga-charcoal dark:text-[#E8D4D0] hover:text-amoga-burgundy dark:hover:text-amoga-goldPale hover:bg-amoga-cream dark:hover:bg-white/10'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amoga-orange animate-ping" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT ACTIONS - PROPERLY ARRANGED & HIGHLY INTERACTIVE */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Theme Toggle Button (Light / Dark) */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 sm:px-2.5 sm:py-2 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-white/80 dark:bg-white/10 text-amoga-charcoal dark:text-amoga-goldPale hover:bg-amoga-cream dark:hover:bg-white/20 transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle Light and Dark Theme"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amoga-gold" />
                    <span className="hidden sm:inline text-xs font-bold text-amoga-goldPale">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-amoga-burgundy" />
                    <span className="hidden sm:inline text-xs font-bold text-amoga-charcoal">Dark</span>
                  </>
                )}
              </button>


              {/* QR Code generator button */}
              <button
                type="button"
                onClick={() => setQrModalOpen(true)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amoga-charcoal dark:text-slate-200 hover:text-amoga-burgundy dark:hover:text-amoga-gold bg-white dark:bg-white/10 border border-amoga-creamDark dark:border-white/10 rounded-xl hover:border-amoga-orange transition-all shadow-sm active:scale-95 cursor-pointer"
                title="View Table QR Code"
              >
                <QrCode className="w-3.5 h-3.5 text-amoga-orange" />
                <span>QR Menu</span>
              </button>

              {/* Call button */}
              <a
                href={getCallUrl()}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amoga-charcoal dark:text-slate-200 bg-amoga-cream dark:bg-white/10 hover:bg-amoga-creamDark dark:hover:bg-white/20 border border-amoga-creamDark dark:border-white/10 rounded-xl transition-colors shadow-sm"
                title="Call Amoga Restaurant"
              >
                <Phone className="w-3.5 h-3.5 text-amoga-orangeDark" />
                <span className="hidden xl:inline">{settings.phone}</span>
                <span className="xl:hidden">Call</span>
              </a>

              {/* Interactive Cart Button with Live Count & Subtotal */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer ${
                  totalItems > 0
                    ? 'bg-amoga-burgundy text-white ring-2 ring-amoga-orange/40 shadow-amoga'
                    : 'bg-white dark:bg-white/10 hover:bg-amoga-cream dark:hover:bg-white/20 border border-amoga-creamDark dark:border-white/10 text-amoga-charcoal dark:text-slate-200'
                }`}
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className={`w-4 h-4 ${totalItems > 0 ? 'text-amoga-gold' : 'text-amoga-burgundy dark:text-amoga-gold'}`} />
                <span className="text-xs font-bold">
                  {totalItems > 0 ? `₹${subtotal}` : 'Bag'}
                </span>
                {totalItems > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amoga-orange text-white text-[10px] font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Delivery / Order Online Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amoga-orange to-amoga-orangeLight text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                <Bike className="w-3.5 h-3.5 text-white" />
                <span>Order Delivery</span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white dark:bg-white/10 border border-amoga-creamDark dark:border-white/10 text-amoga-charcoal dark:text-slate-200 xl:hidden shadow-sm active:scale-95"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER WITH PROPER ALIGNMENT & DARK THEME SUPPORT */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white/98 dark:bg-[#1A1114]/98 backdrop-blur-xl border-b border-amoga-creamDark dark:border-white/10 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1.5">
              {/* Mobile Theme Toggle Pill */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amoga-cream/70 dark:bg-white/5 border border-amoga-creamDark dark:border-white/10 mb-1">
                <span className="text-xs font-bold text-amoga-charcoal dark:text-[#E8D4D0] flex items-center gap-2">
                  {theme === 'dark' ? <Moon className="w-4 h-4 text-amoga-gold" /> : <Sun className="w-4 h-4 text-amoga-orange" />}
                  <span>{theme === 'dark' ? 'Night Theme Active' : 'Day Theme Active'}</span>
                </span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-3 py-1 rounded-lg bg-amoga-burgundy text-white text-xs font-bold shadow-sm"
                >
                  Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
              </div>

              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-amoga-burgundy text-white shadow-sm'
                        : 'text-amoga-charcoal dark:text-[#E8D4D0] hover:bg-amoga-cream dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <div className="flex items-center gap-2">
                      {link.badge && (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amoga-orange text-white font-bold">
                          <Sparkles className="w-2.5 h-2.5" /> {link.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </div>
                  </Link>
                );
              })}

              {/* Theme toggle row in mobile drawer */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-amoga-creamDark/60 dark:border-white/10 bg-amoga-cream/40 dark:bg-white/5 text-amoga-charcoal dark:text-white text-xs font-bold transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-amoga-gold" />
                    ) : (
                      <Moon className="w-4 h-4 text-amoga-burgundy" />
                    )}
                    <span>Appearance Theme</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amoga-burgundy/10 dark:bg-white/10 text-amoga-burgundy dark:text-amoga-gold text-[10px] uppercase tracking-wider">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </button>
              </div>


              {/* Mobile Quick Action Buttons */}
              <div className="pt-2 mt-2 border-t border-amoga-creamDark/60 dark:border-white/10 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amoga-orange text-white text-xs font-bold shadow-sm"
                >
                  <Bike className="w-4 h-4" />
                  <span>Order Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setQrModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amoga-cream dark:bg-white/10 text-amoga-charcoal dark:text-white text-xs font-bold border border-amoga-creamDark dark:border-white/10"
                >
                  <QrCode className="w-4 h-4 text-amoga-orange" />
                  <span>Table QR Menu</span>
                </button>
              </div>

              <div className="pt-1">
                <a
                  href={getCallUrl()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amoga-creamDark/70 dark:bg-white/5 text-amoga-charcoal dark:text-white text-xs font-bold"
                >
                  <Phone className="w-4 h-4 text-amoga-orangeDark" />
                  <span>Call {settings.phone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* QR Code Modal */}
      <QRMenuModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} />
    </>
  );
};
