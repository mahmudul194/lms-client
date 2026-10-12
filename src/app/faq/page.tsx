"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const FAQS = [
  {
    question: "What is BIM and why is it important?",
    answer: "Building Information Modeling (BIM) is a digital representation of physical and functional characteristics of a facility. It is critical for modern AEC projects as it reduces errors, improves collaboration, and optimizes costs.",
  },
  {
    question: "Do I need prior experience in Revit to join?",
    answer: "No, our comprehensive courses start from the absolute basics. However, basic knowledge of civil/architectural engineering and standard CAD concepts is highly recommended.",
  },
  {
    question: "Are the classes live or pre-recorded?",
    answer: "All our main batch classes are conducted LIVE via Zoom by industry experts. You also get access to the recorded videos of each class within 24 hours.",
  },
];

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const extendedFaqs = [
    ...FAQS,
    {
      question: "Can I attend live classes via smartphone?",
      answer: "Yes, you can join and listen to live Zoom sessions on a mobile device. However, for hands-on practice, modeling, and assignments, a laptop or desktop computer (recommended: Core i5 / Ryzen 5 with 8GB/16GB RAM and a dedicated GPU) is required.",
    },
    {
      question: "What are the standard class timings?",
      answer: "Most live batches are scheduled in the evening (8:30 PM or 9:00 PM BST) so university students and working professionals can comfortably participate without schedule conflicts.",
    },
    {
      question: "How does the 3-month installment payment work?",
      answer: "You pay the 1st installment upon registration. The 2nd installment is due 30 days after class commencement, and the 3rd installment at 60 days. Payments can be completed online via bKash, Nagad, Rocket, or credit/debit card.",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen overflow-hidden bg-[#f5f7fa] py-10 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          {/* Left: FAQ Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative lg:sticky lg:top-10"
          >
            <div className="absolute -left-12 -top-10 h-40 w-40 rounded-full border border-[#0077b6]/10" />
            <div className="absolute -left-6 -top-4 h-28 w-28 rounded-full border border-[#0077b6]/10" />

            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 border-l-2 border-[#0077b6] pl-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0077b6]">
                <HelpCircle size={16} />
                FAQ & Knowledge Base
              </div>

              <h1 className="max-w-lg text-4xl font-extrabold leading-[1.12] tracking-tight text-[#002b5b] sm:text-5xl">
                Got Questions?
                <span className="mt-2 block text-[#0077b6]">
                  We Have Answers.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-slate-600">
                Everything you need to know about BIM Build BD courses, class
                methods, installments, and certification.
              </p>

              <div className="mt-9 hidden border-t border-slate-200 pt-6 sm:block">
                <p className="text-sm font-semibold text-slate-500">
                  FIND THE ANSWERS YOU NEED
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#002b5b] text-white">
                    <HelpCircle size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Frequently asked questions
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Select a question to learn more
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-800">
                Common Questions
              </p>
              <span className="text-xs font-semibold text-slate-400">
                {String(extendedFaqs.length).padStart(2, "0")} QUESTIONS
              </span>
            </div>

            <div className="border-t-2 border-[#002b5b]">
              {extendedFaqs.map((faq, idx) => {
                const isOpen = openIdx === idx;

                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.07,
                      ease: "easeOut",
                    }}
                    className={`border-b border-slate-200 transition-colors duration-300 ${isOpen ? "bg-white" : "bg-transparent"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-4 px-3 py-5 text-left sm:gap-5 sm:px-5 sm:py-6"
                    >
                      <span
                        className={`w-7 shrink-0 text-sm font-bold tabular-nums transition-colors duration-300 ${isOpen
                          ? "text-[#0077b6]"
                          : "text-slate-400 group-hover:text-[#0077b6]"
                          }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`flex-1 text-sm font-bold leading-6 transition-colors duration-300 sm:text-base ${isOpen
                          ? "text-[#002b5b]"
                          : "text-slate-700 group-hover:text-[#0077b6]"
                          }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen
                          ? "rotate-180 bg-[#002b5b] text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-[#0077b6]"
                          }`}
                      >
                        <ChevronDown size={17} />
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pl-14 pr-4 sm:pl-[4.5rem] sm:pr-8">
                          <div className="mb-4 h-px w-12 bg-[#0077b6]/40" />
                          <p className="text-sm leading-7 text-slate-600">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom note */}
            <div className="mt-7 flex items-start gap-3 border-l-2 border-sky-300 bg-sky-50/70 px-4 py-4">
              <HelpCircle
                size={19}
                className="mt-0.5 shrink-0 text-[#0077b6]"
              />
              <p className="text-sm leading-6 text-slate-600">
                Still exploring? Open any question above to find more details
                about courses, classes, and payments.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main >
  );
}
