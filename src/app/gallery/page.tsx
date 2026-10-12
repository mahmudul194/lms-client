"use client";

import { useState } from "react";
import Link from "next/link";
import BatchGallerySection from "@/components/gallery/BatchGallerySection";
import VideoReviewsSection from "@/components/gallery/VideoReviewsSection";
import VideoModal from "@/components/common/VideoModal";
import { motion } from "motion/react";

export default function StudentsGalleryPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const batchList = [
    {
      title: "1st Batch Students",
      subtitle: "Architectural, Structural, MEP & Navisworks",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      hasImage: true,
    },
    {
      title: "2nd Batch Students",
      subtitle: "Architectural, Structural, MEP & Navisworks",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      hasImage: true,
    },
    {
      title: "3rd & 4th Batch Students",
      subtitle: "Architectural, Structural, MEP & Navisworks",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      hasImage: true,
    },
    {
      title: "Ongoing 5th Batch Students",
      subtitle: "Architectural, Structural, MEP & Navisworks",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      hasImage: true,
    },
    {
      title: "Coming Batch",
      subtitle: "Architectural, Structural, MEP & Navisworks",
      image: "",
      hasImage: false,
    },
    {
      title: "Coming Batch",
      subtitle: "Architectural, Structural, MEP & Navisworks",
      image: "",
      hasImage: false,
    },
  ];

  const studentVideos = [
    {
      title: "Sumon Ahmed Live Student Review",
      author: "BIM Build BD",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Mominul Islam Live Student Review",
      author: "BIM Build BD",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Mamun Roshid Live Student Review",
      author: "BIM Build BD",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Nasir Uddin Live Student Review",
      author: "BIM Build BD",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Shafiqul Islam Live Student Review",
      author: "BIM Build BD",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Shahabul Islam Live Student Review",
      author: "BIM Build BD",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Sarfen Ahmed Live Student Review",
      author: "BIM Build BD",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "What is BIM Build BD? | Live Student Review",
      author: "BIM Build BD",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Page Background & Content */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-100/50 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-[35rem] h-64 w-64 rounded-full bg-blue-50/70 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] space-y-14 px-4 py-8 sm:space-y-20 sm:px-8 sm:py-12 lg:px-12">
          {/* Breadcrumb — unchanged */}
          <div className="text-xs font-medium text-slate-400 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-[#0077b6]">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-semibold text-[#002b5b]">
              Students Gallery
            </span>
          </div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-sky-50/70 px-5 py-10 text-center shadow-sm sm:px-10 sm:py-14 md:py-16"
          >
            <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-sky-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-blue-100/60 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-sky-100 bg-white/90 px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#0077b6]" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077b6]">
                  Our Learning Community
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-[#002b5b] sm:text-4xl md:text-5xl">
                Students <span className="text-[#0077b6]">Gallery</span>
              </h1>

              <div className="mx-auto mt-5 flex items-center justify-center gap-1.5">
                <span className="h-1 w-10 rounded-full bg-[#0077b6]" />
                <span className="h-1 w-4 rounded-full bg-[#002b5b]/30" />
                <span className="h-1 w-1 rounded-full bg-[#002b5b]/20" />
              </div>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Take a look at our student batches, memorable learning moments,
                and real experiences from the BIM Build BD community.
              </p>
            </div>
          </motion.div>

          {/* Section 1: Batch Photo Gallery — component and content unchanged */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <BatchGallerySection batches={batchList} />
          </motion.section>

          {/* Section 2: Video Reviews — component and content unchanged */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <VideoReviewsSection
              videos={studentVideos}
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
    </div >
  );
}
