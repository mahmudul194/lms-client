"use client";

import React, { useState, useEffect } from "react";
import { FolderTree, ArrowLeft } from "lucide-react";
import { CreateModulePayload } from "@/services/api/modulesApi";
import { coursesApi, CourseItem } from "@/services/api/coursesApi";
import { uploadApi } from "@/services/api/uploadApi";

interface AdminAddModuleViewProps {
  onBack: () => void;
  onAdd: (module: CreateModulePayload) => Promise<void>;
}

export default function AdminAddModuleView({ onBack, onAdd }: AdminAddModuleViewProps) {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [form, setForm] = useState<CreateModulePayload>({
    course_id: "",
    title: "",
    description: "",
    thumbnail: "",
    order: 1,
    status: "published",
  });
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    coursesApi.getAllCourses({ limit: 100 }).then((res) => {
      if (res.statusCode === 200 && res.data?.items) {
        setCourses(res.data.items);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAdd(form);
      onBack();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadApi.uploadFile(file);
      if (res.statusCode === 200 && res.data?.url) {
        update("thumbnail", res.data.url);
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    } finally {
      setIsUploading(false);
    }
  };

  const update = (k: keyof CreateModulePayload, v: any) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans animate-in fade-in duration-200">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <button onClick={onBack} className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <FolderTree className="w-6 h-6 text-[#0077b6]" /> Create New Module
          </h2>
          <p className="text-sm text-slate-500 mt-1">Add a new module to a course.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Module Information</h3>
          
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Course *</label>
            <select required value={form.course_id} onChange={(e) => update("course_id", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
              <option value="">Select a Course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Module Title *</label>
            <input type="text" required placeholder="e.g. Module 1: Introduction" value={form.title} onChange={(e) => update("title", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Description</label>
            <textarea placeholder="Module description..." value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Thumbnail</label>
            <input type="file" accept="image/*" onChange={handleThumbnailChange} disabled={isUploading} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-[#0077b6] hover:file:bg-sky-100" />
            {isUploading && <p className="text-sm text-sky-600 mt-2 font-semibold animate-pulse">Uploading...</p>}
            {form.thumbnail && !isUploading && (
              <div className="mt-3 relative w-32 h-20 rounded-xl overflow-hidden border border-slate-200">
                <img src={form.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Order</label>
              <input type="number" required min="1" value={form.order} onChange={(e) => update("order", parseInt(e.target.value) || 1)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => update("status", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button type="button" onClick={onBack} disabled={loading} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">Cancel</button>
          <button type="submit" disabled={loading} className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102 disabled:opacity-50">
            {loading ? "Saving..." : "Create Module"}
          </button>
        </div>
      </form>
    </div>
  );
}
