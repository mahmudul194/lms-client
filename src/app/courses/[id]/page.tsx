import React from "react";
import { COURSES } from "@/data/mockData";
import CourseHeroHeader from "@/components/course-details/CourseHeroHeader";
import CoursePricingCard from "@/components/course-details/CoursePricingCard";
import CourseDetailsOverview from "@/components/course-details/CourseDetailsOverview";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { coursesApi } = await import("@/services/api/coursesApi");
    const res = await coursesApi.getAllCourses({ limit: 50 });
    if (res.statusCode === 200 && res.data?.items?.length) {
      return res.data.items.map((c) => ({ id: c.slug || c.id }));
    }
  } catch {}
  return COURSES.map((course) => ({ id: course.id }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let course: any = null;

  try {
    const { coursesApi } = await import("@/services/api/coursesApi");
    const res = await coursesApi.getCourseById(id);
    if (res.statusCode === 200 && res.data) {
      const item = res.data;
      course = {
        id: item.id,
        title: item.title,
        description: item.description || item.short_description || "Comprehensive hands-on training program.",
        price: Number(item.discount_price || item.price || 5000),
        originalPrice: item.price ? `৳${Number(item.price).toLocaleString()}` : "৳10,000",
        discount: item.discount_price ? `৳${Number(item.discount_price).toLocaleString()}` : "৳5,000",
        rating: 4.9,
        reviews: 120,
        category: item.category?.name || "Web Development",
        instructor: item.mentors?.[0]?.user?.name || "Lead Instructor",
        duration: `${item.duration || 45} ${item.duration_unit || "Hours"}`,
        lessons: 30,
        modulesCount: 8,
        level: item.level || "Beginner",
        image: item.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        syllabus: [],
        features: [
          "Project-Based Live Training",
          "Lifetime Class Recordings",
          "Resource Materials & Source Code",
          "Verified Certificate of Completion",
          "Job & Career Support",
        ],
      };
    }
  } catch {}

  if (!course) {
    course = COURSES.find((c) => c.id === id) || COURSES[0];
  }

  const installmentAmount = Math.round((course.price || 12000) / 3);
  const instructorName = typeof course.instructor === "object" ? course.instructor.name : (course.instructor || "Lead Specialist");
  const instructorRole = typeof course.instructor === "object" ? course.instructor.role : "Senior Consultant";
  const defaultSoftwares = ["Autodesk Revit", "AutoCAD", "Navisworks", "Dynamo"];
  const defaultFeatures = course.features || [
    "Project-Based Live Training",
    "Lifetime Class Recordings",
    "BIM Family Library",
    "Certificate of Completion",
    "Job & Freelancing Support",
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-[#002b5b] text-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <CourseHeroHeader course={course} />
            <CoursePricingCard course={course} installmentAmount={installmentAmount} />
          </div>
        </div>
        <CourseDetailsOverview
          course={course}
          instructorName={instructorName}
          instructorRole={instructorRole}
          defaultSoftwares={defaultSoftwares}
          defaultFeatures={defaultFeatures}
        />
      </div>
    </div>
  );
}
