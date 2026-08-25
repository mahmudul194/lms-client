"use client";

import React from "react";
import Link from "next/link";
import { Zap, Users, Laptop, GraduationCap, Film, Video } from "lucide-react";

export default function TeklaAndStats() {
  return (
    <section className="py-16 bg-white space-y-20">
      {/* 1. Professional Tekla Course Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-[#002b5b]">
          Professional Tekla Course
        </h2>

        <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-200">
          <div className="p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-left space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#0077b6]">
                Tekla Structures
              </span>
              <h3 className="text-2xl sm:text-4xl font-black leading-tight">
                PROFESSIONAL STEEL DETAILING COURSE
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                By Tekla Software • Instructor: Engr. Maidul
              </p>
              <div className="pt-3">
                <Link
                  href="/admission"
                  className="inline-block px-7 py-3 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-extrabold text-sm shadow-lg transition-all hover:scale-105"
                >
                  Enroll Tekla Course
                </Link>
              </div>
            </div>

            <div className="relative w-52 h-52 rounded-2xl overflow-hidden border-2 border-sky-400/40 shrink-0 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                alt="Tekla Instructor"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b5b] via-[#0f4c81] to-slate-900 opacity-95" />
        </div>
      </div>

      {/* 2. Middle Offer Box with Lightning Bolt Icon */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#f0f4f8] rounded-3xl p-8 sm:p-10 text-center border border-slate-200 shadow-xs">
          {/* Top Circular Lightning Bolt Badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#002b5b] text-white flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 fill-white text-white" />
          </div>

          <div className="pt-2 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0077b6]">
              What We Offer
            </span>
            <p className="text-sm sm:text-base font-bold text-[#002b5b] max-w-2xl mx-auto leading-relaxed">
              Professional BIM training, live project experience, and mentorship to build your career in smart construction.
            </p>
          </div>
        </div>
      </div>

      {/* 3. "START TO SUCCESS" Stats Bar */}
      <div className="bg-[#f8fafc] border-y border-slate-200 py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
            {/* Left Title */}
            <div className="space-y-2 text-center lg:text-left shrink-0">
              <span className="text-xs font-black uppercase tracking-widest text-[#0077b6] block">
                START TO SUCCESS
              </span>
              <div className="relative inline-block">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002b5b]">
                  Achieve Your Goals with BIM Build BD
                </h3>
                {/* Curved brand blue underline */}
                <svg
                  className="w-36 sm:w-48 h-4 text-[#0077b6] absolute -bottom-2 left-0"
                  viewBox="0 0 150 12"
                  fill="none"
                >
                  <path
                    d="M3 9C40 2 110 2 147 10"
                    stroke="#0077b6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Right: 5 Stats Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 sm:gap-10 w-full">
              {/* Stat 1 */}
              <div className="text-center space-y-2 flex flex-col items-center">
                <Users className="w-8 h-8 text-[#0077b6]" />
                <div className="text-2xl sm:text-3xl font-black text-[#002b5b]">15</div>
                <div className="text-xs sm:text-sm font-bold text-slate-600">Expert Trainer</div>
              </div>

              {/* Stat 2 */}
              <div className="text-center space-y-2 flex flex-col items-center">
                <Laptop className="w-8 h-8 text-[#0077b6]" />
                <div className="text-2xl sm:text-3xl font-black text-[#002b5b]">12</div>
                <div className="text-xs sm:text-sm font-bold text-slate-600">Programs</div>
              </div>

              {/* Stat 3 */}
              <div className="text-center space-y-2 flex flex-col items-center">
                <GraduationCap className="w-8 h-8 text-[#0077b6]" />
                <div className="text-2xl sm:text-3xl font-black text-[#002b5b]">200+</div>
                <div className="text-xs sm:text-sm font-bold text-slate-600">Students</div>
              </div>

              {/* Stat 4 */}
              <div className="text-center space-y-2 flex flex-col items-center">
                <Film className="w-8 h-8 text-[#0077b6]" />
                <div className="text-2xl sm:text-3xl font-black text-[#002b5b]">312</div>
                <div className="text-xs sm:text-sm font-bold text-slate-600">Course Videos</div>
              </div>

              {/* Stat 5 */}
              <div className="text-center space-y-2 flex flex-col items-center col-span-2 sm:col-span-1">
                <Video className="w-8 h-8 text-[#0077b6]" />
                <div className="text-2xl sm:text-3xl font-black text-[#002b5b]">45</div>
                <div className="text-xs sm:text-sm font-bold text-slate-600">Live Classes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
