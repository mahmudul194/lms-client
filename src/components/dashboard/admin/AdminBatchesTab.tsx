"use client";

import React, { useState } from "react";
import { Layers, Plus, Users, Calendar, ExternalLink, Copy, Check, MessageSquare, Wrench } from "lucide-react";
import { MOCK_ADMIN_BATCHES, AdminBatch } from "@/data/adminMockData";
import AdminCreateBatchModal from "./AdminCreateBatchModal";

export default function AdminBatchesTab() {
  const [batches, setBatches] = useState<AdminBatch[]>(MOCK_ADMIN_BATCHES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreateBatch = (newBatch: AdminBatch) => {
    setBatches([newBatch, ...batches]);
  };

  const handleCopyFb = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0077b6]" />
            <span>Course Batch & Intake Manager</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage live batches, FB secret groups, discount pricing, and syllabus metadata
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4 text-sky-400" />
          <span>Launch New Batch</span>
        </button>
      </div>

      {/* Batch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((b) => (
          <div
            key={b.id}
            className="p-6 rounded-3xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-[#0077b6]/10 text-[#0077b6] font-semibold text-xs font-bold">
                {b.code}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
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
              <h4 className="font-black text-slate-900 text-base">{b.name}</h4>
              <span className="text-xs text-slate-500 font-medium mt-0.5 block">
                Lead Trainer: <strong className="text-slate-800">{b.instructor}</strong>
              </span>
            </div>

            {/* Price & Discounts */}
            <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-400 line-through font-semibold">{b.regularFee}</span>
              <div className="text-right">
                <span className="text-[10px] text-emerald-700 font-bold uppercase block">Offer Price</span>
                <strong className="text-sm font-black text-[#0077b6] font-semibold">{b.discountFee}</strong>
              </div>
            </div>

            {/* FB Secret Support Group */}
            <div className="p-3 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 min-w-0 pr-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#0077b6] shrink-0" />
                <span className="font-bold text-slate-800 truncate text-[11px]">FB Secret Group</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleCopyFb(b.fbGroupUrl, b.id)}
                  title="Copy FB Link"
                  className="p-1 rounded bg-white text-slate-600 hover:text-[#0077b6] border border-sky-200 text-[10px] cursor-pointer"
                >
                  {copiedId === b.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
                <a
                  href={b.fbGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded bg-[#0077b6] text-white hover:bg-[#005a8c] text-[10px]"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Metadata (Schedule, Duration, Software) */}
            <div className="text-xs text-slate-600 space-y-1.5 pt-1 border-t border-slate-200">
              <p className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Users className="w-3.5 h-3.5" /> Capacity
                </span>
                <strong className="font-semibold text-slate-900">{b.enrolledStudents}/{b.maxSeats} Filled</strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5" /> Schedule
                </span>
                <span className="font-medium text-slate-700 truncate max-w-[170px]">{b.schedule}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Wrench className="w-3.5 h-3.5" /> Software
                </span>
                <span className="font-semibold text-[11px] text-[#0077b6] truncate max-w-[170px]">{b.softwareVersion}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <AdminCreateBatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateBatch}
      />
    </div>
  );
}
