"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

interface AdminDeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  itemName?: string;
  message?: string;
  confirmText?: string;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
}

export default function AdminDeleteConfirmModal({
  isOpen,
  title = "Confirm Deletion",
  itemName,
  message,
  confirmText = "Delete",
  onClose,
  onConfirm,
}: AdminDeleteConfirmModalProps) {
  const mounted = useIsMounted();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!mounted || !isOpen) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError(null);
      await onConfirm();
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to delete item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-auto max-h-[90vh] overflow-y-auto text-xs sm:text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-xs shrink-0">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">{title}</h3>
              <p className="text-xs text-slate-500 font-medium">Permanent database action</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          {message || "Are you sure you want to permanently remove this record? This action cannot be undone."}
        </p>

        {itemName && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="truncate max-w-xs">{itemName}</span>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
