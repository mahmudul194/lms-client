"use client";

import React from "react";
import Link from "next/link";
import { Star, Sparkles } from "lucide-react";

export default function HeroShowcaseCard() {
  return (
    <div className="lg:col-span-6 flex justify-center lg:justify-end font-sans">
      <div className="relative w-full max-w-lg">
        {/* Soft Decorative Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/20 to-[#0077b6]/30 rounded-3xl blur-2xl -z-10" />

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Modern Architectural Engineering Design & BIM Modeling"
            loading="lazy"
            decoding="async"
            className="w-full h-80 sm:h-96 lg:h-[430px] object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
          />

          {/* Overlay Floating Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-[#002b5b]/90 text-sky-200 text-xs font-bold backdrop-blur-xs border border-white/20 shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>8th Batch Enrolling</span>
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-slate-800 ml-1">4.95 (500+ Reviews)</span>
              </div>
              <h4 className="text-sm font-extrabold text-[#002b5b] mt-0.5">
                Autodesk Revit & BIM Architecture
              </h4>
            </div>

            <Link
              href="/admission"
              className="px-4 py-2 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white text-xs font-bold shadow-md transition-all shrink-0 hover:scale-105 active:scale-95"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
