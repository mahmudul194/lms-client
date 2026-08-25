"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Layers, X } from "lucide-react";
import { AdminBatch } from "@/data/adminMockData";

interface AdminCreateBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (batch: AdminBatch) => void;
}

export default function AdminCreateBatchModal({
  isOpen,
  onClose,
  onCreate,
}: AdminCreateBatchModalProps) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    instructor: "Engr. Ashikur Rahman",
    regFee: "20000",
    discFee: "16000",
    fbUrl: "https://facebook.com/groups/bim-secret-batch",
    schedule: "Mon, Wed, Fri (9:00 PM - 11:00 PM)",
    software: "Revit 2024 + Dynamo 2.19",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      id: `bat-${Date.now()}`,
      name: form.name,
      code: form.code,
      instructor: form.instructor,
      enrolledStudents: 0,
      maxSeats: 45,
      startDate: "Oct 01, 2026",
      regularFee: `৳${Number(form.regFee).toLocaleString()}`,
      discountFee: `৳${Number(form.discFee).toLocaleString()}`,
      fbGroupUrl: form.fbUrl,
      schedule: form.schedule,
      duration: "4 Months (40 Classes)",
      softwareVersion: form.software,
      metaTitle: `${form.name} Official Intake`,
      metaKeywords: "BIM, Revit, Tekla",
      status: "Enrolling",
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
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Launch New Live Batch</h3>
              <p className="text-xs text-slate-500 mt-0.5">Configure intake pricing, secret FB group & software metadata</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Batch Official Name</label>
            <input type="text" required placeholder="e.g. Professional Revit Combo 9th Batch" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Batch Code</label>
              <input type="text" required placeholder="REV-9TH" value={form.code} onChange={(e) => update("code", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] uppercase font-bold focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Assigned Lead Trainer</label>
              <select value={form.instructor} onChange={(e) => update("instructor", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none">
                <option value="Engr. Ashikur Rahman">Engr. Ashikur Rahman</option>
                <option value="Engr. Mojahedur Rahman">Engr. Mojahedur Rahman</option>
                <option value="Engr. Maidul Islam">Engr. Maidul Islam</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-semibold">
            <div>
              <label className="font-sans font-bold text-slate-700 block mb-1.5">Regular Fee (BDT ৳)</label>
              <input type="number" required placeholder="20000" value={form.regFee} onChange={(e) => update("regFee", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-sans font-bold text-slate-700 block mb-1.5">Discount Offer Fee (BDT ৳)</label>
              <input type="number" required placeholder="16000" value={form.discFee} onChange={(e) => update("discFee", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none font-bold text-[#0077b6]" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">FB Secret Support Group Link</label>
            <input type="url" required placeholder="https://facebook.com/groups/..." value={form.fbUrl} onChange={(e) => update("fbUrl", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none font-semibold text-xs" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Class Schedule</label>
              <input type="text" placeholder="Mon, Wed, Fri (9:00 PM - 11:00 PM)" value={form.schedule} onChange={(e) => update("schedule", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Software Versions</label>
              <input type="text" placeholder="Revit 2024 + Dynamo 2.19" value={form.software} onChange={(e) => update("software", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none font-semibold text-xs" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">Cancel</button>
            <button type="submit" className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102">Launch Live Batch</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
