"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, CheckSquare } from "lucide-react";
import HeroSoftwareLogos from "./HeroSoftwareLogos";
import HeroShowcaseCard from "./HeroShowcaseCard";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f8fb] py-14 sm:py-18 lg:py-20 xl:py-24 flex items-center">
      {/* Background Architectural Photo with Luxury Blueprint Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Architectural Infrastructure Background"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-30 filter contrast-105"
        />
        {/* Architectural Light Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8fb] via-[#f4f8fb]/80 to-[#f4f8fb]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f8fb] via-transparent to-[#f4f8fb]/60" />
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1440 650" fill="none">
          <circle cx="1180" cy="360" r="300" stroke="#0077b6" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Checkmarks, Buttons, Software Logos */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            {/* Main Headline with Locked Elements */}
            <div className="space-y-1">
              {/* Row 1: Learn BIM (with cap perched exactly on I) */}
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#002b5b] tracking-tight leading-none">
                  Learn
                </span>
                <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#0077b6] tracking-tight leading-none relative inline-flex items-center">
                  B
                  <span className="relative inline-flex items-center">
                    I
                    <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-[#002b5b] absolute -top-5 sm:-top-7 left-1/2 -translate-y-1/2" />
                  </span>
                  M
                </span>
              </div>

              {/* Row 2: Build Your Career */}
              <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#002b5b] tracking-tight leading-tight">
                <span>Build Your </span>
                <span className="relative inline-block">
                  <span className="text-[#0f4c81]">Career</span>
                  <svg
                    className="w-full h-3 sm:h-4 text-[#0077b6] absolute -bottom-2 sm:-bottom-2.5 left-0"
                    viewBox="0 0 160 14"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 10C45 2 115 2 157 11"
                      stroke="#0077b6"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* 3 Checkmark Bullet Points */}
            <div className="space-y-3 pt-1 text-sm sm:text-base font-semibold text-slate-700">
              <div className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5 text-[#0077b6] shrink-0" />
                <span>Revit Architecture | Structure | MEP</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5 text-[#0077b6] shrink-0" />
                <span>Project-Based Training</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5 text-[#0077b6] shrink-0" />
                <span>Freelancing & Job Placement Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-1">
              <div>
                <Link
                  href="/courses"
                  className="inline-block px-8 py-3.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-bold text-sm sm:text-base lg:text-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  Join Our Live Courses!
                </Link>
              </div>

              <div>
                <Link
                  href="/admission"
                  className="inline-block px-9 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001a38] text-white font-bold text-xs sm:text-sm lg:text-base transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  Admission
                </Link>
              </div>
            </div>

            {/* Software Logos 2-Row Grid */}
            <HeroSoftwareLogos />
          </div>

          {/* Right Column: Visual Showcase Card */}
          <HeroShowcaseCard />

        </div>
      </div>
    </section>
  );
}
