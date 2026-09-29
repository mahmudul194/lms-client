"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit, FileText, Download, Link as LinkIcon, HardDrive, BookOpen } from "lucide-react";
import { resourcesApi, ResourceItem } from "@/services/api/resourcesApi";

interface AdminResourceDetailsProps {
  resourceId: string;
  onBack: () => void;
}

export default function AdminResourceDetails({ resourceId, onBack }: AdminResourceDetailsProps) {
  const [resource, setResource] = useState<ResourceItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await resourcesApi.getResourceById(resourceId);
        if (res.statusCode === 200 && res.data) {
          setResource(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [resourceId]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Loading resource details...</div>;
  }

  if (!resource) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-500 font-semibold">Resource not found.</p>
        <button onClick={onBack} className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold transition-colors">Go Back</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-start gap-4">
          <button onClick={onBack} className="mt-1 p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-xs font-bold text-slate-400">ID: {resource.id}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{resource.title}</h3>
            <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0077b6]" />
              {resource.batch?.name || "Global Resource"} {resource.batch?.code ? `(${resource.batch.code})` : ""}
            </p>
          </div>
        </div>
        <button className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shrink-0">
          <Edit className="w-4 h-4" />
          <span>Edit Details</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0077b6]" />
              Description
            </h4>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
              {resource.description || "No description provided."}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Available Formats & Links</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resource.pdf && (
                <a href={resource.pdf} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100 hover:bg-rose-100 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-rose-900">PDF Document</div>
                    <div className="text-xs font-semibold text-rose-600/70 truncate w-32">View online</div>
                  </div>
                </a>
              )}
              {resource.url && (
                <a href={resource.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <Download className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-emerald-900">Download File</div>
                    <div className="text-xs font-semibold text-emerald-600/70 truncate w-32">Save to device</div>
                  </div>
                </a>
              )}
              {resource.link && (
                <a href={resource.link} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-2xl bg-sky-50 border border-sky-100 hover:bg-sky-100 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <LinkIcon className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-sky-900">External Link</div>
                    <div className="text-xs font-semibold text-sky-600/70 truncate w-32">{resource.link}</div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Info */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
              <HardDrive className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-600 mb-0.5">File Size</div>
              <div className="text-2xl font-black text-indigo-950">{resource.sizeMb ? `${resource.sizeMb} MB` : "Unknown"}</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Metadata</h5>
            <div className="space-y-2 text-sm font-semibold text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Created At</span>
                <span>{resource.createdAt ? new Date(resource.createdAt).toLocaleDateString() : "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
