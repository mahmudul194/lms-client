"use client";

import React, { useState, useEffect } from "react";
import { PlayCircle, Search, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight, Video, FileText } from "lucide-react";
import AdminAddLessonView from "./AdminAddLessonView";
import AdminLessonDetails from "./AdminLessonDetails";
import AdminEditLessonModal from "./AdminEditLessonModal";
import AdminDeleteConfirmModal from "./AdminDeleteConfirmModal";
import { lessonsApi, LessonItem, CreateLessonPayload } from "@/services/api/lessonsApi";

export default function AdminLessonsTab() {
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [search, setSearch] = useState("");
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const [editingLesson, setEditingLesson] = useState<LessonItem | null>(null);
  const [deletingLesson, setDeletingLesson] = useState<LessonItem | null>(null);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLessons, setTotalLessons] = useState(0);
  const limit = 10;
  const [isLoading, setIsLoading] = useState(false);

  const [modulesMap, setModulesMap] = useState<Record<string, string>>({});

  useEffect(() => {
    import("@/services/api/modulesApi").then(({ modulesApi }) => {
      modulesApi.getAllModules({ limit: 100 }).then(res => {
        if (res.data?.items) {
          const map: Record<string, string> = {};
          res.data.items.forEach(m => { map[m.id] = m.title });
          setModulesMap(map);
        }
      });
    });
  }, []);

  const fetchLessons = async () => {
    setIsLoading(true);
    try {
      const res = await lessonsApi.getAllLessons({ page, limit, search });
      if (res.statusCode === 200 && res.data?.items) {
        setLessons(res.data.items);
        setTotalPages(res.data.totalPages || 1);
        setTotalLessons(res.data.total || res.data.items.length);
      } else {
        setLessons([]);
      }
    } catch (error) {
      console.error("Failed to fetch lessons", error);
      setLessons([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [page, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleAddLesson = async (payload: CreateLessonPayload) => {
    await lessonsApi.createLesson(payload);
    fetchLessons();
  };

  const handleUpdateLesson = async (id: string, payload: Partial<CreateLessonPayload>) => {
    await lessonsApi.updateLesson(id, payload);
    fetchLessons();
    if (selectedLesson?.id === id) {
      const res = await lessonsApi.getLessonById(id);
      if (res.data) setSelectedLesson(res.data);
    }
  };

  const handleDeleteLesson = async () => {
    if (!deletingLesson) return;
    await lessonsApi.deleteLesson(deletingLesson.id);
    fetchLessons();
    if (selectedLesson?.id === deletingLesson.id) {
      setSelectedLesson(null);
    }
  };

  if (selectedLesson) {
    return (
      <>
        <AdminLessonDetails 
          lessonData={selectedLesson} 
          onBack={() => setSelectedLesson(null)} 
          onEdit={(les) => setEditingLesson(les)}
          onDelete={(les) => setDeletingLesson(les)}
        />
        <AdminEditLessonModal
          isOpen={!!editingLesson}
          lesson={editingLesson}
          onClose={() => setEditingLesson(null)}
          onUpdate={handleUpdateLesson}
        />
        <AdminDeleteConfirmModal
          isOpen={!!deletingLesson}
          title="Delete Lesson"
          itemName={deletingLesson?.title}
          message="Are you sure you want to delete this lesson? The associated video and documents will be removed."
          onClose={() => setDeletingLesson(null)}
          onConfirm={handleDeleteLesson}
        />
      </>
    );
  }

  if (isAddingLesson) {
    return <AdminAddLessonView onBack={() => setIsAddingLesson(false)} onAdd={handleAddLesson} />;
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <PlayCircle className="w-6 h-6 text-[#0077b6]" />
            <span>Lessons Manager</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Manage individual lessons, videos, and documents</p>
        </div>
        <button onClick={() => setIsAddingLesson(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0">
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Create New Lesson</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search lessons by title..." 
            value={search} 
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }} 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-[#0077b6] focus:outline-none" 
          />
        </div>
        <span className="px-4 py-1.5 rounded-full bg-sky-50 text-[#0077b6] text-xs sm:text-sm font-bold border border-sky-200 shrink-0">
          {totalLessons} Lessons Found
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Lesson Details</th>
              <th className="p-4">Type</th>
              <th className="p-4">Order & Duration</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#0077b6] border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading lessons...</span>
                  </div>
                </td>
              </tr>
            ) : lessons.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">
                  No lessons found. Create one to get started!
                </td>
              </tr>
            ) : (
              lessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border shrink-0 ${
                        lesson.type === 'video' ? 'bg-sky-50 text-[#0077b6] border-sky-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      }`}>
                        {lesson.type === 'video' ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-sm sm:text-base max-w-xs truncate" title={lesson.title}>{lesson.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5 max-w-xs truncate">
                          Module: <span className="font-semibold text-[#0077b6]">{modulesMap[lesson.module_id] || "Unknown Module"}</span>
                        </div>
                        {lesson.is_preview && <span className="text-[10px] uppercase font-bold text-[#0077b6] bg-sky-100 px-1.5 py-0.5 rounded ml-1 mt-1 inline-block">Preview</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 font-semibold capitalize">
                    {lesson.type || "unknown"}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-800">Lesson {lesson.order}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{lesson.duration || 0} mins</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      lesson.status === "published" ? "bg-emerald-100 text-emerald-800" : 
                      lesson.status === "draft" ? "bg-amber-100 text-amber-800" :
                      "bg-slate-100 text-slate-800"
                    }`}>
                      {lesson.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => setSelectedLesson(lesson)}
                        className="p-2 rounded-lg bg-sky-50 text-[#0077b6] hover:bg-[#0077b6] hover:text-white transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingLesson(lesson)}
                        className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                        title="Edit Lesson"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDeletingLesson(lesson)}
                        className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete Lesson"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-sm font-semibold text-slate-500">
            Showing Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => handlePageChange(page - 1)} 
              disabled={page === 1}
              className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${page === 1 ? 'border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed' : 'border-[#0077b6] text-[#0077b6] hover:bg-[#0077b6] hover:text-white'}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handlePageChange(page + 1)} 
              disabled={page === totalPages}
              className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${page === totalPages ? 'border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed' : 'border-[#0077b6] text-[#0077b6] hover:bg-[#0077b6] hover:text-white'}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <AdminEditLessonModal
        isOpen={!!editingLesson}
        lesson={editingLesson}
        onClose={() => setEditingLesson(null)}
        onUpdate={handleUpdateLesson}
      />

      <AdminDeleteConfirmModal
        isOpen={!!deletingLesson}
        title="Delete Lesson"
        itemName={deletingLesson?.title}
        message="Are you sure you want to delete this lesson? The associated video and documents will be permanently removed."
        onClose={() => setDeletingLesson(null)}
        onConfirm={handleDeleteLesson}
      />
    </div>
  );
}
