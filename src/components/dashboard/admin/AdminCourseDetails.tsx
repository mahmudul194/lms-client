"use client";

import React from "react";
import { ArrowLeft, BookOpen, Layers, Edit, Trash2, Clock, Globe, Award, DollarSign } from "lucide-react";
import { CourseItem } from "@/services/api/coursesApi";

interface AdminCourseDetailsProps {
  course: CourseItem;
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function AdminCourseDetails({ course, onBack, onEdit, onDelete }: AdminCourseDetailsProps) {
  const getEmbedUrl = (url?: string) => {
    if (!url) return undefined;
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/").split("&")[0];
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/").split("?")[0];
    }
    return url;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#0077b6]" /> {course.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-semibold font-mono">{course.course_code || course.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button 
              onClick={onEdit} 
              className="p-2.5 rounded-xl bg-sky-50 text-[#0077b6] hover:bg-[#0077b6] hover:text-white transition-colors cursor-pointer" 
              title="Edit Course"
            >
              <Edit className="w-5 h-5" />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={onDelete} 
              className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer" 
              title="Delete Course"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Basic Details & Media */}
        <div className="lg:col-span-2 space-y-6">
          {(course.thumbnail || course.intro_video_url) && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Course Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.thumbnail && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Thumbnail</h4>
                    <img src={course.thumbnail} alt={course.title} className="w-full aspect-video object-cover rounded-xl border border-slate-200" />
                  </div>
                )}
                {course.intro_video_url && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Intro Video</h4>
                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-black shadow-inner">
                      <iframe
                        src={getEmbedUrl(course.intro_video_url)}
                        className="w-full h-full"
                        allowFullScreen
                        title="Course Intro Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Overview</h3>
            {course.description ? (
              <div 
                className="text-slate-700 font-medium leading-relaxed prose prose-sm max-w-none" 
                dangerouslySetInnerHTML={{ __html: course.description }} 
              />
            ) : (
              <p className="text-slate-700 font-medium leading-relaxed">
                {course.short_description || "No description provided."}
              </p>
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                <Clock className="w-6 h-6 text-sky-500 mb-2" />
                <span className="text-xs text-slate-500 font-bold uppercase">Duration</span>
                <span className="font-black text-slate-900">{course.duration} {course.duration_unit}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                <Award className="w-6 h-6 text-emerald-500 mb-2" />
                <span className="text-xs text-slate-500 font-bold uppercase">Level</span>
                <span className="font-black text-slate-900 capitalize">{course.level}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                <Globe className="w-6 h-6 text-indigo-500 mb-2" />
                <span className="text-xs text-slate-500 font-bold uppercase">Language</span>
                <span className="font-black text-slate-900">{course.language}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                <Layers className="w-6 h-6 text-amber-500 mb-2" />
                <span className="text-xs text-slate-500 font-bold uppercase">Category</span>
                <span className="font-black text-slate-900 truncate max-w-[80px]">{course.category?.name || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Curriculum / Modules</h3>
            <div className="text-center py-8 text-slate-500 font-semibold border-2 border-dashed border-slate-200 rounded-xl bg-white">
              No modules uploaded yet. Module management interface goes here.
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Mentors */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Configuration</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-semibold">Status</span>
                <span className={`px-2.5 py-1 rounded-lg font-bold text-xs capitalize ${course.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{course.status}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-semibold">Visibility</span>
                <span className="font-bold text-slate-800 capitalize">{course.visibility}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5"><DollarSign className="w-4 h-4"/> Pricing</span>
                <div className="text-right">
                  {/* Assuming the API has price logic if we customized it, otherwise mock */}
                  <span className="font-black text-[#0077b6]">Paid Course</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Assigned Mentors</h3>
            {course.mentors && course.mentors.length > 0 ? (
              <div className="space-y-3">
                {course.mentors.map((m: any, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                      {m.user?.name?.charAt(0) || "M"}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{m.user?.name || "Unknown Mentor"}</div>
                      <div className="text-xs text-slate-500 font-medium">{m.designation || "Mentor"}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 font-medium text-center py-4">No mentors assigned.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
