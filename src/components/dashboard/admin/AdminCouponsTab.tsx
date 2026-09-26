"use client";

import React, { useState, useEffect } from "react";
import { TicketPercent, Plus, Copy } from "lucide-react";
import { CouponItem } from "@/types/dashboard";
import AdminCreateCouponModal from "./AdminCreateCouponModal";

export default function AdminCouponsTab() {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { couponsApi } = await import("@/services/api/couponsApi");
        const res = await couponsApi.getAllCoupons();
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          const apiCoupons: CouponItem[] = res.data.map((c) => ({
            id: c.id,
            code: c.code,
            discountType: c.discountType === "fixed" ? "flat" : "percentage",
            discountValue: c.discountValue,
            minOrderAmount: 0,
            expiryDate: c.endDate ? new Date(c.endDate).toLocaleDateString() : "Never",
            applicableCourse: "All Courses",
            usageLimit: c.usageLimit || 100,
            usedCount: c.usedCount || 0,
            isActive: c.isActive,
          }));
          setCoupons(apiCoupons);
        }
      } catch {} finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreateCoupon = async (newCoupon: CouponItem) => {
    try {
      const { couponsApi } = await import("@/services/api/couponsApi");
      await couponsApi.createCoupon({
        code: newCoupon.code,
        discountType: newCoupon.discountType === "percentage" ? "percentage" : "fixed",
        discountValue: newCoupon.discountValue,
        usageLimit: newCoupon.usageLimit,
        isActive: true,
      });
    } catch {}
    setCoupons([newCoupon, ...coupons]);
  };

  const toggleCouponStatus = async (id: string) => {
    const target = coupons.find((c) => c.id === id);
    if (!target) return;
    try {
      const { couponsApi } = await import("@/services/api/couponsApi");
      await couponsApi.updateCoupon(id, { isActive: !target.isActive });
    } catch {}
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <TicketPercent className="w-5 h-5 text-[#0077b6]" />
            <span>Discount Engine & Promo Coupons</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">Live coupons connected to payment checkout validation</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer shrink-0">
          <Plus className="w-4 h-4 text-sky-400" />
          <span>New Promo Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 space-y-1">
          <span className="text-xs text-[#0077b6] font-bold">Active Coupons</span>
          <div className="text-2xl font-black text-[#002b5b]">{coupons.filter((c) => c.isActive).length} Running</div>
        </div>
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
          <span className="text-xs text-emerald-600 font-bold">Total Redemptions</span>
          <div className="text-2xl font-black text-emerald-950">{coupons.reduce((sum, c) => sum + c.usedCount, 0)} Applied</div>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Usage</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">Loading coupons...</td></tr>
            ) : coupons.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">No promo coupons available yet.</td></tr>
            ) : (
              coupons.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900">{c.code}</td>
                  <td className="p-4 font-bold text-[#0077b6]">{c.discountType === "percentage" ? `${c.discountValue}%` : `৳${c.discountValue}`}</td>
                  <td className="p-4">{c.usedCount} / {c.usageLimit}</td>
                  <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${c.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>{c.isActive ? "Active" : "Inactive"}</span></td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => { navigator.clipboard.writeText(c.code); alert(`Copied ${c.code}`); }} className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-[#0077b6] hover:text-white cursor-pointer"><Copy className="w-3.5 h-3.5" /></button>
                    <button onClick={() => toggleCouponStatus(c.id)} className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 cursor-pointer">{c.isActive ? "Disable" : "Enable"}</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminCreateCouponModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreateCoupon={handleCreateCoupon} />
    </div>
  );
}
