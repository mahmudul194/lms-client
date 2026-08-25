"use client";

import React, { useState } from "react";
import { Layers, Plus, BookOpen, Users, Sparkles, History, Radio } from "lucide-react";
import { PLATFORM_20_COURSES, CatalogCourse } from "@/data/coursesCatalog20";
import { AdminBatch } from "@/data/adminMockData";
import AdminActiveBatchCard from "./AdminActiveBatchCard";
import AdminBatchHistoryTable from "./AdminBatchHistoryTable";
import AdminCreateBatchModal from "./AdminCreateBatchModal";

export default function AdminBatchesTab() {
  const [selectedCourseId, setSelectedCourseId] = useState("revit-combo-pro");
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentCourse: CatalogCourse =
    PLATFORM_20_COURSES.find((c) => c.id === selectedCourseId) || PLATFORM_20_COURSES[0];

  const handleCreateBatch = (newBatch: AdminBatch) => {
    alert(`Successfully launched ${newBatch.name} (${newBatch.code})!`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-[#0077b6]" />
            <span>Course Batch & Intake Manager (160 Batches Lifecycle)</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            20 Professional Courses • 8 Batches each • Managing active 8th batch intakes, seat capacities & archives
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer hover:scale-102 transition-all shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Launch New Batch</span>
        </button>
      </div>

      {/* Course Selector Dropdown */}
      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-3">
        <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#0077b6]" />
          <span>Select Course to View & Manage Batches:</span>
        </label>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm sm:text-base font-bold text-slate-900 focus:border-[#0077b6] focus:outline-none cursor-pointer shadow-xs"
        >
          {PLATFORM_20_COURSES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.category} • Mentor: {c.instructor} • 8 Batches)
            </option>
          ))}
        </select>
      </div>

      {/* Selected Course Metric Summary Banner */}
      <div className="bg-sky-50/80 p-5 rounded-3xl border border-sky-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-[#0077b6] tracking-wider">Selected Course Overview</span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">{currentCourse.name}</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">Lead Mentor: <strong className="text-slate-900">{currentCourse.instructor}</strong></p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold">
          <div className="bg-white px-4 py-2 rounded-2xl border border-sky-200 text-[#002b5b] shadow-2xs">
            <span className="text-slate-400 block text-xs">BATCH LIFECYCLE</span>
            <span>8 Batches (1-8)</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-sky-200 text-emerald-700 shadow-2xs">
            <span className="text-slate-400 block text-xs">LIFETIME ALUMNI</span>
            <span>{currentCourse.totalEnrolled}+ Students</span>
          </div>
        </div>
      </div>

      {/* Tabs: Active 8th Batch vs 1st-7th Archive */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "current"
              ? "bg-[#002b5b] text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>🔥 Current Active Intake ({currentCourse.activeBatch})</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "history"
              ? "bg-[#002b5b] text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <History className="w-4 h-4" />
          <span>📚 Historical Batches (1st to 7th Batch Archive)</span>
        </button>
      </div>

      {/* Tab Body */}
      {activeTab === "current" ? (
        <AdminActiveBatchCard course={currentCourse} onOpenCreateBatch={() => setIsModalOpen(true)} />
      ) : (
        <AdminBatchHistoryTable course={currentCourse} />
      )}

      <AdminCreateBatchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateBatch} />
    </div>
  );
}
