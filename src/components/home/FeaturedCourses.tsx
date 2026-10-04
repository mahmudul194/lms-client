"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CourseCard, { CourseCardItem } from "../courses/CourseCard";


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

        if (res.statusCode === 200 && res.data?.items?.length) {
          const apiBatches = res.data.items
            .filter((b: any) => {
              if (b.status === 'cancelled' || b.status === 'completed') return false;
              if (b.registration_end) {
                return new Date(b.registration_end).getTime() > Date.now();
              }
              return true;
            })
            .map((b: any) => {
              const c = b.course || {};
            const price = b.price || 16000;
            const discountPrice = b.discount_price || 12000;
            return {
              id: c.slug || b.code || b.id, // Navigate using course slug or batch code
              title: b.name || c.title,
              tag: c.level?.toUpperCase() || "WEB",
              discount: `৳${price - discountPrice} OFF`,
              badge: c.level || "Professional",
              duration: `Duration: ${c.duration || 3} ${c.duration_unit || "Months"}`,
              price: discountPrice.toLocaleString(),
              originalPrice: price.toLocaleString(),
              image: c.thumbnail || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
              registrationEnd: b.registration_end,
            };
          });
          setCourses(apiBatches);
        }
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
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-14">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002b5b] tracking-tight">
            Explore All Courses (Installment Details Available on{" "}
            <Link href="/courses" className="text-[#0077b6] relative inline-block underline decoration-2 decoration-[#0077b6] underline-offset-4 font-black hover:text-[#0f4c81]">
              Admission
            </Link>{" "}
            Page)
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 animate-pulse">
                <div className="h-52 bg-slate-200 rounded-2xl w-full" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-4/5" />
                <div className="h-8 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
