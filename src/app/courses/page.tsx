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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-1 py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002b5b] tracking-tight">
              All Professional Courses
            </h1>
            <p className="text-gray-500 text-sm sm:text-base font-medium max-w-2xl mx-auto">
              Master the most in-demand skills in tech, engineering, and digital marketing. Enroll in our specialized batches today and jumpstart your career.
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
