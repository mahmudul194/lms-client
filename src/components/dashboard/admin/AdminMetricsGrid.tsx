"use client";

import React from "react";
import { TrendingUp, Users, Layers, Award, DollarSign } from "lucide-react";

export default function AdminMetricsGrid() {
  const metrics = [
    {
      label: "Monthly Revenue",
      value: "৳4,85,000",
      trend: "+14.2% Growth",
      icon: DollarSign,
      sub: "Gross Tuition Collection",
    },
    {
      label: "Enrolled Students",
      value: "5,240",
      trend: "+182 New This Month",
      icon: Users,
      sub: "Active in 8 Programs",
    },
    {
      label: "Active Live Batches",
      value: "6 Batches",
      trend: "480 Total Seats",
      icon: Layers,
      sub: "Revit, Tekla, Dynamo",
    },
    {
      label: "Issued Certificates",
      value: "3,820",
      trend: "100% QR Verified",
      icon: Award,
      sub: "Industry Recognized",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-sans">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-500 tracking-wide uppercase">{m.label}</span>
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shadow-xs group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {m.value}
              </div>
              <div className="text-sm font-medium text-slate-600 mt-1">{m.sub}</div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>{m.trend}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
