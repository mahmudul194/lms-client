"use client";

import React from "react";

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
    <section className="py-24 bg-white font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* What Students Say About Us */}
        <div className="space-y-14">
          <div className="text-center space-y-2.5">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0077b6]">
              TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#002b5b]">
              What Students Say About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-9 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-2xl transition-all hover:-translate-y-1.5"
              >
                <div className="flex flex-col items-center space-y-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 shadow-md"
                  />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 w-full text-center">
                  <h4 className="text-sm sm:text-base font-bold text-[#002b5b]">{item.name}</h4>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">{item.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2.5 pt-2">
            <span className="w-3 h-3 rounded-full bg-[#002b5b]" />
            <span className="w-3 h-3 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
