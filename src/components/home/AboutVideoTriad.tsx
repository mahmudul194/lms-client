"use client";

import React from "react";
import { Play } from "lucide-react";

interface AboutVideoTriadProps {
  onPlayVideo: (url: string) => void;
}

export default function AboutVideoTriad({ onPlayVideo }: AboutVideoTriadProps) {
  const triadVideos = [
    {
      title: "Watch What is BIM Build BD?",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Watch Student Success Story",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Watch Career Guideline Video",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="bg-[#f0f4f8] rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-xs">
      <span className="text-sm font-bold uppercase tracking-wider text-[#0077b6]">
        About
      </span>
      <h2 className="text-2xl sm:text-3xl font-black text-[#002b5b] mt-1 mb-10">
        BIM Build BD
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {triadVideos.map((v, i) => (
          <div key={i} className="space-y-3.5">
            <div
              onClick={() => onPlayVideo(v.url)}
              className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer group bg-slate-900 border border-slate-200"
            >
              <img
                src={v.image}
                alt={v.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-10 rounded-2xl bg-red-600 group-hover:bg-red-700 flex items-center justify-center shadow-xl transition-all group-hover:scale-110">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
              </div>
            </div>
            <p className="text-sm sm:text-base font-bold text-[#002b5b]">
              {v.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
