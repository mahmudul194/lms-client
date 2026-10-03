"use client";

import React, { useState, useEffect } from "react";
import { UserAccount } from "@/data/dummyAccounts";
import { InstructorDashboardTab } from "@/types/dashboard";
import { StudentSubmission } from "@/data/instructorMockData";
import { BatchItem } from "@/services/api/batchesApi";
import InstructorOverviewTab from "./InstructorOverviewTab";
import InstructorBatchesTab from "./InstructorBatchesTab";
import InstructorGradingTab from "./InstructorGradingTab";
import InstructorMaterialsTab from "./InstructorMaterialsTab";
import InstructorProfileTab from "./InstructorProfileTab";
import AdminResourcesTab from "../admin/AdminResourcesTab";

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
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { batchesApi } = await import("@/services/api/batchesApi");
        // We might need to filter by mentor if the backend doesn't, but for now we fetch batches
        const res = await batchesApi.getAllBatches({ 
          limit: 50, 
          mentor_id: (currentUser as any).id,
          // You could also filter by status: 'ongoing' here if needed
        });
        if (res.statusCode === 200 && res.data?.items) {
          const activeBatches = res.data.items.filter(
            (b: BatchItem) => b.status === "ongoing" || b.status === "upcoming"
          );
          setBatches(activeBatches);
        }
      } catch {}

      try {
        const { assignmentsApi } = await import("@/services/api/assignmentsApi");
        const res = await assignmentsApi.getAllAssignments({ limit: 50, mentorId: (currentUser as any).id });
        if (res.statusCode === 200 && res.data?.items) {
          setAssignments(res.data.items);
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
        <InstructorGradingTab 
          submissions={submissions} 
          batches={batches} 
          assignments={assignments}
          onAssignmentCreated={(newA) => setAssignments(prev => [newA, ...prev])}
        />
      )}

      {instructorTab === "materials" && <InstructorMaterialsTab batches={batches} />}

      {instructorTab === "resources" && <AdminResourcesTab batches={batches} />}

      {instructorTab === "profile" && <InstructorProfileTab currentUser={currentUser} />}
    </div>
  );
}
