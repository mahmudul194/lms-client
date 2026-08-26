"use client";

import React, { useState, useEffect } from "react";
import { EnrolledCourse } from "@/types/dashboard";
import { MOCK_STUDENT_ENROLLED_COURSES } from "@/data/studentCoursesMockData";
import StudentEnrolledCoursesGrid from "./StudentEnrolledCoursesGrid";
import StudentCourseHub from "./StudentCourseHub";
import StudentClassroomPlayer from "./StudentClassroomPlayer";

export default function StudentCoursePlayerTab() {
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const cId = sp.get("courseId") || localStorage.getItem("bim_active_course_id");
    if (cId) {
      const found = MOCK_STUDENT_ENROLLED_COURSES.find((c) => c.id === cId);
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

  if (!selectedCourse) {
    return <StudentEnrolledCoursesGrid courses={MOCK_STUDENT_ENROLLED_COURSES} onSelectCourse={handleSelectCourse} />;
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
