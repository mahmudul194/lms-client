"use client";

import React, { useState } from "react";
import { Users, Calendar, Copy, Check, MessageSquare, Wrench, Video, ShieldCheck, ExternalLink, Sparkles } from "lucide-react";
import { CatalogCourse } from "@/data/coursesCatalog20";

interface AdminActiveBatchCardProps {
  course: CatalogCourse;
  onOpenCreateBatch: () => void;
}

export default function AdminActiveBatchCard({ course, onOpenCreateBatch }: AdminActiveBatchCardProps) {
  const [copied, setCopied] = useState(false);
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);

  const enrolled = 44;
  const maxSeats = 50;
  const percent = Math.round((enrolled / maxSeats) * 100);

  const handleCopyFb = () => {
    navigator.clipboard.writeText(`https://facebook.com/groups/bim-${course.id}-8th`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 sm:p-8 border-2 border-[#0077b6]/20 shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1 rounded-xl bg-[#002b5b] text-white text-xs sm:text-sm font-black tracking-wide">
            {course.activeBatch} (CURRENT ACTIVE)
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 ${enrollmentOpen ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-rose-100 text-rose-800 border border-rose-300"}`}>
            <span className={`w-2 h-2 rounded-full ${enrollmentOpen ? "bg-emerald-600 animate-ping" : "bg-rose-600"}`} />
            <span>{enrollmentOpen ? "🔥 Admission Open (Enrolling)" : "Admission Closed"}</span>
          </span>
        </div>
        <button onClick={() => setEnrollmentOpen(!enrollmentOpen)} className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer w-fit">
          {enrollmentOpen ? "Pause Admissions" : "Reopen Admissions"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700">
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#0077b6]" /> Live Seat Intake Capacity:</span>
              <strong className="text-slate-900">{enrolled} / {maxSeats} Seats Booked ({maxSeats - enrolled} Left)</strong>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#0077b6] to-emerald-500 h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 bg-white p-4 rounded-2xl border border-slate-200">
            <p className="flex items-center justify-between"><span className="text-slate-500 font-medium">Class Routine:</span><strong className="text-slate-900">Mon, Wed, Fri (9:00 PM - 11:00 PM)</strong></p>
            <p className="flex items-center justify-between"><span className="text-slate-500 font-medium">Lead Mentor:</span><strong className="text-[#002b5b]">{course.instructor}</strong></p>
            <p className="flex items-center justify-between"><span className="text-slate-500 font-medium">Course Fee:</span><span><strong className="text-emerald-700 font-bold text-base">{course.discountFee}</strong> <span className="line-through text-slate-400 text-xs">{course.regularFee}</span></span></p>
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wide text-[#0077b6] flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> 8th Batch FB Secret Group:</span>
              <button onClick={handleCopyFb} className="px-2.5 py-1 rounded-lg bg-white text-slate-700 hover:text-[#0077b6] border border-sky-200 text-xs font-bold flex items-center gap-1 cursor-pointer">
                {copied ? <><Check className="w-3.5 h-3.5 text-emerald-600" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy Link</>}
              </button>
            </div>
            <p className="text-xs text-slate-600">Students get automatically added here upon verifying bKash / Nagad TrxID.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button onClick={onOpenCreateBatch} className="flex-1 py-3 px-4 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-102 transition-all">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>Launch 9th Batch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
