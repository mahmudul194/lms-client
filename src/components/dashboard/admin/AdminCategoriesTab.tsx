"use client";

import React, { useState, useEffect } from "react";
import { FolderTree, Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import AdminAddCategoryModal from "./AdminAddCategoryModal";
import { categoryApi, CategoryItem, CreateCategoryPayload } from "@/services/api/categoryApi";

export default function AdminCategoriesTab() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const limit = 10;
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await categoryApi.getAllCategories({ page, limit, search });
      if (res.statusCode === 200 && res.data?.items) {
        setCategories(res.data.items);
        setTotalPages(res.data.totalPages || 1);
        setTotalCategories(res.data.total || res.data.items.length);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleCreateCategory = async (payload: CreateCategoryPayload) => {
    setIsSubmitting(true);
    try {
      const res = await categoryApi.createCategory(payload);
      if (res.statusCode === 201 || res.statusCode === 200) {
        setIsAddingCategory(false);
        fetchCategories();
      } else {
        alert("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Error creating category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FolderTree className="w-6 h-6 text-[#0077b6]" />
            <span>Course Categories</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Manage all course categories and their configurations</p>
        </div>
        <button onClick={() => setIsAddingCategory(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0">
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={search} 
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }} 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-[#0077b6] focus:outline-none" 
          />
        </div>
        <span className="px-4 py-1.5 rounded-full bg-sky-50 text-[#0077b6] text-xs sm:text-sm font-bold border border-sky-200 shrink-0">
          {totalCategories} Total Categories
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Category Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Sort Order</th>
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
                    <span>Loading categories...</span>
                  </div>
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      {cat.thumbnail ? (
                        <img src={cat.thumbnail} alt={cat.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-black text-sm border border-sky-200 shrink-0">
                          <FolderTree className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="font-black text-slate-900 text-sm sm:text-base">{cat.name}</div>
                        {cat.description && <div className="text-xs text-slate-500 font-medium mt-0.5 max-w-xs truncate">{cat.description}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{cat.slug}</td>
                  <td className="p-4"><span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs">{cat.sort_order ?? '-'}</span></td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${cat.status ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                      {cat.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-colors" title="Delete">
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

      <AdminAddCategoryModal 
        isOpen={isAddingCategory} 
        onClose={() => setIsAddingCategory(false)} 
        onCreate={handleCreateCategory}
        isLoading={isSubmitting}
      />
    </div>
  );
}
