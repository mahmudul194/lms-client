"use client";

import React, { useState } from "react";
import { FolderDown, Download } from "lucide-react";
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

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderDown className="w-5 h-5 text-[#0077b6]" />
            <span>Project Files & Resource Library</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Download official BIM family packs, project templates, and CAD drawing sheets
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2">
          {["all", "Families", "Templates", "CAD"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[#002b5b] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all flex items-center justify-between gap-4 group"
          >
            <div className="space-y-1 min-w-0">
              <span className="text-[10px] font-black text-[#0077b6] bg-sky-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {res.category}
              </span>
              <h4 className="font-bold text-slate-900 text-sm truncate block mt-1">
                {res.name}
              </h4>
              <span className="text-xs text-slate-500 font-semibold block">
                {res.type} • {res.size}
              </span>
            </div>

            <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-[#002b5b] group-hover:bg-[#0077b6] group-hover:text-white group-hover:border-[#0077b6] font-bold text-xs sm:text-sm transition-all shrink-0 shadow-xs cursor-pointer flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
