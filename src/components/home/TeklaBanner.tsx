"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function TeklaBanner() {
  return (
    <section className="py-20 bg-white space-y-20">
      {/* 1. Professional Tekla Course Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002b5b]">
          Professional Tekla Course
        </h2>

        <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-200">
          <div className="p-8 sm:p-14 lg:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            <div className="text-left space-y-4">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#0077b6]">
                Tekla Structures
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
                PROFESSIONAL STEEL DETAILING COURSE
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-slate-300">
                By Tekla Software • Instructor: Engr. Maidul
              </p>
              <div className="pt-3">
                <Link
                  href="/courses"
                  className="inline-block px-8 py-3.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all hover:scale-105"
                >
                  Enroll Tekla Course
                </Link>
              </div>
            </div>

            <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border-2 border-sky-400/40 shrink-0 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
                alt="Tekla Instructor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b5b] via-[#0f4c81] to-slate-900 opacity-95" />
        </div>
      </div>

      {/* 2. Middle Offer Box with Lightning Bolt Icon */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#f0f4f8] rounded-3xl p-10 sm:p-12 text-center border border-slate-200 shadow-xs">
          {/* Top Circular Lightning Bolt Badge */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#002b5b] text-white flex items-center justify-center shadow-xl">
            <Zap className="w-7 h-7 fill-white text-white" />
          </div>

          <div className="pt-3 space-y-2.5">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0077b6]">
              What We Offer
            </span>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-[#002b5b] max-w-3xl mx-auto leading-relaxed">
              Professional BIM training, live project experience, and mentorship to build your career in smart construction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
