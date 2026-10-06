"use client";

import React from "react";

export default function HeroShowcaseCard() {
  return (
    <div className="lg:col-span-6 flex justify-center lg:justify-end font-sans">
      <div className="relative w-full max-w-lg">
        {/* Soft Decorative Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/20 to-[#0077b6]/30 rounded-3xl blur-2xl -z-10" />

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Modern Architectural Engineering Design & BIM Modeling"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";
            }}
            className="w-full h-80 sm:h-96 lg:h-[430px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}
