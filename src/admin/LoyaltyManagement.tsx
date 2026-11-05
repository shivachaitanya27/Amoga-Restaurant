import React, { useState, useEffect } from 'react';
import { subscribeToCustomers } from '../firebase/firestore';
import { CustomerLead } from '../types';
import { Users, Search, Award, MessageCircle, Phone, Calendar } from 'lucide-react';

export const LoyaltyManagement: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerLead[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsub = subscribeToCustomers(setCustomers);
    return () => unsub();
  }, []);

  const filtered = customers.filter((c) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.phone.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
            Customer Loyalty &amp; Leads ({customers.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Registered phone numbers with consent, accumulated points, and completed orders.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amoga-burgundy"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs">
            No registered customers found. Customer leads submitted through the website popup appear here automatically.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3.5 px-4">Customer Name</th>
                  <th className="py-3.5 px-4">Mobile Number</th>
                  <th className="py-3.5 px-4">Loyalty Balance</th>
                  <th className="py-3.5 px-4">Completed Orders</th>
                  <th className="py-3.5 px-4">Registered Date</th>
                  <th className="py-3.5 px-4 text-right">WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <strong className="text-slate-800 font-bold block text-xs">
                        {c.name}
                      </strong>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                      +91 {c.phone}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold text-xs">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>{c.loyaltyPoints} Points</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 font-semibold">
                      {c.totalCompletedOrders} Orders
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(c.registeredAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/91${c.phone}?text=${encodeURIComponent(`Hello ${c.name}, greetings from Amoga Family Restaurant! You currently have ${c.loyaltyPoints} loyalty points with us. We invite you to enjoy our weekend dum biryani specials!`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366] text-white text-[11px] font-bold hover:bg-[#20ba59]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Message</span>
                      </a>
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

