"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function PrivacyPolicyPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen overflow-hidden bg-[#f5f7fa] py-8 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-400"
        >
          <Link
            href="/"
            className="transition-colors hover:text-[#0077b6]"
          >
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#002b5b]">
            Privacy Policy
          </span>
        </motion.nav>

        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          {/* Left: Page Introduction */}
          <motion.aside
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative lg:sticky lg:top-10"
          >
            <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full border border-[#0077b6]/10" />
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full border border-[#0077b6]/10" />

            <div className="relative">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#0077b6]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077b6]">
                  Your Privacy Matters
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#002b5b] sm:text-5xl">
                Privacy
                <span className="block text-[#0077b6]">Policy.</span>
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600 sm:text-base">
                Learn how BIM Build BD collects, uses, and protects your
                personal information when you use our learning platform.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 border-l-2 border-[#0077b6] bg-white px-4 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Last Updated
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#002b5b]">
                    August 2026
                  </p>
                </div>
              </div>

              <div className="mt-8 hidden border-t border-slate-200 pt-5 lg:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  On This Page
                </p>

                <div className="mt-4 space-y-3">
                  {[
                    "Information Collection and Use",
                    "Payment and Transaction Security",
                    "Data Protection & Non-Disclosure",
                  ].map((item, index) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-[#0077b6]">
                        0{index + 1}
                      </span>
                      <span className="text-xs leading-5 text-slate-600">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Right: Policy Content */}
          <div className="relative border-t-2 border-[#002b5b] bg-white px-5 py-2 shadow-sm sm:px-9">
            {/* Section 01 */}
            <motion.section
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="border-b border-slate-200 py-7 sm:py-9"
            >
              <div className="mb-4 flex items-start gap-4">
                <span className="text-sm font-bold tabular-nums text-[#0077b6]">
                  01
                </span>
                <h2 className="text-lg font-bold leading-7 text-[#002b5b] sm:text-xl">
                  Information Collection and Use
                </h2>
              </div>

              <p className="pl-9 text-sm leading-8 text-slate-600">
                BIM Build BD collects student full names, email addresses,
                phone numbers, and professional backgrounds strictly for
                admission verification, Zoom class link distribution, learning
                portal access, and official QR-verified certificate issuance.
              </p>
            </motion.section>

            {/* Section 02 */}
            <motion.section
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="border-b border-slate-200 py-7 sm:py-9"
            >
              <div className="mb-4 flex items-start gap-4">
                <span className="text-sm font-bold tabular-nums text-[#0077b6]">
                  02
                </span>
                <h2 className="text-lg font-bold leading-7 text-[#002b5b] sm:text-xl">
                  Payment and Transaction Security
                </h2>
              </div>

              <p className="pl-9 text-sm leading-8 text-slate-600">
                All payments made through bKash, Nagad, Rocket, or SSLCommerz
                (Credit/Debit cards) are processed over end-to-end encrypted
                banking gateways complying with international PCI-DSS security
                protocols. We do not store credit card numbers or banking PINs.
              </p>
            </motion.section>

            {/* Section 03 */}
            <motion.section
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="py-7 sm:py-9"
            >
              <div className="mb-4 flex items-start gap-4">
                <span className="text-sm font-bold tabular-nums text-[#0077b6]">
                  03
                </span>
                <h2 className="text-lg font-bold leading-7 text-[#002b5b] sm:text-xl">
                  Data Protection & Non-Disclosure
                </h2>
              </div>

              <p className="pl-9 text-sm leading-8 text-slate-600">
                Student personal information is kept strictly confidential and
                is never shared, rented, or sold to third-party marketing
                services under any circumstances.
              </p>
            </motion.section>

            {/* Bottom accent */}
            <div className="flex items-center justify-between border-t border-slate-100 py-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                BIM Build BD
              </span>
              <span className="h-1 w-12 bg-[#0077b6]" />
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
