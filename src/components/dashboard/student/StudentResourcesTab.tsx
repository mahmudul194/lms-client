"use client";

import React, { useState, useEffect } from "react";
import { FolderDown, Download, FileSpreadsheet, Layers, FileCode } from "lucide-react";
import { CourseResource } from "@/types/dashboard";

interface StudentResourcesTabProps {
  resources: CourseResource[];
}

export default function StudentResourcesTab({ resources }: StudentResourcesTabProps) {
  const [filter, setFilter] = useState("all");
  const [list, setList] = useState<CourseResource[]>(resources);

  useEffect(() => {
    (async () => {
      try {
        const { resourcesApi } = await import("@/services/api");
        const res = await resourcesApi.getAllResources();
        if (res.statusCode === 200 && res.data?.items?.length) {
          const apiItems: CourseResource[] = res.data.items.map((r) => ({
            name: r.title,
            size: r.sizeMb ? `${r.sizeMb} MB` : "15 MB",
            type: r.pdf ? "PDF" : "RVT Model",
            category: "Templates",
          }));
          setList(apiItems);
        }
      } catch {}
    })();
  }, []);

  const filteredResources =
    filter === "all"
      ? list
      : list.filter((r) => r.category.toLowerCase().includes(filter.toLowerCase()));

  const getIcon = (type: string) => {
    if (type.includes("RVT") || type.includes("RFA")) return <Layers className="w-5 h-5 text-[#0077b6]" />;
    if (type.includes("DWG") || type.includes("CAD")) return <FileCode className="w-5 h-5 text-emerald-600" />;
    return <FileSpreadsheet className="w-5 h-5 text-amber-600" />;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FolderDown className="w-6 h-6 text-[#0077b6]" />
            <span>Course Resource Library</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Download BIM family packages, project models, and calculation sheets</p>
        </div>
        <div className="flex items-center gap-2">
          {["all", "Families", "Templates", "CAD"].map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${filter === cat ? "bg-[#002b5b] text-white shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
              {cat === "all" ? "All Files" : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredResources.map((res, i) => (
          <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all flex items-center justify-between gap-4 group">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">{getIcon(res.type)}</div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-sm truncate">{res.name}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5"><span className="font-semibold text-[#0077b6]">{res.type}</span><span>•</span><span>{res.size}</span></div>
              </div>
            </div>
            <button onClick={() => alert(`Downloading resource: ${res.name}`)} className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-[#0077b6] hover:text-white hover:border-[#0077b6] transition-all shrink-0 cursor-pointer shadow-2xs"><Download className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
