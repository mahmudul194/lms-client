"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CourseCard, { CourseCardItem } from "@/components/courses/CourseCard";

const INITIAL_COURSES: CourseCardItem[] = [
  { id: "revit-combo-pro", title: "Professional Revit Combo Course (Architecture, Structure & MEP)", tag: "COMBO", discount: "-40%", badge: "Expert", duration: "Duration: 5 to 6 Months", price: "15,000.00", originalPrice: "25,000.00", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" },
  { id: "revit-arch-struct", title: "Professional Revit Architecture & Structure", tag: "ARCH + STRUCT", discount: "-38%", badge: "Expert", duration: "Duration: 4 to 5 Months", price: "12,500.00", originalPrice: "20,000.00", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" },
  { id: "revit-mep", title: "Professional Revit MEP & HVAC Masterclass", tag: "MEP & HVAC", discount: "-30%", badge: "Expert", duration: "Duration: 2 to 3 Months", price: "7,000.00", originalPrice: "10,000.00", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80" },
  { id: "revit-architecture-only", title: "Professional Revit Architecture Course", tag: "ARCHITECTURE", discount: "-30%", badge: "Expert", duration: "Duration: 2 to 3 Months", price: "7,000.00", originalPrice: "10,000.00", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
  { id: "revit-structure-only", title: "Professional Revit Structure Course", tag: "STRUCTURE", discount: "-30%", badge: "Expert", duration: "Duration: 2 to 3 Months", price: "7,000.00", originalPrice: "10,000.00", image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80" },
  { id: "dynamo-only", title: "Professional Revit Dynamo Course", tag: "DYNAMO", discount: "-33%", badge: "Expert", duration: "Duration: 2 to 3 Months", price: "10,000.00", originalPrice: "15,000.00", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseCardItem[]>(INITIAL_COURSES);

  useEffect(() => {
    (async () => {
      try {
        const { coursesApi } = await import("@/services/api");
        const res = await coursesApi.getAllCourses({ limit: 20 });
        if (res.statusCode === 200 && res.data?.items?.length) {
          const apiCourses = res.data.items.map((c) => ({
            id: c.slug || c.id,
            title: c.title,
            tag: c.level?.toUpperCase() || "BIM",
            discount: c.discount_price ? `৳${c.price - c.discount_price} OFF` : "-30%",
            badge: c.level || "Professional",
            duration: `Duration: ${c.duration || 3} ${c.duration_unit || "Months"}`,
            price: (c.discount_price || c.price).toLocaleString(),
            originalPrice: (c.price * 1.4).toLocaleString(),
            image: c.thumbnail || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
          }));
          setCourses(apiCourses);
        }
      } catch {}
    })();
  }, []);

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-14">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002b5b] tracking-tight">
            Explore All Courses (Installment Details Available on{" "}
            <Link href="/admission" className="text-[#0077b6] relative inline-block underline decoration-2 decoration-[#0077b6] underline-offset-4 font-black hover:text-[#0f4c81]">
              Admission
            </Link>{" "}
            Page)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
