"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, CheckCircle, CreditCard } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { InstallmentItem } from "@/services/api/installmentsApi";

interface AdminInstallmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollmentId: string;
}

export default function AdminInstallmentsModal({ isOpen, onClose, enrollmentId }: AdminInstallmentsModalProps) {
  const mounted = useIsMounted();
  const [installments, setInstallments] = useState<InstallmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !enrollmentId) return;
    setLoading(true);
    fetchInstallments();
  }, [isOpen, enrollmentId]);

  const fetchInstallments = async () => {
    try {
      const { installmentsApi } = await import("@/services/api/installmentsApi");
      const res = await installmentsApi.getAllInstallments({ enrollment_id: enrollmentId, limit: 100 });
      if (res.statusCode === 200 && res.data?.items) {
        setInstallments(res.data.items);
      }
    } catch (error) {
      console.error("Failed to load installments", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (installmentId: string) => {
    try {
      const { installmentsApi } = await import("@/services/api/installmentsApi");
      const res = await installmentsApi.updateInstallment(installmentId, { status: "PAID", paid_date: new Date().toISOString() });
      if (res.statusCode !== 200) {
        alert(res.message || "Failed to mark as paid");
        return;
      }
      await fetchInstallments(); // reload
    } catch (error) {
      console.error("Failed to mark installment paid", error);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Installment Schedule</h3>
              <p className="text-xs text-slate-500">Manage payment installments</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 cursor-pointer text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-10"><div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div></div>
        ) : installments.length > 0 ? (
          <div className="space-y-4">
            {installments.sort((a, b) => (a.installment_number || 0) - (b.installment_number || 0)).map((inst) => (
              <div key={inst.id} className="p-4 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${inst.status?.toLowerCase() === "paid" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Installment #{inst.installment_number}</h4>
                    <p className="text-sm font-semibold text-slate-600">Amount: ৳{Number(inst.amount).toLocaleString()}</p>
                    <p className="text-xs text-slate-500">Due: {inst.due_date ? new Date(inst.due_date).toLocaleDateString() : "N/A"}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                  {inst.status?.toLowerCase() === "paid" ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-sm">
                      <CheckCircle className="w-4 h-4" /> Paid
                    </span>
                  ) : (
                    <>
                      <span className="text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-full text-sm">
                        {inst.status?.toUpperCase() || "PENDING"}
                      </span>
                      <button 
                        onClick={() => handleMarkPaid(inst.id)}
                        className="px-4 py-2 bg-[#0077b6] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#005a8c] transition-all cursor-pointer"
                      >
                        Mark as Paid
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 py-10">No installments found for this enrollment.</p>
        )}
      </div>
    </div>,
    document.body
  );
}
