"use client";

import React, { useState, useEffect } from "react";
import { EnrolledCourse } from "@/types/dashboard";
import { MOCK_STUDENT_ENROLLED_COURSES } from "@/data/studentCoursesMockData";
import StudentEnrolledCoursesGrid from "./StudentEnrolledCoursesGrid";
import StudentClassroomPlayer from "./StudentClassroomPlayer";

export default function StudentCoursePlayerTab() {
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const cId = sp.get("courseId") || localStorage.getItem("bim_active_course_id");
    if (cId) {
      const found = MOCK_STUDENT_ENROLLED_COURSES.find((c) => c.id === cId);
      if (found) setSelectedCourse(found);
    }
  }, []);

  const handleSelectCourse = (course: EnrolledCourse) => {
    setSelectedCourse(course);
    if (typeof window !== "undefined") {
      localStorage.setItem("bim_active_course_id", course.id);
      const sp = new URLSearchParams(window.location.search);
      sp.set("courseId", course.id);
      window.history.replaceState(null, "", `${window.location.pathname}?${sp.toString()}`);
    }
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bim_active_course_id");
      localStorage.removeItem("bim_active_lesson_id");
      const sp = new URLSearchParams(window.location.search);
      sp.delete("courseId");
      sp.delete("lessonId");
      window.history.replaceState(null, "", `${window.location.pathname}?${sp.toString()}`);
    }
  };

  if (!selectedCourse) {
    return <StudentEnrolledCoursesGrid courses={MOCK_STUDENT_ENROLLED_COURSES} onSelectCourse={handleSelectCourse} />;
  }

  return <StudentClassroomPlayer course={selectedCourse} onBackToCourses={handleBackToCourses} />;
}
