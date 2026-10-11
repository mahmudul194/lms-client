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
    <section className="overflow-hidden bg-white py-16 font-sans sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] space-y-12 px-4 sm:px-8 lg:space-y-14 lg:px-12">
        {/* Section Heading */}
        <div className="text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0077b6]">
            Testimonials
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-[#002b5b] sm:text-3xl md:text-4xl">
            What Students Say{" "}
            <span className="text-[#0077b6]">About Us</span>
          </h2>

          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#0077b6]/70" />

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Hear from learners about their experience with our courses and
            training.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className="relative -my-3 overflow-hidden py-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            onTransitionEnd={(e) => {
              if (e.target === e.currentTarget) {
                handleTransitionEnd(e);
              }
            }}
            className="flex items-stretch"
            style={{
              transform: `translate3d(-${currentIndex * (100 / visibleCount)}%, 0, 0)`,
              transition: isTransitioning
                ? "transform 800ms cubic-bezier(0.25, 0.1, 0.25, 1)"
                : "none",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {extendedList.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="shrink-0 px-3 sm:px-3.5"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="group relative flex h-full min-h-[290px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/70 p-7 transition-[border-color,box-shadow] duration-300 hover:border-sky-200 hover:shadow-xl hover:shadow-[#002b5b]/[0.06] sm:p-8">
                  <Quote className="pointer-events-none absolute right-6 top-6 h-8 w-8 text-sky-100 transition-colors duration-300 group-hover:text-sky-200" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < (item.rating || 5)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                            }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs font-normal leading-relaxed text-slate-700 sm:text-sm">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 flex items-center gap-3.5 border-t border-slate-200/70 pt-5">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-sky-100"
                    />

                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-bold text-[#002b5b] transition-colors duration-300 group-hover:text-[#0077b6]">
                        {item.name}
                      </h4>

                      <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
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
