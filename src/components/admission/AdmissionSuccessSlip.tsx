"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, PhoneCall } from "lucide-react";
import { Course } from "@/data/mockData";

interface AdmissionSuccessSlipProps {
  fullName: string;
  selectedCourse: Course;
  batchTiming: string;
  paymentMethod: string;
  trxId: string;
  dueToday: number;
}

export default function AdmissionSuccessSlip({
  fullName,
  selectedCourse,
  batchTiming,
  paymentMethod,
  trxId,
  dueToday,
}: AdmissionSuccessSlipProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-2xl space-y-8 text-center animate-in fade-in duration-300">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
          APPLICATION ACCEPTED
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Congratulations, {fullName || "Student"}!
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Your admission application for <strong>{selectedCourse.title}</strong> has been submitted successfully.
          Our team is verifying your payment details.
        </p>
      </div>

      {/* Official Admission Slip */}
      <div className="bg-[#f8fafc] rounded-2xl border border-slate-200 p-6 text-left space-y-4 text-xs sm:text-sm max-w-xl mx-auto font-sans">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-xs">Application ID</span>
          <span className="font-semibold font-bold text-[#0077b6]">ADM-{Math.floor(100000 + Math.random() * 900000)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-600">Selected Course:</span>
          <span className="font-bold text-slate-900 text-right max-w-[280px]">{selectedCourse.title}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-600">Batch & Timing:</span>
          <span className="font-semibold text-slate-800 uppercase">{batchTiming} Batch (Live Zoom)</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-600">Payment Gateway:</span>
          <span className="font-bold text-[#0077b6] uppercase">{paymentMethod}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-600">TrxID Submitted:</span>
          <span className="font-semibold font-bold text-slate-800">{trxId || "PENDING-MANUAL"}</span>
        </div>
        <div className="flex items-center justify-between pt-1 text-sm sm:text-base">
          <span className="font-extrabold text-slate-900">Paid Amount (Today):</span>
          <span className="font-black text-emerald-600">৳{dueToday.toLocaleString()} BDT</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/dashboard"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sky-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>Go to Student LMS Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <a
          href="https://wa.me/8801879526108"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#002b5b] hover:bg-[#001a38] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Admission Helpline (WhatsApp)</span>
        </a>
      </div>
    </div>
  );
}
