"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, TicketPercent, Loader2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { CouponItem } from "@/types/dashboard";
import { batchesApi, BatchItem } from "@/services/api/batchesApi";

interface AdminEditCouponModalProps {
  isOpen: boolean;
  coupon: CouponItem | null;
  onClose: () => void;
  onUpdate: (id: string, payload: Partial<CouponItem>) => Promise<void>;
}

export default function AdminEditCouponModal({
  isOpen,
  coupon,
  onClose,
  onUpdate,
}: AdminEditCouponModalProps) {
  const mounted = useIsMounted();
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [batchId, setBatchId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [usageLimit, setUsageLimit] = useState<number | undefined>(undefined);
  const [isActive, setIsActive] = useState(true);

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

  const formatDateForInput = (iso?: string) => {
    if (!iso) return "";
    try {
      return new Date(iso).toISOString().slice(0, 10);
    } catch {
      return "";
    }
  };

  useEffect(() => {
    if (coupon) {
      setCode(coupon.code || "");
      setDiscountType(coupon.discountType || "percentage");
      setDiscountValue(coupon.discountValue || 0);
      setBatchId(coupon.batchId || "");
      setStartDate(formatDateForInput(coupon.startDate));
      setEndDate(formatDateForInput(coupon.endDate));
      setUsageLimit(coupon.usageLimit);
      setIsActive(coupon.isActive ?? true);
      setError(null);
    }
  }, [coupon, isOpen]);

  if (!mounted || !isOpen || !coupon) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Coupon code is required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onUpdate(coupon.id, {
        code: code.trim().toUpperCase(),
        discountType,
        discountValue: Number(discountValue) || 0,
        batchId: batchId || undefined,
        startDate: startDate ? new Date(startDate).toISOString() : undefined,
        endDate: endDate ? new Date(endDate).toISOString() : undefined,
        usageLimit: usageLimit ? Number(usageLimit) : undefined,
        isActive,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update coupon.");
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
              <TicketPercent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Edit Coupon</h3>
              <p className="text-xs text-slate-500 mt-0.5">Update discount rules, validation dates, and quotas</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Coupon Code *</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                required
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-mono font-bold text-xs sm:text-sm uppercase"
                placeholder="PROMO20"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (৳)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Discount Value</label>
              <input
                type="number"
                min="1"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                required
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-bold text-xs sm:text-sm text-emerald-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Restricted Batch (Optional)</label>
              <select
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              >
                <option value="">All Batches (Global)</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Usage Limit (Quota)</label>
              <input
                type="number"
                min="1"
                value={usageLimit ?? ""}
                onChange={(e) => setUsageLimit(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Unlimited if blank"
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Expiry Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="editCouponStatus"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-5 h-5 rounded text-[#0077b6] focus:ring-[#0077b6] border-slate-300 cursor-pointer"
            />
            <label htmlFor="editCouponStatus" className="font-bold text-slate-700 cursor-pointer text-xs sm:text-sm select-none">
              Coupon is Active and usable at checkout
            </label>
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
                <span>Update Coupon</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
