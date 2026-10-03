"use client";

import React, { useState, useEffect } from "react";
import { Upload, ChevronDown, ChevronUp, PlayCircle, FileText } from "lucide-react";
import { BatchItem } from "@/services/api/batchesApi";
import { modulesApi, CourseModuleItem } from "@/services/api/modulesApi";
import { lessonsApi, LessonItem } from "@/services/api/lessonsApi";

export default function InstructorMaterialsTab({ batches }: { batches: BatchItem[] }) {
  // --- Course Builder State ---
  const uniqueCourses = Array.from(
    new Map(
      batches.filter(b => b.course).map((b) => [b.course!.id, b.course])
    ).values()
  ) as { id: string; title: string }[];
  
  const [selectedCourseId, setSelectedCourseId] = useState(uniqueCourses[0]?.id || "");
  const [modules, setModules] = useState<CourseModuleItem[]>([]);
  const [lessonsByModule, setLessonsByModule] = useState<Record<string, LessonItem[]>>({});
  
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [previewLessonId, setPreviewLessonId] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const getEmbedUrl = (url?: string) => {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtube.com") && parsed.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
      } else if (parsed.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed${parsed.pathname}`;
      }
      return url;
    } catch {
      return url;
    }
  };
  
  const [modTitle, setModTitle] = useState("");
  const [modDesc, setModDesc] = useState("");
  const [modThumb, setModThumb] = useState("");
  const [modOrder, setModOrder] = useState("");
  const [loadingMod, setLoadingMod] = useState(false);

  const [lesModId, setLesModId] = useState("");
  const [lesTitle, setLesTitle] = useState("");
  const [lesType, setLesType] = useState("video");
  const [lesUrl, setLesUrl] = useState("");
  const [lesDuration, setLesDuration] = useState("");
  const [lesDesc, setLesDesc] = useState("");
  const [lesOrder, setLesOrder] = useState("");
  const [lesPreview, setLesPreview] = useState(false);
  const [loadingLes, setLoadingLes] = useState(false);

  useEffect(() => {
    if (selectedCourseId) {
      modulesApi.getAllModules({ course_id: selectedCourseId, limit: 100 }).then(res => {
        if (res.data?.items) setModules(res.data.items.sort((a,b) => (a.order||0)-(b.order||0)));
      });
    }
  }, [selectedCourseId]);

  useEffect(() => {
    if (modules.length > 0) {
      modules.forEach(m => {
        lessonsApi.getAllLessons({ module_id: m.id, limit: 100 }).then(res => {
          if (res.data?.items) {
            setLessonsByModule(prev => ({
              ...prev,
              [m.id]: res.data!.items.sort((a, b) => (a.order || 0) - (b.order || 0))
            }));
          }
        });
      });
    }
  }, [modules]);

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) return;
    setLoadingMod(true);
    try {
      const res = await modulesApi.createModule({
        course_id: selectedCourseId,
        title: modTitle,
        description: modDesc,
        thumbnail: modThumb || undefined,
        status: "published",
        order: Number(modOrder) || modules.length + 1
      });
      if (res.data) {
        setModules([...modules, res.data]);
        setModTitle(""); setModDesc(""); setModThumb(""); setModOrder("");
      }
    } catch {}
    setLoadingMod(false);
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lesModId) return;
    setLoadingLes(true);
    try {
      const res = await lessonsApi.createLesson({
        module_id: lesModId,
        title: lesTitle,
        description: lesDesc || undefined,
        type: lesType,
        video_url: lesType === 'video' ? lesUrl : undefined,
        pdf_url: lesType === 'document' ? lesUrl : undefined,
        duration: Number(lesDuration) || 0,
        order: Number(lesOrder) || 1,
        is_preview: lesPreview,
        status: "published",
      });
      if (res.data) {
        const newLesson = res.data;
        setLessonsByModule(prev => ({
          ...prev,
          [lesModId]: [...(prev[lesModId] || []), newLesson].sort((a, b) => (a.order || 0) - (b.order || 0))
        }));
        setLesTitle(""); setLesUrl(""); setLesDuration(""); setLesDesc(""); setLesPreview(false); setLesOrder("");
        alert("Lesson created successfully!");
      }
    } catch {}
    setLoadingLes(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Upload className="w-6 h-6 text-[#0077b6]" />
            <span>Course Content Builder</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage your course content, modules, and lessons securely</p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <label className="text-sm font-bold text-slate-700 block mb-2">Select Your Course</label>
          <select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)} className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-bold text-sm focus:border-[#0077b6] focus:outline-none">
            {uniqueCourses.length === 0 && <option value="" disabled>No courses assigned</option>}
            {uniqueCourses.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        {selectedCourseId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Create Module */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <h4 className="font-black text-slate-900">Create New Module</h4>
              <form onSubmit={handleCreateModule} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Module Title *</label>
                    <input type="text" required value={modTitle} onChange={e => setModTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm" placeholder="e.g. Chapter 1: Basics" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Thumbnail URL</label>
                    <input type="url" value={modThumb} onChange={e => setModThumb(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm" placeholder="https://..." />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Description (Optional)</label>
                    <textarea value={modDesc} onChange={e => setModDesc(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm" rows={2} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Module Order</label>
                    <input type="number" value={modOrder} onChange={e => setModOrder(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm" placeholder="e.g. 1" />
                  </div>
                </div>
                <button type="submit" disabled={loadingMod} className="w-full py-2.5 bg-[#002b5b] hover:bg-[#001830] text-white font-bold rounded-xl text-sm transition-colors disabled:opacity-50">
                  {loadingMod ? "Creating..." : "Create Module"}
                </button>
              </form>
            </div>

            {/* Create Lesson */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <h4 className="font-black text-slate-900">Add Lesson to Module</h4>
              <form onSubmit={handleCreateLesson} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select Module</label>
                  <select required value={lesModId} onChange={e => setLesModId(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-bold">
                    <option value="" disabled>Select a module</option>
                    {modules.map(m => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Lesson Title *</label>
                    <input type="text" required value={lesTitle} onChange={e => setLesTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm" placeholder="e.g. 1.1 Introduction" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Duration (mins)</label>
                    <input type="number" value={lesDuration} onChange={e => setLesDuration(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm" placeholder="e.g. 15" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                    <textarea value={lesDesc} onChange={e => setLesDesc(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm" rows={2} placeholder="Lesson details..."></textarea>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Lesson Order</label>
                    <input type="number" value={lesOrder} onChange={e => setLesOrder(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm" placeholder="e.g. 1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Type *</label>
                    <select value={lesType} onChange={e => setLesType(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-bold">
                      <option value="video">Video</option>
                      <option value="document">Document (PDF)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Content URL *</label>
                    <input type="url" required value={lesUrl} onChange={e => setLesUrl(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm" placeholder="https://..." />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="preview" checked={lesPreview} onChange={e => setLesPreview(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-[#0077b6] focus:ring-[#0077b6]" />
                  <label htmlFor="preview" className="text-xs font-bold text-slate-700">Allow free preview</label>
                </div>
                <button type="submit" disabled={loadingLes || modules.length === 0} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors disabled:opacity-50 mt-2">
                  {loadingLes ? "Adding..." : "Add Lesson"}
                </button>
              </form>
            </div>
          </div>
        )}
          
          {/* Module View System */}
          <div className="mt-10 border-t border-slate-100 pt-8">
            <h4 className="text-lg font-black text-slate-900 mb-4">Existing Modules</h4>
            {modules.length === 0 ? (
              <div className="p-6 text-center text-slate-500 font-semibold bg-slate-50 rounded-2xl border border-slate-200 text-sm">No modules created yet.</div>
            ) : (
              <div className="space-y-4">
                {modules.map((m) => (
                  <div key={m.id} className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex gap-4">
                        {m.thumbnail ? (
                          <img src={m.thumbnail} alt={m.title} className="w-20 h-14 object-cover rounded-xl" />
                        ) : (
                          <div className="w-20 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400 font-bold">No Image</div>
                        )}
                        <div>
                          <h5 className="font-black text-slate-900 text-sm">{m.title}</h5>
                          {m.description && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{m.description}</p>}
                          <div className="mt-2 flex gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg bg-sky-50 text-sky-700 text-[10px] font-bold">Module {m.order}</span>
                            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold">{m.status}</span>
                            <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 text-[10px] font-bold">
                              {lessonsByModule[m.id]?.length || 0} Lessons
                            </span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => toggleModule(m.id)} className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-colors shrink-0">
                        {expandedModules[m.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {/* Lessons List */}
                    {expandedModules[m.id] && lessonsByModule[m.id] && lessonsByModule[m.id].length > 0 && (
                      <div className="mt-2 pt-4 border-t border-slate-100 space-y-2">
                        <h6 className="text-xs font-bold text-slate-700 mb-3">Lessons in this Module:</h6>
                        {lessonsByModule[m.id].map(l => (
                          <div key={l.id} className="flex flex-col rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">{l.order}</span>
                                <div>
                                  <h6 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                    {l.title}
                                    {l.type === 'video' ? <PlayCircle className="w-3.5 h-3.5 text-sky-500" /> : <FileText className="w-3.5 h-3.5 text-rose-500" />}
                                  </h6>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] text-slate-500 font-medium uppercase">{l.type}</span>
                                    {l.duration && <span className="text-[10px] text-slate-400 font-medium">• {l.duration} mins</span>}
                                    {l.is_preview && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-bold">Free Preview</span>}
                                  </div>
                                </div>
                              </div>
                              {l.video_url || l.pdf_url ? (
                                <button 
                                  onClick={() => setPreviewLessonId(previewLessonId === l.id ? null : l.id)}
                                  className="text-[10px] font-bold text-[#0077b6] hover:underline px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors"
                                >
                                  {previewLessonId === l.id ? "Close Preview" : "View Content"}
                                </button>
                              ) : null}
                            </div>
                            
                            {/* Inline Preview */}
                            {previewLessonId === l.id && (l.video_url || l.pdf_url) && (
                              <div className="border-t border-slate-200 bg-slate-900 w-full aspect-video">
                                <iframe 
                                  src={getEmbedUrl(l.video_url || l.pdf_url)} 
                                  className="w-full h-full" 
                                  allowFullScreen 
                                  title={`Preview of ${l.title}`}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

      </div>
    </div>
  );
}
