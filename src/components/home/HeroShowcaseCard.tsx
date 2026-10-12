"use client";

import { ArrowUpRight, Box, Layers3 } from "lucide-react";

export default function HeroShowcaseCard() {
  return (
    <div className="lg:col-span-6 flex justify-center lg:justify-end font-sans">
      <div className="relative w-full max-w-lg">

        {/* Ambient Glow */}
        <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-sky-400/30 via-transparent to-[#0077b6]/30 blur-2xl" />

        {/* Blueprint Decorative Lines */}
        <div className="pointer-events-none absolute -right-3 -top-5 z-0 hidden h-28 w-28 opacity-40 sm:block">
          <div className="absolute inset-0 rounded-full border border-dashed border-[#0077b6]" />
          <div className="absolute inset-3 rounded-full border border-[#0077b6]/50" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#0077b6]/40" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-[#0077b6]/40" />
        </div>

        {/* Main Image Frame */}
        <div className="group relative z-10 rounded-[26px] border border-white/80 bg-white/70 p-2 shadow-2xl shadow-[#002b5b]/15 backdrop-blur-sm sm:p-3">

          {/* Image */}
          <div className="relative overflow-hidden rounded-[20px] bg-slate-900">
            <img
              src="https://res.cloudinary.com/dqku3byzu/image/upload/v1791649541/BIM.jpg"
              alt="Modern Architectural Engineering Design and BIM Modeling"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";
              }}
              className="h-80 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:h-96 lg:h-[430px]"
            />

            {/* Image Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b38]/85 via-transparent to-[#002b5b]/15" />

            {/* Top Project Badge */}
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-xl border border-white/30 bg-[#002b5b]/70 px-3 py-2 text-white shadow-lg backdrop-blur-md sm:left-5 sm:top-5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sky-300" />
              <span className="text-[10px] font-bold tracking-[0.16em] sm:text-xs">
                BIM PROJECT
              </span>
            </div>

            {/* Small Corner Label */}
            <div className="absolute right-4 top-4 rounded-lg border border-white/25 bg-white/15 px-3 py-2 text-[10px] font-semibold tracking-wider text-white backdrop-blur-md sm:right-5 sm:top-5">
              3D MODELING
            </div>

            {/* Bottom Image Content */}
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-7 bg-sky-300" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-sky-200 sm:text-xs">
                  Learn • Design • Create
                </span>
              </div>

              <h3 className="max-w-sm text-2xl font-bold leading-tight sm:text-3xl">
                Turn Your Ideas
                <br />
                <span className="text-sky-200">Into Reality.</span>
              </h3>

              <div className="mt-4 flex items-center justify-between border-t border-white/25 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
                    <Layers3 className="h-5 w-5 text-sky-200" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold sm:text-sm">
                      Master BIM & 3D Design
                    </p>
                    <p className="mt-1 text-[10px] text-slate-300 sm:text-xs">
                      Design · Modeling · Visualization
                    </p>
                  </div>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 transition-all duration-300 group-hover:border-sky-300 group-hover:bg-sky-300 group-hover:text-[#002b5b]">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-[#0077b6] via-sky-300 to-transparent" />
        </div>

        {/* Floating Side Detail */}
        <div className="absolute -left-3 top-1/3 z-20 hidden animate-[heroFloat_5s_ease-in-out_infinite] rounded-2xl border border-white/80 bg-white/90 p-3 shadow-xl shadow-[#002b5b]/10 backdrop-blur-md sm:block">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-[#0077b6]">
              <Box className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#002b5b]">
                Expert-Led Learning
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                Practical Skills
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Floating Detail */}
        <div className="absolute -bottom-4 right-5 z-20 hidden animate-[heroFloat_6s_ease-in-out_infinite] rounded-xl border border-sky-100 bg-white/95 px-4 py-3 shadow-lg sm:block">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            LEARN SOMETHING NEW
          </p>
          <p className="mt-1 text-sm font-bold text-[#0077b6]">
            Learn Today. Create Tomorrow.
          </p>
        </div>

        {/* Floating Animation */}
        <style jsx>{`
          @keyframes heroFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            div {
              animation: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </div>
    </div>

  );
}
