"use client";

import React from "react";
import { BookOpen, Users, FileCheck, Star } from "lucide-react";
import { InstructorBatch } from "@/data/instructorMockData";

interface InstructorMetricsGridProps {
  batches: InstructorBatch[];
  pendingCount: number;
}

export default function InstructorMetricsGrid({
  batches,
  pendingCount,
}: InstructorMetricsGridProps) {
  const cards = [
    {
      label: "Active Batches",
      value: `${batches.length} Batches`,
      sub: "Revit, Tekla, MEP",
      badge: "In Progress",
      icon: BookOpen,
    },
    {
      label: "Total Students",
      value: "184 Enrolled",
      sub: "Active Live Learners",
      badge: "+12 New",
      icon: Users,
    },
    {
      label: "Pending Grading",
      value: `${pendingCount} Files`,
      sub: "Assignments Awaiting Review",
      badge: "Action Required",
      badgeDanger: true,
      icon: FileCheck,
    },
    {
      label: "Trainer Rating",
      value: "★ 4.95",
      sub: "450+ Student Reviews",
      badge: "Top Rated",
      icon: Star,
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
                  c.badgeDanger
                    ? "bg-rose-50 text-rose-700 border-rose-200/60"
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
