import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  subscribeToOrders, 
  subscribeToBookings, 
  subscribeToCustomers,
  seedAllDataToFirestore 
} from '../firebase/firestore';
import { Order, Booking, CustomerLead } from '../types';
import { 
  ShoppingBag, 
  CalendarDays, 
  UtensilsCrossed, 
  Sparkles, 
  Users, 
  Clock, 
  Database, 
  ArrowRight, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Shield,
  Image as ImageIcon,
  Settings,
  Lock,
  ExternalLink
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { menuItems, offers, reviews, settings } = useRestaurant();
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customers, setCustomers] = useState<CustomerLead[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ message: string; success: boolean } | null>(null);

  useEffect(() => {
    const unsubOrders = subscribeToOrders(setOrders);
    const unsubBookings = subscribeToBookings(setBookings);
    const unsubCustomers = subscribeToCustomers(setCustomers);
    return () => {
      unsubOrders();
      unsubBookings();
      unsubCustomers();
    };
  }, []);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'New' || o.status === 'Confirmed' || o.status === 'Preparing').length;
  const completedOrders = orders.filter((o) => o.status === 'Completed').length;
  const totalRevenue = orders
    .filter((o) => o.status === 'Completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingBookings = bookings.filter((b) => b.status === 'Pending').length;
  const totalBookings = bookings.length;
  const activeOffersCount = offers.filter((o) => o.isActive).length;

  const handleSeedFirestore = async () => {
    if (!window.confirm("This will write all 62 default menu items, categories, settings, and starter gallery data to your Cloud Firestore database. Proceed?")) {
      return;
    }

    setIsSeeding(true);
    setSeedResult(null);
    try {
      const res = await seedAllDataToFirestore();
      setSeedResult({ success: true, message: res.message });
    } catch (err: any) {
      console.error("Firestore seeding error:", err);
      setSeedResult({ success: false, message: err.message || "Failed to seed data. Check Firebase configuration in .env" });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Seeding Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
            Business Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time management for Amoga Family Restaurant, Khammam.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSeedFirestore}
          disabled={isSeeding}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amoga-burgundy to-amoga-orange text-white text-xs font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
        >
          <Database className="w-4 h-4 text-amoga-gold" />
          <span>{isSeeding ? 'Writing to Firestore...' : 'Seed 62 Items to Firestore'}</span>
        </button>
      </div>

      {seedResult && (
        <div className={`p-4 rounded-2xl text-xs sm:text-sm font-medium border flex items-start gap-3 animate-in fade-in duration-200 ${
          seedResult.success 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
            : 'bg-amber-50 text-amber-800 border-amber-200'
        }`}>
          {seedResult.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-bold block mb-0.5">{seedResult.success ? 'Database Seeded' : 'Notice'}</span>
            <span>{seedResult.message}</span>
          </div>
        </div>
      )}

      {/* RESTAURANT OWNER & ADMIN PANEL CONTROL BAR */}
      <div className="bg-[#400B14] rounded-3xl p-5 sm:p-7 text-[#FFEDE9] border border-[#681926] shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                  Restaurant Owner &amp; Admin Panel
                </h2>
                <span className="bg-[#5A121F] text-amber-300 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  SECURE CONTROLS
                </span>
              </div>
              <p className="text-xs text-[#E2C7C9] mt-1 max-w-xl">
                Update menu prices, upload food &amp; interior photos, change contact numbers, and view customer leads.
              </p>
            </div>
          </div>

          <Link
            to="/menu"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs shadow-md transition-all shrink-0 active:scale-95"
          >
            <Lock className="w-3.5 h-3.5 text-slate-900" />
            <span>Open Customer Menu</span>
            <ExternalLink className="w-3 h-3 text-slate-900 ml-0.5" />
          </Link>
        </div>

        {/* 6 Quick Admin Feature Modules */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-5">
          <Link
            to="/admin/menu"
            className="bg-[#2D070D]/80 hover:bg-[#52111D] border border-white/10 hover:border-amber-400/50 p-3.5 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <UtensilsCrossed className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white group-hover:text-amber-200 block">
              Edit Menu &amp; Prices
            </span>
            <span className="text-[10px] text-[#D9BDBF] mt-0.5 block">
              62 dishes &amp; stock
            </span>
          </Link>

          <Link
            to="/admin/gallery"
            className="bg-[#2D070D]/80 hover:bg-[#52111D] border border-white/10 hover:border-amber-400/50 p-3.5 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <ImageIcon className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white group-hover:text-amber-200 block">
              Upload Photos
            </span>
            <span className="text-[10px] text-[#D9BDBF] mt-0.5 block">
              Food &amp; Dining Hall
            </span>
          </Link>

          <Link
            to="/admin/settings"
            className="bg-[#2D070D]/80 hover:bg-[#52111D] border border-white/10 hover:border-amber-400/50 p-3.5 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <Settings className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white group-hover:text-amber-200 block">
              Change Numbers
            </span>
            <span className="text-[10px] text-[#D9BDBF] mt-0.5 block">
              Phone, WhatsApp &amp; Hours
            </span>
          </Link>

          <Link
            to="/admin/loyalty"
            className="bg-[#2D070D]/80 hover:bg-[#52111D] border border-white/10 hover:border-amber-400/50 p-3.5 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <Users className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white group-hover:text-amber-200 block">
              Customer Leads
            </span>
            <span className="text-[10px] text-[#D9BDBF] mt-0.5 block">
              Phone records &amp; loyalty
            </span>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-[#2D070D]/80 hover:bg-[#52111D] border border-white/10 hover:border-amber-400/50 p-3.5 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <ShoppingBag className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white group-hover:text-amber-200 block">
              Orders &amp; Delivery
            </span>
            <span className="text-[10px] text-[#D9BDBF] mt-0.5 block">
              Live kitchen queue
            </span>
          </Link>

          <Link
            to="/admin/bookings"
            className="bg-[#2D070D]/80 hover:bg-[#52111D] border border-white/10 hover:border-amber-400/50 p-3.5 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <CalendarDays className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white group-hover:text-amber-200 block">
              Table Bookings
            </span>
            <span className="text-[10px] text-[#D9BDBF] mt-0.5 block">
              Confirm reservations
            </span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total & Pending Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Pickup Orders
            </span>
            <span className="text-2xl font-bold text-slate-800 mt-1 block">
              {pendingOrders}
            </span>
            <span className="text-xs text-slate-500">
              {totalOrders} total orders recorded
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-amoga-burgundy flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Table Reservations */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Pending Table Bookings
            </span>
            <span className="text-2xl font-bold text-slate-800 mt-1 block">
              {pendingBookings}
            </span>
            <span className="text-xs text-slate-500">
              {totalBookings} total reservations
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amoga-orangeDark flex items-center justify-center">
            <CalendarDays className="w-6 h-6" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Menu Dishes
            </span>
            <span className="text-2xl font-bold text-slate-800 mt-1 block">
              {menuItems.length}
            </span>
            <span className="text-xs text-slate-500">
              Across 5 authentic categories
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
        </div>

        {/* Customer Leads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Registered Customers
            </span>
            <span className="text-2xl font-bold text-slate-800 mt-1 block">
              {customers.length}
            </span>
            <span className="text-xs text-slate-500">
              Loyalty points enrolled
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Links & Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          to="/admin/orders"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amoga-orange transition-all flex items-center justify-between group"
        >
          <div>
            <h3 className="font-bold text-sm text-slate-800 group-hover:text-amoga-burgundy">
              Manage Pickup Orders
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Update kitchen order status &amp; notify on WhatsApp.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amoga-orange group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/admin/menu"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amoga-orange transition-all flex items-center justify-between group"
        >
          <div>
            <h3 className="font-bold text-sm text-slate-800 group-hover:text-amoga-burgundy">
              Edit Menu &amp; Prices
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Change prices, availability &amp; feature popular items.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amoga-orange group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/admin/settings"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amoga-orange transition-all flex items-center justify-between group"
        >
          <div>
            <h3 className="font-bold text-sm text-slate-800 group-hover:text-amoga-burgundy">
              Contact &amp; Timings
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit phone number, WhatsApp and Today's Special.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amoga-orange group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Recent Orders Feed */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-serif font-bold text-lg text-slate-800">
              Recent Pre-Orders
            </h3>
            <p className="text-xs text-slate-500">Live order queue from website &amp; WhatsApp</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-amoga-orangeDark hover:underline"
          >
            View All ({orders.length})
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            No customer orders placed yet. Orders placed on the website appear here automatically.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Pickup Time</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80">
                    <td className="py-3 font-mono font-bold text-slate-800">{ord.id}</td>
                    <td className="py-3">
                      <span className="font-bold text-slate-800 block">{ord.customerName}</span>
                      <span className="text-[11px] text-slate-500">+91 {ord.mobile}</span>
                    </td>
                    <td className="py-3 text-slate-600">{ord.pickupTime}</td>
                    <td className="py-3 text-slate-600">
                      {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </td>
                    <td className="py-3 font-bold text-amoga-burgundy">₹{ord.totalAmount}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ord.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        ord.status === 'Confirmed' ? 'bg-amber-100 text-amber-700' :
                        ord.status === 'Preparing' ? 'bg-purple-100 text-purple-700' :
                        ord.status === 'Ready for Pickup' ? 'bg-emerald-100 text-emerald-700' :
                        ord.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

