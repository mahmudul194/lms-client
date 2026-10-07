"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";
import { noticesApi, uploadApi } from "@/services/api";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function AdminNoticesTab() {
  const [notices, setNotices] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    buttonlink: "",
    isActive: true,
  });

  const fetchNotices = async () => {
    try {
      const res = await noticesApi.getAllNotices();
      const data = res.data as any[];
      if ((res.statusCode === 200 || res.statusCode === 201) && data) {
        setNotices(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ title: "", description: "", imageUrl: "", buttonlink: "", isActive: true });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setFormData({ 
      title: item.title, 
      description: item.description || "", 
      imageUrl: item.imageUrl || "",
      buttonlink: item.buttonlink || "",
      isActive: item.isActive,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      try {
        await noticesApi.deleteNotice(id);
        fetchNotices();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (isEditing && currentId) {
        res = await noticesApi.updateNotice(currentId, formData);
      } else {
        res = await noticesApi.createNotice(formData);
      }

      if (res.statusCode === 200 || res.statusCode === 201) {
        setIsFormOpen(false);
        fetchNotices();
      } else {
        alert("Failed to save notice");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadApi.uploadFile(file);
      if (res.statusCode === 200 && res.data?.url) {
        setFormData({ ...formData, imageUrl: res.data.url });
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Notices Management</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage website popup notices</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={handleOpenAdd}
            className="bg-[#0077b6] hover:bg-[#023e8a] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#0077b6]/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Notice
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-6">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              {isEditing ? <Edit2 className="w-5 h-5 text-[#0077b6]" /> : <Plus className="w-5 h-5 text-[#0077b6]" />}
              {isEditing ? "Edit Notice" : "Add New Notice"}
            </h3>
            <button onClick={() => setIsFormOpen(false)} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white"
                  placeholder="Enter notice title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Image</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0" />
                  )}
                  <div className="flex-1 w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-[#0077b6] hover:file:bg-sky-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    />
                    {isUploading && <p className="text-xs text-[#0077b6] mt-2 font-semibold animate-pulse">Uploading image...</p>}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Button Link / CTA URL (Optional)</label>
                <input
                  type="url"
                  value={formData.buttonlink}
                  onChange={(e) => setFormData({ ...formData, buttonlink: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
              <label className="block text-sm font-bold text-slate-700 p-4 border-b border-slate-100 bg-slate-50 mb-0">Description</label>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(val) => setFormData({ ...formData, description: val })}
                className="h-64 mb-12"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-[#0077b6] focus:ring-[#0077b6]"
              />
              <label htmlFor="isActive" className="text-sm font-bold text-slate-700 cursor-pointer">
                Active (Show this notice to users)
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0077b6] hover:bg-[#023e8a] text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Save className="w-5 h-5" />
                {isEditing ? "Save Changes" : "Create Notice"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Notice Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {notices.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{item.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      {item.isActive ? (
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Active</span>
                      ) : (
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {notices.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      No notices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
