import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#002b5b] via-[#0f4c81] to-[#0077b6] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-sky-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join BIM Build BD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Start Your Professional BIM Career Today!
            </h2>
            <p className="text-sm sm:text-base text-sky-100 leading-relaxed font-medium">
              Enroll with our flexible 3-month installment plans. Connect directly with our engineering counselors for personalized course guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/courses"
              className="px-7 py-3.5 rounded-xl bg-white text-[#002b5b] font-black text-sm sm:text-base hover:bg-sky-50 transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/8801879526108"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base border border-white/30 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>+880 1879-526108</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
