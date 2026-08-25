"use client";

import React from "react";
import { CheckCircle2, UserCheck, Check, X } from "lucide-react";
import { PendingApproval } from "@/types/dashboard";

interface AdminPaymentQueueTableProps {
  pendingApprovals: PendingApproval[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function AdminPaymentQueueTable({
  pendingApprovals,
  onApprove,
  onReject,
}: AdminPaymentQueueTableProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">Payment Verification & Admission Queue</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Review bKash / Nagad / Bank TrxIDs and confirm student course enrollments</p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-sky-50 text-[#0077b6] text-xs font-bold border border-sky-200">
          {pendingApprovals.length} Records
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Student & Phone</th>
              <th className="p-4">Course & Batch</th>
              <th className="p-4">Payment Method & TrxID</th>
              <th className="p-4">Paid & Due</th>
              <th className="p-4 text-right">Action / Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {pendingApprovals.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-black text-slate-900 text-sm">{item.name}</span>
                      <div className="text-xs text-slate-500 font-semibold">{item.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-slate-900 text-sm">{item.course}</div>
                  <div className="text-xs text-slate-500 font-medium">{item.batch || "Regular Intake"}</div>
                </td>
                <td className="p-4">
                  <span className="bg-sky-50 px-3 py-1 rounded-lg border border-sky-200 text-[#0077b6] font-bold text-xs inline-block">
                    {item.method}
                  </span>
                </td>
                <td className="p-4">
                  <strong className="text-emerald-700 block font-black text-sm">Paid: {item.amount}</strong>
                  {item.dueAmount && item.dueAmount !== "৳0" ? (
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                      Due: {item.dueAmount}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                      Fully Paid
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {item.status === "Approved" ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-extrabold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Approved
                    </span>
                  ) : item.status === "Rejected" ? (
                    <span className="text-rose-600 font-extrabold text-xs">Rejected</span>
                  ) : (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onApprove(item.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => onReject(item.id)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-bold text-xs cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
