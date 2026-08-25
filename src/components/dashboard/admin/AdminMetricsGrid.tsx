"use client";

import React from "react";
import { TrendingUp, Users, Layers, Award, DollarSign } from "lucide-react";

export default function AdminMetricsGrid() {
  const metrics = [
    {
      label: "Monthly Revenue",
      value: "৳4,85,000",
      trend: "+14.2% vs last month",
      trendPositive: true,
      icon: DollarSign,
      sub: "Total Gross Income",
    },
    {
      label: "Enrolled Students",
      value: "5,240",
      trend: "+182 new enrollments",
      trendPositive: true,
      icon: Users,
      sub: "Active in 8 Programs",
    },
    {
      label: "Active Live Batches",
      value: "6 Batches",
      trend: "480 Total Seats",
      trendPositive: true,
      icon: Layers,
      sub: "Revit, Tekla, Dynamo",
    },
    {
      label: "Issued Certificates",
      value: "3,820",
      trend: "100% QR Verified",
      trendPositive: true,
      icon: Award,
      sub: "Industry Recognized",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 font-sans">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="bg-white/95 backdrop-blur-xs p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-sky-300 transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">{m.label}</span>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/80 text-[#0077b6] flex items-center justify-center border border-sky-200/60 shadow-xs group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-semibold">
                {m.value}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">{m.sub}</div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                {m.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
