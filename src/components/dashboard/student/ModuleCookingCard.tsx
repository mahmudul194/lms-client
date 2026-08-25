"use client";

import React from "react";
import { Sparkles, Flame, Clock, ArrowLeft, RotateCcw, CheckCircle2 } from "lucide-react";

interface ModuleCookingCardProps {
  completedCount: number;
  totalCount: number;
  onReviewPrevious: () => void;
  onBackToCourses: () => void;
}

export default function ModuleCookingCard({
  completedCount,
  totalCount,
  onReviewPrevious,
  onBackToCourses,
}: ModuleCookingCardProps) {
  return (
    <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-[#001830] via-[#002b5b] to-[#0f4c81] p-6 sm:p-10 flex flex-col items-center justify-center text-center text-white shadow-2xl border border-sky-500/20 font-sans group">
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Animated Floating Cooking Badge */}
      <div className="relative mb-4 sm:mb-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-500/20 to-sky-500/20 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-inner animate-pulse">
          <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 fill-amber-400 drop-shadow-md" />
        </div>
        <div className="absolute -top-1.5 -right-1.5 p-1.5 rounded-full bg-[#0077b6] text-white shadow-md border border-white/40">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Status Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs sm:text-sm font-semibold text-sky-200 mb-3 shadow-xs">
        <Clock className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "6s" }} />
        <span>Next Batch Milestone in Progress</span>
      </div>

      {/* Main Punchy Title */}
      <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
        The new module is cooking
      </h2>

      {/* Subtitle & Milestone Progress */}
      <p className="mt-2.5 max-w-xl text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal">
        Our senior BIM instructors are recording and detailing the next live project lectures. 
        You have completed all <strong>{completedCount}/{totalCount} released lessons</strong>!
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onReviewPrevious}
          className="px-5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
        >
          <RotateCcw className="w-4 h-4 text-sky-300" />
          <span>Review Previous Lessons</span>
        </button>
        <button
          onClick={onBackToCourses}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#0077b6] to-[#005a8c] hover:from-[#005a8c] hover:to-[#002b5b] text-white font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all cursor-pointer hover:scale-105 border border-sky-300/30"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </button>
      </div>
    </div>
  );
}
