"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { CreateCoursePayload } from "@/services/api/coursesApi";
import { categoryApi, CategoryItem } from "@/services/api/categoryApi";
import { mentorsApi, MentorItem } from "@/services/api/mentorsApi";
import { uploadApi } from "@/services/api/uploadApi";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface AdminAddCourseViewProps {
  onBack: () => void;
  onAdd: (course: CreateCoursePayload) => void;
}

export default function AdminAddCourseView({ onBack, onAdd }: AdminAddCourseViewProps) {
  const [form, setForm] = useState<CreateCoursePayload>({
    title: "",
    slug: "",
    category_id: "",
    course_code: "",
    short_description: "",
    description: "",
    thumbnail: "",
    intro_video_url: "",
    level: "beginner",
    language: "English",
    duration: 0,
    duration_unit: "hours",
    status: "draft",
    visibility: "public",
    mentor_ids: [],
  });

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [mentors, setMentors] = useState<MentorItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [catRes, mentorRes] = await Promise.all([
          categoryApi.getAllCategories({ limit: 100 }),
          mentorsApi.getAllMentors({ limit: 100 })
        ]);
        if (catRes.statusCode === 200 && catRes.data?.items) {
          setCategories(catRes.data.items);
        }
        if (mentorRes.statusCode === 200 && mentorRes.data?.items) {
          setMentors(mentorRes.data.items);
        }
      } catch (e) {
        console.error("Failed to load resources", e);
      }
    })();
  }, []);

  const update = (k: keyof typeof form, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    setForm((p) => ({ ...p, title, slug }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadApi.uploadFile(file);
      if (res.statusCode === 200 || res.statusCode === 201) {
        update("thumbnail", res.data?.url || "");
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { coursesApi } = await import("@/services/api/coursesApi");
      const res = await coursesApi.createCourse(form as any);
      if (res.statusCode === 201 || res.statusCode === 200) {
        onAdd(form);
        onBack();
      } else {
        alert("Failed to create course: " + res.message);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans animate-in fade-in duration-200">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <button onClick={onBack} className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#0077b6]" /> Create New Course
          </h2>
          <p className="text-sm text-slate-500 mt-1">Fill in the details below to publish a new course.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Basic Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-sm">Course Title *</label>
              <input type="text" required placeholder="e.g. Complete Full-Stack Web Development" value={form.title} onChange={handleTitleChange} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-sm">Slug *</label>
              <input type="text" required placeholder="e.g. complete-full-stack..." value={form.slug} onChange={(e) => update("slug", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-sm">Category</label>
              <select value={form.category_id} onChange={(e) => update("category_id", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-sm">Course Code</label>
              <input type="text" placeholder="e.g. CS-101" value={form.course_code} onChange={(e) => update("course_code", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none uppercase" />
            </div>
          </div>
          
          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-sm">Short Description</label>
            <input type="text" placeholder="Brief summary of the course..." value={form.short_description} onChange={(e) => update("short_description", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-sm">Detailed Description</label>
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 focus-within:border-[#0077b6]">
              <ReactQuill theme="snow" value={form.description} onChange={(val) => update("description", val)} className="min-h-[150px] border-0" />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Media & Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-sm">Thumbnail Image</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-colors w-full">
                  <ImageIcon className="w-4 h-4" />
                  {uploadingImage ? "Uploading..." : "Upload Image"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                </label>
              </div>
              {form.thumbnail && (
                <div className="mt-3">
                  <img src={form.thumbnail} alt="Thumbnail preview" className="h-24 w-auto object-cover rounded-xl border border-slate-200" />
                </div>
              )}
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-sm">Intro Video URL</label>
              <input type="url" placeholder="e.g. YouTube/Vimeo Link" value={form.intro_video_url} onChange={(e) => update("intro_video_url", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-sm">Level</label>
              <select value={form.level} onChange={(e) => update("level", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="all_levels">All Levels</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-sm">Language</label>
              <input type="text" placeholder="e.g. English, Bengali" value={form.language} onChange={(e) => update("language", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Duration</label>
                <input type="number" min="0" value={form.duration} onChange={(e) => update("duration", parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Unit</label>
                <select value={form.duration_unit} onChange={(e) => update("duration_unit", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Visibility & Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-sm">Status</label>
              <select value={form.status} onChange={(e) => update("status", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none font-bold">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="upcoming">Upcoming</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 text-sm">Visibility</label>
              <select value={form.visibility} onChange={(e) => update("visibility", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="unlisted">Unlisted</option>
              </select>
            </div>
          </div>
          
          <div className="pt-2">
            <label className="font-bold text-slate-700 block mb-3 text-sm">Assign Mentors</label>
            {mentors.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No mentors available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {mentors.map((m) => {
                  const isChecked = form.mentor_ids?.includes(m.id) || false;
                  return (
                    <label key={m.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isChecked ? 'border-[#0077b6] bg-sky-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-[#0077b6] rounded" 
                        checked={isChecked} 
                        onChange={(e) => {
                          const ids = form.mentor_ids || [];
                          if (e.target.checked) update("mentor_ids", [...ids, m.id]);
                          else update("mentor_ids", ids.filter(id => id !== m.id));
                        }} 
                      />
                      <div className="flex-1 overflow-hidden">
                        <div className="font-bold text-sm text-slate-800 truncate">{m.user?.name || 'Unknown'}</div>
                        <div className="text-xs text-slate-500 truncate">{m.designation || 'Mentor'}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2 gap-3">
          <button type="button" onClick={onBack} disabled={loading} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all">Cancel</button>
          <button type="submit" disabled={loading} className="px-8 py-3 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-black shadow-md transition-all">
            {loading ? "Creating..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
}
