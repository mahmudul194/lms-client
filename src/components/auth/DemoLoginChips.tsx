"use client";

import React from "react";
import { Sparkles, GraduationCap, UserCheck, ShieldCheck } from "lucide-react";

interface DemoLoginChipsProps {
  onPerformLogin: (role: "student" | "instructor" | "admin") => void;
}

export default function DemoLoginChips({ onPerformLogin }: DemoLoginChipsProps) {
  return (
    <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2.5 font-sans">
      <div className="flex items-center gap-1.5 text-xs font-bold text-[#002b5b]">
        <Sparkles className="w-3.5 h-3.5 text-[#0077b6]" />
        <span>1-Click Quick Demo Login:</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onPerformLogin("student")}
          className="p-2 rounded-xl bg-white hover:bg-sky-100/60 border border-sky-200 text-center transition-all hover:scale-105 cursor-pointer shadow-2xs group"
        >
          <GraduationCap className="w-4 h-4 text-[#0077b6] mx-auto mb-1" />
          <div className="text-[11px] font-bold text-slate-800">Student</div>
          <div className="text-[9px] text-slate-400 font-semibold">123</div>
        </button>

        <button
          type="button"
          onClick={() => onPerformLogin("instructor")}
          className="p-2 rounded-xl bg-white hover:bg-sky-100/60 border border-sky-200 text-center transition-all hover:scale-105 cursor-pointer shadow-2xs group"
        >
          <UserCheck className="w-4 h-4 text-[#002b5b] mx-auto mb-1" />
          <div className="text-[11px] font-bold text-slate-800">Instructor</div>
          <div className="text-[9px] text-slate-400 font-semibold">123</div>
        </button>

        <button
          type="button"
          onClick={() => onPerformLogin("admin")}
          className="p-2 rounded-xl bg-white hover:bg-sky-100/60 border border-sky-200 text-center transition-all hover:scale-105 cursor-pointer shadow-2xs group"
        >
          <ShieldCheck className="w-4 h-4 text-[#0f4c81] mx-auto mb-1" />
          <div className="text-[11px] font-bold text-slate-800">Admin</div>
          <div className="text-[9px] text-slate-400 font-semibold">123</div>
        </button>
      </div>
    </div>
  );
}
