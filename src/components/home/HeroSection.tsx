"use client";

import Link from "next/link";
import { GraduationCap, CheckSquare, ArrowUpRight } from "lucide-react";
import HeroSoftwareLogos from "./HeroSoftwareLogos";
import HeroShowcaseCard from "./HeroShowcaseCard";

export default function HeroSection() {
  return (
    <section className="relative isolate flex items-center overflow-hidden bg-[#f4f8fb] py-14 sm:py-18 lg:py-20 xl:py-24">

      {/* Background — original image and colors preserved */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-30 contrast-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8fb] via-[#f4f8fb]/80 to-[#f4f8fb]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f8fb] via-transparent to-[#f4f8fb]/60" />

        {/* Subtle architectural blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,119,182,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,119,182,0.2) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to right, transparent, black 45%, black)",
          }}
        />

        {/* Architectural circular motion */}
        <svg
          className="absolute right-[-180px] top-1/2 h-[620px] w-[620px] -translate-y-1/2 text-[#0077b6]/40 motion-safe:animate-[spin_90s_linear_infinite]"
          viewBox="0 0 620 620"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="310"
            cy="310"
            r="270"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="5 9"
          />
          <circle
            cx="310"
            cy="310"
            r="225"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path
            d="M310 20V600 M20 310H600"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeDasharray="3 8"
          />
          <circle cx="310" cy="40" r="4" fill="#0077b6" />
          <circle cx="535" cy="310" r="3" fill="#0077b6" />
        </svg>

        {/* Soft ambient light */}
        <div className="absolute right-[18%] top-[15%] h-48 w-48 rounded-full bg-sky-300/20 blur-[90px] motion-safe:animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">

          {/* LEFT SIDE */}
          <div className="space-y-6 sm:space-y-7 lg:col-span-6">
            {/* Main Headline */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-extrabold leading-none tracking-tight text-[#002b5b] sm:text-5xl lg:text-6xl xl:text-7xl">
                  Learn
                </span>

                <span className="inline-flex items-center text-4xl font-extrabold leading-none tracking-tight text-[#0077b6] sm:text-5xl lg:text-6xl xl:text-7xl">
                  B
                  <span className="relative inline-flex items-center">
                    I
                    <GraduationCap className="absolute -left-2 -top-2 h-6 w-6 -translate-y-1/2 text-[#002b5b] sm:-left-2 sm:-top-3 sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
                  </span>
                  M
                </span>
              </div>

              <div className="text-4xl font-extrabold leading-tight tracking-tight text-[#002b5b] sm:text-5xl lg:text-6xl xl:text-7xl">
                <span>Build Your </span>

                <span className="relative inline-block">
                  <span className="text-[#0f4c81]">Career</span>

                  <svg
                    className="absolute -bottom-2 left-0 h-3 w-full text-[#0077b6] sm:-bottom-2.5 sm:h-4"
                    viewBox="0 0 160 14"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 10C45 2 115 2 157 11"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p className="max-w-md text-sm leading-6 text-slate-600 sm:text-base">
              Master practical BIM skills for your professional future.
            </p>

            {/* Compact Feature List */}
            <div className="space-y-3 pt-1 text-sm font-semibold text-slate-700 sm:text-base">
              <div className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 shrink-0 text-[#0077b6]" />
                <span>Revit Architecture, Structure &amp; MEP</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 shrink-0 text-[#0077b6]" />
                <span>Project-Based Learning &amp; Career Support</span>
              </div>
            </div>

            {/* Call To Action */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/courses"
                className="group inline-flex items-center gap-3 rounded-xl bg-[#0077b6] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#005a8c] hover:shadow-xl sm:px-7 sm:text-base"
              >
                Join Our Live Courses!

                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl border border-[#002b5b]/20 bg-white/70 px-6 py-3.5 text-sm font-bold text-[#002b5b] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0077b6] hover:bg-white sm:px-7 sm:text-base"
              >
                Admission
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Existing Software Logos */}
            <HeroSoftwareLogos />
          </div>


          {/* RIGHT SIDE — original component and dimensions */}
          <div className="lg:col-span-6 motion-safe:animate-[heroReveal_1s_ease-out_0.12s_both]">
            <HeroShowcaseCard />
          </div>
        </div>
      </div>

      {/* Entrance animation; respects reduced-motion preferences */}
      <style jsx>{`
        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          section :global(*) {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
