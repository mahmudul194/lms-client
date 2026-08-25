"use client";

import React from "react";
import { Layers } from "lucide-react";

interface RolePanelPreviewMockupProps {
  activeTab: "student" | "instructor" | "admin";
}

export default function RolePanelPreviewMockup({ activeTab }: RolePanelPreviewMockupProps) {
  return (
    <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-inner">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
        <span className="font-semibold">Live Interface Preview</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      <div className="space-y-2.5">
        <div className="h-3 w-3/4 bg-slate-800 rounded-md" />
        <div className="h-3 w-1/2 bg-slate-800 rounded-md" />
        <div className="h-20 bg-slate-800/50 rounded-xl border border-slate-700/50 p-3 flex flex-col justify-center gap-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
            <Layers className="w-4 h-4" />
            <span>
              {activeTab === "student" && "Video Playback & Assignments"}
              {activeTab === "instructor" && "Live Zoom & Class Management"}
              {activeTab === "admin" && "Revenue & Student Ledger"}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {activeTab === "student" && "Full HD recordings, assignments, resources."}
            {activeTab === "instructor" && "Host live sessions, review drawings & grade."}
            {activeTab === "admin" && "bKash/Nagad verification, batch management."}
          </p>
        </div>
      </div>
    </div>
  );
}
