"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RecentBlogsSection() {
  const recentBlogs = [
    {
      id: "bim-lod-complete-guide",
      category: "BIM LOD",
      title: "BIM LOD (Level of Development) — Complete Guide (LOD 100–500)",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "bim-dimensions-1d-7d",
      category: "BIM DIMENSIONS",
      title: "BIM Dimensions (1D-7D) Explained: How 7D BIM Transforms Construction",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "clash-detection-bim",
      category: "CLASH DETECTION",
      title: "Clash Detection in BIM: Comprehensive Guide (What, Why & How)",
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        {/* Section Header - Clean & Centered */}
        <div className="text-center pb-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002b5b] tracking-tight">
            Recent Engineering & BIM Blogs
          </h2>
        </div>

        {/* 3-Column Recent Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recentBlogs.map((blog) => (
            <Link
              key={blog.id}
              href="/blog"
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Inset Framed Image */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0077b6] font-black text-[11px] tracking-wider uppercase shadow-xs">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Card Body & CTA */}
              <div className="pt-5 px-1.5 flex flex-col justify-between flex-1">
                <h3 className="text-base sm:text-lg font-black text-[#002b5b] group-hover:text-[#0077b6] transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h3>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-700 group-hover:text-[#0077b6] transition-colors">
                    Read Article
                  </span>
                  <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0077b6] group-hover:bg-[#0077b6] group-hover:text-white flex items-center justify-center transition-all duration-200">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
