import React, { useState, useEffect, useRef } from 'react';
import { subscribeToOrders, updateOrderStatus } from '../firebase/firestore';
import { useRestaurant } from '../context/RestaurantContext';
import { Order, OrderStatus } from '../types';
import { calculateBill, generateWhatsAppBillText } from '../utils/billFormatter';
import { FoodBillReceipt } from '../components/FoodBillReceipt';
import { 
  Search, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  Filter, 
  Phone, 
  Calendar,
  AlertCircle,
  Bike,
  ShoppingBag,
  MapPin,
  Navigation,
  ExternalLink,
  Receipt,
  Printer,
  X
} from 'lucide-react';

export const OrderManagement: React.FC = () => {
  const { settings, getWhatsAppUrl } = useRestaurant();
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedOrderForBill, setSelectedOrderForBill] = useState<Order | null>(null);
  const printBillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = subscribeToOrders(setOrders);
    return () => unsub();
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (typeFilter !== 'all' && o.orderType !== typeFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.mobile.includes(q);
      const matchAddr = o.deliveryAddress ? o.deliveryAddress.toLowerCase().includes(q) : false;
      if (!matchId && !matchName && !matchPhone && !matchAddr) return false;
    }
    return true;
  });

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const getCustomerWhatsAppMessage = (order: Order, status: OrderStatus) => {
    const isDelivery = order.orderType === 'Home Delivery';
    if (status === 'Confirmed') {
      return `Hello ${order.customerName}, your ${isDelivery ? 'Home Delivery' : 'Takeaway Pickup'} order #${order.id} has been *CONFIRMED* by Amoga Family Restaurant! Our kitchen is preparing your dishes fresh. Total Payable: ₹${order.totalAmount}. Slot: ${order.pickupTime}.`;
    }
    if (status === 'Preparing') {
      return `Hello ${order.customerName}, your order #${order.id} is currently *BEING PREPARED* in our kitchen with authentic dum spices.`;
    }
    if (status === 'Ready for Pickup') {
      return isDelivery
        ? `Hello ${order.customerName}, great news! Your order #${order.id} is packed and *OUT FOR DELIVERY* to ${order.deliveryAddress || 'your address'}. Our delivery partner will arrive shortly!`
        : `Hello ${order.customerName}, great news! Your order #${order.id} is *HOT & READY FOR PICKUP* at Amoga Family Restaurant (Mayuri Center, Balaji Nagar, Khammam). See you soon!`;
    }
    if (status === 'Completed') {
      return `Thank you for choosing Amoga Family Restaurant! Your order #${order.id} is marked *COMPLETED*. Welcome loyalty points have been credited to +91 ${order.mobile}. We look forward to serving you again!`;
    }
    if (status === 'Cancelled') {
      return `Hello ${order.customerName}, regarding order #${order.id}: We regret that this order could not be fulfilled at this moment. Please call us at 9550382281 for immediate assistance.`;
    }
    return `Hello ${order.customerName}, regarding your order #${order.id} at Amoga Family Restaurant.`;
  };

  const statuses: OrderStatus[] = ['New', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Completed', 'Cancelled'];

  const selectedBillData = selectedOrderForBill ? calculateBill(selectedOrderForBill) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
            Orders &amp; Home Deliveries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track kitchen preparation, live delivery addresses, GPS coordinates, printable bills, and WhatsApp notifications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-2 rounded-xl border border-slate-200">
            Total: <strong className="text-slate-800">{orders.length}</strong> orders
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order ID, customer, address..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amoga-burgundy"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Order Type Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setTypeFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                typeFilter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              All Types
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('Home Delivery')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                typeFilter === 'Home Delivery' ? 'bg-amoga-orange text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              <Bike className="w-3 h-3" />
              <span>Delivery</span>
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('Takeaway pickup')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                typeFilter === 'Takeaway pickup' ? 'bg-amoga-burgundy text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Takeaway</span>
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Statuses
            </button>
            {statuses.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  statusFilter === s
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs">
            No orders match the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3.5 px-4">Order ID &amp; Type</th>
                  <th className="py-3.5 px-4">Customer &amp; Location</th>
                  <th className="py-3.5 px-4">Delivery Slot</th>
                  <th className="py-3.5 px-4">Ordered Dishes</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Order Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-slate-900 block">{ord.id}</span>
                      <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        ord.orderType === 'Home Delivery'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {ord.orderType === 'Home Delivery' ? <Bike className="w-3 h-3 text-amoga-orangeDark" /> : <ShoppingBag className="w-3 h-3" />}
                        <span>{ord.orderType || 'Takeaway pickup'}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <strong className="text-slate-800 block text-xs font-bold">
                        {ord.customerName}
                      </strong>
                      <a
                        href={`tel:+91${ord.mobile}`}
                        className="text-[11px] text-slate-500 hover:text-amoga-burgundy flex items-center gap-1 font-mono"
                      >
                        <Phone className="w-3 h-3 text-amoga-orangeDark" />
                        <span>+91 {ord.mobile}</span>
                      </a>

                      {ord.orderType === 'Home Delivery' && ord.deliveryAddress && (
                        <div className="mt-1 text-[11px] text-slate-700 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                          <span className="font-semibold block text-slate-900">Address:</span>
                          <span className="line-clamp-2">{ord.deliveryAddress}</span>
                        </div>
                      )}

                      {ord.googleMapsLocationUrl && (
                        <a
                          href={ord.googleMapsLocationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 hover:underline mt-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Open Live GPS Pin</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap font-medium">
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-bold text-[11px]">
                        <Clock className="w-3 h-3" />
                        {ord.pickupTime}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="space-y-0.5">
                        {ord.items.map((i, idx) => (
                          <div key={idx} className="text-slate-700 flex items-center gap-1 truncate">
                            <span 
                              className="w-1.5 h-1.5 rounded-full shrink-0" 
                              style={{ backgroundColor: i.isVeg ? '#16a34a' : '#dc2626' }}
                            />
                            <span>{i.quantity}x {i.name}</span>
                          </div>
                        ))}
                      </div>
                      {ord.specialInstructions && (
                        <span className="text-[10px] text-slate-400 italic block mt-1">
                          Note: {ord.specialInstructions}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-amoga-burgundy text-sm whitespace-nowrap">
                      ₹{ord.totalAmount}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                        className={`text-xs font-bold py-1 px-2.5 rounded-xl border outline-none cursor-pointer ${
                          ord.status === 'New' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          ord.status === 'Confirmed' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          ord.status === 'Preparing' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                          ord.status === 'Ready for Pickup' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          ord.status === 'Completed' ? 'bg-green-50 text-green-800 border-green-200' :
                          'bg-red-50 text-red-800 border-red-200'
                        }`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Food Bill Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedOrderForBill(ord)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-all"
                          title="View & Print Official Food Bill"
                        >
                          <Receipt className="w-3.5 h-3.5 text-amoga-burgundy" />
                          <span>Bill</span>
                        </button>

                        {/* WhatsApp Notify Button */}
                        <a
                          href={`https://wa.me/91${ord.mobile}?text=${encodeURIComponent(getCustomerWhatsAppMessage(ord, ord.status))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-bold shadow-sm transition-all"
                          title="Send status update on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>Notify</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin Food Bill Modal Preview & Print */}
      {selectedOrderForBill && selectedBillData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200 max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedOrderForBill(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Food Bill Content */}
            <div ref={printBillRef}>
              <FoodBillReceipt
                order={selectedOrderForBill}
                restaurantName={settings.restaurantName || "RESTAURANT"}
                showCustomerDetails={true}
              />
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Bill</span>
              </button>
              <a
                href={getWhatsAppUrl(generateWhatsAppBillText(selectedOrderForBill, settings.restaurantName))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
