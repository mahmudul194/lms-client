"use client";

import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { motion } from "motion/react";

export default function TeklaBanner() {
  return (
    <section className="bg-white pt-6 pb-16 font-sans sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-5xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
        {/* Section Heading */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0077b6]">
            Learn & Build
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-[#002b5b] sm:text-3xl md:text-4xl">
            Tekla Structures <span className="text-[#0077b6]">Professional Course</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#0077b6]/70" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{
            duration: 1,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="tekla-banner group relative isolate overflow-hidden rounded-3xl border border-[#174c78] bg-[#06172c] shadow-xl shadow-[#002b5b]/15 transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#0077b6]/20"
        >
          {/* Deep navy background */}
          <div className="absolute inset-0 -z-20 bg-[#06172c]" />

          {/* Subtle blue lighting */}
          <div className="tekla-glow pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#0077b6]/20 blur-3xl" />
          <div className="tekla-glow-secondary pointer-events-none absolute -bottom-32 left-1/4 -z-10 h-64 w-64 rounded-full bg-[#0f4c81]/25 blur-3xl" />

          {/* Fine technical grid */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(125,190,230,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(125,190,230,0.5) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-between gap-10 p-8 text-white sm:p-14 lg:flex-row lg:p-16">
            {/* Left side */}
            <div className="w-full space-y-4 text-left">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-300 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-sky-300" />
                Tekla Structures
              </span>

              <h3 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                PROFESSIONAL STEEL
                <br />
                DETAILING COURSE
              </h3>

              <p className="text-sm text-slate-300 sm:text-base lg:text-lg">
                By Tekla Software
                <span className="mx-2 text-sky-300">•</span>
                Instructor: Engr. Maidul
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200">
                  3D Modeling
                </span>
                <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200">
                  Steel Detailing
                </span>
                <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200">
                  BIM
                </span>
              </div>

              <div className="pt-3">
                <Link
                  href="/courses"
                  className="group/btn inline-flex items-center gap-2 rounded-xl bg-[#0077b6] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#00669c] hover:shadow-[#0077b6]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-base"
                >
                  Enroll Tekla Course
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Right image — original dimensions */}
            <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-3xl border border-sky-300/30 shadow-2xl shadow-black/30 transition-all duration-500 group-hover:border-sky-300/60 lg:h-64 lg:w-64">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
                alt="Tekla Instructor"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06172c]/85 via-transparent to-transparent" />

              <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl border border-white/15 bg-[#06172c]/80 p-3 text-left backdrop-blur-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-400/10 text-sky-300">
                  <Layers3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    Tekla Structures
                  </p>
                  <p className="mt-1 text-[10px] text-slate-300">
                    Steel Detailing & Modeling
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle animated bottom line */}
          <div className="tekla-line absolute inset-x-0 bottom-0 h-px" />
        </motion.div>
      </div>


      <style jsx>{`
        .tekla-glow {
          animation: glowMove 9s ease-in-out infinite alternate;
          will-change: transform;
        }

        .tekla-glow-secondary {
          animation: glowMove 12s ease-in-out infinite alternate-reverse;
          will-change: transform;
        }

        .tekla-line {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(56, 189, 248, 0.65),
            transparent
          );
          background-size: 200% 100%;
          animation: lineMove 6s ease-in-out infinite;
        }

        @keyframes glowMove {
          from {
            transform: translate3d(-10px, 0, 0) scale(0.95);
          }
          to {
            transform: translate3d(18px, 12px, 0) scale(1.08);
          }
        }

        @keyframes lineMove {
          0%, 100% {
            background-position: 100% 0;
            opacity: 0.45;
          }
          50% {
            background-position: 0% 0;
            opacity: 0.9;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tekla-glow,
          .tekla-glow-secondary,
          .tekla-line {
            animation: none;
            will-change: auto;
          }
        }
      `}</style>

    </section >
  );
}
