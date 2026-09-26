"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CourseCard, { CourseCardItem } from "@/components/courses/CourseCard";
import { BookOpen } from "lucide-react";

function CoursesGridContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [courses, setCourses] = useState<CourseCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      try {
        const { coursesApi } = await import("@/services/api");
        const res = await coursesApi.getAllCourses({ limit: 50 });
        if (!isMounted) return;

        if (res.statusCode === 200 && res.data?.items) {
          let items = res.data.items;

          if (categoryParam) {
            const query = categoryParam.toLowerCase();
            items = items.filter((c) => {
              const cat = c.category;
              return (
                cat?.slug?.toLowerCase() === query ||
                cat?.name?.toLowerCase() === query ||
                cat?.id === categoryParam ||
                c.category_id === categoryParam
              );
            });
          }

          const apiCourses = items.map((c) => ({
            id: c.slug || c.id,
            title: c.title,
            tag: c.level?.toUpperCase() || "WEB",
            discount: c.discount_price ? `৳${c.price - c.discount_price} OFF` : "-30%",
            badge: c.level || "Professional",
            duration: `Duration: ${c.duration || 3} ${c.duration_unit || "Months"}`,
            price: (c.discount_price || c.price).toLocaleString(),
            originalPrice: (c.price * 1.4).toLocaleString(),
            image: c.thumbnail || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
          }));
          setCourses(apiCourses);
        } else {
          setCourses([]);
        }
      } catch {
        if (isMounted) setCourses([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [categoryParam]);

  return (
    <div className="space-y-10">
      {categoryParam && (
        <div className="flex items-center justify-between bg-sky-50/70 border border-sky-100 px-6 py-3.5 rounded-2xl">
          <p className="text-xs sm:text-sm font-bold text-slate-700">
            Showing courses in category: <span className="text-[#0077b6]">{categoryParam}</span>
          </p>
          <Link href="/courses" className="text-xs font-bold text-slate-500 hover:text-[#0077b6]">
            Clear Filter
          </Link>
        </div>
      )}

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
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200/80 p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No Courses Found</h3>
          <p className="text-xs text-slate-400">There are currently no active courses listed in this section.</p>
          <Link href="/courses" className="inline-block px-5 py-2.5 rounded-xl bg-[#0077b6] text-white text-xs font-bold shadow-md">
            View All Courses
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002b5b] tracking-tight">
            Explore All Courses
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Installment details available on{" "}
            <Link href="/admission" className="text-[#0077b6] underline font-bold">
              Admission
            </Link>{" "}
            page
          </p>
        </div>
        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400 text-sm">Loading courses...</div>}>
          <CoursesGridContent />
        </Suspense>
      </div>
    </section>
  );
}
