"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, FolderTree, Loader2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { CourseModuleItem, CreateModulePayload } from "@/services/api/modulesApi";
import { coursesApi, CourseItem } from "@/services/api/coursesApi";

interface AdminEditModuleModalProps {
  isOpen: boolean;
  moduleData: CourseModuleItem | null;
  onClose: () => void;
  onUpdate: (id: string, payload: Partial<CreateModulePayload>) => Promise<void>;
}

export default function AdminEditModuleModal({
  isOpen,
  moduleData,
  onClose,
  onUpdate,
}: AdminEditModuleModalProps) {
  const mounted = useIsMounted();
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [order, setOrder] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">("published");

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

  useEffect(() => {
    if (moduleData) {
      setTitle(moduleData.title || "");
      setCourseId(moduleData.course_id || "");
      setOrder(moduleData.order || 1);
      setDescription(moduleData.description || "");
      setThumbnail(moduleData.thumbnail || "");
      setStatus(moduleData.status || "published");
      setError(null);
    }
  }, [moduleData, isOpen]);

  if (!mounted || !isOpen || !moduleData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Module title is required.");
      return;
    }
    if (!courseId) {
      setError("Please select a course.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onUpdate(moduleData.id, {
        title: title.trim(),
        course_id: courseId,
        order: Number(order) || 1,
        description: description.trim() || undefined,
        thumbnail: thumbnail.trim() || undefined,
        status,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update module.");
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
              <FolderTree className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Edit Module</h3>
              <p className="text-xs text-slate-500 mt-0.5">Update module curriculum details and sequence order</p>
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
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Module Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-semibold text-xs sm:text-sm"
              placeholder="e.g. Module 01: Introduction to BIM & Revit Interface"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Course *</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
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
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Sequence Order</label>
              <input
                type="number"
                min="1"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Thumbnail URL</label>
              <input
                type="url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm resize-none"
              placeholder="Module overview and learning objectives..."
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
                <span>Update Module</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
