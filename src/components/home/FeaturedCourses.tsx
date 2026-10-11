"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CourseCard, { CourseCardItem } from "../courses/CourseCard";
import { motion } from "motion/react";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<CourseCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { batchesApi } = await import("@/services/api");
        const res = await batchesApi.getAllBatches({ limit: 12 });
        if (!isMounted) return;

        let items: CourseCardItem[] = [];

        if (res.statusCode === 200 && res.data?.items?.length) {
          items = res.data.items
            .filter((b: any) => b.status === "ongoing")
            .map((b: any) => {
              const c = b.course || {};
              const price = b.price || 16000;
              const discountPrice = b.discount_price || 12000;
              return {
                id: c.slug || b.code || b.id,
                title: b.name || c.title,
                tag: c.level?.toUpperCase() || "BIM",
                discount: `৳${price - discountPrice} OFF`,
                badge: c.level || "Professional",
                duration: `Duration: ${c.duration || 3} ${c.duration_unit || "Months"}`,
                price: discountPrice.toLocaleString(),
                originalPrice: price.toLocaleString(),
                image:
                  c.thumbnail ||
                  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
                registrationEnd: b.registration_end,
              };
            });
        }

        // Fallback to courses if no active batches exist
        if (!items.length) {
          const { coursesApi } = await import("@/services/api");
          const cRes = await coursesApi.getAllCourses({ limit: 12 });
          if (cRes.statusCode === 200 && cRes.data?.items?.length) {
            items = cRes.data.items.map((c: any) => ({
              id: c.slug || c.id,
              title: c.title,
              tag: c.level?.toUpperCase() || "BIM",
              discount: c.discount_price ? `৳${c.price - c.discount_price} OFF` : "-30%",
              badge: c.level || "Professional",
              duration: `Duration: ${c.duration || 3} ${c.duration_unit || "Months"}`,
              price: (c.discount_price || c.price || 12000).toLocaleString(),
              originalPrice: ((c.price || 16000) * 1.25).toLocaleString(),
              image:
                c.thumbnail ||
                "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
            }));
          }
        }

        setCourses(items);
      } catch {
        // Fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className={`bg-white transition-all ${courses.length > 0 ? "pt-14 sm:pt-18 pb-12 sm:pb-16" : "pt-12 sm:pt-14 pb-2 sm:pb-3"
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0077b6]">
            Learn & Grow
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-[#002b5b] sm:text-3xl md:text-4xl">
            Explore All <span className="text-[#0077b6]">Batches</span>
          </h2>

          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#0077b6]/70" />

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Discover our upcoming and ongoing batches to find the right learning path for you.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-10 sm:mt-12">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 animate-pulse"
              >
                <div className="h-52 bg-slate-200 rounded-2xl w-full" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-4/5" />
                <div className="h-8 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: 0.35,
                  staggerChildren: 0.18,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-10 sm:mt-12"
          >
            {courses.map((course) => (
              <motion.div
                key={course.id}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                <CourseCard key={course.id} course={course} />
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </div>
    </section >
  );
}
