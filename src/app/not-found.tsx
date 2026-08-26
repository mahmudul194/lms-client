"use client";

import React from "react";
import Link from "next/link";
import { Home, BookOpen, Compass, HardHat } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#f4f8fb] px-4 py-20 sm:py-28 font-sans relative overflow-hidden">
      {/* Background Architectural Grid & Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
          <circle cx="200" cy="150" r="280" stroke="#0077b6" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="1240" cy="620" r="320" stroke="#0077b6" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10 mx-auto">
        {/* Soft Giant 404 Number in Background */}
        <div className="text-7xl sm:text-9xl font-black text-slate-200/60 select-none pointer-events-none leading-none -mb-8 sm:-mb-12 tracking-wider">
          404
        </div>

        {/* Architectural Icon Graphic */}
        <div className="relative inline-block mb-7">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white shadow-xl border border-slate-200 flex items-center justify-center mx-auto text-[#0077b6] group">
            <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-[#0077b6] group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-[#002b5b] text-amber-400 flex items-center justify-center shadow-md border-2 border-white">
            <HardHat className="w-4 h-4" />
          </div>
        </div>

        {/* 404 Badge */}
        <div className="mb-4">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0077b6] bg-sky-50 px-4 py-1.5 rounded-full border border-sky-200 inline-block shadow-2xs">
            404 Error • Page Not Found
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#002b5b] tracking-tight mb-5 leading-tight">
          Page Not Found
        </h1>

        {/* Description with plenty of room */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-lg mx-auto leading-relaxed mb-10">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-12">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#002b5b] hover:bg-[#001830] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <Home className="w-4 h-4 text-sky-400" />
            <span>Back to Homepage</span>
          </Link>

          <Link
            href="/courses"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-[#0077b6] border border-slate-200 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs transition-all hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Courses</span>
          </Link>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-slate-200/90 text-xs sm:text-sm text-slate-500 font-semibold flex flex-wrap items-center justify-center gap-5 sm:gap-7">
          <Link href="/admission" className="hover:text-[#0077b6] transition-colors">
            Admission & Installments
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/contact" className="hover:text-[#0077b6] transition-colors">
            Contact Support
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/faq" className="hover:text-[#0077b6] transition-colors">
            Frequently Asked Questions
          </Link>
        </div>
      </div>
    </div>
  );
}
