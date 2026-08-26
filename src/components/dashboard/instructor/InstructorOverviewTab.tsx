"use client";

import React from "react";
import { Sparkles, Video, Clock, FileCheck, Upload, Users, MessageSquare } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";
import { InstructorBatch, StudentSubmission } from "@/data/instructorMockData";
import InstructorMetricsGrid from "./InstructorMetricsGrid";

interface InstructorOverviewTabProps {
  currentUser: UserAccount;
  batches: InstructorBatch[];
  submissions: StudentSubmission[];
  onNavigateToLive: () => void;
  onNavigateToGrading: () => void;
}

export default function InstructorOverviewTab({
  currentUser,
  batches,
  submissions,
  onNavigateToLive,
  onNavigateToGrading,
}: InstructorOverviewTabProps) {
  const pendingCount = submissions.filter((s) => s.status === "Pending").length;

  return (
    <div className="space-y-7 font-sans">
      {/* Welcome & Live Launch Banner */}
      <div className="bg-gradient-to-r from-[#002b5b] via-[#0f4c81] to-[#0077b6] rounded-3xl text-white p-7 sm:p-9 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-sky-100 text-xs sm:text-sm font-bold backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-sky-200" />
            <span>Trainer Dashboard — Welcome, {currentUser.name}!</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
            Ready to Teach Your Next Live Class?
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 font-medium">
            Next Scheduled Class: <strong className="text-white">Professional Revit Combo 8th Batch • Class 29 (Tonight 9:00 PM)</strong>
          </p>
        </div>

        <button
          onClick={onNavigateToLive}
          className="px-7 py-3.5 rounded-2xl bg-white text-[#002b5b] hover:bg-sky-50 font-black text-sm flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all cursor-pointer shrink-0"
        >
          <Video className="w-5 h-5 text-[#0077b6]" />
          <span>Launch Live Zoom Studio</span>
        </button>
      </div>

      {/* 4 Instructor Metric Cards */}
      <InstructorMetricsGrid batches={batches} pendingCount={pendingCount} />

      {/* Two Column Layout: Teaching Schedule + Pending Grading */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Today's Teaching Schedule (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0077b6]" />
              <span>Assigned 8th Active Batches</span>
            </h3>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              3 Active Cohorts
            </span>
          </div>

          <div className="space-y-3">
            {batches.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#0077b6]/10 text-[#0077b6] font-bold text-xs">{b.code}</span>
                    <strong className="text-slate-900 font-extrabold text-sm">{b.name}</strong>
                  </div>
                  <span className="text-slate-500 text-xs font-medium block mt-1">
                    {b.schedule} • <strong className="text-slate-700">{b.studentsCount} Students</strong>
                  </span>
                  <span className="text-xs font-bold text-[#0077b6] block mt-0.5">{b.nextClassTopic}</span>
                </div>
                <button
                  onClick={onNavigateToLive}
                  className="px-4 py-2 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs"
                >
                  Start Class
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Submissions Queue (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-rose-500" />
              <span>Submissions To Evaluate</span>
            </h3>
            <button
              onClick={onNavigateToGrading}
              className="text-xs text-[#0077b6] hover:underline font-bold cursor-pointer"
            >
              View All ({pendingCount})
            </button>
          </div>

          <div className="space-y-3">
            {submissions.slice(0, 3).map((sub) => (
              <div
                key={sub.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="min-w-0 pr-2">
                  <span className="font-extrabold text-slate-900 block truncate">{sub.studentName}</span>
                  <span className="text-slate-500 block truncate">{sub.files?.[0]?.name || sub.assignmentTitle}</span>
                  <span className="text-[11px] text-[#0077b6] font-bold block">{sub.studentRoll}</span>
                </div>
                <button
                  onClick={onNavigateToGrading}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-bold text-xs shrink-0 cursor-pointer shadow-2xs"
                >
                  Evaluate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
