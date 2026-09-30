"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, FolderDown, Loader2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { ResourceItem, CreateResourcePayload } from "@/services/api/resourcesApi";
import { batchesApi, BatchItem } from "@/services/api/batchesApi";

interface AdminEditResourceModalProps {
  isOpen: boolean;
  resource: ResourceItem | null;
  onClose: () => void;
  onUpdate: (id: string, payload: Partial<CreateResourcePayload>) => Promise<void>;
}

export default function AdminEditResourceModal({
  isOpen,
  resource,
  onClose,
  onUpdate,
}: AdminEditResourceModalProps) {
  const mounted = useIsMounted();
  const [title, setTitle] = useState("");
  const [batchId, setBatchId] = useState("");
  const [url, setUrl] = useState("");
  const [pdf, setPdf] = useState("");
  const [link, setLink] = useState("");
  const [sizeMb, setSizeMb] = useState<number>(0);
  const [description, setDescription] = useState("");

  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      batchesApi.getAllBatches({ limit: 100 }).then((res) => {
        if (res.data?.items) setBatches(res.data.items);
      }).catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    if (resource) {
      setTitle(resource.title || "");
      setBatchId(resource.batchId || resource.batch?.id || "");
      setUrl(resource.url || "");
      setPdf(resource.pdf || "");
      setLink(resource.link || "");
      setSizeMb(resource.sizeMb || 0);
      setDescription(resource.description || "");
      setError(null);
    }
  }, [resource, isOpen]);

  if (!mounted || !isOpen || !resource) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Resource title is required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onUpdate(resource.id, {
        title: title.trim(),
        batchId: batchId || undefined,
        url: url.trim() || undefined,
        pdf: pdf.trim() || undefined,
        link: link.trim() || undefined,
        sizeMb: Number(sizeMb) || 0,
        description: description.trim() || undefined,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update resource.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-auto max-h-[90vh] overflow-y-auto text-xs sm:text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0">
              <FolderDown className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Edit Resource</h3>
              <p className="text-xs text-slate-500 mt-0.5">Update files, external resources, and download links</p>
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
          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Resource Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-semibold text-xs sm:text-sm"
              placeholder="e.g. Revit Family Library (BIM Architecture Assets)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Assigned Batch</label>
              <select
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              >
                <option value="">All Batches</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">File Size (MB)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={sizeMb}
                onChange={(e) => setSizeMb(Number(e.target.value))}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">ZIP / Archive Download URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">PDF Guide / Documentation URL</label>
            <input
              type="url"
              value={pdf}
              onChange={(e) => setPdf(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              placeholder="https://.../handbook.pdf"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">External Resource Link</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              placeholder="https://autodesk.com/... or Google Drive"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm resize-none"
              placeholder="Overview of this file or template..."
            />
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
                <span>Update Resource</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
