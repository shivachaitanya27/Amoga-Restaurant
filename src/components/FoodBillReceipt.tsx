import React from 'react';
import { Order } from '../types';
import { calculateBill } from '../utils/billFormatter';
import { Navigation, Bike, ShoppingBag, Clock, Phone, MapPin } from 'lucide-react';

interface FoodBillReceiptProps {
  order: Order;
  restaurantName?: string;
  showCustomerDetails?: boolean;
  className?: string;
}

/**
 * Pixel-perfect Restaurant Food Bill receipt matching the user's uploaded reference image:
 * - Centered uppercase RESTAURANT and FOOD BILL titles
 * - Right-aligned Invoice # and Date
 * - Clean solid black rule dividers
 * - DESCRIPTION | QTY | RATE | AMOUNT table layout with exact decimal formatting
 * - Zero extra costs (No GST), directly displaying itemized subtotal = TOTAL
 * - Optimized for thermal receipt and laser printing via @media print
 */
export const FoodBillReceipt: React.FC<FoodBillReceiptProps> = ({
  order,
  restaurantName = 'RESTAURANT',
  showCustomerDetails = true,
  className = ''
}) => {
  const bill = calculateBill(order);

  return (
    <div className={`food-bill-container ${className}`}>
      {/* Visual Bill Slip - Styled like thermal / fine restaurant bill paper */}
      <div className="bg-[#FAF8F5] text-[#111827] border border-[#DDD8CF] rounded-2xl p-6 sm:p-8 shadow-sm font-sans mx-auto max-w-md print:max-w-full print:border-none print:shadow-none print:p-0 print:bg-white">
        {/* Header: RESTAURANT & FOOD BILL */}
        <div className="text-center mb-5">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-[0.2em] text-[#111827] leading-tight">
            {restaurantName}
          </h1>
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-[0.25em] text-[#111827] mt-1.5">
            FOOD BILL
          </h2>

          {/* Invoice # & Date (Right Aligned, exactly like reference) */}
          <div className="flex flex-col items-end text-xs sm:text-sm font-medium text-[#111827] mt-5 space-y-0.5">
            <div>
              <span className="font-semibold">Invoice #:</span>{' '}
              <span className="font-mono tracking-tight">{bill.invoiceNumber}</span>
            </div>
            <div>
              <span className="font-semibold">Date</span>{' '}
              <span className="font-mono">{bill.dateFormatted}</span>
            </div>
          </div>
        </div>

        {/* Divider Above Table Header */}
        <div className="border-t-[1.5px] border-black my-2" />

        {/* Table Header: DESCRIPTION | QTY | RATE | AMOUNT */}
        <div className="grid grid-cols-12 text-xs sm:text-sm font-bold uppercase text-black tracking-wider py-1">
          <span className="col-span-6 text-left">DESCRIPTION</span>
          <span className="col-span-2 text-center">QTY</span>
          <span className="col-span-2 text-right">RATE</span>
          <span className="col-span-2 text-right">AMOUNT</span>
        </div>

        {/* Divider Below Table Header */}
        <div className="border-b-[1.5px] border-black mb-2" />

        {/* Line Items */}
        <div className="space-y-1.5 text-xs sm:text-sm text-black">
          {order.items.map((item) => {
            const itemRate = item.price;
            const itemAmount = item.price * item.quantity;
            return (
              <div key={item.id} className="grid grid-cols-12 items-baseline py-0.5">
                <span className="col-span-6 font-medium text-slate-900 pr-1 truncate" title={item.name}>
                  {item.name}
                </span>
                <span className="col-span-2 text-center font-medium font-mono">
                  {item.quantity}
                </span>
                <span className="col-span-2 text-right font-medium font-mono">
                  ₹{itemRate.toFixed(2)}
                </span>
                <span className="col-span-2 text-right font-medium font-mono">
                  ₹{itemAmount.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Divider Above Total */}
        <div className="border-t-[1.5px] border-black mt-3 pt-2" />

        {/* TOTAL Row - Exact match, No extra costs like GST */}
        <div className="flex justify-between items-baseline font-black text-sm sm:text-base text-black tracking-wide pb-2">
          <span className="uppercase">TOTAL</span>
          <span className="font-mono text-base sm:text-lg">₹{bill.total.toFixed(2)}</span>
        </div>

        {/* Divider Below Total */}
        <div className="border-b-[1.5px] border-black" />

        {/* No GST note - transparent for customer & accounts */}
        <div className="mt-2 text-[10px] text-center text-slate-500 italic print:hidden">
          * Net restaurant bill — No additional GST or service charge applied.
        </div>
      </div>

      {/* Customer & Delivery Context Box (Separated cleanly below the Food Bill slip) */}
      {showCustomerDetails && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 print:border-t print:border-slate-300 print:mt-4 print:p-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
            <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
              Order &amp; Delivery Details
            </span>
            <span className={`inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded-md ${
              order.orderType === 'Home Delivery' 
                ? 'bg-amber-100 text-amber-900' 
                : 'bg-slate-200 text-slate-800'
            }`}>
              {order.orderType === 'Home Delivery' ? <Bike className="w-3 h-3 text-amoga-orangeDark" /> : <ShoppingBag className="w-3 h-3" />}
              <span>{order.orderType || 'Takeaway Pickup'}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Customer</span>
              <span className="font-bold text-slate-900">{order.customerName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Mobile Phone</span>
              <a href={`tel:+91${order.mobile}`} className="font-mono font-bold text-amoga-burgundy hover:underline">
                +91 {order.mobile}
              </a>
            </div>
          </div>

          {order.orderType === 'Home Delivery' && order.deliveryAddress && (
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Delivery Address</span>
              <p className="text-slate-800 font-medium leading-relaxed">{order.deliveryAddress}</p>
            </div>
          )}

          {order.googleMapsLocationUrl && (
            <div className="pt-1">
              <a
                href={order.googleMapsLocationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Open Customer Live GPS Location (Google Maps)</span>
              </a>
            </div>
          )}

          <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
            <span className="text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Time Slot:</span>
            </span>
            <span className="font-bold text-slate-800">{order.pickupTime}</span>
          </div>

          {order.specialInstructions && (
            <div className="pt-1 text-[11px] text-slate-600 bg-amber-50/60 p-2 rounded-lg border border-amber-200/60">
              <span className="font-bold text-amber-900">Kitchen Instructions: </span>
              <span>{order.specialInstructions}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

