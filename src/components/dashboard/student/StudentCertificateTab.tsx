"use client";

import React from "react";
import { Award, ShieldCheck, Lock } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";

interface StudentCertificateTabProps {
  currentUser: UserAccount;
}

export default function StudentCertificateTab({ currentUser }: StudentCertificateTabProps) {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 max-w-3xl mx-auto text-center font-sans">
      <div className="w-20 h-20 rounded-full bg-sky-50 text-[#0077b6] flex items-center justify-center mx-auto shadow-inner border border-sky-100">
        <Award className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0077b6] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Official BIM Credential</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
          Professional Certificate of Completion
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Awarded to students upon reaching 100% course completion and passing all modeling assignment evaluations.
        </p>
      </div>

      {/* Certificate Preview Card */}
      <div className="p-6 sm:p-8 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 text-left space-y-4 text-xs sm:text-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-500 font-bold uppercase tracking-wider">Certificate Recipient:</span>
          <strong className="text-base font-extrabold text-slate-900">{currentUser.nameEn}</strong>
        </div>

        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-500 font-bold uppercase tracking-wider">Program:</span>
          <strong className="text-slate-900">Revit Architecture + Structure Pro</strong>
        </div>

        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-500 font-bold uppercase tracking-wider">Current Status:</span>
          <span className="px-3 py-0.5 rounded-full bg-sky-100 text-[#0077b6] font-extrabold text-xs">
            In Progress (68% Complete)
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-500 font-bold uppercase tracking-wider">QR Verification ID:</span>
          <span className="font-semibold font-bold text-[#0077b6]">BIM-CERT-PENDING-2026</span>
        </div>
      </div>

      <div className="pt-2">
        <button
          disabled
          className="px-8 py-3.5 rounded-2xl bg-slate-200 text-slate-400 font-bold text-sm cursor-not-allowed mx-auto flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          <span>Download Certificate (Unlocks at 100%)</span>
        </button>
      </div>
    </div>
  );
}
