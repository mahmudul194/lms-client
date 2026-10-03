"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Ban, ShieldCheck, X, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

interface AdminUserStatusModalProps {
  isOpen: boolean;
  userName?: string;
  userRole?: string;
  isCurrentlyBanned: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
}

export default function AdminUserStatusModal({
  isOpen,
  userName,
  userRole = "User",
  isCurrentlyBanned,
  onClose,
  onConfirm,
}: AdminUserStatusModalProps) {
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
      setError(err?.message || `Failed to ${isCurrentlyBanned ? "unban" : "ban"} ${userRole.toLowerCase()}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const actionTitle = isCurrentlyBanned ? `Reactivate ${userRole} Account` : `Ban ${userRole} Account`;
  const actionSubtitle = isCurrentlyBanned ? "Restore portal access & privileges" : "Temporarily revoke portal access";
  const actionMessage = isCurrentlyBanned
    ? `Are you sure you want to unban and restore full portal access for ${userName || "this user"}? They will be able to log in, access courses, and continue their work.`
    : `Are you sure you want to ban ${userName || "this user"}? Their login session will be terminated and they will be restricted from accessing the LMS portal until unbanned.`;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-auto max-h-[90vh] overflow-y-auto text-xs sm:text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs shrink-0 ${
              isCurrentlyBanned
                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                : "bg-amber-50 text-amber-600 border-amber-100"
            }`}>
              {isCurrentlyBanned ? <ShieldCheck className="w-5 h-5" /> : <Ban className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">{actionTitle}</h3>
              <p className="text-xs text-slate-500 font-medium">{actionSubtitle}</p>
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
          {actionMessage}
        </p>

        {userName && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              {isCurrentlyBanned ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              )}
              <span className="truncate">{userName}</span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase shrink-0 ${
              isCurrentlyBanned ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
            }`}>
              {isCurrentlyBanned ? "Currently Banned" : "Currently Active"}
            </span>
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
            className={`px-6 py-2.5 rounded-xl text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102 disabled:opacity-50 ${
              isCurrentlyBanned
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isCurrentlyBanned ? "Reactivating..." : "Banning..."}</span>
              </>
            ) : isCurrentlyBanned ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Reactivate Access</span>
              </>
            ) : (
              <>
                <Ban className="w-4 h-4" />
                <span>Ban Account</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
