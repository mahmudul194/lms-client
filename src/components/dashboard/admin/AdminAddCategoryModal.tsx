"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { FolderTree, X } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { CreateCategoryPayload } from "@/services/api/categoryApi";
import { uploadApi } from "@/services/api/uploadApi";

interface AdminAddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (category: CreateCategoryPayload) => void;
  isLoading?: boolean;
}

export default function AdminAddCategoryModal({
  isOpen,
  onClose,
  onCreate,
  isLoading = false,
}: AdminAddCategoryModalProps) {
  const mounted = useIsMounted();
  const [form, setForm] = useState<CreateCategoryPayload>({
    name: "",
    slug: "",
    description: "",
    thumbnail: "",
    sort_order: 1,
    status: true,
  });

  const [isUploading, setIsUploading] = useState(false);

  if (!mounted || !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(form);
  };

  const update = (k: keyof CreateCategoryPayload, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setForm(p => ({ ...p, name, slug }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadApi.uploadFile(file);
      if (res.statusCode === 200 || res.statusCode === 201) {
        update("thumbnail", res.data?.url || "");
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-7 sm:p-9 space-y-6 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-8 text-xs sm:text-sm">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0">
              <FolderTree className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Add Course Category</h3>
              <p className="text-xs text-slate-500 mt-0.5">Create a new category to organize courses.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Category Name *</label>
              <input type="text" required placeholder="e.g. Web Development" value={form.name} onChange={handleNameChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Slug *</label>
              <input type="text" required placeholder="e.g. web-development" value={form.slug} onChange={(e) => update("slug", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Description</label>
            <textarea placeholder="Category description..." value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none min-h-[100px]" />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Thumbnail Upload</label>
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*" onChange={handleFileUpload} disabled={isUploading} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-[#0077b6] hover:file:bg-sky-100" />
              {isUploading && <span className="w-5 h-5 border-2 border-[#0077b6] border-t-transparent rounded-full animate-spin shrink-0"></span>}
            </div>
            {form.thumbnail && (
              <div className="mt-3">
                <img src={form.thumbnail} alt="Thumbnail preview" className="h-20 w-32 object-cover rounded-xl border border-slate-200" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Sort Order</label>
              <input type="number" min="0" value={form.sort_order} onChange={(e) => update("sort_order", parseInt(e.target.value) || 0)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div className="flex items-center gap-3 mt-7">
              <input type="checkbox" id="status" checked={form.status} onChange={(e) => update("status", e.target.checked)} className="w-5 h-5 rounded text-[#0077b6] focus:ring-[#0077b6] border-slate-300" />
              <label htmlFor="status" className="font-bold text-slate-700 cursor-pointer">Active Status</label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} disabled={isLoading} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102 disabled:opacity-50 flex items-center gap-2">
              {isLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : null}
              {isLoading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
