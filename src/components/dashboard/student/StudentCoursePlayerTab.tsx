"use client";

import React, { useState, useEffect } from "react";
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
        const { coursesApi } = await import("@/services/api/coursesApi");
        const res = await coursesApi.getAllCourses({ limit: 20 });
        if (res.statusCode === 200 && res.data?.items?.length) {
          const apiCourses: EnrolledCourse[] = res.data.items.map((c) => ({
            id: c.id,
            title: c.title,
            category: "BIM Engineering",
            batch: "8th Batch",
            instructor: "Engr. Ashikur Rahman",
            thumbnail: c.thumbnail || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
            totalLessons: 24,
            completedLessons: 12,
            progressPercent: 50,
            modules: [],
          }));
          setCourses(apiCourses);
        }
      } catch {}
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
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center font-sans space-y-2">
        <h3 className="text-xl font-bold text-slate-800">No Enrolled Courses</h3>
        <p className="text-sm text-slate-500">You do not have any active course enrollments yet.</p>
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
