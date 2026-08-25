"use client";

import React from "react";
import { BookOpen, PlayCircle, Layers, CheckCircle2, User, ArrowRight } from "lucide-react";
import { EnrolledCourse } from "@/types/dashboard";

interface StudentEnrolledCoursesGridProps {
  courses: EnrolledCourse[];
  onSelectCourse: (course: EnrolledCourse) => void;
}

export default function StudentEnrolledCoursesGrid({
  courses,
  onSelectCourse,
}: StudentEnrolledCoursesGridProps) {
  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white/95 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              My Enrolled Courses & Virtual Classrooms
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Select any enrolled program below to access structured syllabus modules, video lectures and resources
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectCourse(c)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-sky-400/80 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Card Image Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={c.thumbnail}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 text-sky-300 text-[11px] font-bold border border-sky-400/30 backdrop-blur-md font-semibold">
                  {c.batch}
                </span>
                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-lg bg-sky-600/90 text-white text-[10px] font-bold uppercase tracking-wider">
                  {c.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-[#0077b6] transition-colors">
                  {c.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <User className="w-3.5 h-3.5 text-[#0077b6] shrink-0" />
                  <span className="truncate">{c.instructor}</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold">Course Progress</span>
                    <span className="font-semibold font-black text-slate-900">{c.progressPercent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
                    <div
                      className="h-full bg-gradient-to-r from-[#002b5b] via-[#0077b6] to-sky-400 transition-all duration-500 rounded-full"
                      style={{ width: `${c.progressPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold block">
                    {c.completedLessons} of {c.totalLessons} Lessons Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="p-6 pt-0">
              <button
                type="button"
                className="w-full py-3 px-4 rounded-2xl bg-slate-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 group-hover:bg-[#0077b6] transition-all shadow-md cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-sky-400" />
                <span>Enter Classroom & Watch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
