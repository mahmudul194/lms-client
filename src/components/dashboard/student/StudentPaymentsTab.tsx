"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Clock, CreditCard, ShieldCheck } from "lucide-react";
import { enrollmentsApi } from "@/services/api/enrollmentsApi";
import { InstallmentItem } from "@/services/api/installmentsApi";

export default function StudentPaymentsTab() {
  const [enrollmentsData, setEnrollmentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await enrollmentsApi.getMyEnrollments();
        if (res.statusCode === 200 && res.data) {
          setEnrollmentsData(res.data);
        }
      } catch (e) {
        console.error("Failed to load installments:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handlePay = async (instId: string, amount: number) => {
    try {
      const { paymentsApi } = await import("@/services/api");
      const res = await paymentsApi.initiatePayment({ installment_id: instId, amount });
      if (res.data?.payment_url) {
        window.location.href = res.data.payment_url;
      }
    } catch {
      alert("Payment gateway connection error.");
    }
  };

  let totalPaid = 0;
  let totalDue = 0;

  enrollmentsData.forEach(enr => {
    if (enr.installments && Array.isArray(enr.installments)) {
      enr.installments.forEach((inst: any) => {
        if (inst.status?.toLowerCase() === "paid" || inst.status?.toLowerCase() === "success") {
          totalPaid += Number(inst.amount);
        } else {
          totalDue += Number(inst.amount);
        }
      });
    }
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <CreditCard className="w-6 h-6 text-[#0077b6]" />
            <span>Installment Ledger & Invoices</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Live installment tracking connected with SSLCOMMERZ gateway</p>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Active & Enrolled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50 p-6 rounded-3xl border border-slate-200/80">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Total Paid (All Courses)</span>
          <strong className="text-2xl font-black text-emerald-600 block mt-1">৳{totalPaid.toLocaleString()} BDT</strong>
        </div>
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Remaining Due (All Courses)</span>
          <strong className="text-2xl font-black text-amber-600 block mt-1">৳{totalDue.toLocaleString()} BDT</strong>
        </div>
      </div>

      <div className="space-y-8">
        {loading ? (
          <div className="p-8 text-center text-slate-400 font-semibold bg-slate-50 rounded-2xl border border-slate-100 animate-pulse">
            Loading ledger...
          </div>
        ) : enrollmentsData.length === 0 ? (
          <div className="p-8 text-center text-slate-400 font-semibold bg-slate-50 rounded-2xl border border-slate-200">
            No active courses or installments found.
          </div>
        ) : (
          enrollmentsData.map((enr) => {
            const courseTitle = enr.batch?.course?.title || "Unknown Course";
            const batchName = enr.batch?.name || "Unknown Batch";
            const installments: any[] = enr.installments || [];

            // Sort installments for this batch
            installments.sort((a, b) => {
              if (!a.due_date) return 1;
              if (!b.due_date) return -1;
              return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
            });

            if (installments.length === 0) return null;

            return (
              <div key={enr.id} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                  <div className="w-2 h-2 rounded-full bg-[#0077b6]"></div>
                  <h4 className="font-bold text-lg text-slate-900">{courseTitle}</h4>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-black">{batchName}</span>
                </div>

                <div className="grid gap-3">
                  {installments.map((inst, idx) => (
                    <div key={inst.id} className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-white hover:border-[#0077b6] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-base">Installment #{inst.installment_number || idx + 1}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${inst.status?.toLowerCase() === "paid" || inst.status?.toLowerCase() === "success" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                            {inst.status?.toLowerCase() === "paid" || inst.status?.toLowerCase() === "success" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                            <span>{inst.status?.toLowerCase() === "paid" || inst.status?.toLowerCase() === "success" ? "Paid" : "Due"}</span>
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">Due Date: {inst.due_date ? new Date(inst.due_date).toLocaleDateString() : "N/A"}</div>
                      </div>
                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        <strong className="text-xl font-black text-slate-900">৳{Number(inst.amount).toLocaleString()}</strong>
                        {inst.status?.toLowerCase() !== "paid" && inst.status?.toLowerCase() !== "success" && (
                          <button onClick={() => handlePay(inst.id, Number(inst.amount))} className="px-5 py-2.5 rounded-xl bg-[#0077b6] hover:bg-[#002b5b] text-white text-xs font-bold cursor-pointer shadow-md transition-all hover:scale-105">
                            Pay Online
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
