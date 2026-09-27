"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Play, ArrowRight, BookOpen } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";
import { ClassVideo } from "@/types/dashboard";

interface StudentHeroProgressBannerProps {
  currentUser: UserAccount;
  classesList: ClassVideo[];
  enrolledCourse?: { title: string; batch?: string } | null;
  onSelectVideo: (video: ClassVideo) => void;
  onNavigateToCourses: () => void;
}

export default function StudentHeroProgressBanner({
  currentUser,
  classesList,
  enrolledCourse,
  onSelectVideo,
  onNavigateToCourses,
}: StudentHeroProgressBannerProps) {
  const isEnrolled = !!enrolledCourse;

  return (
    <div className="bg-gradient-to-r from-[#002b5b] via-[#0f4c81] to-[#0077b6] rounded-3xl text-white p-7 sm:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 font-sans">
      <div className="space-y-4 z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-sky-100 text-xs sm:text-sm font-bold backdrop-blur-xs">
          <Sparkles className="w-4 h-4 text-sky-200" />
          <span>{isEnrolled ? "Welcome Back" : "Welcome"}, {currentUser.name}!</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
          {isEnrolled ? (enrolledCourse.title || "Active BIM Course") : "Start Your BIM Engineering Journey"}
        </h2>
        <p className="text-sm sm:text-base text-sky-100 font-medium leading-relaxed">
          {isEnrolled
            ? `Batch: ${enrolledCourse.batch || "Active"} • Ready to continue your lessons?`
            : "You are not currently enrolled in any course. Explore our professional BIM engineering & architecture programs to get started."}
        </p>

        {isEnrolled && (
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs sm:text-sm font-bold text-sky-100">
              <span>Overall Course Progress</span>
              <span className="text-sky-200 font-extrabold">Active</span>
            </div>
            <div className="w-full h-3.5 bg-black/25 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-300 to-sky-100 rounded-full w-[25%]" />
            </div>
          </div>
        )}
      </div>

      <div className="z-10 shrink-0">
        {isEnrolled ? (
          <button
            onClick={() => {
              if (classesList.length > 0) onSelectVideo(classesList[0]);
              onNavigateToCourses();
            }}
            className="px-8 py-4 rounded-2xl bg-white text-[#002b5b] hover:bg-sky-50 font-black text-sm sm:text-base flex items-center gap-3 shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-[#002b5b]" />
            <span>Resume Learning</span>
          </button>
        ) : (
          <Link
            href="/courses"
            className="px-8 py-4 rounded-2xl bg-white text-[#002b5b] hover:bg-sky-50 font-black text-sm sm:text-base flex items-center gap-3 shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-[#002b5b]" />
            <span>Explore Courses</span>
            <ArrowRight className="w-4 h-4 text-[#002b5b]" />
          </Link>
        )}
      </div>
    </div>
  );
}
