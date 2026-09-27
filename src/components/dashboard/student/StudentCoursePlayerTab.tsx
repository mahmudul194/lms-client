"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { EnrolledCourse } from "@/types/dashboard";
import StudentEnrolledCoursesGrid from "./StudentEnrolledCoursesGrid";
import StudentCourseHub from "./StudentCourseHub";
import StudentClassroomPlayer from "./StudentClassroomPlayer";

export default function StudentCoursePlayerTab() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
        const res = await enrollmentsApi.getMyEnrollments();
        if (res.statusCode === 200 && Array.isArray(res.data) && res.data.length > 0) {
          const apiCourses: EnrolledCourse[] = res.data.map((enr: any) => ({
            id: enr.batch?.course?.id || enr.batch_id || enr.id,
            title: enr.batch?.course?.title || enr.batch?.name || "Enrolled Course",
            category: "BIM Engineering",
            batch: enr.batch?.name || "Active Batch",
            instructor: "Course Instructor",
            thumbnail: enr.batch?.course?.thumbnail || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
            totalLessons: 24,
            completedLessons: 0,
            progressPercent: 0,
            modules: [],
          }));
          setCourses(apiCourses);
        } else {
          setCourses([]);
        }
      } catch {
        setCourses([]);
      }
    })();

    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const cId = sp.get("courseId") || localStorage.getItem("bim_active_course_id");
    if (cId) {
      const found = courses.find((c) => c.id === cId);
      if (found) {
        setSelectedCourse(found);
        if (sp.get("play") === "true") setIsPlayingVideo(true);
      }
    }
  }, []);

  const handleSelectCourse = (course: EnrolledCourse) => {
    setSelectedCourse(course);
    setIsPlayingVideo(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("bim_active_course_id", course.id);
      const sp = new URLSearchParams(window.location.search);
      sp.set("courseId", course.id);
      sp.delete("play");
      window.history.replaceState(null, "", `${window.location.pathname}?${sp.toString()}`);
    }
  };

  const handleOpenPlayer = (lessonId?: string) => {
    setIsPlayingVideo(true);
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      sp.set("play", "true");
      if (lessonId) {
        sp.set("lessonId", lessonId);
        localStorage.setItem("bim_active_lesson_id", lessonId);
      }
      window.history.replaceState(null, "", `${window.location.pathname}?${sp.toString()}`);
    }
  };

  const handleBackToHub = () => {
    setIsPlayingVideo(false);
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      sp.delete("play");
      window.history.replaceState(null, "", `${window.location.pathname}?${sp.toString()}`);
    }
  };

  const handleBackToAllCourses = () => {
    setSelectedCourse(null);
    setIsPlayingVideo(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bim_active_course_id");
      localStorage.removeItem("bim_active_lesson_id");
      const sp = new URLSearchParams(window.location.search);
      sp.delete("courseId");
      sp.delete("lessonId");
      sp.delete("play");
      window.history.replaceState(null, "", `${window.location.pathname}?${sp.toString()}`);
    }
  };

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 text-center font-sans space-y-4 max-w-xl mx-auto shadow-xs">
        <div className="w-16 h-16 rounded-3xl bg-sky-50 text-[#0077b6] flex items-center justify-center mx-auto border border-sky-100 shadow-xs">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">No Enrolled Courses Yet</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          You have not enrolled in any BIM or engineering courses yet. Browse our course catalog to find the right training for you.
        </p>
        <div className="pt-2">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedCourse) {
    return <StudentEnrolledCoursesGrid courses={courses} onSelectCourse={handleSelectCourse} />;
  }

  if (isPlayingVideo) {
    return <StudentClassroomPlayer course={selectedCourse} onBackToCourses={handleBackToHub} />;
  }

  return (
    <StudentCourseHub
      course={selectedCourse}
      onBackToCourses={handleBackToAllCourses}
      onOpenPlayer={handleOpenPlayer}
    />
  );
}
