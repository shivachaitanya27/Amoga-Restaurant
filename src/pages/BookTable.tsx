import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { createBooking } from '../firebase/firestore';
import { Booking, BookingMode } from '../types';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookTable: React.FC = () => {
  const { settings, getWhatsAppUrl, getCallUrl } = useRestaurant();

  const todayStr = new Date().toISOString().slice(0, 10);
  const [mode, setMode] = useState<BookingMode>('Dine-in');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('7:30 PM');
  const [guests, setGuests] = useState('3 to 4 guests');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setIsSubmitting(true);
    try {
      const newBooking = await createBooking({
        customerName: name.trim(),
        mobile: cleanMobile,
        date,
        time,
        guests,
        mode,
        specialRequests: specialRequests.trim()
      });

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      setSubmittedBooking(newBooking);
    } catch (err) {
      console.error("Booking submission error:", err);
      setError('Failed to submit booking. Please call or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppBookingText = () => {
    if (!submittedBooking) return '';
    return `*TABLE RESERVATION REQUEST - AMOGA FAMILY RESTAURANT*
━━━━━━━━━━━━━━━━━━
*Booking ID:* ${submittedBooking.id}
*Customer Name:* ${submittedBooking.customerName}
*Phone:* +91 ${submittedBooking.mobile}
*Service:* ${submittedBooking.mode}
*Date:* ${submittedBooking.date}
*Time:* ${submittedBooking.time}
*Guests:* ${submittedBooking.guests}
${submittedBooking.specialRequests ? `*Special Request:* ${submittedBooking.specialRequests}` : ''}
━━━━━━━━━━━━━━━━━━
Please confirm availability for our table reservation!`;
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-amoga-cream dark:bg-[#120B0D] text-amoga-charcoal dark:text-[#F8ECE8] min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amoga-orange/10 dark:bg-amoga-orange/20 text-amoga-orangeDark dark:text-amoga-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Family Table Reservation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
            Reserve Your Table
          </h1>
          <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] mt-2">
            Enjoy slow-cooked Hyderabadi dum biryani in a comfortable, family-friendly ambience in Khammam.
          </p>
        </div>

        {submittedBooking ? (
          <div className="bg-white dark:bg-[#1A1114] rounded-3xl p-6 sm:p-10 shadow-amoga-lg border border-amoga-creamDark dark:border-white/10 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block mb-1">
              Reservation Submitted
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amoga-burgundy dark:text-amoga-goldPale mb-2">
              Booking #{submittedBooking.id}
            </h2>
            <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] max-w-md mx-auto mb-6">
              Thank you, <strong>{submittedBooking.customerName}</strong>! Your table request has been received. Our team will verify seating and confirm promptly.
            </p>

            <div className="bg-amoga-cream/60 dark:bg-white/5 rounded-2xl p-5 border border-amoga-creamDark dark:border-white/10 max-w-md mx-auto text-left text-xs sm:text-sm space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-amoga-charcoalLight dark:text-white/60">Service:</span>
                <span className="font-bold text-amoga-charcoal dark:text-white">{submittedBooking.mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amoga-charcoalLight dark:text-white/60">Date &amp; Time:</span>
                <span className="font-bold text-amoga-charcoal dark:text-white">{submittedBooking.date} at {submittedBooking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amoga-charcoalLight dark:text-white/60">Party Size:</span>
                <span className="font-bold text-amoga-charcoal dark:text-white">{submittedBooking.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amoga-charcoalLight dark:text-white/60">Phone:</span>
                <span className="font-bold text-amoga-charcoal dark:text-white">+91 {submittedBooking.mobile}</span>
              </div>
              {submittedBooking.specialRequests && (
                <div className="flex justify-between pt-1 border-t border-amoga-creamDark dark:border-white/10">
                  <span className="text-amoga-charcoalLight dark:text-white/60">Note:</span>
                  <span className="font-medium text-amoga-charcoal dark:text-white">{submittedBooking.specialRequests}</span>
                </div>
              )}
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              <a
                href={getWhatsAppUrl(getWhatsAppBookingText())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Confirm on WhatsApp for Fastest Guarantee</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmittedBooking(null)}
                className="w-full py-2.5 text-xs text-amoga-charcoalLight dark:text-white/60 hover:text-amoga-burgundy dark:hover:text-amoga-gold font-semibold"
              >
                Submit another reservation
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1A1114] rounded-3xl p-6 sm:p-10 shadow-amoga border border-amoga-creamDark dark:border-white/10">
            {error && (
              <div className="p-3 mb-6 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-900/60">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dining Mode Toggle */}
              <div>
                <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-2">
                  Select Dining Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                      mode === 'Dine-in'
                        ? 'border-amoga-burgundy dark:border-amoga-gold bg-amoga-burgundy/5 dark:bg-amoga-gold/10 text-amoga-burgundy dark:text-amoga-goldPale'
                        : 'border-amoga-creamDark dark:border-white/10 bg-amoga-cream/20 dark:bg-white/5 text-amoga-charcoal dark:text-white/80 hover:bg-amoga-cream/40 dark:hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="diningMode"
                      value="Dine-in"
                      checked={mode === 'Dine-in'}
                      onChange={() => setMode('Dine-in')}
                      className="sr-only"
                    />
                    <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                      {mode === 'Dine-in' && <div className="w-2 h-2 rounded-full bg-current" />}
                    </div>
                    <div>
                      <strong className="block text-xs sm:text-sm font-bold">Dine-in Experience</strong>
                      <span className="text-[11px] text-amoga-charcoalLight dark:text-white/60 block">AC table for family &amp; friends</span>
                    </div>
                  </label>

                  <label
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                      mode === 'Takeaway pickup'
                        ? 'border-amoga-burgundy dark:border-amoga-gold bg-amoga-burgundy/5 dark:bg-amoga-gold/10 text-amoga-burgundy dark:text-amoga-goldPale'
                        : 'border-amoga-creamDark dark:border-white/10 bg-amoga-cream/20 dark:bg-white/5 text-amoga-charcoal dark:text-white/80 hover:bg-amoga-cream/40 dark:hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="diningMode"
                      value="Takeaway pickup"
                      checked={mode === 'Takeaway pickup'}
                      onChange={() => setMode('Takeaway pickup')}
                      className="sr-only"
                    />
                    <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                      {mode === 'Takeaway pickup' && <div className="w-2 h-2 rounded-full bg-current" />}
                    </div>
                    <div>
                      <strong className="block text-xs sm:text-sm font-bold">Takeaway Pickup</strong>
                      <span className="text-[11px] text-amoga-charcoalLight dark:text-white/60 block">Hot packaging ready on arrival</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Date, Time, Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amoga-orangeDark" />
                    <span>Reservation Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-xs sm:text-sm text-amoga-charcoal dark:text-white focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amoga-orangeDark" />
                    <span>Seating Time *</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-[#1E1216] text-xs sm:text-sm text-amoga-charcoal dark:text-white focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                  >
                    <option className="dark:bg-[#1E1216]">12:00 PM (Lunch)</option>
                    <option className="dark:bg-[#1E1216]">1:30 PM (Lunch)</option>
                    <option className="dark:bg-[#1E1216]">3:00 PM (Afternoon)</option>
                    <option className="dark:bg-[#1E1216]">6:00 PM (Early Dinner)</option>
                    <option className="dark:bg-[#1E1216]">7:30 PM (Prime Dinner)</option>
                    <option className="dark:bg-[#1E1216]">9:00 PM (Dinner)</option>
                    <option className="dark:bg-[#1E1216]">10:30 PM (Late Dinner)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amoga-orangeDark" />
                    <span>Guests *</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-[#1E1216] text-xs sm:text-sm text-amoga-charcoal dark:text-white focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                  >
                    <option className="dark:bg-[#1E1216]">1 to 2 guests</option>
                    <option className="dark:bg-[#1E1216]">3 to 4 guests</option>
                    <option className="dark:bg-[#1E1216]">5 to 6 guests</option>
                    <option className="dark:bg-[#1E1216]">7 to 8 guests</option>
                    <option className="dark:bg-[#1E1216]">9 or more (Family gathering)</option>
                  </select>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Shiva Prasad"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-xs sm:text-sm text-amoga-charcoal dark:text-white focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1.5">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2.5 rounded-l-xl border border-r-0 border-amoga-creamDark dark:border-white/15 bg-amoga-creamDark/60 dark:bg-white/10 text-xs font-bold text-amoga-charcoal dark:text-white">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                      placeholder="9550382281"
                      className="w-full px-3.5 py-2.5 rounded-r-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-xs sm:text-sm text-amoga-charcoal dark:text-white focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1.5">
                  Special Requests / Occasion (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Birthday celebration, high chair needed, anniversary dinner..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-xs sm:text-sm text-amoga-charcoal dark:text-white focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                />
              </div>

              {/* Info notice */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs">
                <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Please note:</strong> Table bookings remain pending until restaurant staff confirmation. We will reach out on WhatsApp or phone call.
                </span>
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-amoga-charcoalLight dark:text-white/60">
                  For immediate walk-in assistance, call{' '}
                  <a href={getCallUrl()} className="font-bold text-amoga-burgundy dark:text-amoga-gold underline">
                    {settings.phone}
                  </a>
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amoga-burgundy via-amoga-burgundyLight to-amoga-orange text-white font-bold text-sm shadow-amoga hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Reservation...' : 'Confirm Table Request'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

