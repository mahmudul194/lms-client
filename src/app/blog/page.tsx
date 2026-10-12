"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { motion } from "motion/react";

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
    <div className="min-h-screen bg-slate-50/60 py-8 font-sans sm:py-12">
      <div className="mx-auto max-w-[1440px] space-y-10 px-4 sm:space-y-12 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <div className="text-xs font-medium text-slate-400 sm:text-sm">
          <Link href="/" className="transition-colors hover:text-[#0077b6]">
            Home
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-semibold text-[#002b5b]">Blogs</span>
        </div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white px-5 py-10 text-center shadow-sm sm:px-10 sm:py-14"
        >
          <div className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-sky-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-blue-100/50 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-sky-100 bg-sky-50/80 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#0077b6]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077b6]">
                Knowledge & Insights
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#002b5b] sm:text-4xl md:text-5xl">
              Engineering & <span className="text-[#0077b6]">BIM Blogs</span>
            </h1>

            <div className="mx-auto mt-5 flex items-center justify-center gap-1.5">
              <span className="h-1 w-10 rounded-full bg-[#0077b6]" />
              <span className="h-1 w-4 rounded-full bg-[#002b5b]/30" />
              <span className="h-1 w-1 rounded-full bg-[#002b5b]/20" />
            </div>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore practical BIM guides, engineering knowledge, and industry
              insights to stay informed about the future of digital construction.
            </p>
          </div>
        </motion.div>


        {/* Blog Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6"
        >
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="group relative flex min-h-[220px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-[#0077b6]/40 hover:shadow-lg hover:shadow-[#002b5b]/[0.07] sm:min-h-[240px]"
            >
              {/* Image panel */}
              <div className="relative w-[38%] shrink-0 overflow-hidden bg-[#002b5b] sm:w-[40%]">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#002b5b]">
                    <div className="absolute -right-10 -top-8 h-32 w-32 rounded-full border-[20px] border-white/5 transition-transform duration-700 group-hover:scale-125" />
                    <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full border-[18px] border-sky-400/10" />
                    <Calendar className="relative h-8 w-8 text-sky-200 transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10" />
                  </div>
                )}

                <div className="absolute inset-0 bg-[#002b5b]/10 transition-colors duration-300 group-hover:bg-[#002b5b]/25" />

                <span className="absolute left-2 top-3 max-w-[calc(100%-16px)] truncate rounded-md border border-white/30 bg-[#002b5b]/75 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white backdrop-blur-sm sm:left-3 sm:top-4 sm:px-2.5 sm:text-[9px]">
                  {blog.category}
                </span>

                <span className="absolute bottom-3 left-3 h-1 w-8 rounded-full bg-sky-400 transition-all duration-300 group-hover:w-14 sm:bottom-4 sm:left-4" />
              </div>

              {/* Text panel */}
              <div className="flex min-w-0 flex-1 flex-col justify-center p-3.5 sm:p-5 lg:p-6">
                <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-slate-400 sm:mb-3 sm:gap-2 sm:text-xs">
                  <Calendar className="h-3.5 w-3.5 shrink-0 text-[#0077b6]" />
                  <span>{blog.date}</span>
                </div>

                <h3 className="line-clamp-3 text-sm font-extrabold leading-5 text-[#002b5b] transition-colors duration-300 group-hover:text-[#0077b6] sm:text-lg sm:leading-7">
                  {blog.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-slate-500 sm:mt-3 sm:text-sm sm:leading-6">
                  {blog.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2 pt-3 sm:pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0077b6] sm:text-xs">
                    Article
                  </span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#002b5b] transition-all duration-300 group-hover:border-[#0077b6] group-hover:bg-[#0077b6] group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
