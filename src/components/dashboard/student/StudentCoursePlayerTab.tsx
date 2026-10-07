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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
        const res = await enrollmentsApi.getMyEnrollments();
        if (res.statusCode === 200 && Array.isArray(res.data) && res.data.length > 0) {
          const activeEnrollments = res.data.filter((enr: any) => enr.status !== 'PENDING');
          const apiCourses: EnrolledCourse[] = activeEnrollments.map((enr: any) => {
            const course = enr.batch?.course || {};
            const categoryName = course.category?.name || "Uncategorized";
            const instructor = course.mentors && course.mentors.length > 0 ? course.mentors.map((m: any) => m.name).join(", ") : "Course Instructor";
            const thumbnail = course.thumbnail || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop";
            
            const progressArr = enr.lesson_progress || [];
            const completedLessonIds = progressArr.filter((p: any) => p.is_completed).map((p: any) => p.lesson_id);

            let totalLessonsCount = 0;
            let completedLessonsCount = 0;

            const mappedModules = (course.modules || []).sort((a: any, b: any) => a.order - b.order).map((mod: any, mIdx: number) => {
               const mappedLessons = (mod.lessons || []).sort((a: any, b: any) => a.order - b.order).map((l: any, lIdx: number) => {
                  totalLessonsCount++;
                  const isCompleted = completedLessonIds.includes(l.id);
                  if (isCompleted) completedLessonsCount++;

                  return {
                     id: l.id,
                     lessonNo: lIdx + 1,
                     title: l.title || "",
                     duration: l.duration ? `${l.duration} min` : "0:00",
                     videoUrl: l.video_url || "",
                     pdfUrl: l.pdf_url || "",
                     textContent: l.text_content || "",
                     type: l.type || "video",
                     description: l.description || "",
                     resources: [],
                     isCompleted: isCompleted,
                     isUnlocked: true,
                  };
               });
               return {
                  id: mod.id,
                  moduleNo: `Module ${mIdx + 1}`,
                  title: mod.title || "",
                  lessons: mappedLessons,
               };
            });

            return {
              id: course.id || enr.batch_id || enr.id,
              batchId: enr.batch_id || (enr.batch ? enr.batch.id : ""),
              title: course.title || enr.batch?.name || "Enrolled Course",
              category: categoryName,
              batch: enr.batch?.name || "Active Batch",
              instructor: instructor,
              thumbnail: thumbnail,
              totalLessons: totalLessonsCount,
              completedLessons: completedLessonsCount,
              progressPercent: totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0,
              modules: mappedModules,
            };
          });
          setCourses(apiCourses);

          if (typeof window !== "undefined") {
            const sp = new URLSearchParams(window.location.search);
            const cId = sp.get("courseId") || localStorage.getItem("bim_active_course_id");
            if (cId) {
              const found = apiCourses.find((c) => c.id === cId);
              if (found) {
                setSelectedCourse(found);
                if (sp.get("play") === "true") setIsPlayingVideo(true);
              }
            }
          }
        } else {
          setCourses([]);
        }
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    })();
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

  const handleOpenPlayer = (lessonId?: string, targetCourse?: EnrolledCourse) => {
    if (targetCourse && targetCourse.id !== selectedCourse?.id) {
      setSelectedCourse(targetCourse);
      if (typeof window !== "undefined") {
        localStorage.setItem("bim_active_course_id", targetCourse.id);
        const sp = new URLSearchParams(window.location.search);
        sp.set("courseId", targetCourse.id);
        window.history.replaceState(null, "", `${window.location.pathname}?${sp.toString()}`);
      }
    }
    
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs h-[380px] flex flex-col">
            <div className="h-44 bg-slate-200 w-full" />
            <div className="p-5 flex-1 flex flex-col gap-4">
              <div className="h-6 bg-slate-200 rounded-xl w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="mt-auto space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-slate-200 rounded w-1/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/4" />
                </div>
                <div className="h-2 bg-slate-200 rounded-full w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

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
    return (
      <StudentEnrolledCoursesGrid 
        courses={courses} 
        onSelectCourse={handleSelectCourse} 
        onOpenPlayer={(c) => handleOpenPlayer(undefined, c)} 
      />
    );
  }

  const handleUpdateCourse = (updatedCourse: EnrolledCourse) => {
    setSelectedCourse(updatedCourse);
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  if (isPlayingVideo) {
    return (
      <StudentClassroomPlayer 
        course={selectedCourse} 
        onBackToCourses={handleBackToHub} 
        onUpdateCourse={handleUpdateCourse}
      />
    );
  }

  return (
    <StudentCourseHub
      course={selectedCourse}
      onBackToCourses={handleBackToAllCourses}
      onOpenPlayer={handleOpenPlayer}
    />
  );
}
