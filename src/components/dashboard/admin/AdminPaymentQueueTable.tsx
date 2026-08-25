"use client";

import React from "react";
import { CheckCircle2, UserCheck, AlertCircle } from "lucide-react";
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
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Payment Verification & Enrollment Queue</h3>
          <p className="text-xs text-slate-500">Review bKash / Nagad / Bank TrxIDs, advance fees and confirm admissions</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-sky-50 text-[#0077b6] text-xs font-bold border border-sky-200">
          {pendingApprovals.length} Records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 border-y border-slate-200">
            <tr>
              <th className="p-3.5">Student & Phone</th>
              <th className="p-3.5">Course & Batch</th>
              <th className="p-3.5">Payment Method & TrxID</th>
              <th className="p-3.5">Advance & Due</th>
              <th className="p-3.5">Action / Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pendingApprovals.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3.5 font-semibold text-slate-900">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-[#0077b6]" />
                    <span>{item.name}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-semibold pl-5">{item.phone}</div>
                </td>
                <td className="p-3.5 text-slate-700">
                  <div className="font-bold text-slate-900">{item.course}</div>
                  <div className="text-xs text-slate-500 font-medium">{item.batch || "Regular Intake"}</div>
                </td>
                <td className="p-3.5 font-semibold text-[#0077b6] font-bold">
                  <div className="bg-sky-50/80 px-2.5 py-1 rounded-lg border border-sky-100 inline-block text-xs">
                    {item.method}
                  </div>
                </td>
                <td className="p-3.5">
                  <div className="font-semibold font-bold text-slate-900">Paid: {item.amount}</div>
                  {item.dueAmount && item.dueAmount !== "৳0" ? (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                      Due: {item.dueAmount}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                      Fully Paid
                    </span>
                  )}
                </td>
                <td className="p-3.5">
                  {item.status === "Approved" ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Approved
                    </span>
                  ) : item.status === "Rejected" ? (
                    <span className="text-rose-600 font-bold">Rejected</span>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onApprove(item.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(item.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                      >
                        Reject
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
