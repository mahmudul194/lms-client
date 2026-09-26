"use client";

import React from "react";
import { Clock, Video } from "lucide-react";
import { CourseModuleItem } from "@/types/dashboard";
import { computeModuleTotalDuration } from "@/utils/durationCalculator";

interface AdminModuleCardProps {
  mod: CourseModuleItem;
}

export default function AdminModuleCard({ mod }: AdminModuleCardProps) {
  return (
    <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-lg bg-[#002b5b] text-white text-xs font-bold">{mod.moduleNo}</span>
          <strong className="text-base sm:text-lg font-black text-slate-900">{mod.moduleTitle}</strong>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-bold flex items-center gap-1.5 shadow-2xs">
            <Clock className="w-4 h-4 text-[#0077b6]" /> {computeModuleTotalDuration(mod.lessons) || mod.duration}
          </span>
          <span className="text-xs text-slate-500 font-semibold">({mod.lessons.length} Lectures)</span>
        </div>
      </div>

      <div className="space-y-2">
        {mod.lessons.map((les) => (
          <div key={les.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs sm:text-sm shadow-2xs">
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 truncate">{les.title}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-slate-600 font-semibold">
              <span className="px-2.5 py-1 rounded-md bg-sky-50 text-[#0077b6] font-bold text-xs">{les.duration}</span>
              <span className="text-xs text-slate-500">{les.resourcesCount} Files Attached</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
