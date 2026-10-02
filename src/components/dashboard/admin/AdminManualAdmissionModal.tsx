"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { UserPlus, X, CheckCircle2, AlertCircle } from "lucide-react";
import { PendingApproval } from "@/types/dashboard";
import { useIsMounted } from "@/hooks/useIsMounted";

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
  const mounted = useIsMounted();
  const [students, setStudents] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  
  const [form, setForm] = useState({
    student_id: "",
    batch_id: "",
    total_amount: "",
    paid_amount: "",
    transaction_id: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const { studentsApi, batchesApi } = await import("@/services/api");
      const [sRes, bRes] = await Promise.all([
        studentsApi.getAllStudents({ limit: 100 }),
        batchesApi.getAllBatches({ limit: 100 })
      ]);
      if (sRes.data?.items) setStudents(sRes.data.items);
      if (bRes.data?.items) setBatches(bRes.data.items);
    } catch (e) {
      console.error("Failed to load students/batches", e);
    }
  };

  if (!mounted || !isOpen) return null;

  const total = Number(form.total_amount) || 0;
  const advance = Number(form.paid_amount) || 0;
  const due = Math.max(0, total - advance);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleBatchChange = (batchId: string) => {
    const selectedBatch = batches.find((b) => b.id === batchId);
    let defaultPrice = "";
    if (selectedBatch) {
      defaultPrice = (selectedBatch.discount_price || selectedBatch.price || 0).toString();
    }
    setForm((prev) => ({ ...prev, batch_id: batchId, total_amount: defaultPrice }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.student_id || !form.batch_id || !form.paid_amount) {
      alert("Please fill out required fields.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
      const payload = {
        student_id: form.student_id,
        batch_id: form.batch_id,
        total_amount: Number(form.total_amount),
        paid_amount: Number(form.paid_amount),
        transaction_id: form.transaction_id || undefined,
      };
      
      const res = await enrollmentsApi.manualEnrollment(payload);
      
      if (res.statusCode !== 201) {
        alert(res.message || "Failed to enroll manually");
        setIsSubmitting(false);
        return;
      }
      
      const st = students.find((s) => s.id === form.student_id);
      const ba = batches.find((b) => b.id === form.batch_id);
      
      onEnroll({
        id: res.data?.id || `adm-${Date.now()}`,
        name: st?.name || "Student",
        phone: st?.phone || "N/A",
        course: ba?.course?.title || ba?.name || "Course",
        batch: ba?.name || "Batch",
        method: "Manual TrxID",
        amount: `৳${form.paid_amount}`,
        totalFee: `৳${form.total_amount || 0}`,
        advancePaid: `৳${form.paid_amount}`,
        dueAmount: `৳${Math.max(0, Number(form.total_amount) - Number(form.paid_amount))}`,
        trxId: form.transaction_id,
        note: "",
        status: "Approved",
      });
      
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to enroll manually");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-8 text-xs sm:text-sm">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0"><UserPlus className="w-5 h-5" /></div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Manual Student Admission</h3>
              <p className="text-xs text-slate-500">Select student & batch to record offline payment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        {/* Live Due Amount Calculation Banner */}
        {form.batch_id && (
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
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm mt-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Student <span className="text-rose-500">*</span></label>
            <select 
              required 
              value={form.student_id} 
              onChange={(e) => update("student_id", e.target.value)} 
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none"
            >
              <option value="">-- Choose Student --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.phone || s.email})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Batch <span className="text-rose-500">*</span></label>
            <select 
              required 
              value={form.batch_id} 
              onChange={(e) => handleBatchChange(e.target.value)} 
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none"
            >
              <option value="">-- Choose Batch --</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>{b.name} ({b.course?.title || ""})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Course Fee (৳) <span className="text-rose-500">*</span></label>
              <input 
                type="number" 
                required 
                placeholder="e.g. 5000" 
                value={form.total_amount} 
                onChange={(e) => update("total_amount", e.target.value)} 
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none font-bold" 
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Paid Amount (৳) <span className="text-rose-500">*</span></label>
              <input 
                type="number" 
                required 
                placeholder="e.g. 1000" 
                value={form.paid_amount} 
                onChange={(e) => update("paid_amount", e.target.value)} 
                className="w-full px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 focus:bg-white focus:border-[#0077b6] focus:outline-none font-bold text-amber-900" 
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Transaction ID</label>
            <input 
              type="text" 
              placeholder="e.g. CASH-REC-001" 
              value={form.transaction_id} 
              onChange={(e) => update("transaction_id", e.target.value)} 
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] uppercase font-semibold focus:outline-none" 
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
              {isSubmitting ? "Enrolling..." : "Save & Enroll Student"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
