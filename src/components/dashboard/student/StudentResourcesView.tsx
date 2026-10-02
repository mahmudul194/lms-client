"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, FileText, Download, Link as LinkIcon, ExternalLink, Archive, File } from "lucide-react";
import { resourcesApi, ResourceItem } from "@/services/api/resourcesApi";

interface StudentResourcesViewProps {
  courseTitle: string;
  batch: string;
  batchId?: string;
  onBack: () => void;
}

export default function StudentResourcesView({ courseTitle, batch, batchId, onBack }: StudentResourcesViewProps) {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!batchId) {
      setLoading(false);
      return;
    }

    const fetchResources = async () => {
      try {
        const res = await resourcesApi.getAllResources({ batchId, limit: 100 });
        if (res.statusCode === 200 && res.data?.items) {
          setResources(res.data.items);
        }
      } catch (err) {
        console.error("Failed to fetch resources", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [batchId]);

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0077b6] hover:text-[#002b5b] transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> <span>Back to Course Options</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-[#002b5b] text-white text-xs font-bold">{batch}</span>
              <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold">Class Materials</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{courseTitle} — Resources</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Downloadable PDFs, reference links, and batch files.</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-purple-50 text-purple-700 text-sm font-bold border border-purple-100 shrink-0">
            {resources.length} Available Items
          </div>
        </div>

        <div className="pt-2">
          {loading ? (
            <div className="p-10 text-center text-slate-400 font-semibold bg-slate-50 rounded-2xl border border-slate-100">
              Loading resources...
            </div>
          ) : resources.length === 0 ? (
            <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center space-y-3">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-slate-200 text-slate-300">
                 <Archive className="w-8 h-8" />
               </div>
               <div>
                 <h4 className="text-base font-bold text-slate-700">No Resources Found</h4>
                 <p className="text-sm text-slate-400">Instructors haven't uploaded any materials for this batch yet.</p>
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {resources.map((res) => (
                <div key={res.id} className="p-5 bg-white border-2 border-slate-100 hover:border-purple-300 rounded-2xl shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 group-hover:scale-110 transition-transform">
                      {res.pdf ? <FileText className="w-6 h-6" /> : res.link ? <LinkIcon className="w-6 h-6" /> : <File className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-slate-900 leading-tight group-hover:text-purple-700 transition-colors line-clamp-2">{res.title}</h4>
                      {res.sizeMb && <p className="text-xs text-slate-400 font-medium mt-1">{res.sizeMb} MB</p>}
                    </div>
                  </div>
                  
                  {res.description && (
                    <p className="text-sm text-slate-500 mb-5 flex-1 line-clamp-3 leading-relaxed">
                      {res.description}
                    </p>
                  )}

                  <div className="mt-auto pt-4 border-t border-slate-100 flex gap-3">
                    {res.pdf && (
                      <a href={res.pdf} target="_blank" rel="noreferrer" className="flex-1 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Download className="w-3.5 h-3.5" /> Download PDF
                      </a>
                    )}
                    {(res.link || res.url) && (
                      <a href={res.link || res.url} target="_blank" rel="noreferrer" className="flex-1 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-200">
                        <ExternalLink className="w-3.5 h-3.5" /> Visit Link
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
