"use client";

import React, { useState } from "react";
import { Layers, Plus, Users, Calendar, ExternalLink, Copy, Check, MessageSquare, Wrench } from "lucide-react";
import { MOCK_ADMIN_BATCHES, AdminBatch } from "@/data/adminMockData";
import AdminCreateBatchModal from "./AdminCreateBatchModal";

export default function AdminBatchesTab() {
  const [batches, setBatches] = useState<AdminBatch[]>(MOCK_ADMIN_BATCHES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreateBatch = (newBatch: AdminBatch) => setBatches([newBatch, ...batches]);

  const handleCopyFb = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-[#0077b6]" />
            <span>Course Batch & Intake Manager</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Manage live intakes, seat allocations, Facebook support communities, and tuition pricing
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer hover:scale-102 transition-all"
        >
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Launch New Batch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((b) => (
          <div
            key={b.id}
            className="p-6 rounded-3xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md bg-[#0077b6]/10 text-[#0077b6] text-xs font-black">
                  {b.code}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black ${
                    b.status === "Enrolling"
                      ? "bg-sky-100 text-[#0077b6]"
                      : b.status === "Ongoing"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              <div>
                <h4 className="font-black text-slate-900 text-base sm:text-lg leading-snug">{b.name}</h4>
                <span className="text-xs sm:text-sm text-slate-600 font-medium mt-1 block">
                  Trainer: <strong className="text-slate-900">{b.instructor}</strong>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <span className="text-slate-400 line-through text-xs sm:text-sm font-semibold">{b.regularFee}</span>
                <div className="text-right">
                  <span className="text-xs text-emerald-700 font-bold uppercase block">Special Offer</span>
                  <strong className="text-base sm:text-lg font-black text-[#0077b6]">{b.discountFee}</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <MessageSquare className="w-4 h-4 text-[#0077b6] shrink-0" />
                  <span className="font-bold text-slate-800 truncate">FB Secret Group</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopyFb(b.fbGroupUrl, b.id)}
                    title="Copy Link"
                    className="p-1.5 rounded-lg bg-white text-slate-600 hover:text-[#0077b6] border border-sky-200 cursor-pointer"
                  >
                    {copiedId === b.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a href={b.fbGroupUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#0077b6] text-white hover:bg-[#002b5b]">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 space-y-2 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium"><Users className="w-4 h-4" /> Capacity</span>
                <strong className="font-bold text-slate-900">{b.enrolledStudents}/{b.maxSeats} Filled</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium"><Calendar className="w-4 h-4" /> Schedule</span>
                <span className="font-semibold text-slate-800 truncate max-w-[170px]">{b.schedule}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium"><Wrench className="w-4 h-4" /> Software</span>
                <span className="font-bold text-[#0077b6]">{b.softwareVersion}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminCreateBatchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateBatch} />
    </div>
  );
}
