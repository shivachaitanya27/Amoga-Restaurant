import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { submitCustomerReview } from '../firebase/firestore';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink, 
  Heart,
  Send
} from 'lucide-react';

export const Reviews: React.FC = () => {
  const { reviews, settings } = useRestaurant();

  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const approvedReviews = reviews.filter((r) => r.isApproved);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !comment.trim()) {
      setError('Please fill in your name and feedback');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitCustomerReview({
        customerName: name.trim(),
        rating,
        comment: comment.trim()
      });
      setSubmitted(true);
      setName('');
      setComment('');
    } catch (err) {
      console.warn("Failed to submit review:", err);
      setError('Could not submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-amoga-cream dark:bg-[#120B0D] text-amoga-charcoal dark:text-[#F8ECE8] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating Hero Header */}
        <div className="bg-white dark:bg-[#1A1114] rounded-3xl p-8 sm:p-12 shadow-amoga border border-amoga-creamDark dark:border-white/10 mb-12 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-widest block mb-2">
            Verified Customer Love
          </span>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-serif text-5xl sm:text-6xl font-bold text-amoga-burgundy dark:text-amoga-goldPale">
              {settings.googleRating}
            </span>
            <div className="text-left">
              <div className="flex text-amoga-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-amoga-charcoal dark:text-white block mt-0.5">
                out of 5.0 Rating
              </span>
            </div>
          </div>

          <p className="text-sm font-semibold text-amoga-orangeDark mb-4">
            Based on {settings.reviewCount} Verified Google Reviews
          </p>

          <p className="text-xs sm:text-sm text-amoga-charcoalLight dark:text-[#CBB5B1] leading-relaxed max-w-xl mx-auto italic mb-6">
            "Diners appreciate the delicious and fresh food, especially the biryani and various combos. Customers also highlight the pleasant ambience, attentive service, reasonable prices and generous portion sizes."
          </p>

          <a
            href={settings.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <span>Read All Google Reviews</span>
            <ExternalLink className="w-4 h-4 text-amoga-gold" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Approved Reviews Grid */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-amoga-burgundy dark:text-amoga-goldPale mb-4">
              What Our Diners Say
            </h2>

            <div className="space-y-4">
              {approvedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white dark:bg-[#1A1114] rounded-2xl p-6 border border-amoga-creamDark dark:border-white/10 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amoga-cream dark:bg-white/10 text-amoga-burgundy dark:text-amoga-goldPale font-serif font-bold text-base flex items-center justify-center">
                        {rev.customerName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-amoga-charcoal dark:text-white">{rev.customerName}</h4>
                        <span className="text-[10px] text-amoga-charcoalLight dark:text-white/60 uppercase tracking-wider">
                          {rev.source === 'google' ? 'Google Diner' : 'Website Feedback'}
                        </span>
                      </div>
                    </div>

                    <div className="flex text-amoga-orange">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-amoga-charcoal dark:text-[#F8ECE8] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Feedback Form */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#1A1114] rounded-3xl p-6 sm:p-8 shadow-amoga border border-amoga-creamDark dark:border-white/10 sticky top-28">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-amoga-orangeDark" />
                <span className="text-xs font-bold text-amoga-orangeDark uppercase tracking-wider">
                  Diner Feedback
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-amoga-burgundy dark:text-amoga-goldPale mb-2">
                Share Your Experience
              </h3>
              <p className="text-xs text-amoga-charcoalLight dark:text-[#CBB5B1] mb-5">
                Did you enjoy our biryani or service? We value every guest's genuine thoughts.
              </p>

              {submitted ? (
                <div className="p-6 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 animate-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200 mb-1">Thank You!</h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Your feedback has been submitted to management for moderation and review.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-bold text-emerald-800 dark:text-emerald-400 underline"
                  >
                    Submit another review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs border border-red-200 dark:border-red-900">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anitha Rao"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-xs text-amoga-charcoal dark:text-white focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1">
                      Rating *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                          aria-label={`${star} Stars`}
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating
                                ? 'text-amoga-orange fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-amoga-charcoal dark:text-white ml-2">
                        {rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amoga-charcoal dark:text-amoga-goldPale uppercase tracking-wider mb-1">
                      Your Comments &amp; Favorite Dishes *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us what you liked (biryani, starters, ambience, service)..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amoga-creamDark dark:border-white/15 bg-amoga-cream/30 dark:bg-black/30 text-xs text-amoga-charcoal dark:text-white focus:ring-2 focus:ring-amoga-burgundy dark:focus:ring-amoga-gold outline-none"
                    />
                  </div>

                  <p className="text-[11px] text-amoga-charcoalLight dark:text-white/60">
                    Note: Website feedback is reviewed by restaurant moderators before appearing publicly.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amoga-burgundy to-amoga-orange text-white font-bold text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Send Feedback'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

