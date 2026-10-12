"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { FileText, ArrowRight, ShieldCheck } from "lucide-react";

export default function TermsConditionsPage() {
  const terms = [
    {
      title: "Course Access & Intellectual Property",
      description:
        "Enrolled students are granted personalized access to live classes, recorded HD backups, Revit families, and drawing sheets solely for individual educational use. Redistribution, recording rebroadcast, or commercial resale of learning materials is strictly prohibited.",
    },
    {
      title: "Installment Schedules & Grace Period",
      description:
        "Students utilizing the 3-month installment option agree to pay subsequent installment fees by their due dates (at 30 days and 60 days post-enrollment). A 7-day grace period is provided prior to any temporary portal lock.",
    },
    {
      title: "Certificate Eligibility Criteria",
      description:
        "Official verifiable completion certificates are awarded to students who maintain at least 80% class attendance and achieve passing evaluations on required modeling assignments and the final capstone project.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7fa] py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-7 flex items-center gap-2 text-xs font-medium text-slate-400"
        >
          <Link href="/" className="transition-colors hover:text-[#0077b6]">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#002b5b]">
            Terms & Conditions
          </span>
        </motion.nav>

        {/* Header Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative isolate mb-10 overflow-hidden bg-[#002b5b] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14"
        >
          <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-4 -top-12 -z-10 h-52 w-52 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 bg-[#0077b6]/30 blur-[80px]" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 border-l-2 border-sky-300 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-200">
              <FileText size={15} />
              Guidelines & Policies
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Terms & Conditions
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Please review the terms governing course access, installment
              payments, learning materials, and certificate eligibility at
              BIM Build BD.
            </p>

            <div className="mt-7 flex items-center gap-3 text-xs font-semibold text-sky-200">
              <ShieldCheck size={17} />
              <span>Last Updated: August 2026</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#38bdf8]" />
        </motion.section>

        {/* Terms Content */}
        <div className="grid items-start gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
          {/* Side Overview */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-10"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077b6]">
              At a Glance
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-snug text-[#002b5b]">
              Understand your responsibilities.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              These terms explain the conditions associated with participating
              in our courses and accessing educational resources.
            </p>

            <div className="mt-7 space-y-4 border-l border-slate-300 pl-5">
              {terms.map((term, index) => (
                <div key={term.title} className="relative">
                  <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-[#0077b6] ring-4 ring-[#f5f7fa]" />
                  <p className="text-xs font-bold text-slate-400">
                    SECTION 0{index + 1}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                    {term.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.aside>

          {/* Numbered Sections */}
          <div className="border-t-2 border-[#002b5b] bg-white px-5 shadow-sm sm:px-9">
            {terms.map((term, index) => (
              <motion.section
                key={term.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className={`py-8 sm:py-10 ${
                  index !== terms.length - 1
                    ? "border-b border-slate-200"
                    : ""
                }`}
              >
                <div className="mb-5 flex items-start gap-4 sm:gap-5">
                  <span className="text-2xl font-extrabold leading-none tabular-nums text-[#0077b6]/70 sm:text-3xl">
                    0{index + 1}
                  </span>

                  <h2 className="text-lg font-bold leading-7 text-[#002b5b] sm:text-xl">
                    {term.title}
                  </h2>
                </div>

                <p className="pl-11 text-sm leading-8 text-slate-600 sm:pl-[3.75rem]">
                  {term.description}
                </p>

                <div className="mt-6 pl-11 sm:pl-[3.75rem]">
                  <div className="h-1 w-10 bg-[#0077b6]/30 transition-all duration-300 hover:w-16" />
                </div>
              </motion.section>
            ))}

            {/* Footer Accent */}
            <div className="flex items-center justify-between border-t border-slate-100 py-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                BIM Build BD
              </span>

              <Link
                href="/privacy-policy"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0077b6] transition-colors hover:text-[#002b5b]"
              >
                Privacy Policy
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}