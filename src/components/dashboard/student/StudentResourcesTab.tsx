"use client";

import React, { useState } from "react";
import { FolderDown, Download, FileSpreadsheet, Layers, FileCode } from "lucide-react";
import { CourseResource } from "@/types/dashboard";

interface StudentResourcesTabProps {
  resources: CourseResource[];
}

export default function StudentResourcesTab({ resources }: StudentResourcesTabProps) {
  const [filter, setFilter] = useState("all");

  const filteredResources =
    filter === "all"
      ? resources
      : resources.filter((r) => r.category.toLowerCase().includes(filter.toLowerCase()));

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
          <p className="text-sm text-slate-500 mt-1">
            Download BIM family packages, project models, and structural calculation sheets
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["all", "Families", "Templates", "CAD"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[#002b5b] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat === "all" ? "All Files" : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredResources.map((res, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all flex items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                {getIcon(res.type)}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate block">
                  {res.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-bold text-[#0077b6] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/60 uppercase">
                    {res.category}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">
                    {res.type} • {res.size}
                  </span>
                </div>
              </div>
            </div>

            <button className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#002b5b] group-hover:bg-[#0077b6] group-hover:text-white group-hover:border-[#0077b6] font-bold text-xs sm:text-sm transition-all shrink-0 shadow-xs cursor-pointer flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
