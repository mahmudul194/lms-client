"use client";

import React, { useState } from "react";
import { Video, Copy, Check, Monitor, ExternalLink, Users, Calendar, Clock, BookOpen, Sparkles } from "lucide-react";
import { InstructorBatch } from "@/data/instructorMockData";

interface InstructorBatchesTabProps {
  batches: InstructorBatch[];
}

export default function InstructorBatchesTab({ batches }: InstructorBatchesTabProps) {
  const [selectedBatch, setSelectedBatch] = useState<InstructorBatch>(batches[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://zoom.us/j/87291024819");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = Math.round((selectedBatch.completedClasses / selectedBatch.totalClasses) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Video className="w-6 h-6 text-[#0077b6]" />
            <span>Batches & Live Class Studio</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor syllabus progress, student rosters, and launch live Zoom classes for your active cohorts
          </p>
        </div>
        <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-200 w-fit">
          3 Active Cohorts
        </span>
      </div>

      {/* Step 1: Select Active Batch Tabs */}
      <div className="space-y-2.5">
        <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
          Select Your Active Teaching Batch:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {batches.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBatch(b)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedBatch.id === b.id
                  ? "border-[#0077b6] bg-sky-50/70 ring-2 ring-sky-300 shadow-sm"
                  : "border-slate-200 bg-slate-50/70 hover:bg-white text-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#0077b6] bg-sky-100 px-2 py-0.5 rounded-md">{b.code}</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{b.status}</span>
              </div>
              <strong className="block text-sm text-slate-900 font-extrabold mt-1.5 truncate">{b.name}</strong>
              <span className="text-xs text-slate-500 block mt-0.5">{b.studentsCount} Students • {b.schedule}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Live Zoom Host Control Box for Selected Batch */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#001830] text-white space-y-5 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
              LIVE STUDIO • {selectedBatch.code}
            </span>
            <h4 className="text-lg sm:text-xl font-black text-white mt-0.5">{selectedBatch.nextClassTopic}</h4>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black flex items-center gap-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Host Key Active</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block text-xs">Meeting ID</span>
            <strong className="text-base font-black text-white mt-0.5 block">872 9102 4819</strong>
          </div>
          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block text-xs">Host Passcode</span>
            <strong className="text-base font-black text-white mt-0.5 block">BIM2026HOST</strong>
          </div>
          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block text-xs">Live Time</span>
            <strong className="text-base font-black text-sky-300 mt-0.5 block">Tonight 9:00 PM</strong>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          <a
            href="https://zoom.us/j/87291024819"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3.5 rounded-2xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102"
          >
            <Monitor className="w-4 h-4" />
            <span>Launch Zoom as Host</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Link Copied!" : "Copy Student Invite Link"}</span>
          </button>
        </div>
      </div>

      {/* Step 3: Batch Details & Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase block">Syllabus Completion</span>
          <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700">
            <span>{selectedBatch.completedClasses} of {selectedBatch.totalClasses} Classes Done</span>
            <span className="text-[#0077b6]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#0077b6] to-sky-400 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="space-y-1 text-xs sm:text-sm text-slate-700 sm:pl-4 sm:border-l border-slate-200 flex flex-col justify-center">
          <p className="flex justify-between"><span className="text-slate-500 font-medium">Batch Roster:</span><strong className="text-slate-900">{selectedBatch.studentsCount} Active Students</strong></p>
          <p className="flex justify-between"><span className="text-slate-500 font-medium">Class Days:</span><strong className="text-[#002b5b]">{selectedBatch.schedule}</strong></p>
        </div>
      </div>
    </div>
  );
}
