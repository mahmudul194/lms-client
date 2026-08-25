"use client";

import React from "react";
import { BarChart3, ArrowUpRight, DollarSign, CreditCard } from "lucide-react";

export default function AdminRevenueTab() {
  const transactions = [
    { id: "TX-9842", student: "Md. Ariful Islam", method: "bKash", amount: "৳6,000", date: "Aug 18, 2026", status: "Settled" },
    { id: "TX-9843", student: "Tanvir Ahmed", method: "Nagad", amount: "৳4,000", date: "Aug 19, 2026", status: "Settled" },
    { id: "TX-9844", student: "Nusrat Jahan", method: "SSLCommerz", amount: "৳14,000", date: "Aug 20, 2026", status: "Settled" },
    { id: "TX-9845", student: "Kazi Sazzad Hossain", method: "Rocket", amount: "৳5,000", date: "Aug 20, 2026", status: "Settled" },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#0077b6]" />
          <span>Financial Reports & Revenue Ledger</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Real-time payment gateway settlements, installment receivables, and revenue logs
        </p>
      </div>

      {/* 3 Summary Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-2 shadow-lg">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Collected (This Month)</span>
          <div className="text-3xl font-black text-emerald-400">৳4,85,000</div>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4 text-emerald-400" /> +12.5% vs July
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase">Outstanding Installments</span>
          <div className="text-3xl font-black text-rose-600">৳1,42,000</div>
          <span className="text-xs text-slate-500 font-medium">32 Students due by Aug 30</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase">Payment Gateway Split</span>
          <div className="text-sm font-bold text-slate-800 space-y-1 pt-1">
            <div className="flex justify-between"><span>bKash (62%)</span><strong className="font-semibold">৳3,00,700</strong></div>
            <div className="flex justify-between"><span>Nagad (26%)</span><strong className="font-semibold">৳1,26,100</strong></div>
            <div className="flex justify-between"><span>Card/Bank (12%)</span><strong className="font-semibold">৳58,200</strong></div>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="space-y-3">
        <h4 className="font-extrabold text-slate-900 text-sm">Recent Verified Transactions</h4>
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Tx ID</th>
                <th className="p-3.5">Student</th>
                <th className="p-3.5">Gateway</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-xs">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-[#0077b6]">{tx.id}</td>
                  <td className="p-3.5 font-sans font-bold text-slate-900">{tx.student}</td>
                  <td className="p-3.5 text-slate-600">{tx.method}</td>
                  <td className="p-3.5 font-bold text-emerald-600">{tx.amount}</td>
                  <td className="p-3.5 text-slate-500 font-sans">{tx.date}</td>
                  <td className="p-3.5 text-right font-sans">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
