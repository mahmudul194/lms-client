"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface AdmissionGatewaySelectorProps {
  paymentMethod: "bkash" | "nagad" | "rocket" | "sslcommerz" | "bank";
  onSelectPaymentMethod: (method: "bkash" | "nagad" | "rocket" | "sslcommerz" | "bank") => void;
  trxId: string;
  setTrxId: (id: string) => void;
  dueToday: number;
}

export default function AdmissionGatewaySelector({
  paymentMethod,
  onSelectPaymentMethod,
  trxId,
  setTrxId,
  dueToday,
}: AdmissionGatewaySelectorProps) {
  const [copied, setCopied] = useState(false);

  const merchantNumbers: Record<string, string> = {
    bkash: "01879-526108 (Merchant / Send Money)",
    nagad: "01879-526108 (Merchant / Send Money)",
    rocket: "01879-526108-9 (Personal)",
    sslcommerz: "Online Gateway (Automatic Verification)",
    bank: "City Bank | A/C: 1502938475001 | BIM Build BD",
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText("01879526108");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Payment Gateway Grid Selector */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Select Payment Gateway <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { id: "bkash", name: "bKash", color: "border-pink-300 text-pink-600 bg-pink-50" },
            { id: "nagad", name: "Nagad", color: "border-orange-300 text-orange-600 bg-orange-50" },
            { id: "rocket", name: "Rocket", color: "border-purple-300 text-purple-600 bg-purple-50" },
            { id: "sslcommerz", name: "SSLCommerz / Cards", color: "border-blue-300 text-blue-600 bg-blue-50" },
            { id: "bank", name: "Bank Transfer", color: "border-emerald-300 text-emerald-600 bg-emerald-50" },
          ].map((gw) => (
            <button
              type="button"
              key={gw.id}
              onClick={() => onSelectPaymentMethod(gw.id as any)}
              className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all cursor-pointer ${
                paymentMethod === gw.id
                  ? `${gw.color} ring-2 ring-[#0077b6] shadow-sm font-black scale-105`
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="block truncate">{gw.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gateway Account Details Card */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
          <div>
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">
              {paymentMethod.toUpperCase()} RECEIVER ACCOUNT:
            </span>
            <strong className="text-sm sm:text-base font-extrabold text-slate-900 font-semibold">
              {merchantNumbers[paymentMethod]}
            </strong>
          </div>
          {["bkash", "nagad", "rocket"].includes(paymentMethod) && (
            <button
              type="button"
              onClick={handleCopyNumber}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors shrink-0 cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied 01879526108" : "Copy Number"}</span>
            </button>
          )}
        </div>

        <div className="space-y-1 text-slate-600">
          <p>
            1. Send <strong>৳{dueToday.toLocaleString()} BDT</strong> to the {paymentMethod.toUpperCase()} number above.
          </p>
          <p>2. Copy the Transaction ID (TrxID) from your SMS or statement and paste below.</p>
        </div>

        {/* TrxID Input Field */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
            Transaction ID (TrxID) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 9J87K65LM4"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value.toUpperCase())}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold tracking-wider focus:border-[#0077b6] focus:ring-2 focus:ring-sky-100 focus:outline-none bg-white uppercase font-bold text-slate-900 shadow-2xs"
          />
        </div>
      </div>
    </div>
  );
}
