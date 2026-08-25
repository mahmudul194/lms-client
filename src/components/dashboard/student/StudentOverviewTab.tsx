"use client";

import React from "react";
import { Video, Download } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";
import { ClassVideo, LiveClass, CourseResource } from "@/types/dashboard";
import StudentHeroProgressBanner from "./StudentHeroProgressBanner";
import StudentMetricsGrid from "./StudentMetricsGrid";

interface StudentOverviewTabProps {
  currentUser: UserAccount;
  classesList: ClassVideo[];
  liveClasses: LiveClass[];
  resources: CourseResource[];
  onSelectVideo: (video: ClassVideo) => void;
  onNavigateToCourses: () => void;
  onNavigateToResources: () => void;
}

export default function StudentOverviewTab({
  currentUser,
  classesList,
  liveClasses,
  resources,
  onSelectVideo,
  onNavigateToCourses,
  onNavigateToResources,
}: StudentOverviewTabProps) {
  return (
    <div className="space-y-8 font-sans">
      {/* 1. Hero Continue Learning Banner */}
      <StudentHeroProgressBanner
        currentUser={currentUser}
        classesList={classesList}
        onSelectVideo={onSelectVideo}
        onNavigateToCourses={onNavigateToCourses}
      />

      {/* 2. 4 Metric Cards */}
      <StudentMetricsGrid />

      {/* 3. Live Class Schedule & Course Handouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Live Zoom Schedule (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <Video className="w-5 h-5 text-[#0077b6]" />
              <span>Upcoming Live Class (Zoom)</span>
            </h3>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-200">
              Thursday 9:00 PM
            </span>
          </div>

          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {liveClasses[0].title}
            </h4>
            <div className="text-sm text-slate-700 space-y-2">
              <p>Instructor: <strong className="text-slate-900">{liveClasses[0].instructor}</strong></p>
              <p>Time: <strong className="text-[#002b5b]">{liveClasses[0].date} — {liveClasses[0].time}</strong></p>
              <p className="font-semibold text-slate-600">Meeting ID: <strong className="text-slate-900">{liveClasses[0].meetingId}</strong> • Passcode: <strong className="text-slate-900">{liveClasses[0].passcode}</strong></p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={liveClasses[0].zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white text-sm font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-all"
              >
                <Video className="w-4 h-4" />
                <span>Join Live Zoom Class</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Resources (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <Download className="w-4 h-4 text-[#0077b6]" />
              <span>Course Downloads</span>
            </h3>
            <button
              onClick={onNavigateToResources}
              className="text-xs sm:text-sm text-[#0077b6] hover:underline font-bold cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {resources.slice(0, 3).map((res, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs sm:text-sm"
              >
                <div className="truncate max-w-[220px]">
                  <span className="font-bold text-slate-800 block truncate">{res.name}</span>
                  <span className="text-xs text-slate-500 font-semibold">{res.type} • {res.size}</span>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-bold text-xs shrink-0 shadow-xs cursor-pointer">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
