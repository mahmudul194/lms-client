"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, FolderTree, Loader2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { CategoryItem, CreateCategoryPayload } from "@/services/api/categoryApi";

interface AdminEditCategoryModalProps {
  isOpen: boolean;
  category: CategoryItem | null;
  onClose: () => void;
  onUpdate: (id: string, payload: Partial<CreateCategoryPayload>) => Promise<void>;
}

export default function AdminEditCategoryModal({
  isOpen,
  category,
  onClose,
  onUpdate,
}: AdminEditCategoryModalProps) {
  const mounted = useIsMounted();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [status, setStatus] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setSlug(category.slug || "");
      setDescription(category.description || "");
      setThumbnail(category.thumbnail || "");
      setSortOrder(category.sort_order ?? 0);
      setStatus(category.status ?? true);
      setError(null);
    }
  }, [category, isOpen]);

  if (!mounted || !isOpen || !category) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onUpdate(category.id, {
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: description.trim() || undefined,
        thumbnail: thumbnail.trim() || undefined,
        sort_order: Number(sortOrder) || 0,
        status,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update category.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-auto max-h-[90vh] overflow-y-auto text-xs sm:text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0">
              <FolderTree className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Edit Category</h3>
              <p className="text-xs text-slate-500 mt-0.5">Update category details and ranking</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Category Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }
                }}
                required
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-semibold text-xs sm:text-sm"
                placeholder="e.g. BIM & Revit"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Slug *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-mono text-xs sm:text-sm font-semibold"
                placeholder="bim-revit"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Thumbnail URL</label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm resize-none"
              placeholder="Brief description of this course category..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Display Sort Order</label>
              <input
                type="number"
                min="0"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              />
            </div>
            <div className="flex items-center gap-3 pt-5">
              <input
                type="checkbox"
                id="editCategoryStatus"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                className="w-5 h-5 rounded text-[#0077b6] focus:ring-[#0077b6] border-slate-300 cursor-pointer"
              />
              <label htmlFor="editCategoryStatus" className="font-bold text-slate-700 cursor-pointer text-xs sm:text-sm select-none">
                Active Category
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Category</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
