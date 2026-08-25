"use client";

import React from "react";
import { Users } from "lucide-react";

interface BatchItem {
  title: string;
  subtitle: string;
  image: string;
  hasImage: boolean;
}

interface BatchGallerySectionProps {
  batches: BatchItem[];
}

export default function BatchGallerySection({ batches }: BatchGallerySectionProps) {
  return (
    <div className="space-y-10">
      <div className="text-left">
        <h2 className="text-xl sm:text-2xl font-black text-[#002b5b] tracking-tight">
          Student Batch{" "}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {batches.map((batch, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden flex items-center justify-center">
              {batch.hasImage ? (
                <img
                  src={batch.image}
                  alt={batch.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-300 group-hover:text-[#0077b6] transition-colors">
                  <div className="w-16 h-16 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center mb-3">
                    <Users className="w-8 h-8 opacity-40" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide uppercase text-slate-400">
                    Upcoming Batch
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 text-center space-y-1.5 flex-1 flex flex-col justify-center">
              <h3 className="text-lg font-black text-[#0f172a] tracking-tight group-hover:text-[#0077b6] transition-colors">
                {batch.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                {batch.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
