"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
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
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-[#002b5b] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#0077b6]" />
            <span>FAQ & Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-sm text-slate-600">
            Everything you need to know about BIM Build BD courses, class methods, installments, and certification.
          </p>
        </div>

        <div className="space-y-4">
          {extendedFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs transition-shadow"
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
      </div>
    </div>
  );
}
