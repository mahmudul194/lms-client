"use client";

import React, { useState } from "react";
import { Video, Copy, Check, ExternalLink, Monitor, CheckSquare, Sparkles } from "lucide-react";
import { InstructorBatch } from "@/data/instructorMockData";

interface InstructorLiveHostTabProps {
  batches: InstructorBatch[];
}

export default function InstructorLiveHostTab({ batches }: InstructorLiveHostTabProps) {
  const [selectedBatch, setSelectedBatch] = useState<InstructorBatch>(batches[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://zoom.us/j/87291024819");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
          <Video className="w-6 h-6 text-[#0077b6]" />
          <span>Live Class Studio (Zoom Host Console)</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Start your live interactive lecture, share your BIM workstation screen, and mentor students
        </p>
      </div>

      {/* Select Batch */}
      <div className="space-y-3">
        <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
          Select Target Active Batch to Host:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {batches.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBatch(b)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedBatch.id === b.id
                  ? "border-[#0077b6] bg-sky-50/70 ring-2 ring-sky-300 shadow-sm"
                  : "border-slate-200 bg-slate-50 hover:bg-white text-slate-700"
              }`}
            >
              <span className="text-xs font-black text-[#0077b6] bg-sky-100 px-2.5 py-1 rounded-md uppercase">
                {b.code}
              </span>
              <strong className="block text-sm text-slate-900 font-black mt-2 leading-snug">
                {b.name}
              </strong>
              <span className="text-xs text-slate-500 font-semibold block mt-1">
                {b.studentsCount} Students • {b.schedule}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Host Credentials Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#001830] text-white space-y-6 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
              LIVE CLASSROOM METADATA
            </span>
            <h4 className="text-lg sm:text-xl font-black text-white mt-1">{selectedBatch.nextClassTopic}</h4>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black flex items-center gap-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Host Key Ready</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block text-xs">Zoom Meeting ID</span>
            <strong className="text-base font-black text-white mt-0.5 block">872 9102 4819</strong>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block text-xs">Host Passcode</span>
            <strong className="text-base font-black text-white mt-0.5 block">BIM2026HOST</strong>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block text-xs">Scheduled Live Time</span>
            <strong className="text-base font-black text-sky-300 mt-0.5 block">9:00 PM Tonight</strong>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href="https://zoom.us/j/87291024819"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-4 rounded-2xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102"
          >
            <Monitor className="w-5 h-5" />
            <span>Launch Zoom Meeting as Host</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Link Copied!" : "Copy Student Invite Link"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
