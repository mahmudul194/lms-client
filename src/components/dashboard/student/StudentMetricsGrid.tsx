"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Video, DollarSign, Wallet } from "lucide-react";
import { overviewApi, StudentOverviewReport } from "@/services/api";

export default function StudentMetricsGrid() {
  const [data, setData] = useState<StudentOverviewReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    overviewApi.getStudentOverview()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: "Total Payable",
      value: loading ? "..." : `৳${data?.totalPayable?.toLocaleString() || 0}`,
      sub: "Total course fees",
      badge: "In Progress",
      icon: DollarSign,
    },
    {
      label: "Total Paid",
      value: loading ? "..." : `৳${data?.totalPaid?.toLocaleString() || 0}`,
      sub: "Amount cleared",
      badge: "Confirmed",
      icon: Wallet,
    },
    {
      label: "Total Due",
      value: loading ? "..." : `৳${data?.totalDue?.toLocaleString() || 0}`,
      sub: "Pending installments",
      badge: "Action Needed",
      icon: BookOpen,
    },
    {
      label: "Classes Completed",
      value: "28 / 45",
      sub: "62% Course Completed",
      badge: "17 Remaining",
      icon: Video,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-sans">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-500 tracking-wide uppercase">{c.label}</span>
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shadow-xs group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {c.value}
              </div>
              <div className="text-sm font-medium text-slate-600 mt-1">{c.sub}</div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-sky-50 text-[#0077b6] border border-sky-200 text-xs font-bold">
                {c.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
