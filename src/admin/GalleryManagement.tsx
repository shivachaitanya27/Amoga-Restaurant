import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { addGalleryItem, deleteGalleryItem } from '../firebase/firestore';
import { uploadImageFile } from '../firebase/storage';
import { GalleryCategory, GalleryItem } from '../types';
import { Plus, Trash2, Upload, Image as ImageIcon, X } from 'lucide-react';

export const GalleryManagement: React.FC = () => {
  const { gallery } = useRestaurant();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('biryani');
  const [imageUrl, setImageUrl] = useState('/images/hero-biryani.jpg');
  const [caption, setCaption] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const categoryNames: Record<GalleryCategory, string> = {
    'biryani': 'Biryani',
    'non-veg-starters': 'Non-Veg Starters',
    'veg-starters': 'Veg Starters',
    'restaurant-interior': 'Restaurant Interior',
    'restaurant-exterior': 'Restaurant Exterior'
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageFile(file, 'gallery');
      setImageUrl(url);
    } catch (e) {
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    setIsSaving(true);
    try {
      await addGalleryItem({
        title,
        category,
        categoryName: categoryNames[category],
        imageUrl,
        caption
      });
      setIsModalOpen(false);
      setTitle('');
      setCaption('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (window.confirm(`Delete "${itemTitle}" from gallery?`)) {
      try {
        await deleteGalleryItem(id);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
            Photo Gallery Management ({gallery.length} Photos)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add high-resolution dishes and restaurant interior photographs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo to Gallery</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group"
          >
            <div className="relative aspect-[4/3] bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                {item.categoryName}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                    {item.caption}
                  </p>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.title)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 text-xs flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
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
              Add Photograph to Gallery
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Traditional Dum Handi"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amoga-burgundy"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amoga-burgundy"
                >
                  <option value="biryani">Biryani</option>
                  <option value="non-veg-starters">Non-Veg Starters</option>
                  <option value="veg-starters">Veg Starters</option>
                  <option value="restaurant-interior">Restaurant Interior</option>
                  <option value="restaurant-exterior">Restaurant Exterior</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Image URL or Upload *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/images/... or https://..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amoga-burgundy"
                  />
                  <label className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer flex items-center gap-1 font-bold">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? '...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Caption / Description (Optional)
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Short note about the dish or dining space"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amoga-burgundy"
                />
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
                  {isSaving ? 'Saving...' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

