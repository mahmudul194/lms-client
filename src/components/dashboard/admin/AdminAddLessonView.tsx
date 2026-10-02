"use client";

import React, { useState, useEffect } from "react";
import { PlayCircle, ArrowLeft } from "lucide-react";
import { CreateLessonPayload } from "@/services/api/lessonsApi";
import { modulesApi, CourseModuleItem } from "@/services/api/modulesApi";

interface AdminAddLessonViewProps {
  onBack: () => void;
  onAdd: (lesson: CreateLessonPayload) => Promise<void>;
}

export default function AdminAddLessonView({ onBack, onAdd }: AdminAddLessonViewProps) {
  const [modules, setModules] = useState<CourseModuleItem[]>([]);
  const [form, setForm] = useState<CreateLessonPayload>({
    module_id: "",
    title: "",
    slug: "",
    description: "",
    type: "video",
    video_url: "",
    pdf_url: "",
    duration: 15,
    order: 1,
    is_preview: false,
    status: "published",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    modulesApi.getAllModules({ limit: 100 }).then((res) => {
      if (res.statusCode === 200 && res.data?.items) {
        setModules(res.data.items);
      }
    });

    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const hiddenDiv = document.createElement("div");
    hiddenDiv.id = "hidden-yt-player";
    hiddenDiv.style.display = "none";
    document.body.appendChild(hiddenDiv);

    return () => {
      const div = document.getElementById("hidden-yt-player");
      if (div) div.remove();
    }
  }, []);

  const fetchYoutubeDuration = (url: string) => {
    let videoId = null;
    try {
      if (url.includes("youtube.com/watch?v=")) {
        videoId = new URL(url).searchParams.get("v");
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      }
    } catch { return; }
    
    if (!videoId) return;
    
    let attempts = 0;
    const ytInterval = setInterval(() => {
      attempts++;
      if (attempts > 20) clearInterval(ytInterval); // Timeout after 10s

      // @ts-ignore
      if (window.YT && window.YT.Player) {
        clearInterval(ytInterval);
        try {
          // @ts-ignore
          const player = new window.YT.Player("hidden-yt-player", {
            height: '0',
            width: '0',
            videoId: videoId,
            events: {
              onReady: (event: any) => {
                const durationInSeconds = event.target.getDuration();
                if (durationInSeconds > 0) {
                  setForm(p => ({ ...p, duration: Math.ceil(durationInSeconds / 60) }));
                }
                event.target.destroy();
                // Recreate the div for future use since destroy removes it
                const div = document.createElement("div");
                div.id = "hidden-yt-player";
                div.style.display = "none";
                document.body.appendChild(div);
              },
              onError: (event: any) => {
                event.target.destroy();
                const div = document.createElement("div");
                div.id = "hidden-yt-player";
                div.style.display = "none";
                document.body.appendChild(div);
              }
            }
          });
        } catch (e) {
          console.error("Failed to load YT player", e);
        }
      }
    }, 500);
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    update("video_url", url);
    fetchYoutubeDuration(url);
  };

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm((p) => ({ ...p, title, slug }));
  };

  const update = (k: keyof CreateLessonPayload, v: any) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans animate-in fade-in duration-200">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <button onClick={onBack} className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-[#0077b6]" /> Create New Lesson
          </h2>
          <p className="text-sm text-slate-500 mt-1">Add a new lesson to a module.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Lesson Information</h3>
          
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Module *</label>
            <select required value={form.module_id} onChange={(e) => update("module_id", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
              <option value="">Select a Module</option>
              {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Lesson Title *</label>
              <input type="text" required placeholder="e.g. Lesson 1: Introduction" value={form.title} onChange={handleTitleChange} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Slug</label>
              <input type="text" placeholder="e.g. lesson-1-intro" value={form.slug} onChange={(e) => update("slug", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Description</label>
            <textarea placeholder="Lesson description..." value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Type *</label>
              <select value={form.type} onChange={(e) => update("type", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
                <option value="video">Video</option>
                <option value="pdf">Document (PDF)</option>
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
                <option value="live">Live Session</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Duration (mins)</label>
              <input type="number" min="0" value={form.duration} onChange={(e) => update("duration", parseInt(e.target.value) || 0)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
          </div>

          {form.type === "video" && (
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Video URL</label>
              <input type="url" placeholder="https://..." value={form.video_url} onChange={handleVideoUrlChange} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              <p className="text-xs text-slate-500 mt-2 font-medium flex items-center gap-1.5">
                <PlayCircle className="w-3.5 h-3.5" /> Note: Duration will auto-sync when a valid YouTube URL is pasted!
              </p>
            </div>
          )}

          {form.type === "pdf" && (
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">PDF URL</label>
              <input type="url" placeholder="https://..." value={form.pdf_url} onChange={(e) => update("pdf_url", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
          )}

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
          
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="is_preview" checked={form.is_preview} onChange={(e) => update("is_preview", e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-[#0077b6] focus:ring-[#0077b6]" />
            <label htmlFor="is_preview" className="font-bold text-slate-700">Available as Free Preview</label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button type="button" onClick={onBack} disabled={loading} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">Cancel</button>
          <button type="submit" disabled={loading} className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102 disabled:opacity-50">
            {loading ? "Saving..." : "Create Lesson"}
          </button>
        </div>
      </form>
    </div>
  );
}
