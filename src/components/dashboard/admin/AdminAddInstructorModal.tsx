"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { UserCheck, X } from "lucide-react";
import { InstructorRecord } from "./AdminInstructorsTab";

interface AdminAddInstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (trainer: InstructorRecord) => void;
}

export default function AdminAddInstructorModal({
  isOpen,
  onClose,
  onAdd,
}: AdminAddInstructorModalProps) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "Senior BIM Instructor",
    specialty: "Revit Structure + Tekla Detailing",
    phone: "+880 17XX-XXXXXX",
    email: "",
  });

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (isOpen) {
      setForm({ name: "", role: "Senior BIM Instructor", specialty: "Revit Structure + Tekla Detailing", phone: "", email: "" });
    }
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `ins-${Date.now()}`,
      name: form.name.trim(),
      role: form.role.trim(),
      specialty: form.specialty.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      batchesCount: 1,
      studentsCount: 45,
      rating: 5.0,
      status: "Active",
    });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-8 text-xs sm:text-sm">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Add New Trainer / Instructor</h3>
              <p className="text-xs text-slate-500">Register new mentor profile, assigned courses & contact details</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Trainer Full Name</label>
              <input type="text" required placeholder="e.g. Engr. Shafiqul Islam" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Designation / Role Title</label>
              <input type="text" required placeholder="e.g. Senior Tekla Detailing Specialist" value={form.role} onChange={(e) => update("role", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Technical Specialty / Software Expertise</label>
            <input type="text" required placeholder="e.g. Revit Architecture + Navisworks Coordination" value={form.specialty} onChange={(e) => update("specialty", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
              <input type="tel" required placeholder="+880 17XX-XXXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] font-semibold focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Email Address</label>
              <input type="email" required placeholder="trainer@bimbuildbd.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] font-semibold focus:outline-none" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102">Save Trainer Profile</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
