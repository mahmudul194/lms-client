"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, PlayCircle, Loader2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { LessonItem, CreateLessonPayload } from "@/services/api/lessonsApi";
import { modulesApi, CourseModuleItem } from "@/services/api/modulesApi";

interface AdminEditLessonModalProps {
  isOpen: boolean;
  lesson: LessonItem | null;
  onClose: () => void;
  onUpdate: (id: string, payload: Partial<CreateLessonPayload>) => Promise<void>;
}

export default function AdminEditLessonModal({
  isOpen,
  lesson,
  onClose,
  onUpdate,
}: AdminEditLessonModalProps) {
  const mounted = useIsMounted();
  const [title, setTitle] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [type, setType] = useState<"video" | "pdf" | "quiz" | "assignment" | "text">("video");
  const [duration, setDuration] = useState<number>(0);
  const [order, setOrder] = useState<number>(1);
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string>("published");

  const [modules, setModules] = useState<CourseModuleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      modulesApi.getAllModules({ limit: 100 }).then((res) => {
        if (res.data?.items) setModules(res.data.items);
      }).catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title || "");
      setModuleId(lesson.module_id || "");
      setType((lesson.type as any) || "video");
      setDuration(lesson.duration || 0);
      setOrder(lesson.order || 1);
      setVideoUrl(lesson.video_url || "");
      setPdfUrl(lesson.pdf_url || "");
      setDescription(lesson.description || "");
      setStatus(lesson.status || "published");
      setError(null);
    }
  }, [lesson, isOpen]);

  if (!mounted || !isOpen || !lesson) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Lesson title is required.");
      return;
    }
    if (!moduleId) {
      setError("Please select a module.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onUpdate(lesson.id, {
        title: title.trim(),
        module_id: moduleId,
        type,
        duration: Number(duration) || 0,
        order: Number(order) || 1,
        video_url: type === "video" ? videoUrl.trim() : undefined,
        pdf_url: type === "pdf" ? pdfUrl.trim() : undefined,
        description: description.trim() || undefined,
        status,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update lesson.");
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
              <PlayCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Edit Lesson</h3>
              <p className="text-xs text-slate-500 mt-0.5">Update lesson content, media links, and order</p>
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
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Lesson Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-semibold text-xs sm:text-sm"
              placeholder="e.g. 01. Understanding Worksharing & Central Models"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Module *</label>
              <select
                value={moduleId}
                onChange={(e) => setModuleId(e.target.value)}
                required
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              >
                <option value="">Select Module</option>
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Content Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              >
                <option value="video">Video Lecture</option>
                <option value="pdf">PDF Resource</option>
                <option value="quiz">Interactive Quiz</option>
                <option value="assignment">Assignment</option>
                <option value="text">Article / Notes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Duration (Mins)</label>
              <input
                type="number"
                min="0"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Sequence Order</label>
              <input
                type="number"
                min="1"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
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
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {type === "video" && (
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Video Stream URL</label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                placeholder="https://vimeo.com/... or https://youtube.com/..."
              />
            </div>
          )}

          {type === "pdf" && (
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">PDF Document URL</label>
              <input
                type="url"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                placeholder="https://domain.com/notes.pdf"
              />
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Description / Notes</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm resize-none"
              placeholder="Lecture notes or instructions for students..."
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
                <span>Update Lesson</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
