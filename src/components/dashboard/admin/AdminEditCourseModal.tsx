"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, BookOpen, Loader2, Sparkles, Video, Image, FileText } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { CourseItem, CreateCoursePayload } from "@/services/api/coursesApi";
import { categoryApi, CategoryItem } from "@/services/api/categoryApi";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface AdminEditCourseModalProps {
  isOpen: boolean;
  course: CourseItem | null;
  onClose: () => void;
  onUpdate: (id: string, payload: Partial<CreateCoursePayload>) => Promise<void>;
}

export default function AdminEditCourseModal({
  isOpen,
  course,
  onClose,
  onUpdate,
}: AdminEditCourseModalProps) {
  const mounted = useIsMounted();
  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [introVideoUrl, setIntroVideoUrl] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced" | "all_levels">("all_levels");
  const [language, setLanguage] = useState("Bangla");
  const [duration, setDuration] = useState<number>(0);
  const [durationUnit, setDurationUnit] = useState<"hours" | "days" | "weeks" | "months" | "years">("hours");
  const [status, setStatus] = useState<"draft" | "published" | "archived" | "upcoming">("published");

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      categoryApi.getAllCategories({ limit: 100 }).then((res) => {
        if (res.data?.items) setCategories(res.data.items);
      }).catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    if (course) {
      setTitle(course.title || "");
      setCourseCode(course.course_code || "");
      setCategoryId(course.category_id || course.category?.id || "");
      setShortDescription(course.short_description || "");
      setDescription(course.description || "");
      setThumbnail(course.thumbnail || "");
      setIntroVideoUrl(course.intro_video_url || "");
      setLevel(course.level || "all_levels");
      setLanguage(course.language || "Bangla");
      setDuration(course.duration || 0);
      setDurationUnit(course.duration_unit || "hours");
      setStatus(course.status || "published");
      setError(null);
    }
  }, [course, isOpen]);

  if (!mounted || !isOpen || !course) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Course title is required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onUpdate(course.id, {
        title: title.trim(),
        course_code: courseCode.trim() || undefined,
        category_id: categoryId || undefined,
        short_description: shortDescription.trim() || undefined,
        description: description.trim() || undefined,
        thumbnail: thumbnail.trim() || undefined,
        intro_video_url: introVideoUrl.trim() || undefined,
        level,
        language,
        duration: Number(duration) || 0,
        duration_unit: durationUnit,
        status,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update course.");
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
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Edit Course</h3>
              <p className="text-xs text-slate-500 mt-0.5">Update curriculum, classification and course metadata</p>
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
          {/* Basic Details */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200/60 pb-2">
              <BookOpen className="w-4 h-4 text-[#0077b6]" /> Course Identity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Course Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-semibold text-xs sm:text-sm"
                  placeholder="e.g. Revit Architecture & BIM Detailing"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Course Code</label>
                <input
                  type="text"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-mono uppercase font-bold text-xs sm:text-sm"
                  placeholder="BIM-REV-101"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Publishing Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Level & Duration */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200/60 pb-2">
              <Sparkles className="w-4 h-4 text-[#0077b6]" /> Academic Level & Duration
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Skill Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as any)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="all_levels">All Levels</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Duration</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-1/2 px-3 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                  />
                  <select
                    value={durationUnit}
                    onChange={(e) => setDurationUnit(e.target.value as any)}
                    className="w-1/2 px-2 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Language</label>
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Media Links */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200/60 pb-2">
              <Video className="w-4 h-4 text-[#0077b6]" /> Media & Assets
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Intro Video URL</label>
                <input
                  type="url"
                  value={introVideoUrl}
                  onChange={(e) => setIntroVideoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200/60 pb-2">
              <FileText className="w-4 h-4 text-[#0077b6]" /> Course Descriptions
            </h4>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Short Summary</label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none text-slate-900 font-medium text-xs sm:text-sm"
                placeholder="Brief 1-liner course summary..."
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-xs sm:text-sm">Detailed Description</label>
              <div className="bg-white rounded-xl overflow-hidden border border-slate-200 focus-within:border-[#0077b6]">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={(val) => setDescription(val)}
                  className="min-h-[160px] border-0"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
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
                <span>Update Course</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
