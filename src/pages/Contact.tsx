import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Navigation, 
  Send, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { settings, getWhatsAppUrl, getCallUrl } = useRestaurant();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*NEW WEBSITE ENQUIRY - AMOGA RESTAURANT*
Name: ${name}
Phone: ${phone}
Message: ${message}`;
    window.open(getWhatsAppUrl(text), '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-amoga-cream dark:bg-[#120B0D] text-amoga-charcoal dark:text-[#F8ECE8] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block mb-1">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
            Visit &amp; Contact Amoga
          </h1>
          <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] mt-2">
            We are centrally located at Mayuri Center, Balaji Nagar, Khammam. We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white dark:bg-[#1A1114] rounded-3xl p-6 sm:p-8 shadow-amoga border border-amoga-creamDark dark:border-white/10 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
              Restaurant Details
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-amoga-cream/50 dark:bg-white/5 border border-amoga-creamDark dark:border-white/10">
                <MapPin className="w-5 h-5 text-amoga-orangeDark shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-amoga-charcoal dark:text-white">Address</strong>
                  <span className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed">
                    {settings.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-amoga-cream/50 dark:bg-white/5 border border-amoga-creamDark dark:border-white/10">
                <Clock className="w-5 h-5 text-amoga-orangeDark shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-amoga-charcoal dark:text-white">Opening Hours</strong>
                  <span className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1]">
                    Every Day: {settings.openingTime} – {settings.closingTime} (Midnight)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-amoga-cream/50 dark:bg-white/5 border border-amoga-creamDark dark:border-white/10">
                <Phone className="w-5 h-5 text-amoga-orangeDark shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-amoga-charcoal dark:text-white">Phone &amp; WhatsApp</strong>
                  <span className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1]">
                    +91 {settings.phone} / +91 {settings.whatsapp}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <a
                href={getCallUrl()}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-amoga-gold" />
                <span>Call {settings.phone}</span>
              </a>

              <a
                href={getWhatsAppUrl("Hello Amoga, I have an enquiry about your restaurant.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white dark:bg-white/10 hover:bg-amoga-creamDark dark:hover:bg-white/20 text-amoga-charcoal dark:text-white text-xs sm:text-sm font-bold border border-amoga-creamDark dark:border-white/15 transition-all"
              >
                <Navigation className="w-4 h-4 text-amoga-orangeDark" />
                <span>Get Directions in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Quick Enquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1A1114] rounded-3xl p-6 sm:p-8 shadow-amoga border border-amoga-creamDark dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amoga-orange/10 dark:bg-amoga-orange/20 text-amoga-orangeDark dark:text-amoga-gold text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Enquiry</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-amoga-burgundy dark:text-amoga-goldPale mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] mb-6">
                Have questions regarding party orders, catering, bulk biryani packs, or table availability? Send us a quick note.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 animate-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200 mb-1">
                    Enquiry Forwarded to WhatsApp!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    We have opened WhatsApp so you can send your note directly to our team.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-bold text-emerald-800 dark:text-emerald-400 underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-xs sm:text-sm text-amoga-charcoal dark:text-white focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit number"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-xs sm:text-sm text-amoga-charcoal dark:text-white focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1">
                      Message / Enquiry *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your questions about biryani catering, family pack pre-orders, or dining..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-xs sm:text-sm text-amoga-charcoal dark:text-white focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amoga-burgundy to-amoga-orange text-white font-bold text-xs sm:text-sm shadow-amoga hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="bg-white dark:bg-[#1A1114] rounded-3xl p-4 sm:p-6 shadow-amoga border border-amoga-creamDark dark:border-white/10">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amoga-orangeDark" />
              <h3 className="font-serif text-xl font-bold text-amoga-burgundy">
                Find Us on Map
              </h3>
            </div>
            <a
              href={settings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amoga-orangeDark hover:underline flex items-center gap-1"
            >
              <span>View Fullscreen</span>
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] border border-amoga-creamDark bg-amoga-cream">
            <iframe
              title="Amoga Restaurant Google Map"
              src="https://maps.google.com/maps?q=Mayuri%20Center%2C%20Balaji%20Nagar%2C%20Khammam%2C%20Telangana%20507001&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

