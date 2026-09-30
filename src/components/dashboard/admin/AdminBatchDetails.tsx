"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Layers, Edit, Trash2, Clock, DollarSign, Calendar, Users } from "lucide-react";
import { BatchItem, batchesApi } from "@/services/api/batchesApi";

interface AdminBatchDetailsProps {
  batchId: string;
  onBack: () => void;
  onEdit?: (batch: BatchItem) => void;
  onDelete?: (batch: BatchItem) => void;
}

export default function AdminBatchDetails({ batchId, onBack, onEdit, onDelete }: AdminBatchDetailsProps) {
  const [batch, setBatch] = useState<BatchItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await batchesApi.getBatchById(batchId);
        if (res.statusCode === 200 && res.data) {
          setBatch(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [batchId]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Loading batch details...</div>;
  }

  if (!batch) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold">
        Batch not found.
        <button onClick={onBack} className="block mx-auto mt-4 px-6 py-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors text-slate-800">Go Back</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#0077b6]" /> {batch.name}
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-semibold font-mono">{batch.code} • Course: {batch.course?.title || "Unknown"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button 
              onClick={() => onEdit(batch)}
              className="p-2.5 rounded-xl bg-sky-50 text-[#0077b6] hover:bg-[#0077b6] hover:text-white transition-colors cursor-pointer" 
              title="Edit Batch"
            >
              <Edit className="w-5 h-5" />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(batch)}
              className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer" 
              title="Delete Batch"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Schedule & Registration</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1">
                <div className="text-xs text-slate-500 font-bold uppercase flex items-center gap-1.5"><Calendar className="w-4 h-4"/> Class Start</div>
                <span className="font-black text-slate-900">{batch.start_date ? new Date(batch.start_date).toLocaleString() : "TBA"}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1">
                <div className="text-xs text-slate-500 font-bold uppercase flex items-center gap-1.5"><Calendar className="w-4 h-4"/> Class End</div>
                <span className="font-black text-slate-900">{batch.end_date ? new Date(batch.end_date).toLocaleString() : "TBA"}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1">
                <div className="text-xs text-slate-500 font-bold uppercase flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-500"/> Reg Start</div>
                <span className="font-black text-slate-900">{batch.registration_start ? new Date(batch.registration_start).toLocaleString() : "TBA"}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1">
                <div className="text-xs text-slate-500 font-bold uppercase flex items-center gap-1.5"><Clock className="w-4 h-4 text-rose-500"/> Reg End</div>
                <span className="font-black text-slate-900">{batch.registration_end ? new Date(batch.registration_end).toLocaleString() : "TBA"}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Student Roster</h3>
            <div className="text-center py-8 text-slate-500 font-semibold border-2 border-dashed border-slate-200 rounded-xl bg-white flex flex-col items-center justify-center">
              <Users className="w-8 h-8 mb-2 text-slate-300" />
              Student management table interface goes here.
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Configuration</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-semibold">Status</span>
                <span className={`px-2.5 py-1 rounded-lg font-bold text-xs uppercase ${batch.status === 'upcoming' ? 'bg-sky-100 text-sky-700' : batch.status === 'ongoing' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{batch.status}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-semibold">Capacity</span>
                <span className="font-bold text-slate-800">{batch.enrolled_count || 0} / {batch.capacity} Students</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-semibold">Mode</span>
                <span className="font-bold text-slate-800 capitalize">{batch.mode}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-semibold">Class Type</span>
                <span className="font-bold text-slate-800 capitalize">{batch.class_type}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-semibold">Timezone</span>
                <span className="font-bold text-slate-800">{batch.timezone}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5"><DollarSign className="w-4 h-4"/> Regular Fee</span>
                <span className="font-black text-slate-800">৳{batch.price}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-emerald-500"/> Discount Offer</span>
                <span className="font-black text-emerald-600">৳{batch.discount_price}</span>
              </li>
            </ul>
          </div>
          
          {batch.fb_group_link && (
            <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 text-center shadow-inner">
              <h3 className="text-sm font-bold text-[#002b5b] mb-3 uppercase tracking-wider">Support Group</h3>
              <a href={batch.fb_group_link} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white rounded-xl font-black transition-all hover:scale-102">
                Open Facebook Group
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
