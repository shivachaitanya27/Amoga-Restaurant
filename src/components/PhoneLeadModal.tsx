import React, { useState, useEffect } from 'react';
import { X, Sparkles, Gift, CheckCircle, ShieldCheck } from 'lucide-react';
import { saveCustomerLead } from '../firebase/firestore';

export const PhoneLeadModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only show if not previously dismissed or submitted in this session
    const hasSeen = sessionStorage.getItem('amoga_lead_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('amoga_lead_seen', 'true');
      }, 7000); // 7 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('amoga_lead_seen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    if (!consent) {
      setError('Please provide consent to receive special offers & updates');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveCustomerLead(name.trim(), cleanPhone, consent);
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } catch (err) {
      console.warn("Error saving lead:", err);
      // Still show success to user
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-amoga-creamDark overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-amoga-cream hover:bg-amoga-creamDark text-amoga-charcoal transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-amoga-burgundy mb-2">
              Welcome to Amoga!
            </h3>
            <p className="text-sm text-amoga-charcoalLight">
              50 Welcome Loyalty Points added to your number. We look forward to serving you!
            </p>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amoga-orange/10 text-amoga-orangeDark text-xs font-bold uppercase tracking-wider mb-3">
              <Gift className="w-3.5 h-3.5" />
              <span>Special Offer &amp; Loyalty</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-amoga-burgundy mb-2">
              Get 50 Welcome Points
            </h3>
            <p className="text-xs sm:text-sm text-amoga-charcoalLight leading-relaxed mb-5">
              Enter your mobile number to unlock instant loyalty points and get exclusive weekend biryani offers directly on WhatsApp.
            </p>

            {error && (
              <div className="p-2.5 mb-4 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-amoga-charcoal mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amoga-creamDark bg-amoga-cream/40 text-amoga-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amoga-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amoga-charcoal mb-1">
                  Indian Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2.5 rounded-l-xl border border-r-0 border-amoga-creamDark bg-amoga-creamDark/60 text-xs font-bold text-amoga-charcoal">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2.5 rounded-r-xl border border-amoga-creamDark bg-amoga-cream/40 text-amoga-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amoga-burgundy"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-amoga-charcoalLight select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-amoga-creamDark text-amoga-burgundy focus:ring-amoga-burgundy"
                  />
                  <span>
                    I consent to receive order updates, table confirmations &amp; special offers from Amoga Family Restaurant on WhatsApp / SMS.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amoga-burgundy to-amoga-orange text-white font-bold text-sm shadow-amoga hover:brightness-110 active:scale-95 transition-all mt-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Registering...' : 'Claim Welcome Points'}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-amoga-charcoalLight/70 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero spam. We respect your privacy.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

