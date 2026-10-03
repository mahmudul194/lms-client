"use client";

import React from "react";
import { Star, Users, Clock } from "lucide-react";
import { Course } from "@/data/mockData";

interface CourseHeroHeaderProps {
  course: Course;
}

export default function CourseHeroHeader({ course }: CourseHeroHeaderProps) {
  return (
    <div className="lg:col-span-8 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-3 py-1 rounded-md bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30 uppercase tracking-wider">
          {course.batchNo || "Upcoming Batch"}
        </span>
        <span className="px-3 py-1 rounded-md bg-[#0f4c81] text-sky-100 text-xs font-semibold">
          {course.level}
        </span>
        <span className="px-3 py-1 rounded-md bg-[#0f4c81] text-sky-100 text-xs font-semibold">
          {course.duration}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
        {course.title}
      </h1>

      {course.description ? (
        <div
          className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-medium prose prose-invert prose-p:my-1.5 prose-headings:text-white prose-ul:my-1 prose-li:my-0.5"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
      ) : null}

      <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-200 font-semibold">
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-bold text-white">{course.rating || 4.9}</span>
          <span>({course.reviewsCount || 48} reviews)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-sky-300" />
          <span>{course.studentsCount || 200}+ Students Enrolled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-sky-300" />
          <span>{course.totalClasses || 36} Live Classes</span>
        </div>
      </div>
    </div>
  );
}
