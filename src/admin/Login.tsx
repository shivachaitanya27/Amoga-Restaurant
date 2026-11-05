import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../firebase/config';
import { Lock, Mail, ShieldAlert, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { adminUser, loading, login } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect straight to /admin
  if (!loading && adminUser) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = async () => {
    setEmail('admin@amoga.in');
    setPassword('amoga2026');
    setError('');
    setIsLoading(true);
    try {
      await login('admin@amoga.in', 'amoga2026');
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amoga-cream flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-amoga-lg border border-amoga-creamDark relative">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amoga-charcoalLight hover:text-amoga-burgundy mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Restaurant Website</span>
        </Link>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amoga-burgundy to-amoga-orange text-white flex items-center justify-center mx-auto mb-3 shadow-md font-serif text-2xl font-bold">
            A
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amoga-burgundy">
            Admin Management Portal
          </h1>
          <p className="text-xs text-amoga-charcoalLight mt-1">
            Amoga Family Restaurant • Khammam
          </p>
        </div>

        {error && (
          <div className="p-3 mb-5 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-amoga-charcoal uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-amoga-charcoalLight absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@amoga.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amoga-creamDark bg-amoga-cream/30 text-xs sm:text-sm text-amoga-charcoal focus:ring-2 focus:ring-amoga-burgundy outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-amoga-charcoal uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-amoga-charcoalLight absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amoga-creamDark bg-amoga-cream/30 text-xs sm:text-sm text-amoga-charcoal focus:ring-2 focus:ring-amoga-burgundy outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amoga-burgundy to-amoga-orange text-white font-bold text-sm shadow-amoga hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="mt-8 pt-6 border-t border-amoga-creamDark text-center">
          <p className="text-xs text-amoga-charcoalLight mb-2">
            {!isFirebaseConfigured
              ? "Running in evaluation mode. Click below to load demo admin credentials:"
              : "Owner / Admin access:"}
          </p>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="text-xs font-bold text-amoga-orangeDark hover:underline bg-amoga-cream px-3 py-1.5 rounded-lg border border-amoga-creamDark"
          >
            Fill Demo Credentials (admin@amoga.in / amoga2026)
          </button>
        </div>
      </div>
    </div>
  );
};

