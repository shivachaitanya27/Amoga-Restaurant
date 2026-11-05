import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  CalendarDays, 
  Settings, 
  Sparkles, 
  Image as ImageIcon, 
  MessageSquare, 
  Users, 
  QrCode, 
  LogOut, 
  ExternalLink, 
  Menu as MenuIcon, 
  X,
  ShieldCheck,
  Globe,
  Loader2
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { adminUser, loading, logout } = useAuth();
  const { settings } = useRestaurant();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 1. While auth state is initializing, show clean loader
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amoga-burgundy to-amoga-orange text-white flex items-center justify-center font-serif font-bold text-2xl shadow-lg mb-3 animate-pulse">
          A
        </div>
        <div className="flex items-center gap-2 text-amoga-burgundy font-serif font-bold text-sm">
          <Loader2 className="w-4 h-4 animate-spin text-amoga-orange" />
          <span>Loading Admin Portal...</span>
        </div>
      </div>
    );
  }

  // 2. If not logged in, show redirect to login prompt
  if (!adminUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Menu Items (62)', path: '/admin/menu', icon: UtensilsCrossed },
    { label: 'Orders & Pickup', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Table Bookings', path: '/admin/bookings', icon: CalendarDays },
    { label: 'Offers & Specials', path: '/admin/offers', icon: Sparkles },
    { label: 'Photo Gallery', path: '/admin/gallery', icon: ImageIcon },
    { label: 'Review Moderation', path: '/admin/reviews', icon: MessageSquare },
    { label: 'Customers & Loyalty', path: '/admin/loyalty', icon: Users },
    { label: 'Table QR Code', path: '/admin/qr', icon: QrCode },
    { label: 'Restaurant Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 sticky top-0 h-screen z-40 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amoga-burgundy to-amoga-orange text-white flex items-center justify-center font-serif font-bold text-xl shadow-sm">
            A
          </div>
          <div>
            <h2 className="font-serif font-bold text-amoga-burgundy text-lg leading-none">
              Amoga Admin
            </h2>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Management Portal
            </span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amoga-burgundy text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amoga-gold' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          {/* Live Website View Option */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100/80 text-amoga-burgundy border border-amber-200/80 transition-all shadow-xs group"
            title="Open Live Website in a new tab"
          >
            <span className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Globe className="w-4 h-4 text-amoga-orangeDark group-hover:scale-110 transition-transform" />
              <span>Live Website View</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amoga-burgundy transition-colors" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header - Fixed on Desktop & Mobile */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <span className="font-serif font-bold text-slate-800 text-lg hidden sm:inline">
              {settings.restaurantName}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">{adminUser.email || 'Admin'}</span>
            </div>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amoga-burgundy bg-amoga-cream hover:bg-amoga-creamDark rounded-xl border border-amoga-creamDark transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Website</span>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />
            <div className="relative w-64 bg-white shadow-xl flex flex-col h-full z-10">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="font-serif font-bold text-amoga-burgundy">Admin Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold ${
                        isActive
                          ? 'bg-amoga-burgundy text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-100 space-y-2">
                {/* Live Website View Option */}
                <Link
                  to="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100/80 text-amoga-burgundy border border-amber-200/80 transition-all shadow-xs group"
                  title="Open Live Website in a new tab"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <Globe className="w-4 h-4 text-amoga-orangeDark group-hover:scale-110 transition-transform" />
                    <span>Live Website View</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amoga-burgundy transition-colors" />
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-xs font-bold text-red-600 w-full px-3.5 py-2.5 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Child Page Outlet */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

