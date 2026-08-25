"use client";

import React from "react";
import { Play } from "lucide-react";

interface VideoItem {
  label: string;
  image: string;
  url: string;
}

interface VideoGroup {
  subtitle: string;
  title: string;
  videos: VideoItem[];
}

interface CourseFreeVideoGridProps {
  videoGroups: VideoGroup[];
  onPlayVideo: (url: string) => void;
}

export default function CourseFreeVideoGrid({
  videoGroups,
  onPlayVideo,
}: CourseFreeVideoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videoGroups.map((group, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0077b6]">
              {group.subtitle}
            </span>
            <h3 className="text-lg sm:text-xl font-black text-[#002b5b] leading-tight">
              {group.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {group.videos.map((vid, vIdx) => (
              <div key={vIdx} className="space-y-2 text-center">
                <div
                  onClick={() => onPlayVideo(vid.url)}
                  className="relative h-32 sm:h-36 rounded-xl overflow-hidden shadow-sm cursor-pointer group bg-slate-900 border border-slate-200"
                >
                  <img
                    src={vid.image}
                    alt={vid.label}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-7 rounded-xl bg-red-600 group-hover:bg-red-700 flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
                      <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700 block truncate">
                  {vid.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
