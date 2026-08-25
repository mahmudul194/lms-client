"use client";

import React from "react";
import { Download, MessageSquare } from "lucide-react";
import { StudentSubmission } from "@/data/instructorMockData";

interface InstructorSubmissionCardProps {
  sub: StudentSubmission;
  onEvaluate: (sub: StudentSubmission) => void;
}

export default function InstructorSubmissionCard({
  sub,
  onEvaluate,
}: InstructorSubmissionCardProps) {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm font-sans">
      <div className="space-y-2 min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <strong className="text-slate-900 text-sm">{sub.studentName}</strong>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md font-bold">
            {sub.studentRoll}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
              sub.status === "Graded"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-rose-100 text-rose-800"
            }`}
          >
            {sub.status}
          </span>
          <span className="text-slate-400 text-xs">• Submitted: {sub.submittedAt}</span>
        </div>

        <p className="text-slate-800 font-bold">{sub.assignmentTitle}</p>

        {/* Student Note / Answer Snippet */}
        <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-[#0077b6] shrink-0 mt-0.5" />
          <span className="italic line-clamp-1">&ldquo;{sub.studentNote}&rdquo;</span>
        </div>

        {/* Attached Files List */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[11px] font-bold text-slate-500">Submitted Files:</span>
          {sub.files.map((f, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-[#0077b6] text-[11px] font-semibold font-bold"
            >
              <Download className="w-3 h-3" />
              <span>
                {f.name} ({f.size})
              </span>
            </span>
          ))}
        </div>

        {sub.feedback && (
          <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
            <strong>Trainer Feedback:</strong> {sub.feedback}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
        {sub.score !== null && (
          <div className="text-center px-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Score</span>
            <span className="text-xl font-black text-emerald-600">{sub.score}/100</span>
          </div>
        )}
        <button
          onClick={() => onEvaluate(sub)}
          className="px-4 py-2.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-bold text-xs cursor-pointer shadow-xs transition-all"
        >
          {sub.status === "Graded" ? "Edit Grade" : "Evaluate Script"}
        </button>
      </div>
    </div>
  );
}
