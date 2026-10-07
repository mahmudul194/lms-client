"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
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

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16 lg:py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-[#002b5b] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#0077b6]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Common Questions & Answers (FAQ)
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to know about admission, installments, class schedules, and certificate verification.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-shadow shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#0077b6] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0077b6]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0077b6] hover:text-[#002b5b] transition-colors"
          >
            <span>Have more questions? Visit our complete FAQ page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
