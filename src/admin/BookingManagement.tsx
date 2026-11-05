import React, { useState, useEffect } from 'react';
import { subscribeToBookings, updateBookingStatus } from '../firebase/firestore';
import { Booking, BookingStatus } from '../types';
import { 
  CalendarDays, 
  Search, 
  CheckCircle2, 
  XCircle, 
  MessageCircle, 
  Phone, 
  Clock, 
  Users 
} from 'lucide-react';

export const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const unsub = subscribeToBookings(setBookings);
    return () => unsub();
  }, []);

  const filtered = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = b.customerName.toLowerCase().includes(q);
      const matchPhone = b.mobile.includes(q);
      const matchId = b.id.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchId) return false;
    }
    return true;
  });

  const handleStatusUpdate = async (id: string, status: BookingStatus) => {
    try {
      await updateBookingStatus(id, status);
    } catch (e) {
      console.error("Failed to update booking status:", e);
    }
  };

  const getWhatsAppMessage = (b: Booking, status: BookingStatus) => {
    if (status === 'Confirmed') {
      return `Namaste ${b.customerName}, your table reservation #${b.id} at Amoga Family Restaurant has been *CONFIRMED*!
Date: ${b.date}
Time: ${b.time}
Guests: ${b.guests}
Mode: ${b.mode}
Address: Mayuri Center, Balaji Nagar, Khammam.
We look forward to serving your family!`;
    }
    if (status === 'Rejected') {
      return `Namaste ${b.customerName}, regarding reservation #${b.id}: We are fully booked for ${b.time} on ${b.date}. Please call us at 9550382281 to explore alternate dining slots.`;
    }
    return `Namaste ${b.customerName}, regarding your table booking #${b.id} at Amoga Family Restaurant.`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
            Table Reservations Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review incoming table requests, confirm seating, and notify diners on WhatsApp.
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-2 rounded-xl border border-slate-200">
          Total: <strong className="text-slate-800">{bookings.length}</strong> bookings
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer, phone, ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amoga-burgundy"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['all', 'Pending', 'Confirmed', 'Rejected', 'Completed'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === s
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s === 'all' ? 'All Bookings' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs">
            No table bookings match your filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3.5 px-4">Booking ID</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Date &amp; Time</th>
                  <th className="py-3.5 px-4">Guests</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800 whitespace-nowrap">
                      {b.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <strong className="text-slate-800 block text-xs font-bold">
                        {b.customerName}
                      </strong>
                      <span className="text-[11px] text-slate-500 block">+91 {b.mobile}</span>
                      {b.specialRequests && (
                        <span className="text-[10px] text-amber-700 italic block mt-0.5">
                          Note: {b.specialRequests}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-700">{b.mode}</span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-slate-800 block">{b.date}</span>
                      <span className="text-[11px] text-slate-500">{b.time}</span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-700">
                      {b.guests}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        b.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        b.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {b.status === 'Pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStatusUpdate(b.id, 'Confirmed')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusUpdate(b.id, 'Rejected')}
                              className="px-2.5 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold text-[11px] transition-colors"
                            >
                              Decline
                            </button>
                          </>
                        )}

                        {b.status === 'Confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(b.id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-[11px] transition-colors"
                          >
                            Mark Arrived
                          </button>
                        )}

                        <a
                          href={`https://wa.me/91${b.mobile}?text=${encodeURIComponent(getWhatsAppMessage(b, b.status))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors"
                          title="Message diner on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
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
    </div>
  );
};

