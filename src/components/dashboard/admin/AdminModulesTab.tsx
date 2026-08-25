"use client";

import React, { useState } from "react";
import { FolderTree, Plus, Video, Clock, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { MOCK_COURSE_MODULES } from "@/data/adminCourseContentMockData";
import { CourseModuleItem } from "@/types/dashboard";
import { computeModuleTotalDuration } from "@/utils/durationCalculator";
import AdminAddModuleModal from "./AdminAddModuleModal";

export default function AdminModulesTab() {
  const [modules, setModules] = useState<CourseModuleItem[]>(MOCK_COURSE_MODULES);
  const [selectedCourse, setSelectedCourse] = useState("revit-combo-pro");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const courseNames: Record<string, string> = {
    "revit-combo-pro": "Revit Combo Pro (Arch + Struct + MEP)",
    "tekla-steel-pro": "Tekla Steel Detailing Masterclass",
    "revit-dynamo": "Revit Dynamo BIM Automation",
  };

  const filteredModules = modules.filter(
    (m) => m.courseId === selectedCourse || selectedCourse === "all"
  );

  const totalVideos = filteredModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const allLessons = filteredModules.flatMap((m) => m.lessons);
  const totalCourseDuration = computeModuleTotalDuration(allLessons);

  const handleAddModule = (newMod: CourseModuleItem) => {
    newMod.courseId = selectedCourse === "all" ? "revit-combo-pro" : selectedCourse;
    setModules([...modules, newMod]);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FolderTree className="w-6 h-6 text-[#0077b6]" />
            <span>Course Content & Module Manager</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Organize syllabus modules, embed unlisted YouTube lecture URLs, and attach BIM exercise models
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Add New Module</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(courseNames).map(([id, title]) => (
            <button
              key={id}
              onClick={() => setSelectedCourse(id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCourse === id
                  ? "bg-[#002b5b] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold text-slate-700">
          <span className="flex items-center gap-1.5 text-[#0077b6]">
            <Video className="w-4 h-4" /> {totalVideos} Video Lectures
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1.5 text-emerald-700">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Duration: {totalCourseDuration}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {filteredModules.map((mod) => {
          const dynamicModDuration = computeModuleTotalDuration(mod.lessons) || mod.duration;
          return (
            <div key={mod.id} className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-[#002b5b] text-white text-xs font-bold">
                    {mod.moduleNo}
                  </span>
                  <strong className="text-base sm:text-lg font-black text-slate-900">{mod.moduleTitle}</strong>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-bold flex items-center gap-1.5 shadow-2xs">
                    <Clock className="w-4 h-4 text-[#0077b6]" /> {dynamicModDuration}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">({mod.lessons.length} Lessons)</span>
                </div>
              </div>

              <div className="space-y-2">
                {mod.lessons.map((les) => (
                  <div
                    key={les.id}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs sm:text-sm shadow-2xs"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center shrink-0">
                        <Video className="w-4 h-4" />
                      </div>
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
          );
        })}
      </div>

      <AdminAddModuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCourseName={courseNames[selectedCourse] || "Course"}
        onAddModule={handleAddModule}
      />
    </div>
  );
}
