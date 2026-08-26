"use client";

import React, { useState } from "react";
import { BookOpen, Users, Calendar, Video, Clock, CheckCircle2 } from "lucide-react";
import { InstructorBatch } from "@/data/instructorMockData";

interface InstructorBatchesTabProps {
  batches: InstructorBatch[];
  onHostZoom: (batch: InstructorBatch) => void;
}

export default function InstructorBatchesTab({ batches, onHostZoom }: InstructorBatchesTabProps) {
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");

  const filteredBatches =
    filter === "All" ? batches : batches.filter((b) => b.status === filter);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      {/* Header with Title and Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-[#0077b6]" />
            <span>My Assigned Batches & Teaching Schedules</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your active 8th batches, student rosters, and syllabus progress
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["All", "Active", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === tab
                  ? "bg-[#002b5b] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Batch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBatches.map((b) => {
          const progressPercent = Math.round((b.completedClasses / b.totalClasses) * 100);

          return (
            <div
              key={b.id}
              className="p-6 rounded-3xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-lg transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-[#0077b6]/10 text-[#0077b6] text-xs font-black">
                    {b.code}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    {b.status}
                  </span>
                </div>

                <h4 className="font-black text-slate-900 text-base sm:text-lg leading-snug">
                  {b.name}
                </h4>

                <div className="text-xs sm:text-sm text-slate-600 space-y-2 pt-1">
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#0077b6]" />
                    <span><strong className="text-slate-900">{b.studentsCount}</strong> Active Enrolled Students</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{b.schedule}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-800 truncate">{b.nextClassTopic}</span>
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Syllabus Covered</span>
                    <span className="text-[#0077b6]">{b.completedClasses}/{b.totalClasses} Classes ({progressPercent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0077b6] to-sky-400 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2">
                <button
                  onClick={() => onHostZoom(b)}
                  className="flex-1 py-3 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer hover:scale-102"
                >
                  <Video className="w-4 h-4" />
                  <span>Start Live Zoom</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
