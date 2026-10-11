"use client";

import Link from "next/link";
import ContactInfoSidebar from "@/components/contact/ContactInfoSidebar";
import ContactForm from "@/components/contact/ContactForm";
import { motion } from "motion/react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12">
      <div className="mx-auto max-w-[1440px] space-y-12 px-4 sm:space-y-16 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xs font-medium text-slate-400 sm:text-sm"
        >
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-[#0077b6]"
          >
            Home
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-semibold text-[#002b5b]">Contact us</span>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white px-5 py-10 text-center shadow-sm sm:px-10 sm:py-14"
        >
          <div className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-sky-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-blue-100/50 blur-3xl" />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2"
            >
              <span className="h-2 w-2 rounded-full bg-[#0077b6]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#0077b6] sm:text-xs">
                Get in Touch
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
              className="text-3xl font-black tracking-tight text-[#002b5b] sm:text-4xl md:text-5xl"
            >
              Contact <span className="text-[#0077b6]">Us</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.3 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto mt-5 flex items-center justify-center gap-1.5"
            >
              <span className="h-1 w-10 rounded-full bg-[#0077b6]" />
              <span className="h-1 w-4 rounded-full bg-[#002b5b]/30" />
              <span className="h-1 w-1 rounded-full bg-[#002b5b]/20" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base"
            >
              Have a question or planning a project? We’re here to help. Reach
              out to our team and let’s discuss how we can work together.
            </motion.p>
          </div>
        </motion.div>

        {/* Main 2-Column Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18,
              },
            },
          }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -35, y: 15 },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="lg:col-span-5"
          >
            <ContactInfoSidebar />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 35, y: 15 },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
