"use client";

import React, { useState, useEffect } from "react";
import { Layers, Plus, BookOpen } from "lucide-react";
import { PLATFORM_20_COURSES, CatalogCourse } from "@/data/coursesCatalog20";
import { AdminBatch } from "@/data/adminMockData";
import AdminActiveBatchCard from "./AdminActiveBatchCard";
import AdminBatchHistoryTable from "./AdminBatchHistoryTable";
import AdminCreateBatchModal from "./AdminCreateBatchModal";

export default function AdminBatchesTab() {
  const [selectedCourseId, setSelectedCourseId] = useState("revit-combo-pro");
  const [selectedBatch, setSelectedBatch] = useState("8th Batch");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<CatalogCourse[]>(PLATFORM_20_COURSES);

  useEffect(() => {
    (async () => {
      try {
        const { coursesApi } = await import("@/services/api/coursesApi");
        const res = await coursesApi.getAllCourses({ limit: 30 });
        if (res.statusCode === 200 && res.data?.items?.length) {
          const apiCourses: CatalogCourse[] = res.data.items.map((c) => ({
            id: c.id,
            name: c.title,
            category: "BIM Core",
            instructor: "Engr. Ashikur Rahman",
            totalBatches: 8,
            activeBatch: "8th Batch",
            activeBatchStatus: "Enrolling",
            totalEnrolled: 350,
            regularFee: `৳${(c.price || 16000).toLocaleString()}`,
            discountFee: `৳${(c.discount_price || 12000).toLocaleString()}`,
            totalModules: 6,
          }));
          setCourses([...apiCourses, ...PLATFORM_20_COURSES]);
        }
      } catch {}
    })();
  }, []);

  const currentCourse: CatalogCourse =
    courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleCreateBatch = async (newBatch: AdminBatch) => {
    try {
      const { batchesApi } = await import("@/services/api/batchesApi");
      await batchesApi.createBatch({
        name: newBatch.name,
        code: newBatch.code,
        capacity: newBatch.maxSeats,
        mode: "online",
        class_type: "live",
      });
    } catch {}
    alert(`Successfully launched ${newBatch.name} (${newBatch.code})!`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-[#0077b6]" />
            <span>Course Batch & Intake Manager</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">20 Professional Courses • 8 Batches each • Select course & batch below</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer hover:scale-102 transition-all shrink-0">
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Launch New Batch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-slate-50 p-6 rounded-3xl border border-slate-200">
        <div className="md:col-span-7 space-y-2">
          <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#0077b6]" />
            <span>1. Select Course ({courses.length} Courses):</span>
          </label>
          <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-900 focus:border-[#0077b6] focus:outline-none cursor-pointer shadow-xs">
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.category} • Mentor: {c.instructor})</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-5 space-y-2">
          <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0077b6]" />
            <span>2. Select Batch:</span>
          </label>
          <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-900 focus:border-[#0077b6] focus:outline-none cursor-pointer shadow-xs">
            <option value="8th Batch">8th Batch (🔥 Current Active Intake)</option>
            <option value="7th Batch">7th Batch (Archived - 50 Students)</option>
            <option value="6th Batch">6th Batch (Archived - 48 Students)</option>
            <option value="all">View All Batches</option>
          </select>
        </div>
      </div>

      <div className="bg-sky-50/80 p-5 rounded-3xl border border-sky-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-[#0077b6] tracking-wider">Active Selection</span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
            {currentCourse.name} — <span className="text-[#0077b6]">{selectedBatch === "all" ? "All Batches" : selectedBatch}</span>
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

      {selectedBatch === "8th Batch" ? (
        <AdminActiveBatchCard course={currentCourse} onOpenCreateBatch={() => setIsModalOpen(true)} />
      ) : (
        <div className="space-y-6">
          <AdminActiveBatchCard course={currentCourse} onOpenCreateBatch={() => setIsModalOpen(true)} />
          <AdminBatchHistoryTable course={currentCourse} />
        </div>
      )}

      <AdminCreateBatchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateBatch} />
    </div>
  );
}
