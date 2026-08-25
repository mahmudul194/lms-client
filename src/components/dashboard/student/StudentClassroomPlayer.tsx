"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, CheckCircle2, PlayCircle, Lock, Download, ArrowLeft, Flame, Sparkles } from "lucide-react";
import { EnrolledCourse, EnrolledLesson } from "@/types/dashboard";
import CustomVideoPlayer from "./CustomVideoPlayer";
import ModuleCookingCard from "./ModuleCookingCard";

interface StudentClassroomPlayerProps {
  course: EnrolledCourse;
  onBackToCourses: () => void;
}

export default function StudentClassroomPlayer({ course, onBackToCourses }: StudentClassroomPlayerProps) {
  const [courseData, setCourseData] = useState<EnrolledCourse>(course);
  const allLessons = courseData.modules.flatMap((m) => m.lessons);

  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const lId = sp.get("lessonId") || localStorage.getItem("bim_active_lesson_id");
      if (lId && allLessons.some((l) => l.id === lId && l.isUnlocked)) return lId;
    }
    return allLessons.find((l) => l.isUnlocked && !l.isCompleted)?.id || allLessons[0]?.id;
  });

  const [isCookingState, setIsCookingState] = useState(false);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    course.modules.forEach((m, idx) => { if (idx === 0 || m.lessons.some((l) => l.id === activeLessonId)) init[m.id] = true; });
    return init;
  });
  const [lockedAlert, setLockedAlert] = useState<string | null>(null);

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const currentIndex = allLessons.findIndex((l) => l.id === activeLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const toggleModule = (modId: string) => setOpenModules((p) => ({ ...p, [modId]: !p[modId] }));

  const handleSelectLesson = (lesson: EnrolledLesson) => {
    if (!lesson.isUnlocked) {
      setLockedAlert(`Lesson ${lesson.lessonNo} is locked! Complete current lesson first.`);
      setTimeout(() => setLockedAlert(null), 3500); return;
    }
    setLockedAlert(null); setIsCookingState(false); setActiveLessonId(lesson.id);
    if (typeof window !== "undefined") {
      localStorage.setItem("bim_active_lesson_id", lesson.id);
      const sp = new URLSearchParams(window.location.search);
      sp.set("lessonId", lesson.id);
      window.history.replaceState(null, "", `${window.location.pathname}?${sp.toString()}`);
    }
  };

  const handleNextAndComplete = () => {
    setCourseData((prev) => {
      const updated = prev.modules.map((m) => ({
        ...m,
        lessons: m.lessons.map((l) => {
          if (l.id === activeLesson.id) return { ...l, isCompleted: true };
          if (nextLesson && l.id === nextLesson.id) return { ...l, isUnlocked: true };
          return l;
        }),
      }));
      const flat = updated.flatMap((m) => m.lessons);
      const done = flat.filter((l) => l.isCompleted).length;
      return { ...prev, modules: updated, completedLessons: done, progressPercent: Math.round((done / flat.length) * 100) };
    });

    if (nextLesson) {
      handleSelectLesson(nextLesson);
      const nextMod = courseData.modules.find((m) => m.lessons.some((l) => l.id === nextLesson.id));
      if (nextMod) setOpenModules((p) => ({ ...p, [nextMod.id]: true }));
    } else setIsCookingState(true);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white/95 p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBackToCourses} className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center gap-2 cursor-pointer"><ArrowLeft className="w-4 h-4 text-[#0077b6]" /> Back to Courses</button>
          <div><h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{courseData.title}</h2><p className="text-sm font-semibold text-[#0077b6]">{courseData.batch} • {courseData.instructor}</p></div>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200">
          <div className="w-32 bg-slate-200 h-2.5 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-[#0077b6] to-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${courseData.progressPercent}%` }} /></div>
          <span className="text-sm font-black text-slate-800">{courseData.progressPercent}% Done</span>
        </div>
      </div>

      {lockedAlert && <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 font-bold text-sm flex items-center gap-2 animate-bounce"><Lock className="w-5 h-5 text-rose-600" /><span>{lockedAlert}</span></div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          {isCookingState ? <ModuleCookingCard completedCount={courseData.completedLessons} totalCount={allLessons.length} onReviewPrevious={() => handleSelectLesson(allLessons[0])} onBackToCourses={onBackToCourses} /> : <CustomVideoPlayer key={activeLesson.id} videoUrl={activeLesson.videoUrl} title={activeLesson.title} onEnded={handleNextAndComplete} />}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div><span className="text-xs font-black uppercase text-[#0077b6] tracking-wider">{isCookingState ? "Course Milestone" : "Active Lecture"}</span><h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{isCookingState ? "The new module is cooking" : activeLesson.title}</h1><span className="text-sm font-semibold text-slate-500 font-semibold mt-1 block">{isCookingState ? "Weekly batch lectures completed" : `Duration: ${activeLesson.duration}`}</span></div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setIsCookingState(false); if (prevLesson) handleSelectLesson(prevLesson); }} disabled={!prevLesson && !isCookingState} className="px-4 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer disabled:opacity-50"><ChevronLeft className="w-4 h-4" /> Previous</button>
                <button onClick={handleNextAndComplete} className="px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-1.5 shadow-xs bg-[#0077b6] hover:bg-[#002b5b] text-white cursor-pointer">{nextLesson ? <><span>Next & Complete</span><ChevronRight className="w-4 h-4" /></> : <><span>Finish Milestone</span><Sparkles className="w-4 h-4" /></>}</button>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">{isCookingState ? "You have finished all currently published video lessons for this module. Our instructors are recording the upcoming hands-on project lectures." : activeLesson.description}</p>
            {activeLesson.resources?.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Lecture Exercise Files & Project Models</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeLesson.resources.map((r, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 flex items-center justify-between gap-3 text-sm"><div className="truncate"><strong className="text-slate-900 block truncate font-bold">{r.name}</strong><span className="text-xs text-[#0077b6] font-semibold font-medium">{r.size} • {r.type}</span></div><button className="p-2 rounded-xl bg-white hover:bg-sky-600 hover:text-white text-[#0077b6] shadow-2xs border border-sky-200 transition-all cursor-pointer"><Download className="w-4 h-4" /></button></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3"><h3 className="text-lg font-black text-slate-900">Course Syllabus</h3><span className="text-xs font-semibold font-bold px-3 py-1 rounded-full bg-sky-50 text-[#0077b6] border border-sky-200">{courseData.completedLessons}/{allLessons.length} Done</span></div>
          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {courseData.modules.map((m) => (
              <div key={m.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50">
                <button onClick={() => toggleModule(m.id)} className="w-full p-4 flex items-center justify-between gap-2 text-left hover:bg-slate-100 transition-colors cursor-pointer"><div><span className="text-xs font-black uppercase text-[#0077b6] tracking-wider block">{m.moduleNo}</span><strong className="text-sm sm:text-base font-bold text-slate-900 block mt-0.5">{m.title}</strong></div><ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openModules[m.id] ? "rotate-180" : ""}`} /></button>
                {openModules[m.id] && (
                  <div className="p-2 space-y-1.5 bg-white border-t border-slate-100">
                    {m.lessons.map((l) => (
                      <div key={l.id} onClick={() => handleSelectLesson(l)} className={`p-3 rounded-xl flex items-center justify-between gap-3 text-sm transition-all cursor-pointer ${!isCookingState && l.id === activeLesson.id ? "bg-sky-50 border-2 border-[#0077b6] shadow-xs" : l.isUnlocked ? "hover:bg-slate-50 border border-transparent" : "opacity-50 hover:bg-slate-50/50 border border-transparent"}`}>
                        <div className="flex items-center gap-3 truncate">{l.isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : !isCookingState && l.id === activeLesson.id ? <PlayCircle className="w-5 h-5 text-[#0077b6] shrink-0 animate-pulse" /> : l.isUnlocked ? <PlayCircle className="w-5 h-5 text-slate-400 shrink-0" /> : <Lock className="w-5 h-5 text-slate-400 shrink-0" />}<span className={`truncate ${!isCookingState && l.id === activeLesson.id ? "font-bold text-slate-950" : "font-medium text-slate-700"}`}>{l.title}</span></div>
                        <span className="text-xs font-semibold font-medium text-slate-500 shrink-0">{l.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div onClick={() => setIsCookingState(true)} className={`rounded-2xl border-2 border-dashed p-4 transition-all cursor-pointer ${isCookingState ? "bg-sky-50 border-[#0077b6] shadow-xs" : "border-sky-200 bg-sky-50/40 hover:bg-sky-50"}`}>
              <div className="flex items-center justify-between"><div><span className="text-[11px] font-black uppercase text-[#0077b6] tracking-wider block">Upcoming Module</span><strong className="text-xs sm:text-sm font-bold text-slate-800 block mt-0.5">The new module is cooking...</strong></div><Flame className="w-4 h-4 text-amber-500 animate-pulse shrink-0" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
