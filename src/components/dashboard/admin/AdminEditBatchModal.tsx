"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Layers, Loader2, Calendar, DollarSign, Users, Globe } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { BatchItem, CreateBatchPayload } from "@/services/api/batchesApi";
import { coursesApi, CourseItem } from "@/services/api/coursesApi";

interface AdminEditBatchModalProps {
  isOpen: boolean;
  batch: BatchItem | null;
  onClose: () => void;
  onUpdate: (id: string, payload: Partial<CreateBatchPayload>) => Promise<void>;
}

export default function AdminEditBatchModal({
  isOpen,
  batch,
  onClose,
  onUpdate,
}: AdminEditBatchModalProps) {
  const mounted = useIsMounted();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [courseId, setCourseId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registrationStart, setRegistrationStart] = useState("");
  const [registrationEnd, setRegistrationEnd] = useState("");
  const [capacity, setCapacity] = useState<number>(30);
  const [status, setStatus] = useState<string>("upcoming");
  const [mode, setMode] = useState<string>("online");
  const [classType, setClassType] = useState<string>("live");
  const [price, setPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [fbGroupLink, setFbGroupLink] = useState("");

  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      coursesApi.getAllCourses({ limit: 100 }).then((res) => {
        if (res.data?.items) setCourses(res.data.items);
      }).catch(console.error);
    }
  }, [isOpen]);

  const formatDateForInput = (iso?: string) => {
    if (!iso) return "";
    try {
      return new Date(iso).toISOString().slice(0, 16);
    } catch {
      return "";
    }
  };

  useEffect(() => {
    if (batch) {
      setName(batch.name || "");
      setCode(batch.code || "");
      setCourseId(batch.course_id || batch.course?.id || "");
      setStartDate(formatDateForInput(batch.start_date));
      setEndDate(formatDateForInput(batch.end_date));
      setRegistrationStart(formatDateForInput(batch.registration_start));
      setRegistrationEnd(formatDateForInput(batch.registration_end));
      setCapacity(batch.capacity || 30);
      setStatus(batch.status || "upcoming");
      setMode(batch.mode || "online");
      setClassType(batch.class_type || "live");
      setPrice(batch.price || 0);
      setDiscountPrice(batch.discount_price || 0);
      setFbGroupLink(batch.fb_group_link || "");
      setError(null);
    }
  }, [batch, isOpen]);

  if (!mounted || !isOpen || !batch) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      setError("Batch Name and Batch Code are required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onUpdate(batch.id, {
        name: name.trim(),
        code: code.trim().toUpperCase(),
        course_id: courseId || undefined,
        start_date: startDate ? new Date(startDate).toISOString() : undefined,
        end_date: endDate ? new Date(endDate).toISOString() : undefined,
        registration_start: registrationStart ? new Date(registrationStart).toISOString() : undefined,
        registration_end: registrationEnd ? new Date(registrationEnd).toISOString() : undefined,
        capacity: Number(capacity) || 0,
        status,
        mode,
        class_type: classType,
        price: Number(price) || 0,
        discount_price: Number(discountPrice) || 0,
        fb_group_link: fbGroupLink.trim() || undefined,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update batch.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-auto max-h-[90vh] overflow-y-auto text-xs sm:text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Edit Batch</h3>
              <p className="text-xs text-slate-500 mt-0.5">Update batch schedules, capacity, pricing and status</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section: Basic Information */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200/60 pb-2">
              <Layers className="w-4 h-4 text-[#0077b6]" /> Basic Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Batch Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-semibold text-xs sm:text-sm"
                  placeholder="e.g. Full Stack Web Development - Batch 1"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Batch Code *</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-mono uppercase font-bold text-xs sm:text-sm"
                  placeholder="FSWD-B1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Linked Course</label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                >
                  <option value="">Select Course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Batch Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Mode & Capacity */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200/60 pb-2">
              <Users className="w-4 h-4 text-[#0077b6]" /> Delivery & Capacity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Class Type</label>
                <select
                  value={classType}
                  onChange={(e) => setClassType(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                >
                  <option value="live">Live Zoom</option>
                  <option value="recorded">Pre-recorded</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Max Capacity</label>
                <input
                  type="number"
                  min="1"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section: Pricing */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200/60 pb-2">
              <DollarSign className="w-4 h-4 text-emerald-600" /> Pricing
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Regular Price (৳)</label>
                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-bold text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Discount Price (৳)</label>
                <input
                  type="number"
                  min="0"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(Number(e.target.value))}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-emerald-700 font-bold text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section: Schedule */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200/60 pb-2">
              <Calendar className="w-4 h-4 text-sky-600" /> Class Schedule
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section: Community / Links */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200/60 pb-2">
              <Globe className="w-4 h-4 text-indigo-600" /> Community / Group Link
            </h4>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Facebook Group / Community URL</label>
              <input
                type="url"
                value={fbGroupLink}
                onChange={(e) => setFbGroupLink(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                placeholder="https://facebook.com/groups/..."
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Batch</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
