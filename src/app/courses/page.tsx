"use client";

import React, { useState, useEffect } from "react";
import CourseCard, { CourseCardItem } from "@/components/courses/CourseCard";

export default function AllCoursesPage() {
  const [courses, setCourses] = useState<CourseCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { batchesApi } = await import("@/services/api");
        const res = await batchesApi.getAllBatches({ limit: 100 });
        if (!isMounted) return;

        if (res.statusCode === 200 && res.data?.items?.length) {
          const apiBatches = res.data.items
            .filter((b: any) => b.status === "ongoing")
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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-1 py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">

          {/* Page Heading */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#0077b6]" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077b6]">
                Learn • Grow • Succeed
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#002b5b]">
              All Professional <span className="text-[#0077b6]">Courses</span>
            </h1>

            <div className="mx-auto flex items-center justify-center gap-1.5">
              <span className="h-1 w-8 rounded-full bg-[#0077b6]" />
              <span className="h-1 w-3 rounded-full bg-[#002b5b]/30" />
              <span className="h-1 w-1 rounded-full bg-[#002b5b]/20" />
            </div>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Master in-demand skills through industry-focused training designed to turn your ambition into practical expertise and real career opportunities.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 animate-pulse">
                  <div className="h-52 bg-slate-200 rounded-2xl w-full" />
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 rounded w-4/5" />
                  <div className="h-8 bg-slate-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <h3 className="text-xl font-bold mb-2">No courses found</h3>
              <p>Check back later for upcoming batches.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
