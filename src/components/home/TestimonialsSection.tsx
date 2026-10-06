"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

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
    {
      name: "Md. Mizanur Rahman",
      role: "Structural Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      text: "The structural rebar detailing and schedule generation methodologies were explained so clearly that I immediately applied them to our real construction projects.",
    },
    {
      name: "Tanvir Ahmed",
      role: "Architectural Visualizer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      text: "Learning parametric modeling and Revit families with industry experts helped me secure an international remote BIM modeling role.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Auto-play sliding effect with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10 sm:space-y-12">
        {/* Header with Title and Sliding Arrow Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0077b6]">
              TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#002b5b] mt-1 tracking-tight">
              What Students Say About Us
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-[#0077b6] hover:text-white hover:border-[#0077b6] text-slate-700 transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Previous Testimonial"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-[#0077b6] hover:text-white hover:border-[#0077b6] text-slate-700 transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Next Testimonial"
              title="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sliding Cards Track */}
        <div
          className="relative overflow-hidden py-3 -my-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="shrink-0 px-3 sm:px-3.5"
                style={{
                  width: `${100 / visibleCount}%`,
                }}
              >
                <div className="relative bg-gradient-to-b from-white to-slate-50/60 rounded-3xl border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 group hover:-translate-y-1.5 overflow-hidden h-full min-h-[290px]">
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
              </div>
            ))}
          </div>
        </div>

        {/* Sliding Dot Indicators */}
        <div className="flex justify-center items-center gap-2 pt-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-[#0077b6]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
