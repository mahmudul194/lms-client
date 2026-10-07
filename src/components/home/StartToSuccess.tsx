"use client";

import React, { useState, useEffect, useRef } from "react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { overviewApi, PublicStatsReport } from "@/services/api/overviewApi";

export default function StartToSuccess() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [statsData, setStatsData] = useState<PublicStatsReport | null>(null);

  useEffect(() => {
    overviewApi.getPublicStats()
      .then((data) => {
        if (data) setStatsData(data);
      })
      .catch(console.error);
  }, []);

  const stats = [
    {
      targetNumber: statsData?.expertTrainers || 15,
      suffix: "",
      label: "Expert Trainer",
      icon: (
        <svg className="w-12 h-12 stroke-[#0077b6] fill-none" viewBox="0 0 48 48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="18" r="6" />
          <path d="M8 38c0-5.5 4.5-10 10-10s10 4.5 10 10" />
          <path d="M26 14h14v16H26" />
          <path d="M33 30v8M29 38h8" />
        </svg>
      ),
    },
    {
      targetNumber: statsData?.programs || 12,
      suffix: "",
      label: "Programs",
      icon: (
        <svg className="w-12 h-12 stroke-[#0077b6] fill-none" viewBox="0 0 48 48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="10" width="22" height="16" rx="2" />
          <path d="M4 26h30" />
          <rect x="22" y="18" width="18" height="14" rx="2" />
          <path d="M18 32h26" />
        </svg>
      ),
    },
    {
      targetNumber: statsData?.students || 200,
      suffix: "+",
      label: "Students",
      icon: (
        <svg className="w-12 h-12 fill-[#0077b6]" viewBox="0 0 48 48">
          <path d="M24 10L4 20l20 10 16-8v10h4V20L24 10z" />
          <path d="M12 25.5V33c0 4.5 5.4 8 12 8s12-3.5 12-8v-7.5l-12 6-12-6z" />
        </svg>
      ),
    },
    {
      targetNumber: statsData?.courseVideos || 312,
      suffix: "",
      label: "Course Videos",
      icon: (
        <svg className="w-12 h-12 stroke-[#0077b6] fill-none" viewBox="0 0 48 48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="12" width="32" height="24" rx="3" />
          <path d="M8 20h32M16 12l-4 8M24 12l-4 8M32 12l-4 8" />
          <polygon points="21,25 29,29 21,33" fill="#0077b6" stroke="none" />
        </svg>
      ),
    },
    {
      targetNumber: statsData?.liveClasses || 45,
      suffix: "",
      label: "Live Classes",
      icon: (
        <svg className="w-12 h-12 stroke-[#0077b6] fill-none" viewBox="0 0 48 48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="18" width="22" height="18" rx="2" />
          <circle cx="14" cy="12" r="5" />
          <circle cx="24" cy="12" r="5" />
          <path d="M30 23l10-6v18l-10-6v-6z" />
        </svg>
      ),
    },
    {
      targetNumber: statsData?.yearsOfExperience || 10,
      suffix: "+",
      label: "Years of Experience",
      icon: (
        <svg className="w-12 h-12 fill-[#0077b6]" viewBox="0 0 48 48">
          <path d="M24 6l4.5 9 10 1.5-7.2 7 1.7 10-9-4.8-9 4.8 1.7-10-7.2-7 10-1.5L24 6z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-[#f4f8fb] border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
        {/* Section Headline */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002b5b] tracking-tight">
            Start to Success
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-widest">
            Key Institutional Milestones
          </p>
        </div>

        {/* 6 Grid Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10">
          {stats.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-3 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-slate-100">
                {item.icon}
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-[#002b5b] tracking-tight">
                <AnimatedCounter
                  target={item.targetNumber}
                  suffix={item.suffix}
                  duration={1600}
                  trigger={isInView}
                />
              </div>

              <div className="text-xs sm:text-sm font-bold text-slate-600">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
