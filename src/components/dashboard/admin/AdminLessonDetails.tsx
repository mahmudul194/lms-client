"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, PlayCircle, Edit, Video, FileText } from "lucide-react";
import { LessonItem } from "@/services/api/lessonsApi";

interface AdminLessonDetailsProps {
  lessonData: LessonItem;
  onBack: () => void;
}

export default function AdminLessonDetails({ lessonData, onBack }: AdminLessonDetailsProps) {
  const [moduleName, setModuleName] = useState("Loading...");

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  useEffect(() => {
    import("@/services/api/modulesApi").then(({ modulesApi }) => {
      modulesApi.getModuleById(lessonData.module_id).then(res => {
        if (res.statusCode === 200 && res.data) {
          setModuleName(res.data.title);
        } else {
          setModuleName("Unknown Module");
        }
      });
    });
  }, [lessonData.module_id]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-[#0077b6]" /> {lessonData.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">Lesson Details</p>
          </div>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
          <Edit className="w-4 h-4" /> Edit Lesson
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-2">Overview</h3>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-bold text-slate-500 block">Module</span>
                <p className="text-[#0077b6] font-bold mt-1 text-lg">{moduleName}</p>
              </div>
              <div>
                <span className="text-sm font-bold text-slate-500 block">Description</span>
                <p className="text-slate-800 font-medium mt-1">{lessonData.description || "No description provided."}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block uppercase">Type</span>
                  <span className="text-sm font-bold text-slate-900 capitalize flex items-center gap-1.5 mt-1">
                    {lessonData.type === 'video' ? <Video className="w-4 h-4 text-[#0077b6]" /> : <FileText className="w-4 h-4 text-emerald-600" />}
                    {lessonData.type}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block uppercase">Duration</span>
                  <span className="text-lg font-black text-slate-900 mt-1">{lessonData.duration || 0} mins</span>
                </div>
              </div>
            </div>
          </div>
          
          {(lessonData.video_url || lessonData.pdf_url) && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-2">Media</h3>
              {lessonData.video_url && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500 block">Video Preview</span>
                    <a href={lessonData.video_url} target="_blank" rel="noreferrer" className="text-[#0077b6] hover:underline font-semibold text-xs truncate max-w-[200px]">
                      {lessonData.video_url}
                    </a>
                  </div>
                  <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <iframe 
                      src={getEmbedUrl(lessonData.video_url)} 
                      title="Video Preview" 
                      className="w-full h-full border-0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
              {lessonData.pdf_url && (
                <div className={lessonData.video_url ? "mt-6 pt-6 border-t border-slate-200" : ""}>
                  <span className="text-sm font-bold text-slate-500 block mb-2">PDF URL</span>
                  <a href={lessonData.pdf_url} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline font-semibold text-sm break-all">
                    {lessonData.pdf_url}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-500 block uppercase">Order</span>
                <span className="text-base font-black text-slate-900">{lessonData.order}</span>
              </div>
              
              <div>
                <span className="text-xs font-bold text-slate-500 block uppercase">Slug</span>
                <span className="text-sm font-medium text-slate-700 break-all">{lessonData.slug || "-"}</span>
              </div>
              
              <div>
                <span className="text-xs font-bold text-slate-500 block uppercase">Preview</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold inline-block mt-1 ${
                  lessonData.is_preview ? "bg-[#0077b6]/10 text-[#0077b6]" : "bg-slate-200 text-slate-600"
                }`}>
                  {lessonData.is_preview ? "Free Preview" : "Locked"}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 block uppercase">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold inline-block mt-1 ${
                  lessonData.status === "published" ? "bg-emerald-100 text-emerald-800" :
                  lessonData.status === "archived" ? "bg-slate-200 text-slate-800" :
                  "bg-amber-100 text-amber-800"
                }`}>
                  {lessonData.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
