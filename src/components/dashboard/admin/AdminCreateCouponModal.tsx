"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { TicketPercent, X } from "lucide-react";
import { CouponItem } from "@/types/dashboard";

interface AdminCreateCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCoupon: (coupon: CouponItem) => void;
}

export default function AdminCreateCouponModal({
  isOpen,
  onClose,
  onCreateCoupon,
}: AdminCreateCouponModalProps) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "flat",
    discountValue: "15",
    minOrder: "10000",
    expiryDate: "2026-10-31",
    usageLimit: "50",
    applicableCourse: "All Courses",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateCoupon({
      id: `cp-${Date.now()}`,
      code: form.code.toUpperCase(),
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      minOrderAmount: Number(form.minOrder),
      expiryDate: form.expiryDate,
      usageLimit: Number(form.usageLimit),
      usedCount: 0,
      applicableCourse: form.applicableCourse,
      isActive: true,
    });
    onClose();
  };

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-7 sm:p-9 space-y-6 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-8 text-xs sm:text-sm">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0">
              <TicketPercent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Generate Promo Coupon Code</h3>
              <p className="text-xs text-slate-500 mt-0.5">Issue flat or percentage discounts for checkout admissions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Coupon Promo Code</label>
            <input type="text" required placeholder="e.g. BIMPRO2026" value={form.code} onChange={(e) => update("code", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] uppercase font-semibold font-bold text-sm tracking-wider focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Discount Calculation Type</label>
              <select value={form.discountType} onChange={(e) => update("discountType", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none">
                <option value="percentage">Percentage (% OFF)</option>
                <option value="flat">Flat Amount (৳ BDT)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">{form.discountType === "percentage" ? "Discount Rate (%)" : "Discount Amount (BDT ৳)"}</label>
              <input type="number" required placeholder="15" value={form.discountValue} onChange={(e) => update("discountValue", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none font-semibold font-bold text-[#0077b6]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Expiration Date</label>
              <input type="date" required value={form.expiryDate} onChange={(e) => update("expiryDate", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Usage Redemption Limit</label>
              <input type="number" required placeholder="50" value={form.usageLimit} onChange={(e) => update("usageLimit", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none font-semibold" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Applicable Course Scope</label>
            <select value={form.applicableCourse} onChange={(e) => update("applicableCourse", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none">
              <option value="All Courses">All BIM Courses</option>
              <option value="Revit Combo Pro">Revit Combo Pro</option>
              <option value="Tekla Steel Detailing">Tekla Steel Detailing</option>
              <option value="Revit Architecture + Structure">Revit Architecture + Structure</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">Cancel</button>
            <button type="submit" className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102">Create Promo Coupon</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
