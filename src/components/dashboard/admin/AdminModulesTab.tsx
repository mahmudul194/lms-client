"use client";

import React, { useState } from "react";
import { FolderTree, Plus, Video, Clock, Sparkles, Radio, CheckCircle2 } from "lucide-react";
import { MOCK_COURSE_MODULES } from "@/data/adminCourseContentMockData";
import { PLATFORM_20_COURSES } from "@/data/coursesCatalog20";
import { CourseModuleItem } from "@/types/dashboard";
import { computeModuleTotalDuration } from "@/utils/durationCalculator";
import AdminAddModuleModal from "./AdminAddModuleModal";

export default function AdminModulesTab() {
  const [modules, setModules] = useState<CourseModuleItem[]>(MOCK_COURSE_MODULES);
  const [selectedCourseId, setSelectedCourseId] = useState("revit-combo-pro");
  const [selectedBatch, setSelectedBatch] = useState("8th Batch");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentCourse = PLATFORM_20_COURSES.find((c) => c.id === selectedCourseId) || PLATFORM_20_COURSES[0];
  const filteredModules = modules.filter((m) => m.courseId === selectedCourseId || selectedCourseId === "revit-combo-pro");

  const totalVideos = filteredModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const allLessons = filteredModules.flatMap((m) => m.lessons);
  const totalCourseDuration = computeModuleTotalDuration(allLessons);

  const handleAddModule = (newMod: CourseModuleItem) => {
    newMod.courseId = selectedCourseId;
    setModules([...modules, newMod]);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FolderTree className="w-6 h-6 text-[#0077b6]" />
            <span>Course Content & Lecture Video Manager</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            20 Professional Courses • 8 Batches each • Uploading unlisted YouTube lectures for active 8th batches
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Add Lecture / Module</span>
        </button>
      </div>

      {/* Selectors: 20 Courses & 8 Batches */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-200">
        <div className="md:col-span-8 space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Select Course (20 Courses Available):</label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900 focus:border-[#0077b6] focus:outline-none cursor-pointer"
          >
            {PLATFORM_20_COURSES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.category} • Lead: {c.instructor})
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Select Batch (8 Batches):</label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900 focus:border-[#0077b6] focus:outline-none cursor-pointer"
          >
            <option value="8th Batch">8th Batch (🔥 Active - Video Uploading)</option>
            <option value="7th Batch">7th Batch (Archived - 50 Students)</option>
            <option value="6th Batch">6th Batch (Archived - 48 Students)</option>
            <option value="5th Batch">5th Batch (Archived - 45 Students)</option>
            <option value="4th Batch">4th Batch (Archived - 42 Students)</option>
            <option value="3rd Batch">3rd Batch (Archived - 40 Students)</option>
            <option value="2nd Batch">2nd Batch (Archived - 38 Students)</option>
            <option value="1st Batch">1st Batch (Archived - 35 Students)</option>
          </select>
        </div>
      </div>

      {/* Active Batch Status & Live Stats */}
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

      {/* Modules List */}
      <div className="space-y-4">
        {filteredModules.map((mod) => (
          <div key={mod.id} className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-[#002b5b] text-white text-xs font-bold">{mod.moduleNo}</span>
                <strong className="text-base sm:text-lg font-black text-slate-900">{mod.moduleTitle}</strong>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-bold flex items-center gap-1.5 shadow-2xs">
                  <Clock className="w-4 h-4 text-[#0077b6]" /> {computeModuleTotalDuration(mod.lessons) || mod.duration}
                </span>
                <span className="text-xs text-slate-500 font-semibold">({mod.lessons.length} Lectures)</span>
              </div>
            </div>

            <div className="space-y-2">
              {mod.lessons.map((les) => (
                <div key={les.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs sm:text-sm shadow-2xs">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center shrink-0"><Video className="w-4 h-4" /></div>
                    <span className="font-bold text-slate-900 truncate">{les.title}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-slate-600 font-semibold">
                    <span className="px-2.5 py-1 rounded-md bg-sky-50 text-[#0077b6] font-bold text-xs">{les.duration}</span>
                    <span className="text-xs text-slate-500">{les.resourcesCount} Files Attached</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AdminAddModuleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedCourseName={`${currentCourse.name} (${selectedBatch})`} onAddModule={handleAddModule} />
    </div>
  );
}
