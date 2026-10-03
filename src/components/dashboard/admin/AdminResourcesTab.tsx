"use client";

import React, { useState, useEffect } from "react";
import { FolderDown, Plus, Search, Edit, Eye, Trash2, FileText, Download } from "lucide-react";
import { resourcesApi, ResourceItem, CreateResourcePayload } from "@/services/api/resourcesApi";
import AdminAddResourceView from "./AdminAddResourceView";
import AdminResourceDetails from "./AdminResourceDetails";
import AdminEditResourceModal from "./AdminEditResourceModal";
import AdminDeleteConfirmModal from "./AdminDeleteConfirmModal";

export default function AdminResourcesTab({ batches }: { batches?: any[] }) {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [deletingResource, setDeletingResource] = useState<ResourceItem | null>(null);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await resourcesApi.getAllResources({ limit: 100, search });
      if (res.statusCode === 200 && res.data?.items) {
        setResources(res.data.items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [search]);

  const handleCreateResource = async (newResource: CreateResourcePayload) => {
    try {
      const res = await resourcesApi.createResource(newResource);
      if (res.statusCode === 201 || res.statusCode === 200) {
        alert(`Successfully uploaded resource!`);
        fetchResources();
        setIsAddingResource(false);
      } else {
        alert("Failed to upload resource.");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleUpdateResource = async (id: string, payload: Partial<CreateResourcePayload>) => {
    await resourcesApi.updateResource(id, payload);
    fetchResources();
  };

  const handleDeleteResourceConfirm = async () => {
    if (!deletingResource) return;
    await resourcesApi.deleteResource(deletingResource.id);
    fetchResources();
    if (selectedResourceId === deletingResource.id) {
      setSelectedResourceId(null);
    }
  };

  if (selectedResourceId) {
    return (
      <>
        <AdminResourceDetails 
          resourceId={selectedResourceId} 
          onBack={() => setSelectedResourceId(null)} 
          onDelete={(r) => setDeletingResource(r)}
        />
        <AdminDeleteConfirmModal
          isOpen={!!deletingResource}
          title="Delete Resource"
          itemName={deletingResource?.title}
          message="Are you sure you want to permanently delete this resource file? Students will no longer have access to it."
          onClose={() => setDeletingResource(null)}
          onConfirm={handleDeleteResourceConfirm}
        />
      </>
    );
  }

  if (isAddingResource) {
    return <AdminAddResourceView onBack={() => setIsAddingResource(false)} onAdd={handleCreateResource} mentorBatches={batches} />;
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FolderDown className="w-6 h-6 text-[#0077b6]" />
            <span>Study Resources & Files</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Manage downloadable course materials, PDFs, and links.</p>
        </div>
        <button onClick={() => setIsAddingResource(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0">
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Upload Resource</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:outline-none font-medium bg-slate-50 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title & Batch</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">File Size</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Links</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 font-semibold">Loading resources...</td>
              </tr>
            ) : resources.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 font-semibold">No resources found. Upload one to get started!</td>
              </tr>
            ) : (
              resources.map((resource) => (
                <tr key={resource.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-[#0077b6]" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm sm:text-base">{resource.title}</div>
                        <div className="text-xs text-slate-500 font-semibold mt-0.5">{resource.batch?.name || "Global Resource"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-semibold text-slate-700">
                      {resource.sizeMb ? `${resource.sizeMb} MB` : "N/A"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      {resource.url && <a href={resource.url} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100" title="Download ZIP"><Download className="w-4 h-4" /></a>}
                      {resource.pdf && <a href={resource.pdf} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100" title="View PDF"><FileText className="w-4 h-4" /></a>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedResourceId(resource.id)} className="p-2 text-slate-400 hover:text-[#0077b6] hover:bg-sky-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditingResource(resource)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit Resource">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeletingResource(resource)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Resource">
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

      {editingResource && (
        <AdminEditResourceModal
          isOpen={!!editingResource}
          resource={editingResource}
          onClose={() => setEditingResource(null)}
          onUpdate={handleUpdateResource}
        />
      )}

      <AdminDeleteConfirmModal
        isOpen={!!deletingResource}
        title="Delete Resource"
        itemName={deletingResource?.title}
        message="Are you sure you want to permanently delete this resource file? Students will no longer have access to it."
        onClose={() => setDeletingResource(null)}
        onConfirm={handleDeleteResourceConfirm}
      />
    </div>
  );
}
