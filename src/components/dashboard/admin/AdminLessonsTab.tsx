"use client";

import React, { useState, useEffect } from "react";
import { PlayCircle, Search, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight, Video, FileText, RotateCcw, X, Filter, BookOpen, FolderTree } from "lucide-react";
import AdminAddLessonView from "./AdminAddLessonView";
import AdminLessonDetails from "./AdminLessonDetails";
import AdminEditLessonModal from "./AdminEditLessonModal";
import AdminDeleteConfirmModal from "./AdminDeleteConfirmModal";
import { lessonsApi, LessonItem, CreateLessonPayload } from "@/services/api/lessonsApi";
import { CourseModuleItem } from "@/services/api/modulesApi";

export default function AdminLessonsTab() {
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
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

  const [coursesList, setCoursesList] = useState<{ id: string; title: string }[]>([]);
  const [modulesList, setModulesList] = useState<CourseModuleItem[]>([]);
  const [modulesMap, setModulesMap] = useState<Record<string, { title: string; course_id?: string }>>({});

  useEffect(() => {
    // Load courses for course filter
    import("@/services/api/coursesApi").then(({ coursesApi }) => {
      coursesApi.getAllCourses({ limit: 100 }).then(res => {
        if (res.data?.items) {
          setCoursesList(res.data.items);
        }
      });
    });

    // Load modules for module filter and title display
    import("@/services/api/modulesApi").then(({ modulesApi }) => {
      modulesApi.getAllModules({ limit: 200 }).then(res => {
        if (res.data?.items) {
          setModulesList(res.data.items);
          const map: Record<string, { title: string; course_id?: string }> = {};
          res.data.items.forEach(m => { 
            map[m.id] = { title: m.title, course_id: m.course_id };
          });
          setModulesMap(map);
        }
      });
    });
  }, []);

  const fetchLessons = async () => {
    setIsLoading(true);
    try {
      const res = await lessonsApi.getAllLessons({ 
        page, 
        limit, 
        search: search.trim() || undefined,
        module_id: selectedModule !== "all" ? selectedModule : undefined,
        type: selectedType !== "all" ? selectedType : undefined,
        status: selectedStatus !== "all" ? selectedStatus : undefined,
      });
      if (res.statusCode === 200 && res.data?.items) {
        let items = res.data.items;
        // Client-side cross-filter by course if course is selected but no specific module was chosen
        if (selectedCourse !== "all" && selectedModule === "all") {
          const courseModuleIds = new Set(modulesList.filter(m => m.course_id === selectedCourse).map(m => m.id));
          items = items.filter(l => courseModuleIds.has(l.module_id));
        }
        setLessons(items);
        setTotalPages(res.data.totalPages || 1);
        setTotalLessons(res.data.total || items.length);
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
  }, [page, search, selectedCourse, selectedModule, selectedType, selectedStatus]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCourse("all");
    setSelectedModule("all");
    setSelectedType("all");
    setSelectedStatus("all");
    setPage(1);
  };

  const isFiltered = search !== "" || selectedCourse !== "all" || selectedModule !== "all" || selectedType !== "all" || selectedStatus !== "all";

  // Filter modules options based on selected course
  const availableModules = selectedCourse === "all" 
    ? modulesList 
    : modulesList.filter(m => m.course_id === selectedCourse);

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

      {/* Filter and Search Controls */}
      <div className="flex flex-col gap-3 bg-slate-50/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search lessons..." 
              value={search} 
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }} 
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium" 
            />
            {search && (
              <button 
                onClick={() => { setSearch(""); setPage(1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Course Selector Filter */}
          <div>
            <select
              value={selectedCourse}
              onChange={(e) => {
                const newCourse = e.target.value;
                setSelectedCourse(newCourse);
                setSelectedModule("all");
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium text-slate-700 cursor-pointer"
            >
              <option value="all">All Courses</option>
              {coursesList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Module Selector Filter */}
          <div>
            <select
              value={selectedModule}
              onChange={(e) => {
                setSelectedModule(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium text-slate-700 cursor-pointer"
            >
              <option value="all">All Modules</option>
              {availableModules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>

          {/* Content Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium text-slate-700 cursor-pointer"
            >
              <option value="all">All Content Types</option>
              <option value="video">Video Lecture</option>
              <option value="pdf">PDF / Document</option>
              <option value="quiz">Interactive Quiz</option>
              <option value="assignment">Assignment</option>
              <option value="live">Live Class</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium text-slate-700 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Action */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
          <span className="font-extrabold text-[#0077b6] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            {totalLessons} Lessons Found
          </span>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
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
                <td colSpan={5} className="p-10 text-center text-slate-500 font-medium space-y-2">
                  <p className="text-sm font-bold text-slate-700">
                    {isFiltered ? "No lessons match the selected filter criteria." : "No lessons found in the database."}
                  </p>
                  {isFiltered && (
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-1.5 rounded-xl bg-sky-50 text-[#0077b6] hover:bg-sky-100 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear All Filters</span>
                    </button>
                  )}
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
                          Module: <span className="font-semibold text-[#0077b6]">{modulesMap[lesson.module_id]?.title || "Unknown Module"}</span>
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
