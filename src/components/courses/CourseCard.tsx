"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CourseCardItem {
  id: string;
  title: string;
  tag: string;
  discount: string;
  badge?: string;
  duration: string;
  price: string;
  originalPrice: string;
  image: string;
}

interface CourseCardProps {
  course: CourseCardItem;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-2"
    >
      {/* Card Thumbnail */}
      <div className="relative h-60 sm:h-64 w-full bg-slate-900 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#002b5b]/90 text-white text-xs font-bold backdrop-blur-xs shadow-md">
            {course.tag}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-rose-500 text-white text-xs font-black shadow-md">
            {course.discount}
          </span>
        </div>

        {course.badge && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-md">
              {course.badge}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="text-xs text-[#0077b6] font-bold block">
            {course.duration}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#0077b6] transition-colors line-clamp-2">
            {course.title}
          </h3>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-[#0077b6]">
              ৳{course.price}
            </span>
            <span className="text-xs text-slate-400 line-through font-bold">
              ৳{course.originalPrice}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#002b5b] group-hover:translate-x-1 transition-transform">
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
