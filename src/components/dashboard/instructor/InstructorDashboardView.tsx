"use client";

import React, { useState, useEffect } from "react";
import { UserAccount } from "@/data/dummyAccounts";
import { InstructorDashboardTab } from "@/types/dashboard";
import { InstructorBatch, StudentSubmission } from "@/data/instructorMockData";
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
  const [batches, setBatches] = useState<InstructorBatch[]>([]);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { batchesApi } = await import("@/services/api/batchesApi");
        const res = await batchesApi.getAllBatches({ limit: 20 });
        if (res.statusCode === 200 && res.data?.items) {
          const apiBatches: InstructorBatch[] = res.data.items.map((b) => ({
            id: b.id,
            name: b.name,
            code: b.code,
            studentsCount: b.capacity || 45,
            schedule: "Mon, Wed, Fri (9:00 PM)",
            completedClasses: 12,
            totalClasses: 36,
            nextClassTopic: "Structural Framework & Coordination",
            status: "Active",
          }));
          setBatches(apiBatches);
        }
      } catch {}

      try {
        const { assignmentSubmissionsApi } = await import("@/services/api/assignmentSubmissionsApi");
        const res = await assignmentSubmissionsApi.getAllSubmissions({ limit: 50 });
        if (res.statusCode === 200 && res.data?.items) {
          const apiSubs: StudentSubmission[] = res.data.items.map((s, idx) => ({
            id: s.id,
            studentName: s.student?.name || "Student Submission",
            studentRoll: `BIM-2026-0${800 + idx}`,
            assignmentTitle: s.assignment?.title || "BIM Model Submission",
            assignmentInstructions: "Submit .rvt model and CAD dwg reference drawings.",
            studentNote: s.answer || "Completed assignment following BNBC guidelines.",
            submittedAt: s.submittedAt ? new Date(s.submittedAt).toLocaleDateString() : "Today",
            files: [
              {
                name: "Project_Model.rvt",
                size: "42.8 MB",
                type: "RVT",
                url: s.fileUrl || "#",
              },
            ],
            score: s.marks ?? null,
            feedback: s.feedback || "",
            status: s.status === "reviewed" ? "Graded" : "Pending",
          }));
          setSubmissions(apiSubs);
        }
      } catch {}
    })();
  }, []);

  return (
    <div key={instructorTab} className="animate-fade-in-up space-y-8 font-sans">
      {instructorTab === "overview" && (
        <InstructorOverviewTab
          currentUser={currentUser}
          batches={batches}
          submissions={submissions}
          onNavigateToLive={() => setInstructorTab("batches")}
          onNavigateToGrading={() => setInstructorTab("grading")}
        />
      )}

      {(instructorTab === "batches" || instructorTab === "live_host") && (
        <InstructorBatchesTab batches={batches} />
      )}

      {instructorTab === "grading" && (
        <InstructorGradingTab submissions={submissions} />
      )}

      {instructorTab === "materials" && <InstructorMaterialsTab />}

      {instructorTab === "profile" && <InstructorProfileTab currentUser={currentUser} />}
    </div>
  );
}
