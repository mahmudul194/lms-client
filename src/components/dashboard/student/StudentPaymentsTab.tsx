"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, CreditCard, ShieldCheck, Download } from "lucide-react";

export default function StudentPaymentsTab() {
  const installments = [
    {
      no: "1st Installment",
      amount: "৳4,000",
      status: "Paid",
      gateway: "bKash: 9J87K65LM4",
      date: "12 June 2026",
      isPaid: true,
    },
    {
      no: "2nd Installment",
      amount: "৳4,000",
      status: "Paid",
      gateway: "Nagad: 8K72M90P11",
      date: "15 July 2026",
      isPaid: true,
    },
    {
      no: "3rd Installment",
      amount: "৳4,000",
      status: "Upcoming Due",
      gateway: "Due by 25 August 2026",
      date: "Pending Payment",
      isPaid: false,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <CreditCard className="w-6 h-6 text-[#0077b6]" />
            <span>Installment Ledger & Invoices</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Track your 3-month course tuition plan, verify transactions, and download receipts
          </p>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Active & Enrolled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-slate-50 p-6 rounded-3xl border border-slate-200/80">
        <div>
          <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide block">Total Course Fee</span>
          <strong className="text-2xl sm:text-3xl font-black text-[#002b5b] block mt-1">৳12,000 BDT</strong>
          <span className="text-xs text-slate-500 font-medium">Revit Combo Pro (8th Batch)</span>
        </div>
        <div>
          <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide block">Total Amount Paid</span>
          <strong className="text-2xl sm:text-3xl font-black text-emerald-700 block mt-1">৳8,000 BDT</strong>
          <span className="text-xs text-emerald-600 font-semibold">2 of 3 Installments Cleared</span>
        </div>
        <div>
          <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide block">Next Payable Due</span>
          <strong className="text-2xl sm:text-3xl font-black text-amber-700 block mt-1">৳4,000 BDT</strong>
          <span className="text-xs text-amber-600 font-semibold">Due by 25 August 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {installments.map((inst, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between transition-all ${
              inst.isPaid
                ? "bg-emerald-50/50 border-emerald-200/90"
                : "bg-amber-50/50 border-amber-200/90 shadow-xs"
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-sm font-extrabold">
                <span className={inst.isPaid ? "text-emerald-900" : "text-amber-900"}>{inst.no}</span>
                {inst.isPaid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Clock className="w-5 h-5 text-amber-600" />
                )}
              </div>

              <div className="text-3xl font-black text-slate-900">{inst.amount}</div>

              <div className="text-xs sm:text-sm text-slate-600 space-y-1 pt-1">
                <p className="font-medium">{inst.gateway}</p>
                <p className="text-slate-500">{inst.date}</p>
              </div>
            </div>

            <div className="pt-2">
              {inst.isPaid ? (
                <button className="w-full py-2.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-600 hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer">
                  <Download className="w-4 h-4" />
                  <span>Download Invoice</span>
                </button>
              ) : (
                <Link
                  href="/admission"
                  className="block w-full py-2.5 text-center rounded-xl bg-[#0077b6] hover:bg-[#002b5b] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md"
                >
                  Pay Online (bKash / Nagad)
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
