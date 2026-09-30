"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Search, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import AdminAddCourseView from "./AdminAddCourseView";
import AdminCourseDetails from "./AdminCourseDetails";
import AdminEditCourseModal from "./AdminEditCourseModal";
import AdminDeleteConfirmModal from "./AdminDeleteConfirmModal";
import { coursesApi, CourseItem, CreateCoursePayload } from "@/services/api/coursesApi";

export default function AdminCoursesTab() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [search, setSearch] = useState("");
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<CourseItem | null>(null);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const limit = 10;
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const res = await coursesApi.getAllCourses({ page, limit, search });
      if (res.statusCode === 200 && res.data?.items) {
        setCourses(res.data.items);
        setTotalPages(res.data.totalPages || 1);
        setTotalCourses(res.data.total || res.data.items.length);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleUpdateCourse = async (id: string, payload: Partial<CreateCoursePayload>) => {
    await coursesApi.updateCourse(id, payload);
    fetchCourses();
    if (selectedCourse?.id === id) {
      const res = await coursesApi.getCourseById(id);
      if (res.data) setSelectedCourse(res.data);
    }
  };

  const handleDeleteCourse = async () => {
    if (!deletingCourse) return;
    await coursesApi.deleteCourse(deletingCourse.id);
    fetchCourses();
    if (selectedCourse?.id === deletingCourse.id) {
      setSelectedCourse(null);
    }
  };

  if (selectedCourse) {
    return (
      <>
        <AdminCourseDetails 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)} 
          onEdit={() => setEditingCourse(selectedCourse)}
          onDelete={() => setDeletingCourse(selectedCourse)}
        />
        <AdminEditCourseModal
          isOpen={!!editingCourse}
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onUpdate={handleUpdateCourse}
        />
        <AdminDeleteConfirmModal
          isOpen={!!deletingCourse}
          title="Delete Course"
          itemName={deletingCourse?.title}
          message="Are you sure you want to delete this course? Associated modules, lessons, and batches will be permanently affected."
          onClose={() => setDeletingCourse(null)}
          onConfirm={handleDeleteCourse}
        />
      </>
    );
  }

  if (isAddingCourse) {
    return (
      <AdminAddCourseView
        onBack={() => setIsAddingCourse(false)}
        onAdd={(c) => {
          fetchCourses(); // Refetch after adding
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-[#0077b6]" />
            <span>Course Manager</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Manage courses, curricula, and assignments</p>
        </div>
        <button onClick={() => setIsAddingCourse(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0">
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Create New Course</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search courses by title or code..." 
            value={search} 
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }} 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-[#0077b6] focus:outline-none" 
          />
        </div>
        <span className="px-4 py-1.5 rounded-full bg-sky-50 text-[#0077b6] text-xs sm:text-sm font-bold border border-sky-200 shrink-0">
          {totalCourses} Courses Found
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Course Details</th>
              <th className="p-4">Category</th>
              <th className="p-4">Duration & Level</th>
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
                    <span>Loading courses...</span>
                  </div>
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">
                  No courses found. Create one to get started!
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-black text-sm border border-sky-200 shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="font-black text-slate-900 text-sm sm:text-base max-w-xs truncate" title={course.title}>{course.title}</div>
                        <div className="text-xs text-[#0077b6] font-bold mt-0.5">{course.course_code || course.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 font-semibold">
                    <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs truncate max-w-[120px] inline-block">{course.category?.name || "Uncategorized"}</span>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-800 font-bold">{course.duration} {course.duration_unit}</div>
                    <div className="text-slate-500 text-xs capitalize mt-0.5">{course.level}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      course.status === "published" ? "bg-emerald-100 text-emerald-800" : 
                      course.status === "upcoming" ? "bg-sky-100 text-sky-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => setSelectedCourse(course)}
                        className="p-2 rounded-lg bg-sky-50 text-[#0077b6] hover:bg-[#0077b6] hover:text-white transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingCourse(course)}
                        className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                        title="Edit Course"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDeletingCourse(course)}
                        className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete Course"
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

      <AdminEditCourseModal
        isOpen={!!editingCourse}
        course={editingCourse}
        onClose={() => setEditingCourse(null)}
        onUpdate={handleUpdateCourse}
      />

      <AdminDeleteConfirmModal
        isOpen={!!deletingCourse}
        title="Delete Course"
        itemName={deletingCourse?.title}
        message="Are you sure you want to delete this course? Associated modules, lessons, and batches will be permanently affected."
        onClose={() => setDeletingCourse(null)}
        onConfirm={handleDeleteCourse}
      />
    </div>
  );
}
