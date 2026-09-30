"use client";

import React, { useState, useEffect } from "react";
import { FolderTree, Search, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import AdminAddModuleView from "./AdminAddModuleView";
import AdminModuleDetails from "./AdminModuleDetails";
import AdminEditModuleModal from "./AdminEditModuleModal";
import AdminDeleteConfirmModal from "./AdminDeleteConfirmModal";
import { modulesApi, CourseModuleItem, CreateModulePayload } from "@/services/api/modulesApi";

export default function AdminModulesTab() {
  const [modules, setModules] = useState<CourseModuleItem[]>([]);
  const [search, setSearch] = useState("");
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [selectedModule, setSelectedModule] = useState<CourseModuleItem | null>(null);
  const [editingModule, setEditingModule] = useState<CourseModuleItem | null>(null);
  const [deletingModule, setDeletingModule] = useState<CourseModuleItem | null>(null);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalModules, setTotalModules] = useState(0);
  const limit = 10;
  const [isLoading, setIsLoading] = useState(false);

  const [coursesMap, setCoursesMap] = useState<Record<string, string>>({});

  useEffect(() => {
    import("@/services/api/coursesApi").then(({ coursesApi }) => {
      coursesApi.getAllCourses({ limit: 100 }).then(res => {
        if (res.data?.items) {
          const map: Record<string, string> = {};
          res.data.items.forEach(c => { map[c.id] = c.title });
          setCoursesMap(map);
        }
      });
    });
  }, []);

  const fetchModules = async () => {
    setIsLoading(true);
    try {
      const res = await modulesApi.getAllModules({ page, limit, search });
      if (res.statusCode === 200 && res.data?.items) {
        setModules(res.data.items);
        setTotalPages(res.data.totalPages || 1);
        setTotalModules(res.data.total || res.data.items.length);
      } else {
        setModules([]);
      }
    } catch (error) {
      console.error("Failed to fetch modules", error);
      setModules([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [page, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleAddModule = async (payload: CreateModulePayload) => {
    await modulesApi.createModule(payload);
    fetchModules();
  };

  const handleUpdateModule = async (id: string, payload: Partial<CreateModulePayload>) => {
    await modulesApi.updateModule(id, payload);
    fetchModules();
    if (selectedModule?.id === id) {
      const res = await modulesApi.getModuleById(id);
      if (res.data) setSelectedModule(res.data);
    }
  };

  const handleDeleteModule = async () => {
    if (!deletingModule) return;
    await modulesApi.deleteModule(deletingModule.id);
    fetchModules();
    if (selectedModule?.id === deletingModule.id) {
      setSelectedModule(null);
    }
  };

  if (selectedModule) {
    return (
      <>
        <AdminModuleDetails 
          moduleData={selectedModule} 
          onBack={() => setSelectedModule(null)} 
          onEdit={(mod) => setEditingModule(mod)}
          onDelete={(mod) => setDeletingModule(mod)}
        />
        <AdminEditModuleModal
          isOpen={!!editingModule}
          moduleData={editingModule}
          onClose={() => setEditingModule(null)}
          onUpdate={handleUpdateModule}
        />
        <AdminDeleteConfirmModal
          isOpen={!!deletingModule}
          title="Delete Module"
          itemName={deletingModule?.title}
          message="Are you sure you want to delete this module? All lessons belonging to this module will be deleted."
          onClose={() => setDeletingModule(null)}
          onConfirm={handleDeleteModule}
        />
      </>
    );
  }

  if (isAddingModule) {
    return <AdminAddModuleView onBack={() => setIsAddingModule(false)} onAdd={handleAddModule} />;
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FolderTree className="w-6 h-6 text-[#0077b6]" />
            <span>Modules Manager</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Manage course modules and curricula</p>
        </div>
        <button onClick={() => setIsAddingModule(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0">
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Create New Module</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search modules by title..." 
            value={search} 
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }} 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-[#0077b6] focus:outline-none" 
          />
        </div>
        <span className="px-4 py-1.5 rounded-full bg-sky-50 text-[#0077b6] text-xs sm:text-sm font-bold border border-sky-200 shrink-0">
          {totalModules} Modules Found
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Module Details</th>
              <th className="p-4">Order</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#0077b6] border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading modules...</span>
                  </div>
                </td>
              </tr>
            ) : modules.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 font-semibold">
                  No modules found. Create one to get started!
                </td>
              </tr>
            ) : (
              modules.map((mod) => (
                <tr key={mod.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      {mod.thumbnail ? (
                        <img src={mod.thumbnail} alt={mod.title} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-black text-sm border border-sky-200 shrink-0">
                          <FolderTree className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="font-black text-slate-900 text-sm sm:text-base max-w-xs truncate" title={mod.title}>{mod.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5 max-w-xs truncate">
                          Course: <span className="font-semibold text-[#0077b6]">{coursesMap[mod.course_id] || "Unknown Course"}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 font-semibold">
                    <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs inline-block">Module {mod.order}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      mod.status === "published" ? "bg-emerald-100 text-emerald-800" : 
                      mod.status === "draft" ? "bg-amber-100 text-amber-800" :
                      "bg-slate-100 text-slate-800"
                    }`}>
                      {mod.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => setSelectedModule(mod)}
                        className="p-2 rounded-lg bg-sky-50 text-[#0077b6] hover:bg-[#0077b6] hover:text-white transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingModule(mod)}
                        className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                        title="Edit Module"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDeletingModule(mod)}
                        className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete Module"
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

      <AdminEditModuleModal
        isOpen={!!editingModule}
        moduleData={editingModule}
        onClose={() => setEditingModule(null)}
        onUpdate={handleUpdateModule}
      />

      <AdminDeleteConfirmModal
        isOpen={!!deletingModule}
        title="Delete Module"
        itemName={deletingModule?.title}
        message="Are you sure you want to delete this module? All lessons belonging to this module will be permanently deleted."
        onClose={() => setDeletingModule(null)}
        onConfirm={handleDeleteModule}
      />
    </div>
  );
}
