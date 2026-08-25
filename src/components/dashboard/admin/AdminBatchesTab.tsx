"use client";

import React, { useState } from "react";
import { Layers, Plus, BookOpen, Sparkles, History, Radio } from "lucide-react";
import { PLATFORM_20_COURSES, CatalogCourse } from "@/data/coursesCatalog20";
import { AdminBatch } from "@/data/adminMockData";
import AdminActiveBatchCard from "./AdminActiveBatchCard";
import AdminBatchHistoryTable from "./AdminBatchHistoryTable";
import AdminCreateBatchModal from "./AdminCreateBatchModal";

export default function AdminBatchesTab() {
  const [selectedCourseId, setSelectedCourseId] = useState("revit-combo-pro");
  const [selectedBatch, setSelectedBatch] = useState("8th Batch");
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
            <span>Course Batch & Intake Manager</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            20 Professional Courses • 8 Batches each • Select course & batch from dropdowns below
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

      {/* 2-Column Split Dropdowns: (1) Course + (2) Batch */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-slate-50 p-6 rounded-3xl border border-slate-200">
        {/* Dropdown 1: Select Course */}
        <div className="md:col-span-7 space-y-2">
          <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#0077b6]" />
            <span>1. Select Course (20 Courses):</span>
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-900 focus:border-[#0077b6] focus:outline-none cursor-pointer shadow-xs"
          >
            {PLATFORM_20_COURSES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.category} • Mentor: {c.instructor})
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown 2: Select Batch */}
        <div className="md:col-span-5 space-y-2">
          <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0077b6]" />
            <span>2. Select Batch (8 Batches):</span>
          </label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-900 focus:border-[#0077b6] focus:outline-none cursor-pointer shadow-xs"
          >
            <option value="8th Batch">8th Batch (🔥 Current Active Intake)</option>
            <option value="7th Batch">7th Batch (Archived - 50 Students)</option>
            <option value="6th Batch">6th Batch (Archived - 48 Students)</option>
            <option value="5th Batch">5th Batch (Archived - 45 Students)</option>
            <option value="4th Batch">4th Batch (Archived - 42 Students)</option>
            <option value="3rd Batch">3rd Batch (Archived - 40 Students)</option>
            <option value="2nd Batch">2nd Batch (Archived - 38 Students)</option>
            <option value="1st Batch">1st Batch (Archived - 35 Students)</option>
            <option value="all">View All Batches (1st to 8th Lifecycle)</option>
          </select>
        </div>
      </div>

      {/* Selected Course & Batch Metric Summary Bar */}
      <div className="bg-sky-50/80 p-5 rounded-3xl border border-sky-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-[#0077b6] tracking-wider">Active Selection</span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
            {currentCourse.name} — <span className="text-[#0077b6]">{selectedBatch === "all" ? "All 8 Batches" : selectedBatch}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">Lead Mentor: <strong className="text-slate-900">{currentCourse.instructor}</strong></p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold">
          <div className="bg-white px-4 py-2 rounded-2xl border border-sky-200 text-[#002b5b] shadow-2xs">
            <span className="text-slate-400 block text-xs">SELECTED BATCH</span>
            <span>{selectedBatch === "all" ? "1-8 Batches" : selectedBatch}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-sky-200 text-emerald-700 shadow-2xs">
            <span className="text-slate-400 block text-xs">TOTAL ALUMNI</span>
            <span>{currentCourse.totalEnrolled}+ Students</span>
          </div>
        </div>
      </div>

      {/* Batch Views based on Dropdown Selection */}
      {selectedBatch === "8th Batch" ? (
        <AdminActiveBatchCard course={currentCourse} onOpenCreateBatch={() => setIsModalOpen(true)} />
      ) : selectedBatch === "all" ? (
        <div className="space-y-6">
          <AdminActiveBatchCard course={currentCourse} onOpenCreateBatch={() => setIsModalOpen(true)} />
          <AdminBatchHistoryTable course={currentCourse} />
        </div>
      ) : (
        <AdminBatchHistoryTable course={currentCourse} />
      )}

      <AdminCreateBatchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateBatch} />
    </div>
  );
}
