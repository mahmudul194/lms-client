"use client";

import React from "react";
import {
  Play,
  ArrowUpRight,
  Clapperboard,
} from "lucide-react";
import { motion } from "motion/react";

interface VideoProject {
  title: string;
  subtitle: string;
  image: string;
  url: string;
}

interface VideoProjectsSectionProps {
  videos: VideoProject[];
  onPlayVideo: (url: string) => void;
}

export default function VideoProjectsSection({
  videos,
  onPlayVideo,
}: VideoProjectsSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#071525] px-4 py-8 sm:px-7 sm:py-10 lg:px-9 lg:py-12">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full border border-white/[0.06]" />

      <div className="relative mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-sky-400 sm:text-xs">
            <Clapperboard size={15} />
            Behind The Projects
          </p>

          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Video <span className="text-sky-400">Showcase</span>
          </h2>

          <p className="mt-3 max-w-md text-xs leading-6 text-slate-400 sm:text-sm">
            Watch project walkthroughs, visual presentations, and practical
            demonstrations of our work.
          </p>
        </div>

        <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">
          {String(videos.length).padStart(2, "0")} Videos
        </span>
      </div>

      <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {videos.map((video, index) => (
          <motion.button
            key={`${video.title}-${index}`}
            type="button"
            onClick={() => onPlayVideo(video.url)}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
              ease: "easeOut",
            }}
            className="group min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#071525]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-900">
              <img
                src={video.image}
                alt={video.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-[#020914]/10 to-black/10" />

              <span className="absolute left-4 top-4 font-mono text-xs tracking-widest text-white/80">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-sky-300 group-hover:bg-sky-400 group-hover:text-[#002b5b]">
                <Play size={21} className="ml-1 fill-current" />
              </span>

              <span className="absolute bottom-4 left-4 rounded-md border border-white/20 bg-black/40 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                Watch Project
              </span>

              <span className="absolute bottom-0 left-0 h-1 w-0 bg-sky-400 transition-all duration-500 group-hover:w-full" />
            </div>

            <div className="flex items-start justify-between gap-3 px-1 pb-1 pt-4">
              <div className="min-w-0">
                <h3 className="line-clamp-2 text-sm font-extrabold leading-6 text-white transition-colors duration-300 group-hover:text-sky-300">
                  {video.title}
                </h3>

                <p className="mt-1.5 text-xs font-medium text-slate-400">
                  {video.subtitle}
                </p>
              </div>

              <ArrowUpRight
                size={17}
                className="mt-1 shrink-0 text-slate-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sky-300"
              />
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}