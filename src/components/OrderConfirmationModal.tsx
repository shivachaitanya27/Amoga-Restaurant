import React, { useRef } from 'react';
import { Order } from '../types';
import { useRestaurant } from '../context/RestaurantContext';
import { generateWhatsAppBillText } from '../utils/billFormatter';
import { FoodBillReceipt } from './FoodBillReceipt';
import { 
  CheckCircle2, 
  MessageCircle, 
  Printer, 
  X
} from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  const { settings, getWhatsAppUrl } = useRestaurant();
  const printRef = useRef<HTMLDivElement>(null);

  if (!order) return null;

  const whatsappBillText = generateWhatsAppBillText(order, settings.restaurantName);
  const whatsappUrl = getWhatsAppUrl(whatsappBillText);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#160D10] text-amoga-charcoal dark:text-[#F8ECE8] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative border border-amoga-creamDark dark:border-white/10 max-h-[94vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-500 dark:text-white transition-colors print:hidden"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header Strip */}
        <div className="flex items-center gap-3 pb-3 mb-3 border-b border-slate-100 dark:border-white/10 print:hidden">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amoga-orangeDark uppercase tracking-widest block">
              Order Confirmed &amp; Bill Generated
            </span>
            <h3 className="font-serif text-lg font-bold text-amoga-burgundy dark:text-amoga-goldPale leading-tight">
              Order #{order.id}
            </h3>
          </div>
        </div>

        {/* PIXEL-PERFECT FOOD BILL RECEIPT */}
        <div ref={printRef}>
          <FoodBillReceipt
            order={order}
            restaurantName={settings.restaurantName || "RESTAURANT"}
            showCustomerDetails={true}
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 space-y-2.5 print:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Open WhatsApp with Food Bill</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-bold transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Bill</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-3 rounded-xl bg-amoga-cream dark:bg-white/10 hover:bg-amoga-creamDark dark:hover:bg-white/20 text-amoga-burgundy dark:text-amoga-goldPale text-xs font-bold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
