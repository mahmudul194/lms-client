"use client";

import React, { useState } from "react";
import { BookOpen, Users, Calendar, Video, Plus, CheckCircle2 } from "lucide-react";
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
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0077b6]" />
            <span>Assigned Batches & Course Modules</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitor student enrollment, syllabus completion, and batch schedules
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["All", "Active", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === tab
                  ? "bg-[#002b5b] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
              className="p-6 rounded-3xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#0077b6]/10 text-[#0077b6] font-semibold text-xs font-bold">
                    {b.code}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                    {b.status}
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                  {b.name}
                </h4>

                <div className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span><strong>{b.studentsCount}</strong> Active Enrolled Students</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{b.schedule}</span>
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-[11px] font-bold text-slate-600">
                    <span>Syllabus Progress</span>
                    <span className="text-[#0077b6]">{b.completedClasses}/{b.totalClasses} Classes ({progressPercent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0077b6] to-sky-400 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2">
                <button
                  onClick={() => onHostZoom(b)}
                  className="flex-1 py-2.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Host Zoom</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
