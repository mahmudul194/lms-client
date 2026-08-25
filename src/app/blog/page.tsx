"use client";

import React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function BlogsPage() {
  const blogs = [
    {
      id: "bim-lod-complete-guide",
      category: "BIM LOD",
      date: "November 30, 2025",
      title: "BIM LOD (Level of Development) — Complete Guide (LOD 100–500)",
      excerpt: "A comprehensive practical guide to understanding BIM LOD frameworks, detailing standards, and industry requirements from schematic design to construction handover...",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "bim-dimensions-1d-7d",
      category: "BIM DIMENSIONS",
      date: "November 30, 2025",
      title: "BIM Dimensions (1D-7D) Explained: How 7D BIM Transforms Construction",
      excerpt: "Building Information Modeling is a comprehensive lifecycle methodology. Learn how 3D modeling, 4D scheduling, 5D cost tracking, 6D sustainability, and 7D facility management operate together...",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "clash-detection-bim",
      category: "CLASH DETECTION",
      date: "November 30, 2025",
      title: "Clash Detection in BIM: Comprehensive Guide (What, Why & How)",
      excerpt: "Clash detection in Navisworks and Revit is an essential coordination process that detects architectural, structural, and MEP interference before on-site fabrication...",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "bim-build-bd-intro",
      category: "INSTITUTE",
      date: "November 4, 2025",
      title: "BIM Build BD: Pioneering Technical AEC Education in Bangladesh",
      excerpt: "Empowering engineers and architects with hands-on BIM modeling, automation workflows, and global career opportunities...",
      image: "",
      hasImage: false,
    },
    {
      id: "bim-smart-construction-future",
      category: "BIM",
      date: "October 6, 2025",
      title: "BIM: The Era of Smart Digital Construction & Parametric Modeling",
      excerpt: "Discover how intelligent digital twins and computational BIM workflows are reducing costs, eliminating rework, and accelerating project timelines...",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      hasImage: true,
    },
  ];

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-slate-400 font-medium">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-semibold">Blogs</span>
        </div>

        {/* Page Title */}
        <div className="text-center pt-2 pb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002b5b] tracking-tight">
            Engineering & BIM Blogs
          </h1>
          <p className="text-sm text-slate-500 mt-2">Latest industry insights, technical guides, and BIM tutorials</p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Image (if present) */}
                {blog.image && (
                  <div className="relative h-56 sm:h-60 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-[#0077b6]">
                    {blog.category}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug group-hover:text-[#0077b6] transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Read More Link */}
              <div className="px-6 pb-6 pt-2">
                <button className="text-xs sm:text-sm font-extrabold text-[#0077b6] group-hover:text-[#002b5b] transition-colors inline-flex items-center gap-1">
                  <span>Read Article</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
