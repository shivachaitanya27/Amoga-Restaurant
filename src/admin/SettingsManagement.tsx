import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { RestaurantSettings } from '../types';
import { getAdminCredentials, setAdminCredentials } from '../firebase/auth';
import { 
  Save, 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Globe,
  KeyRound,
  Eye,
  EyeOff,
  ExternalLink,
  Lock,
  UserCheck
} from 'lucide-react';

export const SettingsManagement: React.FC = () => {
  const { settings, updateSettingsState } = useRestaurant();
  const [form, setForm] = useState<RestaurantSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Admin Credentials State
  const initialCreds = getAdminCredentials();
  const [adminEmail, setAdminEmail] = useState(initialCreds.email);
  const [adminPass, setAdminPass] = useState(initialCreds.password);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingCreds, setIsEditingCreds] = useState(false);
  const [credSuccessMsg, setCredSuccessMsg] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPass.trim()) {
      alert("Email and password cannot be empty.");
      return;
    }
    setAdminCredentials(adminEmail.trim(), adminPass.trim());
    setIsEditingCreds(false);
    setCredSuccessMsg(true);
    setTimeout(() => setCredSuccessMsg(false), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(false);

    try {
      await updateSettingsState(form);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Error saving settings to Firestore.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
          Restaurant Settings &amp; Contact Details
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Updating phone or WhatsApp numbers automatically updates all "Call Now" and WhatsApp ordering buttons across the entire website.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-medium border border-emerald-200 flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Settings successfully updated in Cloud Firestore and synced across the website!</span>
        </div>
      )}

      {/* ADMIN CREDENTIALS & SECURITY CARD */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-700">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amoga-orange/20 border border-amoga-orange/40 text-amoga-orange flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  Admin Login Credentials &amp; Security
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Check or update the administrator login email &amp; password used to access this admin panel.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://console.firebase.google.com/project/amoga-fd9e5/authentication/users"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600 transition-colors"
              title="Open Firebase Console Authentication"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amoga-orange" />
              <span>Firebase Auth Console</span>
            </a>

            {!isEditingCreds ? (
              <button
                type="button"
                onClick={() => setIsEditingCreds(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amoga-orange hover:bg-amoga-orangeDark text-white text-xs font-bold transition-all shadow-sm"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Edit Credentials</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const c = getAdminCredentials();
                  setAdminEmail(c.email);
                  setAdminPass(c.password);
                  setIsEditingCreds(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold"
              >
                <span>Cancel</span>
              </button>
            )}
          </div>
        </div>

        {credSuccessMsg && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Admin login credentials updated successfully! Use these new details on your next login.</span>
          </div>
        )}

        {!isEditingCreds ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Admin Login Email
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-white mt-0.5 block select-all">
                  {adminEmail}
                </span>
              </div>
              <UserCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Admin Login Password
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-amber-300 mt-0.5 block select-all">
                  {showPassword ? adminPass : '••••••••••••'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveCredentials} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  New Admin Email *
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@amoga.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-600 text-white focus:ring-2 focus:ring-amoga-orange outline-none text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  New Admin Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-800 border border-slate-600 text-white focus:ring-2 focus:ring-amoga-orange outline-none text-xs sm:text-sm font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  const c = getAdminCredentials();
                  setAdminEmail(c.email);
                  setAdminPass(c.password);
                  setIsEditingCreds(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amoga-orange hover:bg-amoga-orangeDark text-white text-xs font-bold transition-all shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save New Credentials</span>
              </button>
            </div>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>
            Connected Firebase Project: <strong className="text-slate-200 font-mono">amoga-fd9e5</strong>
          </span>
          <span>
            Default master credentials: <code className="text-amber-300 font-mono">admin@amoga.in</code> / <code className="text-amber-300 font-mono">amoga2026</code>
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6 text-xs sm:text-sm">
        {/* Contact Numbers */}
        <div>
          <h3 className="font-serif text-base font-bold text-amoga-burgundy mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-amoga-orangeDark" />
            <span>Contact &amp; WhatsApp Numbers</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Phone (Call Now Buttons) *
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amoga-burgundy outline-none text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                WhatsApp Number (Ordering &amp; Alerts) *
              </label>
              <input
                type="tel"
                required
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amoga-burgundy outline-none text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-serif text-base font-bold text-amoga-burgundy mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amoga-orangeDark" />
            <span>Operating Timings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Opening Time *
              </label>
              <input
                type="text"
                required
                value={form.openingTime}
                onChange={(e) => setForm({ ...form, openingTime: e.target.value })}
                placeholder="11:00 AM"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amoga-burgundy outline-none text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Closing Time *
              </label>
              <input
                type="text"
                required
                value={form.closingTime}
                onChange={(e) => setForm({ ...form, closingTime: e.target.value })}
                placeholder="12:00 AM"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amoga-burgundy outline-none text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Address and Google Maps */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-serif text-base font-bold text-amoga-burgundy mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amoga-orangeDark" />
            <span>Location &amp; Maps Link</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Physical Address *
              </label>
              <textarea
                rows={2}
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amoga-burgundy outline-none text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Google Maps Link (Get Directions button) *
              </label>
              <input
                type="url"
                required
                value={form.googleMapsUrl}
                onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amoga-burgundy outline-none text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Today's Special Dish */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-serif text-base font-bold text-amoga-burgundy mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amoga-orangeDark" />
            <span>Today's Special Dish (Homepage &amp; Offers Banner)</span>
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Special Dish Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.todaysSpecial?.title || ''}
                  onChange={(e) => setForm({
                    ...form,
                    todaysSpecial: { ...form.todaysSpecial, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amoga-burgundy outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Today's Price in INR (₹) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={form.todaysSpecial?.price || 699}
                  onChange={(e) => setForm({
                    ...form,
                    todaysSpecial: { ...form.todaysSpecial, price: Number(e.target.value) }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amoga-burgundy outline-none text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Special Dish Description
              </label>
              <textarea
                rows={2}
                value={form.todaysSpecial?.description || ''}
                onChange={(e) => setForm({
                  ...form,
                  todaysSpecial: { ...form.todaysSpecial, description: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amoga-burgundy outline-none text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Restaurant Description */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            About / Description Summary *
          </label>
          <textarea
            rows={3}
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amoga-burgundy outline-none text-xs sm:text-sm"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-amoga-gold" />
            <span>{isSaving ? 'Saving to Firestore...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

