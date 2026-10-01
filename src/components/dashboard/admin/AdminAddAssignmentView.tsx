"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, BookOpen } from "lucide-react";
import { CreateAssignmentPayload } from "@/services/api/assignmentsApi";
import { batchesApi } from "@/services/api/batchesApi";

interface AdminAddAssignmentViewProps {
  onBack: () => void;
  onAdd: (assignment: CreateAssignmentPayload) => void;
}

export default function AdminAddAssignmentView({ onBack, onAdd }: AdminAddAssignmentViewProps) {
  const [courses, setCourses] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [form, setForm] = useState<CreateAssignmentPayload>({
    batchId: "",
    title: "",
    description: "",
    attachmentUrl: "",
    totalMarks: 100,
    dueAt: "",
    status: "published",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { coursesApi } = await import("@/services/api/coursesApi");
        const res = await coursesApi.getAllCourses({ limit: 100 });
        if (res.statusCode === 200 && res.data?.items) {
          setCourses(res.data.items);
        }
      } catch (e) {
        console.error("Failed to fetch courses", e);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      (async () => {
        try {
          const res = await batchesApi.getAllBatches({ course_id: selectedCourseId, limit: 100 });
          if (res.statusCode === 200 && res.data?.items) {
            setBatches(res.data.items);
          }
        } catch (e) {
          console.error("Failed to fetch batches", e);
        }
      })();
    } else {
      setBatches([]);
    }
  }, [selectedCourseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.batchId) {
      alert("Please select a batch.");
      return;
    }
    
    // Ensure dueAt is a valid ISO string or matching backend expectations.
    // If user inputs datetime-local, it might need :00.000Z appending if strict.
    // Assuming backend handles ISO 8601 strings.
    const payload: CreateAssignmentPayload = {
      ...form,
      dueAt: new Date(form.dueAt).toISOString(),
    };

    setIsSubmitting(true);
    try {
      await onAdd(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (field: keyof CreateAssignmentPayload, value: any) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans animate-fade-in-up">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <button onClick={onBack} className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#0077b6]" />
            <span>Create New Assignment</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Assign tasks and projects to students in a specific batch</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-bold text-slate-700">Assignment Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Create a REST API using NestJS"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-bold text-slate-700">Description</label>
            <textarea
              rows={4}
              placeholder="Provide detailed instructions..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:col-span-2">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Select Course *</label>
              <select
                required
                value={selectedCourseId}
                onChange={(e) => {
                  setSelectedCourseId(e.target.value);
                  update("batchId", "");
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900"
              >
                <option value="">Choose a course...</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Target Batch *</label>
              <select
                required
                value={form.batchId}
                onChange={(e) => update("batchId", e.target.value)}
                disabled={!selectedCourseId}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900 disabled:opacity-50"
              >
                <option value="">{selectedCourseId ? "Select a batch..." : "Select course first"}</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Due Date & Time *</label>
            <input
              type="datetime-local"
              required
              value={form.dueAt}
              onChange={(e) => update("dueAt", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Total Marks *</label>
            <input
              type="number"
              required
              min={1}
              value={form.totalMarks}
              onChange={(e) => update("totalMarks", Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Initial Status</label>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-bold text-slate-700">Attachment URL (Optional)</label>
            <input
              type="url"
              placeholder="e.g. https://example.com/docs/task.pdf"
              value={form.attachmentUrl}
              onChange={(e) => update("attachmentUrl", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
          <button type="button" onClick={onBack} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102 flex items-center gap-2 disabled:opacity-50">
            <Save className="w-5 h-5 text-sky-300" />
            <span>{isSubmitting ? "Saving..." : "Create Assignment"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
