"use client";

import React from "react";
import Link from "next/link";
import { Home, BookOpen, ArrowLeft, Compass, HardHat } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f4f8fb] px-4 py-16 font-sans relative overflow-hidden">
      {/* Background Architectural Blueprint Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1440 700" fill="none">
          <circle cx="200" cy="150" r="250" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="1200" cy="550" r="300" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        {/* Architectural Icon Graphic */}
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white shadow-xl border border-slate-200 flex items-center justify-center mx-auto text-[#0077b6] group">
            <Compass className="w-12 h-12 sm:w-14 sm:h-14 text-[#0077b6] group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-[#002b5b] text-amber-400 flex items-center justify-center shadow-lg border-2 border-white">
            <HardHat className="w-5 h-5" />
          </div>
        </div>

        {/* 404 Headline */}
        <div className="space-y-3">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0077b6] bg-sky-50 px-4 py-1.5 rounded-full border border-sky-200">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-[#002b5b] tracking-tight">
            Model Not Found!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            The architectural blueprint or page you are looking for might have been moved, renamed, or is currently under construction.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#002b5b] hover:bg-[#001830] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <Home className="w-4 h-4 text-sky-400" />
            <span>Back to Homepage</span>
          </Link>

          <Link
            href="/courses"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-[#0077b6] border border-slate-200 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Courses</span>
          </Link>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-6 border-t border-slate-200 text-xs sm:text-sm text-slate-500 font-medium flex items-center justify-center gap-6">
          <Link href="/admission" className="hover:text-[#0077b6] transition-colors">
            Admission & Installments
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-[#0077b6] transition-colors">
            Contact Support
          </Link>
          <span>•</span>
          <Link href="/faq" className="hover:text-[#0077b6] transition-colors">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
