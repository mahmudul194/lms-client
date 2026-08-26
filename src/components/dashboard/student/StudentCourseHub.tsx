"use client";

import React, { useState } from "react";
import { ArrowLeft, BookOpen, Video, PlayCircle, CheckCircle2, Lock, ExternalLink, MessageSquare } from "lucide-react";
import { EnrolledCourse } from "@/types/dashboard";

interface StudentCourseHubProps {
  course: EnrolledCourse;
  onBackToCourses: () => void;
  onOpenPlayer: (lessonId?: string) => void;
}

export default function StudentCourseHub({ course, onBackToCourses, onOpenPlayer }: StudentCourseHubProps) {
  const [activeTab, setActiveTab] = useState<"modules" | "live">("modules");
  const [openModuleId, setOpenModuleId] = useState<string>(course.modules[0]?.id || "");

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const nextLesson = allLessons.find((l) => l.isUnlocked && !l.isCompleted) || allLessons[0];

  return (
    <div className="space-y-6 font-sans">
      {/* Course Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <button onClick={onBackToCourses} className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0077b6] hover:text-[#002b5b] transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" /><span>Back to All Enrolled Courses</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#002b5b] text-white text-xs font-bold">{course.batch}</span>
              <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-[#0077b6] text-xs font-bold uppercase">{course.category}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">{course.title}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Lead Instructor: <strong className="text-slate-800">{course.instructor}</strong></p>
          </div>

          <button onClick={() => onOpenPlayer(nextLesson?.id)} className="px-6 py-3.5 rounded-2xl bg-[#002b5b] hover:bg-[#001830] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102 cursor-pointer shrink-0">
            <PlayCircle className="w-5 h-5 text-sky-400" />
            <span>Continue Learning (Class {nextLesson?.lessonNo || 1})</span>
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700">
            <span>Overall Course Progress:</span>
            <span className="text-[#0077b6]">{course.completedLessons} of {course.totalLessons} Lessons Completed ({course.progressPercent}%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#002b5b] via-[#0077b6] to-sky-400 rounded-full" style={{ width: `${course.progressPercent}%` }} />
          </div>
        </div>

        {/* Switcher Tabs */}
        <div className="flex items-center gap-3 pt-2">
          <button onClick={() => setActiveTab("modules")} className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${activeTab === "modules" ? "bg-[#002b5b] text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
            <BookOpen className="w-4 h-4" /><span>Course Modules ({course.modules.length} Modules)</span>
          </button>
          <button onClick={() => setActiveTab("live")} className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${activeTab === "live" ? "bg-[#002b5b] text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
            <Video className="w-4 h-4 text-emerald-400 animate-pulse" /><span>Live Sessions & Routine</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Course Modules */}
      {activeTab === "modules" && (
        <div className="space-y-4">
          {course.modules.map((m) => {
            const isOpen = openModuleId === m.id;
            return (
              <div key={m.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
                <button onClick={() => setOpenModuleId(isOpen ? "" : m.id)} className="w-full p-5 sm:p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-sky-50 text-[#0077b6] text-xs font-black">{m.moduleNo}</span>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">{m.title}</h4>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">{m.lessons.length} Lectures</span>
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-6 pt-0 space-y-2 border-t border-slate-100">
                    {m.lessons.map((les) => (
                      <div key={les.id} onClick={() => les.isUnlocked && onOpenPlayer(les.id)} className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs sm:text-sm transition-all ${les.isUnlocked ? "hover:border-[#0077b6] hover:bg-sky-50/50 cursor-pointer bg-white" : "opacity-60 bg-slate-50 cursor-not-allowed"}`}>
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          {les.isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : les.isUnlocked ? <PlayCircle className="w-4 h-4 text-[#0077b6] shrink-0" /> : <Lock className="w-4 h-4 text-slate-400 shrink-0" />}
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
      )}

      {/* Tab 2: Live Sessions */}
      {activeTab === "live" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="p-6 rounded-3xl bg-[#001830] text-white space-y-5 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-sky-400 tracking-wider">UPCOMING LIVE ZOOM CLASS</span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-1">Class 29: Structural Beam-Slab Framing</h3>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">Tonight 9:00 PM</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10"><span className="text-slate-400 block text-xs">Zoom Meeting ID</span><strong className="text-base font-black text-white">872 9102 4819</strong></div>
              <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10"><span className="text-slate-400 block text-xs">Meeting Passcode</span><strong className="text-base font-black text-white">BIM2026HOST</strong></div>
            </div>
            <a href="https://zoom.us/j/87291024819" target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-2xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102">
              <Video className="w-5 h-5" /><span>Join Live Zoom Session Now</span><ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-[#0077b6]" />
              <div><strong className="text-slate-900 block font-bold">{course.batch} Facebook Secret Group</strong><span className="text-slate-500 text-xs">Daily Q&A support and class links are posted here</span></div>
            </div>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#0077b6] text-white font-bold text-xs rounded-xl hover:bg-[#002b5b]">Visit Group</a>
          </div>
        </div>
      )}
    </div>
  );
}
