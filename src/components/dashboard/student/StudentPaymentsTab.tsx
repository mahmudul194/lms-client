"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function StudentPaymentsTab() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-900">3-Month Installment Ledger</h3>
        <p className="text-xs sm:text-sm text-slate-500">Track payment invoices and download official transaction receipts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
          <div className="flex justify-between items-center text-sm font-bold text-emerald-800">
            <span>1st Installment</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950">৳4,000 BDT</div>
          <p className="text-xs text-emerald-700 font-semibold">bKash: 9J87K65LM4</p>
          <button className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-700 cursor-pointer">
            Download Receipt
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
          <div className="flex justify-between items-center text-sm font-bold text-emerald-800">
            <span>2nd Installment</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950">৳4,000 BDT</div>
          <p className="text-xs text-emerald-700 font-semibold">Nagad: 8K72M90P11</p>
          <button className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-700 cursor-pointer">
            Download Receipt
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
          <div className="flex justify-between items-center text-sm font-bold text-amber-800">
            <span>3rd Installment</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold">Due</span>
          </div>
          <div className="text-2xl font-black text-amber-950">৳4,000 BDT</div>
          <p className="text-xs text-amber-700 font-medium">Due: 25 August 2026</p>
          <Link
            href="/admission"
            className="block w-full py-2.5 text-center rounded-xl bg-[#0077b6] text-white font-bold text-xs sm:text-sm hover:bg-[#005a8c] shadow-md"
          >
            Pay Online Now
          </Link>
        </div>
      </div>
    </div>
  );
}
