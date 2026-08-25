"use client";

import React, { useState } from "react";
import { TicketPercent, Plus, Copy, Check, TrendingUp, Users } from "lucide-react";
import { MOCK_COUPONS } from "@/data/adminCourseContentMockData";
import { CouponItem } from "@/types/dashboard";
import AdminCreateCouponModal from "./AdminCreateCouponModal";

export default function AdminCouponsTab() {
  const [coupons, setCoupons] = useState<CouponItem[]>(MOCK_COUPONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCreateCoupon = (newCoupon: CouponItem) => {
    setCoupons([newCoupon, ...coupons]);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const activeCount = coupons.filter((c) => c.isActive).length;
  const totalRedeemed = coupons.reduce((sum, c) => sum + c.usedCount, 0);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <TicketPercent className="w-5 h-5 text-[#0077b6]" />
            <span>Discount Engine & Promo Coupons</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Create and track promotional discount codes for checkout applications
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-400" />
          <span>New Promo Code</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 space-y-1">
          <span className="text-xs text-[#0077b6] font-bold">Active Coupons</span>
          <div className="text-2xl font-black text-[#002b5b]">{activeCount} Running</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-bold">Total Redeemed</span>
          <div className="text-2xl font-black text-slate-900">{totalRedeemed} Uses</div>
        </div>
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
          <span className="text-xs text-emerald-700 font-bold">Discount Concessions</span>
          <div className="text-2xl font-black text-emerald-800">৳94,500</div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
            <tr>
              <th className="p-3.5">Coupon Code</th>
              <th className="p-3.5">Discount Rate</th>
              <th className="p-3.5">Target Course</th>
              <th className="p-3.5">Redemptions</th>
              <th className="p-3.5">Expiry</th>
              <th className="p-3.5 text-right">Status Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-3.5">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md text-xs">{c.code}</span>
                    <button
                      onClick={() => handleCopyCode(c.code)}
                      className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                      title="Copy code"
                    >
                      {copiedCode === c.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </td>
                <td className="p-3.5 font-bold text-[#0077b6]">
                  {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `৳${c.discountValue} Flat`}
                </td>
                <td className="p-3.5 text-slate-700">{c.applicableCourse}</td>
                <td className="p-3.5 font-semibold text-slate-600">{c.usedCount}/{c.usageLimit}</td>
                <td className="p-3.5 text-slate-500 font-semibold text-xs">{c.expiryDate}</td>
                <td className="p-3.5 text-right">
                  <button
                    onClick={() => toggleCouponStatus(c.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      c.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {c.isActive ? "Active" : "Disabled"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminCreateCouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateCoupon={handleCreateCoupon}
      />
    </div>
  );
}
