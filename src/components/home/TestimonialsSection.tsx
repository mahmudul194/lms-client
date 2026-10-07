"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Star, Quote } from "lucide-react";
import { reviewsApi } from "@/services/api";

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

  const [apiReviews, setApiReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await reviewsApi.getAllReviews();
        if (res.statusCode === 200 && res.data && res.data.length > 0) {
          const formattedReviews = res.data.map((r: any) => ({
            name: r.student?.name || "Student",
            role: r.batch?.name || "BIM Student",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
            text: r.comment,
            rating: r.rating
          }));
          setApiReviews(formattedReviews);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchReviews();
  }, []);

  const displayTestimonials = apiReviews.length > 0 ? apiReviews : testimonials;
  const N = displayTestimonials.length;
  // 5x duplicates to ensure the buffer never runs dry under any transition delay
  const extendedList = [
    ...displayTestimonials,
    ...displayTestimonials,
    ...displayTestimonials,
    ...displayTestimonials,
    ...displayTestimonials,
  ];

  // Base index in the middle copy (copy 2: index 2 * N)
  const [currentIndex, setCurrentIndex] = useState(2 * N);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive visible count
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

  // Pause carousel when tab is in background so timer doesn't run away
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // When transition is disabled for instantaneous reset, re-enable it on next animation frame
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Guaranteed bounds reset: runs unconditionally after slide finishes (300ms)
  // Ensures cards never slide past buffer even if browser drops transitionend
  useEffect(() => {
    if (currentIndex >= 3 * N || currentIndex < 2 * N) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => {
          if (prev >= 3 * N) return 2 * N + ((prev - 3 * N) % N);
          if (prev < 2 * N) return 2 * N + ((prev - 2 * N + N * 10) % N);
          return prev;
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, N]);

  // Event-based snap for instant response (filtered to only parent transform event)
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;

    if (currentIndex >= 3 * N) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => 2 * N + ((prev - 3 * N) % N));
    } else if (currentIndex < 2 * N) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => 2 * N + ((prev - 2 * N + N * 10) % N));
    }
  };

  // Auto-slide every 2.2s with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 2200);
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
        {/* Clean Centered Header */}
        <div className="text-center space-y-2.5">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0077b6]">
            TESTIMONIALS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#002b5b] tracking-tight">
            What Students Say About Us
          </h2>
        </div>

        {/* Seamless Infinite Sliding Track */}
        <div
          className="relative overflow-hidden py-3 -my-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              transition: isTransitioning
                ? "transform 280ms ease-out"
                : "none",
            }}
          >
            {extendedList.map((item, idx) => (
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
                        <Star key={i} className={`w-3.5 h-3.5 ${i < (item.rating || 5) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} />
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
      </div>
    </section>
  );
}
