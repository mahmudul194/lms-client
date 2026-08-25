"use client";

import React from "react";
import { FileText, CheckCircle2, Clock, UploadCloud, MessageSquare } from "lucide-react";
import { Assignment } from "@/types/dashboard";

interface StudentAssignmentsTabProps {
  assignments: Assignment[];
  onOpenUpload: (assignmentId: number) => void;
}

export default function StudentAssignmentsTab({
  assignments,
  onOpenUpload,
}: StudentAssignmentsTabProps) {
  const gradedCount = assignments.filter((a) => a.status === "Graded").length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-[#0077b6]" />
            <span>Assignments & Modeling Tasks</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Submit weekly Revit models, CAD sheets, and receive detailed mentor feedback
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 text-xs sm:text-sm">
          <span className="font-bold text-slate-600">Submissions:</span>
          <strong className="text-[#0077b6] font-black">{gradedCount}/{assignments.length} Graded</strong>
        </div>
      </div>

      <div className="space-y-4">
        {assignments.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-3 flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                    item.status === "Graded"
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : "bg-amber-100 text-amber-900 border border-amber-300"
                  }`}
                >
                  {item.status === "Graded" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  <span>{item.status}</span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-500">
                  Due: {item.deadline}
                </span>
              </div>

              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                {item.title}
              </h4>

              {item.feedback && (
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#002b5b]">
                    <MessageSquare className="w-4 h-4 text-[#0077b6]" />
                    <span>Mentor Review & Feedback:</span>
                  </div>
                  <p className="leading-relaxed pl-5 text-slate-600">{item.feedback}</p>
                </div>
              )}
            </div>

            <div className="shrink-0 text-right w-full md:w-auto flex md:flex-col items-center justify-between md:justify-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
              {item.obtainedMarks ? (
                <div className="text-center bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Score</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600">{item.obtainedMarks}/100</span>
                </div>
              ) : (
                <button
                  onClick={() => onOpenUpload(item.id)}
                  className="px-6 py-3 rounded-xl bg-[#0077b6] hover:bg-[#002b5b] text-white text-xs sm:text-sm font-extrabold shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Model (.rvt)</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
