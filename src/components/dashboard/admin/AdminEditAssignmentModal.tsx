"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, FileCheck, Loader2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { AssignmentItem, CreateAssignmentPayload } from "@/services/api/assignmentsApi";
import { batchesApi, BatchItem } from "@/services/api/batchesApi";

interface AdminEditAssignmentModalProps {
  isOpen: boolean;
  assignment: AssignmentItem | null;
  onClose: () => void;
  onUpdate: (id: string, payload: Partial<CreateAssignmentPayload>) => Promise<void>;
}

export default function AdminEditAssignmentModal({
  isOpen,
  assignment,
  onClose,
  onUpdate,
}: AdminEditAssignmentModalProps) {
  const mounted = useIsMounted();
  const [title, setTitle] = useState("");
  const [batchId, setBatchId] = useState("");
  const [totalMarks, setTotalMarks] = useState<number>(100);
  const [dueAt, setDueAt] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string>("published");

  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      batchesApi.getAllBatches({ limit: 100 }).then((res) => {
        if (res.data?.items) setBatches(res.data.items);
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
    if (assignment) {
      setTitle(assignment.title || "");
      setBatchId(assignment.batchId || assignment.batch?.id || "");
      setTotalMarks(assignment.totalMarks ?? 100);
      setDueAt(formatDateForInput(assignment.dueAt));
      setAttachmentUrl(assignment.attachmentUrl || "");
      setDescription(assignment.description || "");
      setStatus(assignment.status || "published");
      setError(null);
    }
  }, [assignment, isOpen]);

  if (!mounted || !isOpen || !assignment) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Assignment title is required.");
      return;
    }
    if (!batchId) {
      setError("Please select a batch.");
      return;
    }
    if (!dueAt) {
      setError("Submission deadline is required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onUpdate(assignment.id, {
        title: title.trim(),
        batchId,
        totalMarks: Number(totalMarks) || 100,
        dueAt: new Date(dueAt).toISOString(),
        attachmentUrl: attachmentUrl.trim() || undefined,
        description: description.trim() || undefined,
        status,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update assignment.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-auto max-h-[90vh] overflow-y-auto text-xs sm:text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Edit Assignment</h3>
              <p className="text-xs text-slate-500 mt-0.5">Update assignment briefing, marks, and deadline</p>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Assignment Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-semibold text-xs sm:text-sm"
              placeholder="e.g. Project 01: Complete Revit Floor Plan & Elevation"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Assigned Batch *</label>
              <select
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                required
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              >
                <option value="">Select Batch</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Total Marks</label>
              <input
                type="number"
                min="1"
                value={totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Due Date & Time *</label>
              <input
                type="datetime-local"
                value={dueAt}
                onChange={(e) => setDueAt(e.target.value)}
                required
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Attachment / Resource Link</label>
            <input
              type="url"
              value={attachmentUrl}
              onChange={(e) => setAttachmentUrl(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              placeholder="https://drive.google.com/... or https://..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Description & Instructions</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm resize-none"
              placeholder="Detailed guidelines, model submission requirements..."
            />
          </div>

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
                <span>Update Assignment</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
