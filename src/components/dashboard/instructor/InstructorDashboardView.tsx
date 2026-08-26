"use client";

import React from "react";
import { UserAccount } from "@/data/dummyAccounts";
import { InstructorDashboardTab } from "@/types/dashboard";
import {
  MOCK_INSTRUCTOR_BATCHES,
  MOCK_STUDENT_SUBMISSIONS,
} from "@/data/instructorMockData";

import InstructorOverviewTab from "./InstructorOverviewTab";
import InstructorBatchesTab from "./InstructorBatchesTab";
import InstructorGradingTab from "./InstructorGradingTab";
import InstructorMaterialsTab from "./InstructorMaterialsTab";
import InstructorProfileTab from "./InstructorProfileTab";

interface InstructorDashboardViewProps {
  currentUser: UserAccount;
  instructorTab: InstructorDashboardTab;
  setInstructorTab: (tab: InstructorDashboardTab) => void;
}

export default function InstructorDashboardView({
  currentUser,
  instructorTab,
  setInstructorTab,
}: InstructorDashboardViewProps) {
  return (
    <div key={instructorTab} className="animate-fade-in-up space-y-8 font-sans">
      {instructorTab === "overview" && (
        <InstructorOverviewTab
          currentUser={currentUser}
          batches={MOCK_INSTRUCTOR_BATCHES}
          submissions={MOCK_STUDENT_SUBMISSIONS}
          onNavigateToLive={() => setInstructorTab("batches")}
          onNavigateToGrading={() => setInstructorTab("grading")}
        />
      )}

      {(instructorTab === "batches" || instructorTab === "live_host") && (
        <InstructorBatchesTab batches={MOCK_INSTRUCTOR_BATCHES} />
      )}

      {instructorTab === "grading" && (
        <InstructorGradingTab submissions={MOCK_STUDENT_SUBMISSIONS} />
      )}

      {instructorTab === "materials" && <InstructorMaterialsTab />}

      {instructorTab === "profile" && <InstructorProfileTab currentUser={currentUser} />}
    </div>
  );
}
