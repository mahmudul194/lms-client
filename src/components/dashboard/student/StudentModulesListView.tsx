"use client";

import React, { useState } from "react";
import { ArrowLeft, BookOpen, PlayCircle, CheckCircle2, Lock } from "lucide-react";
import { EnrolledCourse } from "@/types/dashboard";

interface StudentModulesListViewProps {
  course: EnrolledCourse;
  onBack: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export default function StudentModulesListView({
  course,
  onBack,
  onSelectLesson,
}: StudentModulesListViewProps) {
  const [openModuleId, setOpenModuleId] = useState<string>(course.modules[0]?.id || "");

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0077b6] hover:text-[#002b5b] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Options</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-[#002b5b] text-white text-xs font-bold">{course.batch}</span>
              <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-[#0077b6] text-xs font-bold">Core Syllabus</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{course.title} — Course Modules</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Structured step-by-step masterclass lectures and practice assignments
            </p>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-sky-50 text-[#0077b6] text-xs font-bold border border-sky-200 w-fit">
            {course.modules.length} Modules Total
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {course.modules.map((m) => {
          const isOpen = openModuleId === m.id;
          return (
            <div key={m.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenModuleId(isOpen ? "" : m.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-sky-50 text-[#0077b6] text-xs font-black">{m.moduleNo}</span>
                  <h4 className="font-black text-slate-900 text-sm sm:text-base">{m.title}</h4>
                </div>
                <span className="text-xs text-slate-500 font-bold">{m.lessons.length} Lectures</span>
              </button>

              {isOpen && (
                <div className="p-4 sm:p-6 pt-0 space-y-2 border-t border-slate-100">
                  {m.lessons.map((les) => (
                    <div
                      key={les.id}
                      onClick={() => les.isUnlocked && onSelectLesson(les.id)}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs sm:text-sm transition-all ${
                        les.isUnlocked ? "hover:border-[#0077b6] hover:bg-sky-50/50 cursor-pointer bg-white" : "opacity-60 bg-slate-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        {les.isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : les.isUnlocked ? (
                          <PlayCircle className="w-4 h-4 text-[#0077b6] shrink-0" />
                        ) : (
                          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span className="font-bold text-slate-900 truncate">Lesson {les.lessonNo}: {les.title}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 shrink-0">{les.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
