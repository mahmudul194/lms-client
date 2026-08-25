"use client";

import React from "react";
import { CheckCircle2, BookOpen, Video, Award, TrendingUp } from "lucide-react";

export default function StudentMetricsGrid() {
  const cards = [
    {
      label: "Enrolled Course",
      value: "1 Course",
      sub: "Revit Combo Pro (8th Batch)",
      badge: "Active & Ongoing",
      badgeSuccess: true,
      icon: BookOpen,
    },
    {
      label: "Classes Completed",
      value: "28 / 45",
      sub: "62% Syllabus Completed",
      badge: "17 Remaining",
      icon: Video,
    },
    {
      label: "Assignment Score",
      value: "94% (A+)",
      sub: "7 Evaluated Submissions",
      badge: "Top 5% Student",
      badgeSuccess: true,
      icon: TrendingUp,
    },
    {
      label: "Official Certificate",
      value: "In Progress",
      sub: "QR Code Verified",
      badge: "Unlocks at 100%",
      icon: Award,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 font-sans">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <div
            key={idx}
            className="bg-white/95 backdrop-blur-xs p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-sky-300 transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">{c.label}</span>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/80 text-[#0077b6] flex items-center justify-center border border-sky-200/60 shadow-xs group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-semibold">
                {c.value}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">{c.sub}</div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border font-semibold ${
                  c.badgeSuccess
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                    : "bg-sky-50 text-[#0077b6] border-sky-200/60"
                }`}
              >
                {c.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
