"use client";

import React, { useState } from "react";
import Link from "next/link";
import DrawingProjectsSection from "@/components/portfolio/DrawingProjectsSection";
import VideoProjectsSection from "@/components/portfolio/VideoProjectsSection";
import VideoModal from "@/components/common/VideoModal";
import { motion } from "motion/react";

export default function PortfolioPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const drawingProjects = [
    {
      status: "On Going",
      title: "Students Project",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      status: "On Going",
      title: "Students Project",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    },
    {
      status: "Completed",
      title: "Students Project Pile & Pile Cap",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const videoProjects = [
    {
      title: "Video Placeholder",
      subtitle: "Elementor Project",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Video Placeholder",
      subtitle: "Elementor Project",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Video Placeholder",
      subtitle: "Elementor Project",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Video Placeholder",
      subtitle: "Elementor Project",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12">
      <div className="mx-auto max-w-[1440px] space-y-14 px-4 sm:space-y-18 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xs font-medium text-slate-400 sm:text-sm"
        >
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-[#0077b6]"
          >
            Home
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-semibold text-[#002b5b]">Our Portfolio</span>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white px-5 py-12 text-center shadow-sm sm:px-10 sm:py-16"
        >
          <div className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-sky-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-blue-100/50 blur-3xl" />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2"
            >
              <span className="h-2 w-2 rounded-full bg-[#0077b6]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#0077b6] sm:text-xs">
                Our Work & Achievements
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
              className="text-3xl font-black tracking-tight text-[#002b5b] sm:text-4xl md:text-5xl"
            >
              Our <span className="text-[#0077b6]">Portfolio</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.3 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto mt-5 flex items-center justify-center gap-1.5"
            >
              <span className="h-1 w-10 rounded-full bg-[#0077b6]" />
              <span className="h-1 w-4 rounded-full bg-[#002b5b]/30" />
              <span className="h-1 w-1 rounded-full bg-[#002b5b]/20" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base"
            >
              Explore our collection of architectural drawings, 2D and 3D
              projects, and video presentations showcasing creativity, precision,
              and practical BIM expertise.
            </motion.p>
          </div>
        </motion.div>

        {/* Section 1: Project Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <DrawingProjectsSection projects={drawingProjects} />
        </motion.section>

        {/* Section 2: Project Video Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.08 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <VideoProjectsSection
            videos={videoProjects}
            onPlayVideo={(url) => setActiveVideo(url)}
          />
        </motion.section>

        {/* Reusable Video Modal */}
        <VideoModal
          videoUrl={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      </div>
    </div>
  );
}
