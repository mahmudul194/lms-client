
"use client";

import React from "react";
import {
  CheckCircle2,
  Target,
  Rocket,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50/70 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:space-y-14 sm:px-6 lg:px-8">


        {/* Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate overflow-hidden rounded-3xl bg-[#002b5b] px-5 py-8 shadow-xl shadow-blue-950/10 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
        >
          {/* Subtle Animated Background */}
          <motion.div
            animate={{ x: [0, -15, 0], y: [0, 12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full border border-sky-300/10"
          />

          <motion.div
            animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-4 -top-8 -z-10 h-44 w-44 rounded-full border border-white/10"
          />

          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-20 right-20 -z-10 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl"
          />

          <motion.div
            animate={{ x: [0, 12, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-12 -left-10 -z-10 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl"
          />

          <div className="relative max-w-4xl space-y-4 sm:space-y-5">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-white/5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sky-200 sm:text-[11px]">
                About BIM Build BD
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-5xl">
              Empowering the Future of
              <span className="mt-1 block text-sky-300">
                Architecture & Engineering
              </span>
              <span className="mt-1 block text-white/90">with BIM</span>
            </h1>

            {/* Description */}
            <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
              BIM Build BD is a premier technical learning platform dedicated
              to training engineers, architects, and diploma professionals in
              modern Building Information Modeling and smart automation.
            </p>

            {/* Decorative Lines */}
            <div className="flex items-center gap-2 pt-1">
              <span className="h-1 w-10 rounded-full bg-sky-300" />
              <span className="h-1 w-4 rounded-full bg-white/40" />
              <span className="h-1 w-2 rounded-full bg-white/20" />
            </div>
          </div>
        </motion.section>


        {/* Mission & Vision */}
        <section className="space-y-7">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077b6]">
              Our Purpose
            </span>
            <h2 className="text-2xl font-black tracking-tight text-[#002b5b] sm:text-3xl">
              What Drives Us Forward
            </h2>
            <p className="text-sm leading-7 text-slate-500 sm:text-base">
              Building practical skills and creating opportunities for the next
              generation of engineering professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-950/5 sm:p-9"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-sky-50/80 transition-colors duration-300 group-hover:bg-sky-100/70" />

              <div className="relative space-y-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-[#0077b6] transition-all duration-300 group-hover:bg-[#0077b6] group-hover:text-white">
                  <Target className="h-7 w-7" strokeWidth={1.8} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-extrabold text-[#002b5b] sm:text-2xl">
                    Our Mission
                  </h3>
                  <p className="text-sm leading-7 text-slate-600 sm:text-base">
                    To transition engineers from legacy 2D drafting methods
                    into cutting-edge 3D/4D/5D Building Information Modeling
                    (BIM) workflows with practical industry competence.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs font-bold uppercase tracking-wider text-[#0077b6]">
                  <span>Practical Learning</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.12,
                ease: "easeOut",
              }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 sm:p-9"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-blue-50/80 transition-colors duration-300 group-hover:bg-blue-100/70" />

              <div className="relative space-y-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#002b5b] transition-all duration-300 group-hover:bg-[#002b5b] group-hover:text-white">
                  <Rocket className="h-7 w-7" strokeWidth={1.8} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-extrabold text-[#002b5b] sm:text-2xl">
                    Our Vision
                  </h3>
                  <p className="text-sm leading-7 text-slate-600 sm:text-base">
                    To establish Bangladeshi engineering talent on the global
                    stage, equipping professionals to lead major infrastructure
                    and remote freelance contracts worldwide.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs font-bold uppercase tracking-wider text-[#0077b6]">
                  <span>Global Opportunities</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Features */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10 lg:p-12"
        >
          <div className="mx-auto mb-9 max-w-2xl space-y-3 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077b6]">
              Why Choose Us
            </span>
            <h2 className="text-2xl font-black tracking-tight text-[#002b5b] sm:text-3xl">
              Key Features & Student Advantages
            </h2>
            <p className="text-sm leading-7 text-slate-500 sm:text-base">
              Learn with practical support, industry-focused resources, and
              career-oriented guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition-all duration-300 hover:border-sky-200 hover:bg-sky-50/70">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0077b6] shadow-sm transition-colors group-hover:bg-[#0077b6] group-hover:text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="pt-1 text-sm font-medium leading-6 text-slate-700">
                Direct training on international standard live BIM projects
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition-all duration-300 hover:border-sky-200 hover:bg-sky-50/70">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0077b6] shadow-sm transition-colors group-hover:bg-[#0077b6] group-hover:text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="pt-1 text-sm font-medium leading-6 text-slate-700">
                Flexible 3-month installment plans with zero hidden fees
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition-all duration-300 hover:border-sky-200 hover:bg-sky-50/70">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0077b6] shadow-sm transition-colors group-hover:bg-[#0077b6] group-hover:text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="pt-1 text-sm font-medium leading-6 text-slate-700">
                24/7 dedicated software & modeling troubleshooting support
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition-all duration-300 hover:border-sky-200 hover:bg-sky-50/70">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0077b6] shadow-sm transition-colors group-hover:bg-[#0077b6] group-hover:text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="pt-1 text-sm font-medium leading-6 text-slate-700">
                Verifiable QR-coded official certificate upon completion
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition-all duration-300 hover:border-sky-200 hover:bg-sky-50/70">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0077b6] shadow-sm transition-colors group-hover:bg-[#0077b6] group-hover:text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="pt-1 text-sm font-medium leading-6 text-slate-700">
                Lifetime access to full HD recorded backups & project libraries
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition-all duration-300 hover:border-sky-200 hover:bg-sky-50/70">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0077b6] shadow-sm transition-colors group-hover:bg-[#0077b6] group-hover:text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="pt-1 text-sm font-medium leading-6 text-slate-700">
                Portfolio preparation & international job placement assistance
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
