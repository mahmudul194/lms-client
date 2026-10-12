"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
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
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {blogs.map((blog) => (
            <motion.article
              key={blog.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 35,
                  scale: 0.97,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:border-sky-200 hover:shadow-[0_20px_45px_-15px_rgba(0,43,91,0.16)]"
            >
              {/* Blog Image */}
              {blog.image ? (
                <div className="relative h-52 w-full overflow-hidden bg-slate-100 sm:h-56">
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#002b5b]/40 via-transparent to-transparent opacity-70" />

                  <div className="absolute left-4 top-4">
                    <span className="inline-flex rounded-full border border-white/50 bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0077b6] shadow-sm backdrop-blur-md sm:text-xs">
                      {blog.category}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-50 sm:h-56">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50" />

                  <motion.div
                    className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-[20px] border-sky-100/50"
                    whileHover={{ scale: 1.12, rotate: 12 }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full border-[24px] border-blue-100/40" />

                  <div className="relative flex flex-col items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-100 bg-white text-[#0077b6] shadow-sm"
                    >
                      <Calendar className="h-6 w-6" />
                    </motion.div>

                    <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0077b6] shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-[#0077b6]" />
                  <span>{blog.date}</span>
                </div>

                <h3 className="mb-3 text-base font-extrabold leading-snug text-[#002b5b] transition-colors duration-300 group-hover:text-[#0077b6] sm:text-lg">
                  {blog.title}
                </h3>

                <p className="line-clamp-3 flex-1 text-xs leading-6 text-slate-500 sm:text-sm">
                  {blog.excerpt}
                </p>

                {/* Read More */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0077b6] transition-colors duration-300 hover:text-[#002b5b] sm:text-sm"
                  >
                    <span>Read Article</span>
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
