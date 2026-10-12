"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import { reviewsApi } from "@/services/api";
import { motion } from "motion/react";

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
    const pauseMovement = () => {
      setIsPaused(true);
    };

    const resumeMovement = () => {
      setIsPaused(false);
    };
  };
  const trackRef = useRef<HTMLDivElement>(null);

  const isPausedRef = useRef(false);

  const pauseMovement = () => {
    isPausedRef.current = true;
    setIsPaused(true);
  };

  const resumeMovement = () => {
    isPausedRef.current = false;
    setIsPaused(false);
  };

  const duplicatedTestimonials = [
    ...displayTestimonials,
    ...displayTestimonials,
  ];

  useEffect(() => {
    const track = trackRef.current;

    if (!track || displayTestimonials.length < 2) return;

    let animationFrame = 0;
    let previousTime = 0;

    const animate = (time: number) => {
      if (!previousTime) previousTime = time;

      const delta = Math.min(time - previousTime, 32);
      previousTime = time;

      const halfWidth = track.scrollWidth / 2;

      if (
        !isPausedRef.current &&
        !document.hidden &&
        halfWidth > 0
      ) {
        track.scrollLeft += delta * 0.035;

        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [displayTestimonials.length]);

  return (
    <section className="overflow-hidden bg-white py-16 font-sans sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] space-y-10 px-4 sm:px-8 lg:space-y-12 lg:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
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
        </motion.div>

        {/* Moving Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
          onMouseEnter={pauseMovement}
          onMouseLeave={resumeMovement}
          onTouchStart={pauseMovement}
          onTouchEnd={() => {
            window.setTimeout(resumeMovement, 1200);
          }}
        >
          {/* Edge Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-white to-transparent sm:w-10 lg:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-white to-transparent sm:w-10 lg:w-16" />

          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {duplicatedTestimonials.map((item, index) => {
              const isDuplicate = index >= testimonials.length;

              return (
                <article
                  key={`${item.name}-${index}`}
                  aria-hidden={isDuplicate}
                  className="group relative flex w-[290px] shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0077b6]/40 hover:shadow-xl hover:shadow-[#002b5b]/10 sm:w-[340px] lg:w-[360px]"
                >
                  {/* Top Accent */}
                  <div className="h-1 w-full bg-slate-100">
                    <div className="h-full w-1/3 bg-[#0077b6] transition-all duration-500 group-hover:w-full" />
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    {/* Rating + Quote */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-1"
                        aria-label={`${item.rating ?? 5} out of 5 stars`}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= (item.rating ?? 5)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                              }`}
                          />
                        ))}
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0077b6]/8 text-[#0077b6] transition-colors duration-300 group-hover:bg-[#002b5b] group-hover:text-white">
                        <Quote className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Review */}
                    <p className="mt-5 flex-1 text-sm leading-7 text-slate-600">
                      “{item.text}”
                    </p>

                    {/* Student Profile */}
                    <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-12 w-12 shrink-0 rounded-xl object-cover ring-2 ring-slate-100 transition-all duration-300 group-hover:ring-[#0077b6]/30"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-[#002b5b]">
                          {item.name}
                        </h3>
                        <p className="mt-1 truncate text-xs font-medium text-slate-500">
                          {item.role}
                        </p>
                      </div>

                      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0077b6]" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Note */}
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isPaused ? "bg-amber-400" : "animate-pulse bg-[#0077b6]"
              }`}
          />
          {isPaused
            ? "Take your time to read the reviews"
            : "Explore more student experiences"}
        </div>
      </div>
    </section>
  );
}
