"use client";

import React, { useState } from "react";
import { Video, Copy, Check, ExternalLink, Monitor } from "lucide-react";
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans max-w-4xl">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Video className="w-5 h-5 text-[#0077b6]" />
          <span>Host Live Interactive Zoom Session</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Start your live lecture, share your BIM workstation screen, and interact with students
        </p>
      </div>

      {/* Batch Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Select Target Class / Batch
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {batches.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBatch(b)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedBatch.id === b.id
                  ? "border-[#0077b6] bg-sky-50/70 ring-2 ring-sky-300"
                  : "border-slate-200 bg-slate-50 hover:bg-white text-slate-700"
              }`}
            >
              <span className="text-[10px] font-bold text-[#0077b6] bg-sky-100 px-2 py-0.5 rounded-md uppercase">
                {b.code}
              </span>
              <strong className="block text-xs sm:text-sm text-slate-900 font-extrabold mt-1 truncate">
                {b.name}
              </strong>
              <span className="text-[11px] text-slate-500 block mt-0.5">{b.studentsCount} Students</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Host Launch Box */}
      <div className="p-6 rounded-3xl bg-[#001830] text-white space-y-6 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-sky-400 font-bold uppercase tracking-wider block">
              HOST CREDENTIALS
            </span>
            <h4 className="text-lg font-bold text-white mt-0.5">{selectedBatch.nextClassTopic}</h4>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold w-fit">
            Host Key Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block">Meeting ID</span>
            <strong className="text-sm font-semibold text-white">872 9102 4819</strong>
          </div>
          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block">Host Passcode</span>
            <strong className="text-sm font-semibold text-white">BIM2026HOST</strong>
          </div>
          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block">Scheduled Time</span>
            <strong className="text-sm font-semibold text-sky-300">9:00 PM Tonight</strong>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href="https://zoom.us/j/87291024819"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3.5 rounded-2xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102"
          >
            <Monitor className="w-4 h-4" />
            <span>Launch Zoom Meeting as Host</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Link Copied!" : "Copy Student Link"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
