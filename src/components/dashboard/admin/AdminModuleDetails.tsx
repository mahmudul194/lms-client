"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, FolderTree, Edit, PlayCircle, Video, FileText, Eye } from "lucide-react";
import { CourseModuleItem } from "@/services/api/modulesApi";
import { lessonsApi, LessonItem } from "@/services/api/lessonsApi";
import AdminLessonDetails from "./AdminLessonDetails";

interface AdminModuleDetailsProps {
  moduleData: CourseModuleItem;
  onBack: () => void;
}

export default function AdminModuleDetails({ moduleData, onBack }: AdminModuleDetailsProps) {
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [isLoadingLessons, setIsLoadingLessons] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const [courseName, setCourseName] = useState("Loading...");

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
    import("@/services/api/coursesApi").then(({ coursesApi }) => {
      coursesApi.getCourseById(moduleData.course_id).then(res => {
        if (res.statusCode === 200 && res.data) {
          setCourseName(res.data.title);
        } else {
          setCourseName("Unknown Course");
        }
      });
    });

    (async () => {
      setIsLoadingLessons(true);
      try {
        const res = await lessonsApi.getAllLessons({ module_id: moduleData.id, limit: 100 });
        if (res.statusCode === 200 && res.data?.items) {
          // Sort by order
          const sorted = res.data.items.sort((a, b) => a.order - b.order);
          setLessons(sorted);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingLessons(false);
      }
    })();
  }, [moduleData.id, moduleData.course_id]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <FolderTree className="w-6 h-6 text-[#0077b6]" /> {moduleData.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">Module Details</p>
          </div>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
          <Edit className="w-4 h-4" /> Edit Module
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-2">Overview</h3>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-bold text-slate-500 block">Course</span>
                <p className="text-[#0077b6] font-bold mt-1 text-lg">{courseName}</p>
              </div>
              <div>
                <span className="text-sm font-bold text-slate-500 block">Description</span>
                <p className="text-slate-800 font-medium mt-1">{moduleData.description || "No description provided."}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block uppercase">Order</span>
                  <span className="text-lg font-black text-slate-900">{moduleData.order}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block uppercase">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold inline-block mt-1 ${
                    moduleData.status === "published" ? "bg-emerald-100 text-emerald-800" :
                    moduleData.status === "archived" ? "bg-slate-200 text-slate-800" :
                    "bg-amber-100 text-amber-800"
                  }`}>
                    {moduleData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-[#0077b6]" /> Lessons in this Module
            </h3>
            {isLoadingLessons ? (
              <div className="flex items-center justify-center p-6 gap-2 text-slate-500 font-semibold">
                <div className="w-4 h-4 border-2 border-[#0077b6] border-t-transparent rounded-full animate-spin"></div>
                Loading lessons...
              </div>
            ) : lessons.length === 0 ? (
              <div className="p-6 text-center text-slate-500 font-semibold bg-white rounded-xl border border-slate-200">
                No lessons found for this module.
              </div>
            ) : (
              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border shrink-0 ${
                        lesson.type === 'video' ? 'bg-sky-50 text-[#0077b6] border-sky-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      }`}>
                        {lesson.type === 'video' ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm max-w-[200px] sm:max-w-xs truncate" title={lesson.title}>{lesson.title}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-medium">
                          <span className="capitalize">{lesson.type}</span>
                          <span>•</span>
                          <span>{lesson.duration || 0} mins</span>
                          <span>•</span>
                          <span>Order {lesson.order}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide hidden sm:inline-block ${
                        lesson.status === "published" ? "bg-emerald-100 text-emerald-800" : 
                        lesson.status === "draft" ? "bg-amber-100 text-amber-800" :
                        "bg-slate-100 text-slate-800"
                      }`}>
                        {lesson.status}
                      </span>
                      <button 
                        onClick={() => setSelectedLesson(lesson)}
                        className="p-2 rounded-lg bg-sky-50 text-[#0077b6] hover:bg-[#0077b6] hover:text-white transition-colors"
                        title="View Lesson Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Thumbnail</h3>
            {moduleData.thumbnail ? (
              <img src={moduleData.thumbnail} alt={moduleData.title} className="w-full rounded-xl border border-slate-200 shadow-sm" />
            ) : (
              <div className="w-full aspect-video rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 font-medium text-sm">
                No Thumbnail
              </div>
            )}
          </div>

          {selectedLesson && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm animate-in fade-in zoom-in duration-200 sticky top-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-[#0077b6]" /> Now Playing
              </h3>
              
              <div className="font-bold text-slate-900 mb-3 line-clamp-2">{selectedLesson.title}</div>
              
              {selectedLesson.video_url ? (
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <iframe 
                    src={getEmbedUrl(selectedLesson.video_url)} 
                    title={selectedLesson.title}
                    className="w-full h-full border-0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              ) : selectedLesson.pdf_url ? (
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 flex flex-col items-center justify-center text-center gap-3">
                  <FileText className="w-8 h-8 text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-800">This lesson is a document</p>
                  <a href={selectedLesson.pdf_url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm transition-colors w-full">
                    Open PDF Document
                  </a>
                </div>
              ) : (
                <div className="bg-slate-200 rounded-xl p-6 text-center text-slate-500 font-medium text-sm">
                  No media available for this lesson.
                </div>
              )}
              
              <div className="mt-4 text-xs font-semibold text-slate-500 flex justify-between">
                <span>Duration: {selectedLesson.duration || 0} mins</span>
                <span className="capitalize">{selectedLesson.type}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
