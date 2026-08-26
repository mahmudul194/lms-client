"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { FolderTree, X, Plus, Trash2, Sparkles, Video } from "lucide-react";
import { CourseModuleItem } from "@/types/dashboard";
import { computeModuleTotalDuration } from "@/utils/durationCalculator";
import { useIsMounted } from "@/hooks/useIsMounted";

interface AdminAddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourseName: string;
  onAddModule: (mod: CourseModuleItem) => void;
}

export default function AdminAddModuleModal({
  isOpen,
  onClose,
  selectedCourseName,
  onAddModule,
}: AdminAddModuleModalProps) {
  const mounted = useIsMounted();
  const [moduleNo, setModuleNo] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [lessons, setLessons] = useState<Array<{ title: string; videoUrl: string; duration: string }>>([]);

  if (!mounted || !isOpen) return null;

  const autoDuration = computeModuleTotalDuration(lessons);

  const updateLesson = (idx: number, field: string, val: string) => {
    const updated = [...lessons];
    updated[idx] = { ...updated[idx], [field]: val };
    setLessons(updated);
  };

  const addLesson = () => setLessons([...lessons, { title: "", videoUrl: "", duration: "" }]);
  const removeLesson = (idx: number) => setLessons(lessons.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddModule({
      id: `mod-${Date.now()}`,
      courseId: "revit-combo-pro",
      courseName: selectedCourseName,
      moduleNo: moduleNo.trim() || "Module 01",
      moduleTitle: moduleTitle.trim() || "Untitled Module",
      duration: autoDuration === "0m" ? "1h 00m" : autoDuration,
      lessons: lessons.map((les, idx) => ({
        id: `les-${Date.now()}-${idx}`,
        title: les.title.trim() || `Class Lesson ${idx + 1}`,
        videoUrl: les.videoUrl.trim() || "https://vimeo.com/76979871",
        duration: les.duration.trim() || "45m",
        resourcesCount: 2,
      })),
    });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-8 text-xs sm:text-sm">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Upload Course Syllabus Module</h3>
              <p className="text-xs text-slate-500">Auto-adjusts duration from attached video lectures</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-slate-600 font-bold shrink-0">Course:</span>
            <strong className="font-black text-[#002b5b] truncate">{selectedCourseName}</strong>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-sky-200 shadow-xs font-semibold font-bold text-[#0077b6] shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Auto Duration: {autoDuration} ({lessons.length} Videos)</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-3 gap-3">
            <input type="text" required placeholder="e.g. Module 01" value={moduleNo} onChange={(e) => setModuleNo(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] font-semibold font-bold focus:outline-none" />
            <input type="text" required placeholder="e.g. Advanced Structural Rebar Detailing" value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} className="col-span-2 w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700 block">Class Lessons & Video Streams ({lessons.length})</label>
              <button type="button" onClick={addLesson} className="text-xs font-bold text-[#0077b6] hover:underline flex items-center gap-1 cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Video</button>
            </div>

            {lessons.length === 0 ? (
              <div className="p-5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-center space-y-1.5">
                <Video className="w-5 h-5 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">No video classes added yet.</p>
                <button type="button" onClick={addLesson} className="px-3.5 py-1.5 rounded-xl bg-sky-50 text-[#0077b6] hover:bg-sky-100 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-sky-200">
                  <Plus className="w-3.5 h-3.5" /> Add First Video Lesson
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {lessons.map((les, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs">
                    <input type="text" required placeholder={`Lesson ${idx + 1} Topic`} value={les.title} onChange={(e) => updateLesson(idx, "title", e.target.value)} className="sm:col-span-6 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
                    <input type="url" required placeholder="Video URL" value={les.videoUrl} onChange={(e) => updateLesson(idx, "videoUrl", e.target.value)} className="sm:col-span-4 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 focus:border-[#0077b6] font-semibold text-[11px] focus:outline-none" />
                    <div className="sm:col-span-2 flex items-center gap-1">
                      <input type="text" placeholder="e.g. 45m" value={les.duration} onChange={(e) => updateLesson(idx, "duration", e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-center font-semibold font-bold text-[#0077b6] focus:outline-none" />
                      <button type="button" onClick={() => removeLesson(idx)} className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102">
              Save & Publish {autoDuration !== "0m" ? `(${autoDuration})` : ""}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
