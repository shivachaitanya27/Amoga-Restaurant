import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { updateReviewApproval, deleteReview } from '../firebase/firestore';
import { Star, CheckCircle2, XCircle, Trash2, ShieldCheck } from 'lucide-react';

export const ReviewManagement: React.FC = () => {
  const { reviews } = useRestaurant();

  const handleToggleApproval = async (id: string, current: boolean) => {
    try {
      await updateReviewApproval(id, !current);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this review?")) {
      try {
        await deleteReview(id);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
          Customer Review Moderation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review customer feedback submitted through the website before publishing to the public reviews section.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Review Content</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <strong className="text-slate-800 block text-xs font-bold">
                      {r.customerName}
                    </strong>
                    <span className="text-[10px] text-slate-400">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex text-amber-500">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700 max-w-md">
                    <p className="line-clamp-2 italic">"{r.comment}"</p>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      r.source === 'google' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {r.source === 'google' ? 'Google' : 'Website'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      r.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.isApproved ? 'Published' : 'Pending Review'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleApproval(r.id, r.isApproved)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                          r.isApproved
                            ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {r.isApproved ? 'Unpublish' : 'Approve & Publish'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(r.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

