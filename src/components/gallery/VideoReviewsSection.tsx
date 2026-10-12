"use client";

import { Play } from "lucide-react";

interface VideoReview {
  title: string;
  author: string;
  image: string;
  url: string;
}

interface VideoReviewsSectionProps {
  videos: VideoReview[];
  onPlayVideo: (url: string) => void;
}

export default function VideoReviewsSection({ videos, onPlayVideo }: VideoReviewsSectionProps) {
  return (
    <div className="space-y-10 pt-6">
      <div className="text-left">
        <h2 className="text-xl sm:text-2xl font-black text-[#002b5b] tracking-tight">
          Video{" "}
          <span className="relative inline-block">
            <span className="text-[#0f4c81]">Gallery</span>
            <svg
              className="w-full h-3 text-[#0077b6] absolute -bottom-1.5 left-0"
              viewBox="0 0 100 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8C25 2 75 2 98 9"
                stroke="#0077b6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-sky-200 hover:shadow-[0_20px_45px_-15px_rgba(0,43,91,0.18)]"
            style={{
              animation: "galleryFadeUp 0.65s ease-out both",
              animationDelay: `${index * 80}ms`,
            }}
            onClick={() => onPlayVideo(video.url)}
          >
            <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
              <img
                src={video.image}
                alt={video.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-rose-600 transition-all duration-300 pl-0.5">
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </div>
            </div>

            <div className="p-4 text-center space-y-1 flex-1 flex flex-col justify-center">
              <h3 className="text-sm font-black text-[#0f172a] group-hover:text-[#0077b6] transition-colors line-clamp-2">
                {video.title}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {video.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
