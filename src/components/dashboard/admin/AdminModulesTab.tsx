"use client";

import React, { useState, useEffect } from "react";
import { FolderTree, Plus, Video, Sparkles, Radio } from "lucide-react";
import { PLATFORM_20_COURSES } from "@/data/coursesCatalog20";
import { CourseModuleItem } from "@/types/dashboard";
import { computeModuleTotalDuration } from "@/utils/durationCalculator";
import AdminAddModuleModal from "./AdminAddModuleModal";
import AdminModuleCard from "./AdminModuleCard";

export default function AdminModulesTab() {
  const [modules, setModules] = useState<CourseModuleItem[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("revit-combo-pro");
  const [selectedBatch, setSelectedBatch] = useState("8th Batch");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentCourse = PLATFORM_20_COURSES.find((c) => c.id === selectedCourseId) || PLATFORM_20_COURSES[0];

  useEffect(() => {
    (async () => {
      try {
        const { modulesApi } = await import("@/services/api/modulesApi");
        const res = await modulesApi.getAllModules({ limit: 50 });
        if (res.statusCode === 200 && res.data?.items) {
          const apiMods: CourseModuleItem[] = res.data.items.map((m, idx) => ({
            id: m.id,
            courseId: m.course_id || selectedCourseId,
            courseName: currentCourse.name,
            moduleNo: `Module ${idx + 1}`,
            moduleTitle: m.title,
            duration: "3h 40m",
            lessons: [],
          }));
          setModules(apiMods);
        }
      } catch {}
    })();
  }, [selectedCourseId, currentCourse.name]);

  const filteredModules = modules.filter((m) => m.courseId === selectedCourseId || selectedCourseId === "revit-combo-pro");
  const totalVideos = filteredModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const allLessons = filteredModules.flatMap((m) => m.lessons);
  const totalCourseDuration = computeModuleTotalDuration(allLessons);

  const handleAddModule = async (newMod: CourseModuleItem) => {
    newMod.courseId = selectedCourseId;
    try {
      const { modulesApi } = await import("@/services/api/modulesApi");
      await modulesApi.createModule({
        course_id: selectedCourseId,
        title: newMod.moduleTitle,
        order: modules.length + 1,
      });
    } catch {}
    setModules((prev) => [...prev, newMod]);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FolderTree className="w-6 h-6 text-[#0077b6]" />
            <span>Course Content & Lecture Video Manager</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">20 Professional Courses • 8 Batches each • Uploading lectures for active cohorts</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0">
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Add Lecture / Module</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-200">
        <div className="md:col-span-8 space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Select Course (20 Courses Available):</label>
          <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900 focus:border-[#0077b6] focus:outline-none cursor-pointer">
            {PLATFORM_20_COURSES.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.category} • Lead: {c.instructor})</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Select Batch (8 Batches):</label>
          <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900 focus:border-[#0077b6] focus:outline-none cursor-pointer">
            <option value="8th Batch">8th Batch (🔥 Active - Video Uploading)</option>
            <option value="7th Batch">7th Batch (Archived - 50 Students)</option>
            <option value="6th Batch">6th Batch (Archived - 48 Students)</option>
            <option value="5th Batch">5th Batch (Archived - 45 Students)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-sky-50/70 border border-sky-200 p-4 rounded-2xl text-xs sm:text-sm font-bold">
        <div className="flex items-center gap-2 text-[#002b5b]">
          <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Selected: <strong>{currentCourse.name}</strong> • <strong>{selectedBatch}</strong></span>
        </div>
        <div className="flex items-center gap-3 text-slate-700">
          <span className="flex items-center gap-1.5 text-[#0077b6]"><Video className="w-4 h-4" /> {totalVideos} Published Lectures</span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1.5 text-emerald-700"><Sparkles className="w-4 h-4 text-emerald-600" /> {totalCourseDuration}</span>
        </div>
      </div>

      <div className="space-y-4">
        {filteredModules.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-semibold bg-slate-50 rounded-2xl border border-slate-200">
            No modules or lectures uploaded for this course yet. Click &quot;Add Lecture / Module&quot; to publish curriculum.
          </div>
        ) : (
          filteredModules.map((mod) => (
            <AdminModuleCard key={mod.id} mod={mod} />
          ))
        )}
      </div>

      <AdminAddModuleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedCourseName={`${currentCourse.name} (${selectedBatch})`} onAddModule={handleAddModule} />
    </div>
  );
}
