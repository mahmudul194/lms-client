"use client";

import React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Layers3,
} from "lucide-react";
import { motion } from "motion/react";

interface DrawingProject {
  status: string;
  title: string;
  image: string;
}

interface DrawingProjectsSectionProps {
  projects: DrawingProject[];
}

export default function DrawingProjectsSection({
  projects,
}: DrawingProjectsSectionProps) {
  return (
    <section className="space-y-7 sm:space-y-9">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#0077b6] sm:text-xs">
            <Layers3 size={15} />
            Selected Works
          </p>

          <h2 className="text-2xl font-black tracking-tight text-[#002b5b] sm:text-3xl">
            Drawing <span className="text-[#0077b6]">Projects</span>
          </h2>
        </div>

        <p className="max-w-xs text-xs leading-6 text-slate-500 sm:text-right sm:text-sm">
          Explore our architectural drawings and project development.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project, index) => {
          const isFeatured = index === 0;
          const isCompleted = project.status
            .toLowerCase()
            .includes("completed");

          return (
            <motion.article
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className={`group relative overflow-hidden rounded-2xl bg-[#002b5b] ${
                isFeatured ? "md:row-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  isFeatured
                    ? "min-h-[330px] sm:min-h-[440px] md:h-full"
                    : "h-[260px] sm:h-[290px]"
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#00172f] via-[#00172f]/20 to-transparent opacity-90" />

                <span className="absolute right-4 top-4 font-mono text-xs tracking-widest text-white/80">
                  PROJECT / {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                    isCompleted
                      ? "border-emerald-300/30 bg-emerald-950/50 text-emerald-200"
                      : "border-amber-200/30 bg-amber-950/50 text-amber-100"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={12} />
                  ) : (
                    <Clock3 size={12} />
                  )}
                  {project.status}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <div className="mb-3 h-1 w-9 rounded-full bg-sky-400 transition-all duration-300 group-hover:w-16" />

                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">
                        Architectural Work
                      </p>

                      <h3
                        className={`font-extrabold leading-snug text-white ${
                          isFeatured
                            ? "text-xl sm:text-2xl"
                            : "text-lg sm:text-xl"
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-sky-400 group-hover:bg-sky-400 group-hover:text-[#002b5b]">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}