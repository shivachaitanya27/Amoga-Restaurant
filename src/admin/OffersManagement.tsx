import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { saveOffer, deleteOffer } from '../firebase/firestore';
import { Offer } from '../types';
import { Plus, Tag, Trash2, Edit, Sparkles, X, Check } from 'lucide-react';

export const OffersManagement: React.FC = () => {
  const { offers } = useRestaurant();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Partial<Offer> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenAdd = () => {
    setEditingOffer({
      title: '',
      description: '',
      code: '',
      discountPercent: 10,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (offer: Offer) => {
    setEditingOffer({ ...offer });
    setIsModalOpen(true);
  };

  const handleToggleActive = async (offer: Offer) => {
    try {
      await saveOffer({ id: offer.id, isActive: !offer.isActive });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this promotional offer?")) {
      try {
        await deleteOffer(id);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer?.title) return;

    setIsSaving(true);
    try {
      await saveOffer(editingOffer);
      setIsModalOpen(false);
      setEditingOffer(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
            Promotional Offers Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create discount deals, promo codes, and weekend specials displayed on the website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  offer.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {offer.isActive ? 'Active on Website' : 'Inactive'}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(offer)}
                    className="p-1.5 text-slate-400 hover:text-amoga-burgundy rounded-lg hover:bg-slate-100"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(offer.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-serif text-lg font-bold text-slate-800 mb-1.5">
                {offer.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {offer.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {offer.code ? (
                <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-mono font-bold text-xs text-amoga-burgundy">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{offer.code}</span>
                </div>
              ) : <div />}

              <button
                type="button"
                onClick={() => handleToggleActive(offer)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  offer.isActive ? 'text-red-700 bg-red-50' : 'text-emerald-700 bg-emerald-50'
                }`}
              >
                {offer.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && editingOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">
              {editingOffer.id ? 'Edit Offer' : 'Create Promotional Offer'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Offer Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingOffer.title || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                  placeholder="e.g. Weekend Family Combo"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amoga-burgundy"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingOffer.description || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, description: e.target.value })}
                  placeholder="Details of the deal..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amoga-burgundy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Promo Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingOffer.code || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, code: e.target.value.toUpperCase() })}
                    placeholder="AMOGA10"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amoga-burgundy font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Discount % (Optional)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={editingOffer.discountPercent || 0}
                    onChange={(e) => setEditingOffer({ ...editingOffer, discountPercent: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amoga-burgundy"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white font-bold disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

