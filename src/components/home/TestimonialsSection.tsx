"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Mojahedur Rahman",
      role: "BIM Modeler",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      text: "BIM Build BD teaches international-standard live project workflows. Learning alongside experienced structural engineers and architects made all the difference in my career!",
    },
    {
      name: "Md. Ariful Haque",
      role: "MEP Engineer",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80",
      text: "Enrolling in the Complete BIM Revit Course was the best decision for my professional path. The structured modules and practical hands-on exercises are unmatched in quality.",
    },
    {
      name: "Souvik Karmakar",
      role: "BIM Coordinator",
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=300&q=80",
      text: "BIM Build BD is a premier platform for mastering modern BIM. The live classes, recorded lecture backups, and 24/7 dedicated mentor support are top tier!",
    },
    {
      name: "Matiur Rahaman",
      role: "CAD & BIM Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      text: "Highly recommended for anyone looking to enter the AEC industry. The instructors teach complex modeling with immense care and practical clarity.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-14">
        {/* Header */}
        <div className="text-center space-y-2.5">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0077b6]">
            TESTIMONIALS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#002b5b] tracking-tight">
            What Students Say About Us
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-b from-white to-slate-50/60 rounded-3xl border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 group hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Subtle Decorative Quote Icon */}
              <Quote className="w-8 h-8 text-sky-100 group-hover:text-sky-200 absolute top-6 right-6 transition-colors pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Student Profile Info */}
              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-200/60 relative z-10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-100 shadow-sm shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-extrabold text-[#002b5b] truncate group-hover:text-[#0077b6] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 truncate mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
