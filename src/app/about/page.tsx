"use client";

import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Target,
  Rocket,
  Sparkles,
  Layers3,
  CircleDot,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  "Direct training on international standard live BIM projects",
  "Flexible 3-month installment plans with zero hidden fees",
  "24/7 dedicated software & modeling troubleshooting support",
  "Verifiable QR-coded official certificate upon completion",
  "Lifetime access to full HD recorded backups & project libraries",
  "Portfolio preparation & international job placement assistance",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7fa] py-6 sm:py-10">
      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:space-y-24 lg:px-8">
        {/* ==================== HERO ==================== */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative isolate overflow-hidden rounded-[2rem] bg-[#002b5b] text-white"
        >
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-[-8rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full border border-white/[0.09]" />
            <div className="absolute right-[-4rem] top-[-6rem] h-[20rem] w-[20rem] rounded-full border border-white/[0.12]" />
            <div className="absolute right-[1rem] top-[-1rem] h-[10rem] w-[10rem] rounded-full border border-[#38bdf8]/30" />
            <div className="absolute bottom-0 right-0 h-64 w-64 bg-[#0077b6]/20 blur-[100px]" />

            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
          </div>

          <div className="grid min-h-[420px] items-center gap-12 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-16 lg:py-20">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mb-7 inline-flex items-center gap-2 border-l-2 border-[#38bdf8] pl-3 text-sm font-semibold tracking-[0.2em] text-sky-200"
              >
                <Sparkles size={16} />
                ABOUT BIM BUILD BD
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
              >
                Empowering the Future of{" "}
                <span className="text-sky-300">Architecture</span> & Engineering
                with BIM
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
              >
                BIM Build BD is a premier technical learning platform dedicated
                to training engineers, architects, and diploma professionals
                in modern Building Information Modeling and smart automation.
              </motion.p>

              <motion.a
                href="#our-purpose"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#002b5b] transition-all duration-300 hover:bg-sky-100"
              >
                Discover Our Purpose
                <ArrowDownRight size={18} />
              </motion.a>
            </div>

            {/* Abstract BIM-inspired visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="relative mx-auto hidden h-[310px] w-full max-w-[350px] items-center justify-center lg:flex"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 45,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-[290px] w-[290px] rounded-full border border-dashed border-sky-300/30"
              />

              <div className="absolute h-[225px] w-[225px] rounded-full border border-white/10" />
              <div className="absolute h-[160px] w-[160px] rounded-full border border-sky-300/20" />

              <div className="relative flex h-36 w-36 items-center justify-center border border-sky-200/40 bg-[#073969] shadow-2xl shadow-black/20">
                <Layers3 size={66} strokeWidth={1.1} className="text-sky-300" />

                <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-sky-300 text-[#002b5b]">
                  <CheckCircle2 size={17} />
                </span>
              </div>

              <div className="absolute right-2 top-12 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] backdrop-blur-sm">
                <Target size={23} className="text-sky-200" />
              </div>

              <div className="absolute bottom-10 left-0 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] backdrop-blur-sm">
                <Rocket size={22} className="text-sky-200" />
              </div>

              <div className="absolute bottom-4 right-4 h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_20px_rgba(125,211,252,0.8)]" />
              <div className="absolute left-10 top-8 h-1.5 w-1.5 rounded-full bg-white/80" />
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#38bdf8]" />
        </motion.section>

        {/* ==================== MISSION & VISION ==================== */}
        <section id="our-purpose" className="scroll-mt-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-10 max-w-2xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#0077b6]" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#0077b6]">
                Our Purpose
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What Drives Us Forward
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Building practical skills and creating opportunities for the next
              generation of engineering professionals.
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
            {/* Mission: light editorial panel */}
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="group relative overflow-hidden border border-slate-200 bg-white p-7 transition-colors duration-300 hover:border-sky-300 sm:p-10 lg:min-h-[340px]"
            >
              <div className="absolute right-5 top-0 select-none text-[8rem] font-black leading-none text-slate-100 transition-colors duration-300 group-hover:text-sky-50 sm:text-[10rem]">
                01
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-9 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[#0077b6]">
                    <Target size={25} strokeWidth={1.7} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                      What We Do
                    </span>
                  </div>

                  <span className="text-sm font-medium text-slate-400">
                    MISSION
                  </span>
                </div>

                <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                  Our Mission
                </h3>

                <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
                  To transition engineers from legacy 2D drafting methods into
                  cutting-edge 3D/4D/5D Building Information Modeling (BIM)
                  workflows with practical industry competence.
                </p>

                <div className="mt-auto pt-8">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0077b6]">
                    <span className="h-2 w-2 rounded-full bg-[#0077b6]" />
                    Practical Learning
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Vision: dark, contrasting panel */}
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="group relative isolate overflow-hidden bg-[#002b5b] p-7 text-white sm:p-10 lg:min-h-[340px]"
            >
              <div className="pointer-events-none absolute -bottom-20 -right-16 -z-10 h-72 w-72 rounded-full border border-white/[0.08]" />
              <div className="pointer-events-none absolute -bottom-8 -right-4 -z-10 h-52 w-52 rounded-full border border-white/[0.1]" />
              <div className="pointer-events-none absolute right-10 top-10 -z-10 h-24 w-24 rounded-full bg-[#0077b6]/30 blur-3xl" />

              <div className="absolute right-5 top-0 select-none text-[8rem] font-black leading-none text-white/[0.05] sm:text-[10rem]">
                02
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-9 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sky-300">
                    <Rocket size={25} strokeWidth={1.7} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                      Where We’re Going
                    </span>
                  </div>

                  <span className="text-sm font-medium text-slate-400">
                    VISION
                  </span>
                </div>

                <h3 className="text-3xl font-bold tracking-tight">
                  Our Vision
                </h3>

                <p className="mt-5 max-w-lg text-base leading-8 text-slate-300">
                  To establish Bangladeshi engineering talent on the global
                  stage, equipping professionals to lead major infrastructure
                  and remote freelance contracts worldwide.
                </p>

                <div className="mt-auto pt-8">
                  <div className="flex items-center gap-2 text-sm font-bold text-sky-300">
                    <span className="h-2 w-2 rounded-full bg-sky-300" />
                    Global Opportunities
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        {/* ==================== KEY FEATURES ==================== */}
        <section className="relative">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            {/* Intro column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-10 lg:self-start"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[#0077b6]" />
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#0077b6]">
                  Why Choose Us
                </span>
              </div>

              <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Key Features & Student Advantages
              </h2>

              <p className="mt-5 max-w-md text-base leading-8 text-slate-600">
                Learn with practical support, industry-focused resources, and
                career-oriented guidance.
              </p>

              <div className="mt-8 flex items-center gap-3 border-l-2 border-[#0077b6] bg-white px-5 py-4">
                <CircleDot size={21} className="shrink-0 text-[#0077b6]" />
                <p className="text-sm leading-6 text-slate-600">
                  Everything you need to develop practical BIM skills and
                  prepare for professional opportunities.
                </p>
              </div>

              <div className="mt-8 hidden items-center gap-3 text-sm font-semibold text-slate-400 lg:flex">
                <span className="h-px w-8 bg-slate-300" />
                BUILT AROUND YOUR GROWTH
              </div>
            </motion.div>

            {/* Numbered feature list */}
            <div className="border-t border-slate-300">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                  }}
                  className="group grid grid-cols-[44px_1fr_28px] items-center gap-3 border-b border-slate-300 py-6 transition-colors duration-300 hover:bg-white hover:px-4 sm:grid-cols-[58px_1fr_32px] sm:gap-5 sm:py-7"
                >
                  <span className="text-sm font-bold tabular-nums text-[#0077b6] sm:text-base">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-base font-medium leading-7 text-slate-700 transition-colors duration-300 group-hover:text-[#002b5b] sm:text-lg">
                    {feature}
                  </p>

                  <CheckCircle2
                    size={21}
                    strokeWidth={1.7}
                    className="text-slate-300 transition-all duration-300 group-hover:scale-110 group-hover:text-[#0077b6]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CLOSING STRIP ==================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-[#e5f3fa] px-6 py-9 sm:px-10 sm:py-12"
        >
          <div className="absolute right-0 top-0 h-full w-2 bg-[#0077b6]" />

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0077b6]">
                Your Next Step
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-[#002b5b] sm:text-3xl">
                Build skills. Create opportunities.
              </h2>
            </div>

            <a
              href="#our-purpose"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#002b5b] transition-colors hover:text-[#0077b6]"
            >
              Explore Our Purpose
              <ArrowUpRight size={19} />
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
}