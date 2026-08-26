"use client";

import React, { useState } from "react";
import { ArrowLeft, BookOpen, Video, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { EnrolledCourse } from "@/types/dashboard";
import StudentModulesListView from "./StudentModulesListView";
import StudentLiveRecordingsView from "./StudentLiveRecordingsView";

interface StudentCourseHubProps {
  course: EnrolledCourse;
  onBackToCourses: () => void;
  onOpenPlayer: (lessonId?: string) => void;
}

export default function StudentCourseHub({ course, onBackToCourses, onOpenPlayer }: StudentCourseHubProps) {
  const [subView, setSubView] = useState<"hub" | "modules" | "live_recordings">("hub");

  if (subView === "modules") {
    return (
      <StudentModulesListView
        course={course}
        onBack={() => setSubView("hub")}
        onSelectLesson={(lessonId) => onOpenPlayer(lessonId)}
      />
    );
  }

  if (subView === "live_recordings") {
    return (
      <StudentLiveRecordingsView
        courseTitle={course.title}
        batch={course.batch}
        onBack={() => setSubView("hub")}
        onPlayRecording={() => onOpenPlayer()}
      />
    );
  }

  return (
    <div className="space-y-7 font-sans">
      {/* Course Top Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <button
          onClick={onBackToCourses}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0077b6] hover:text-[#002b5b] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Enrolled Courses</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#002b5b] text-white text-xs font-bold">{course.batch}</span>
              <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-[#0077b6] text-xs font-bold uppercase">{course.category}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">{course.title}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Lead Instructor: <strong className="text-slate-800">{course.instructor}</strong></p>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-sky-50 border border-sky-200 text-xs sm:text-sm font-bold text-[#002b5b] shrink-0">
            <span>Progress: <strong>{course.completedLessons}/{course.totalLessons} Lessons ({course.progressPercent}%)</strong></span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#002b5b] via-[#0077b6] to-sky-400 rounded-full" style={{ width: `${course.progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Two Core Learning Cards: (1) Course Modules & (2) Live Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Course Modules */}
        <div
          onClick={() => setSubView("modules")}
          className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 hover:border-[#0077b6] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-sky-100 text-[#0077b6] text-xs font-black">
                {course.modules.length} Modules Available
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#0077b6] transition-colors">
                Course Modules
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                Step-by-step pre-recorded structured syllabus modules, video lectures, and practice assignment files.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-[#0077b6]">
            <span>Explore Course Modules</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Live Sessions (Pre-recorded Live Videos) */}
        <div
          onClick={() => setSubView("live_recordings")}
          className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-110 transition-transform">
                <Video className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                Pre-recorded Live Classes
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                Live Sessions
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                Watch pre-recorded video backups of all live classes conducted in your batch, with instructor notes and practice BIM models.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-700">
            <span>Watch Live Class Recordings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
