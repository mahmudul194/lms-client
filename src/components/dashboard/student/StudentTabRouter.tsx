"use client";

import React from "react";
import { UserAccount } from "@/data/dummyAccounts";
import { ClassVideo, LiveClass, CourseResource, StudentDashboardTab, Assignment } from "@/types/dashboard";
import StudentOverviewTab from "./StudentOverviewTab";
import StudentCoursePlayerTab from "./StudentCoursePlayerTab";
import StudentLiveScheduleTab from "./StudentLiveScheduleTab";
import StudentAssignmentsTab from "./StudentAssignmentsTab";
import StudentResourcesTab from "./StudentResourcesTab";
import StudentPaymentsTab from "./StudentPaymentsTab";
import StudentCertificateTab from "./StudentCertificateTab";
import StudentProfileTab from "./StudentProfileTab";
import StudentReviewsTab from "./StudentReviewsTab";

interface StudentTabRouterProps {
  studentTab: StudentDashboardTab;
  setStudentTab: (tab: StudentDashboardTab) => void;
  currentUser: UserAccount;
  classesList: ClassVideo[];
  liveClasses: LiveClass[];
  resources: CourseResource[];
  assignments: Assignment[];
  activeVideo: ClassVideo;
  onSelectVideo: (video: ClassVideo) => void;
  onOpenUpload: (id: number) => void;
}

export default function StudentTabRouter({
  studentTab,
  setStudentTab,
  currentUser,
  classesList,
  liveClasses,
  resources,
  assignments,
  activeVideo,
  onSelectVideo,
  onOpenUpload,
}: StudentTabRouterProps) {
  return (
    <div key={studentTab} className="animate-fade-in-up space-y-8">
      {studentTab === "overview" && (
        <StudentOverviewTab
          currentUser={currentUser}
          classesList={classesList}
          liveClasses={liveClasses}
          resources={resources}
          onSelectVideo={onSelectVideo}
          onNavigateToCourses={() => setStudentTab("courses")}
          onNavigateToResources={() => setStudentTab("resources")}
        />
      )}
      {studentTab === "courses" && <StudentCoursePlayerTab />}
      {studentTab === "live" && <StudentLiveScheduleTab />}
      {studentTab === "assignments" && (
        <StudentAssignmentsTab />
      )}
      {studentTab === "resources" && <StudentResourcesTab />}
      {studentTab === "payments" && <StudentPaymentsTab />}
      {studentTab === "certificate" && <StudentCertificateTab currentUser={currentUser} />}
      {studentTab === "reviews" && <StudentReviewsTab />}
      {studentTab === "profile" && <StudentProfileTab currentUser={currentUser} />}
    </div>
  );
}
