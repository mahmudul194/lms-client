"use client";

import React from "react";
import { Award, ShieldCheck, Lock, CheckCircle2, QrCode } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";

interface StudentCertificateTabProps {
  currentUser: UserAccount;
}

export default function StudentCertificateTab({ currentUser }: StudentCertificateTabProps) {
  const criteria = [
    { title: "Course Syllabus Completion", status: "68% Done", isDone: false },
    { title: "Modeling Assignments (Min 80%)", status: "94% Scored", isDone: true },
    { title: "Final Comprehensive BIM Project", status: "Pending", isDone: false },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 max-w-4xl mx-auto font-sans">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0077b6] text-xs sm:text-sm font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Official BIM Credential</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Verified Professional BIM Certificate
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Awarded upon reaching 100% course completion and passing all instructor assignment evaluations.
        </p>
      </div>

      {/* Prestige Certificate Canvas */}
      <div className="relative p-8 sm:p-12 rounded-3xl border-4 border-double border-slate-300 bg-gradient-to-b from-slate-50 to-white shadow-md text-center space-y-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 text-xs sm:text-sm text-slate-500 font-bold">
          <span>BIM BUILD BD ACADEMY</span>
          <span className="text-[#0077b6]">ISO 9001:2015 STANDARD</span>
        </div>

        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#002b5b] to-[#0077b6] text-white flex items-center justify-center mx-auto shadow-lg">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">This certifies that</span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 underline decoration-[#0077b6] decoration-2 underline-offset-8">
            {currentUser.nameEn}
          </h2>
          <p className="text-sm text-slate-600 pt-3">
            has demonstrated professional competence in <strong>Revit Architecture, Structural & MEP BIM Lifecycles</strong>
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="text-left space-y-0.5">
            <span className="text-slate-400 font-bold block text-xs">VERIFICATION ID</span>
            <span className="font-extrabold text-[#002b5b]">BIM-CERT-2026-PENDING</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">
            <QrCode className="w-4 h-4 text-[#0077b6]" />
            <span>Digital QR Verified</span>
          </div>
        </div>
      </div>

      {/* Checklist Progress */}
      <div className="space-y-3 bg-slate-50 p-6 rounded-3xl border border-slate-200">
        <h4 className="font-bold text-slate-900 text-sm sm:text-base">Requirements to Unlock Certificate:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {criteria.map((c, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-slate-700">{c.title}</span>
              <span className={`font-bold ${c.isDone ? "text-emerald-700" : "text-amber-700"}`}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-2">
        <button disabled className="px-8 py-3.5 rounded-2xl bg-slate-200 text-slate-500 font-bold text-sm sm:text-base cursor-not-allowed inline-flex items-center gap-2">
          <Lock className="w-4 h-4" />
          <span>Download Official PDF Certificate (Unlocks at 100%)</span>
        </button>
      </div>
    </div>
  );
}
