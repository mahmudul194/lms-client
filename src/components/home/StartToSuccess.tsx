"use client";

import { useState, useEffect, useRef } from "react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { overviewApi, PublicStatsReport } from "@/services/api/overviewApi";
import { motion } from "motion/react";

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
      targetNumber: statsData?.students ?? 200,
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-slate-200/80 bg-[#f4f8fb] py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle background accents */}
      <motion.div
        className="pointer-events-none absolute -left-28 top-20 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl"
        animate={{
          x: [0, 25, -10, 0],
          y: [0, 20, 35, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl"
        animate={{
          x: [0, -25, 10, 0],
          y: [0, -20, -35, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] space-y-12 px-4 sm:space-y-14 sm:px-8 lg:space-y-16 lg:px-12">
        {/* Section Heading — matching Tekla section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0077b6]">
            Our Achievements
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-[#002b5b] sm:text-3xl md:text-4xl">
            Start to <span className="text-[#0077b6]">Success</span>
          </h2>

          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#0077b6]/70" />

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Key milestones that reflect our learning community and experience.
          </p>
        </motion.div>

        {/* Statistics — Open Layout, No Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-6"
        >
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="stats-item group flex flex-col items-center text-center"
            >
              {/* Icon with Soft Blue Background */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f3fb] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d6edfa] sm:h-20 sm:w-20">
                <div className="transition-transform duration-300 group-hover:scale-105">
                  {item.icon}
                </div>
              </div>

              {/* Animated Number */}
              <div className="text-3xl font-extrabold tracking-tight text-[#002b5b] sm:text-4xl">
                <AnimatedCounter
                  target={item.targetNumber}
                  suffix={item.suffix}
                  duration={1600}
                  trigger={isInView}
                />
              </div>

              {/* Label */}
              <div className="mt-2 text-xs font-semibold leading-5 text-slate-600 sm:text-sm">
                {item.label}
              </div>

              {/* Small accent */}
              <div className="mt-3 h-0.5 w-0 rounded-full bg-[#0077b6] transition-all duration-300 group-hover:w-8" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section >
  );
}
