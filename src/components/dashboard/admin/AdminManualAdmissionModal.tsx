"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { UserPlus, X, CheckCircle2, AlertCircle } from "lucide-react";
import { PendingApproval } from "@/types/dashboard";

interface AdminManualAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (approval: PendingApproval) => void;
}

export default function AdminManualAdmissionModal({
  isOpen,
  onClose,
  onEnroll,
}: AdminManualAdmissionModalProps) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", course: "Revit Combo Pro (Arch + Struct + MEP)", batch: "8th Live Batch",
    method: "bKash Personal", trxId: "", totalFee: "16000", advancePaid: "5000", note: "",
  });

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (isOpen) {
      setForm({ name: "", phone: "", course: "Revit Combo Pro (Arch + Struct + MEP)", batch: "8th Live Batch", method: "bKash Personal", trxId: "", totalFee: "16000", advancePaid: "5000", note: "" });
    }
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const total = Number(form.totalFee) || 0;
  const advance = Number(form.advancePaid) || 0;
  const due = Math.max(0, total - advance);
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnroll({
      id: `adm-${Date.now()}`,
      name: form.name.trim(),
      phone: form.phone.trim(),
      course: form.course,
      batch: form.batch,
      method: `${form.method} (${form.trxId.trim() || "CASH-DESK"})`,
      amount: `৳${advance.toLocaleString()}`,
      totalFee: `৳${total.toLocaleString()}`,
      advancePaid: `৳${advance.toLocaleString()}`,
      dueAmount: `৳${due.toLocaleString()}`,
      trxId: form.trxId.trim(),
      note: form.note.trim(),
      status: "Pending",
    });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-8 text-xs sm:text-sm">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0"><UserPlus className="w-5 h-5" /></div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Manual Student Admission & TrxID Entry</h3>
              <p className="text-xs text-slate-500">Record offline/direct student payments, advance fees & due tracking</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        {/* Live Due Amount Calculation Banner */}
        <div className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${
          due > 0 ? "bg-amber-50/90 border-amber-200 text-amber-900" : "bg-emerald-50 border-emerald-200 text-emerald-900"
        }`}>
          <div className="flex items-center gap-2">
            {due > 0 ? <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
            <span><strong>Total Fee: ৳{total.toLocaleString()}</strong> — Advance: <strong>৳{advance.toLocaleString()}</strong></span>
          </div>
          <span className={`px-3 py-1 rounded-full font-semibold font-bold text-xs shrink-0 ${
            due > 0 ? "bg-amber-200/80 text-amber-950" : "bg-emerald-200/80 text-emerald-950"
          }`}>
            {due > 0 ? `Remaining Due (পাবো): ৳${due.toLocaleString()}` : "Fully Paid (100%)"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" required placeholder="Student Full Name" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
            <input type="tel" required placeholder="Phone Number (+880 17XX...)" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] font-semibold focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select value={form.course} onChange={(e) => update("course", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none">
              <option value="Revit Combo Pro (Arch + Struct + MEP)">Revit Combo Pro (Arch + Struct + MEP)</option>
              <option value="Tekla Steel Detailing Masterclass">Tekla Steel Detailing Masterclass</option>
              <option value="Revit Dynamo BIM Automation">Revit Dynamo BIM Automation</option>
            </select>
            <select value={form.batch} onChange={(e) => update("batch", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none">
              <option value="8th Live Batch">8th Live Batch</option>
              <option value="9th Live Batch (Upcoming)">9th Live Batch (Upcoming)</option>
              <option value="3rd Special Weekend Batch">3rd Special Weekend Batch</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select value={form.method} onChange={(e) => update("method", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none">
              <option value="bKash Personal">bKash (Personal Send Money)</option>
              <option value="bKash Merchant">bKash (Merchant Payment)</option>
              <option value="Nagad">Nagad Transfer</option>
              <option value="Rocket">Rocket Transfer</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Direct Cash / Desk">Direct Office Cash</option>
            </select>
            <input type="text" placeholder="TrxID / Money Receipt No" value={form.trxId} onChange={(e) => update("trxId", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] uppercase font-semibold font-bold focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-semibold">
            <input type="number" required placeholder="Total Fee" value={form.totalFee} onChange={(e) => update("totalFee", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
            <input type="number" required placeholder="Advance / Paid" value={form.advancePaid} onChange={(e) => update("advancePaid", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none font-bold text-[#0077b6]" />
          </div>

          <input type="text" placeholder="Office / Admission Remarks (e.g. Due on 2nd class)" value={form.note} onChange={(e) => update("note", e.target.value)} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-xs" />

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102">Save & Enroll Student</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
