"use client";

import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function RecentBlogsSection() {
  const recentBlogs = [
    {
      id: "bim-lod-complete-guide",
      category: "BIM LOD",
      date: "November 30, 2025",
      title: "BIM LOD (Level of Development) — Complete Guide (LOD 100–500)",
      excerpt:
        "A comprehensive practical guide to understanding BIM LOD frameworks, detailing standards, and industry requirements from schematic design to construction handover...",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "bim-dimensions-1d-7d",
      category: "BIM DIMENSIONS",
      date: "November 30, 2025",
      title: "BIM Dimensions (1D-7D) Explained: How 7D BIM Transforms Construction",
      excerpt:
        "Building Information Modeling is a comprehensive lifecycle methodology. Learn how 3D modeling, 4D scheduling, 5D cost tracking, 6D sustainability, and 7D facility management operate together...",
      image:
        "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "clash-detection-bim",
      category: "CLASH DETECTION",
      date: "November 30, 2025",
      title: "Clash Detection in BIM: Comprehensive Guide (What, Why & How)",
      excerpt:
        "Clash detection in Navisworks and Revit is an essential coordination process that detects architectural, structural, and MEP interference before on-site fabrication...",
      image:
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0077b6]">
              NEWS & ARTICLES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002b5b] mt-1 tracking-tight">
              Recent Engineering & BIM Blogs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Latest industry insights, technical guides, and practical BIM modeling tutorials
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-50 text-[#0077b6] hover:bg-[#0077b6] hover:text-white font-extrabold text-xs sm:text-sm transition-all shadow-xs group shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Recent Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {recentBlogs.map((blog) => (
            <Link
              key={blog.id}
              href="/blog"
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer"
            >
              <div>
                {/* Image & Category Pill */}
                <div className="relative h-52 sm:h-56 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#0077b6] font-extrabold text-[11px] tracking-wider uppercase shadow-md">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug group-hover:text-[#0077b6] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-extrabold text-[#0077b6] group-hover:text-[#002b5b] transition-colors inline-flex items-center gap-1.5">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  5 min read
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
