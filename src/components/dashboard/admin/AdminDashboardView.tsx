"use client";

import React, { useState, useEffect } from "react";
import { AdminDashboardTab, PendingApproval } from "@/types/dashboard";
import AdminOverviewTab from "./AdminOverviewTab";
import AdminAdmissionsTab from "./AdminAdmissionsTab";
import AdminStudentsTab from "./AdminStudentsTab";
import AdminInstructorsTab from "./AdminInstructorsTab";
import AdminBatchesTab from "./AdminBatchesTab";
import AdminModulesTab from "./AdminModulesTab";
import AdminLessonsTab from "./AdminLessonsTab";
import AdminCouponsTab from "./AdminCouponsTab";
import AdminAssignmentsTab from "./AdminAssignmentsTab";
import AdminResourcesTab from "./AdminResourcesTab";
import AdminCertificatesTab from "./AdminCertificatesTab";
import AdminRevenueTab from "./AdminRevenueTab";
import AdminSettingsTab from "./AdminSettingsTab";
import AdminCategoriesTab from "./AdminCategoriesTab";
import AdminCoursesTab from "./AdminCoursesTab";
import AdminCreateBatchModal from "./AdminCreateBatchModal";
import { CreateBatchPayload } from "@/services/api/batchesApi";

export default function AdminDashboardView({ adminTab, setAdminTab }: { adminTab: AdminDashboardTab; setAdminTab: (tab: AdminDashboardTab) => void }) {
  const [isCreateBatchModalOpen, setIsCreateBatchModalOpen] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
        const res = await enrollmentsApi.getAllEnrollments({ limit: 50 });
        if (res.statusCode === 200 && res.data?.items) {
          const apiApprovals: PendingApproval[] = res.data.items.map((e) => {
            const total = Number(e.total_amount) || 0;
            const paid = Number(e.paid_amount) || 0;
            const due = Math.max(0, total - paid);
            
            return {
              id: e.id,
              name: e.student?.name || "Student",
              course: e.batch?.course?.title || e.batch?.name || "BIM Engineering Course",
              method: e.paid_amount ? `Direct (৳${paid})` : "Manual Entry",
              amount: `৳${(paid || total).toLocaleString()}`,
              phone: e.student?.phone || "N/A",
              status: e.status?.toLowerCase() === "active" ? "Approved" : e.status?.toLowerCase() === "cancelled" ? "Rejected" : "Pending",
              batch: e.batch?.name,
              email: e.student?.email,
              totalFee: `৳${total.toLocaleString()}`,
              advancePaid: `৳${paid.toLocaleString()}`,
              dueAmount: `৳${due.toLocaleString()}`,
            };
          });
          setPendingApprovals(apiApprovals);
        }
      } catch { }
    })();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
      await enrollmentsApi.updateEnrollment(id, { status: "active" });
    } catch { }
    setPendingApprovals((prev) => prev.map((item) => (item.id === id ? { ...item, status: "Approved" } : item)));
  };

  const handleReject = async (id: string) => {
    try {
      const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
      await enrollmentsApi.updateEnrollment(id, { status: "cancelled" });
    } catch { }
    setPendingApprovals((prev) => prev.map((item) => (item.id === id ? { ...item, status: "Rejected" } : item)));
  };

  const handleLaunchBatch = async (newBatch: CreateBatchPayload) => {
    try {
      const { batchesApi } = await import("@/services/api/batchesApi");
      await batchesApi.createBatch({
        course_id: newBatch.course_id,
        name: newBatch.name,
        code: newBatch.code,
        capacity: newBatch.capacity,
        mode: newBatch.mode,
        class_type: newBatch.class_type,
        price: newBatch.price,
        discount_price: newBatch.discount_price,
        start_date: newBatch.start_date,
        end_date: newBatch.end_date,
        registration_start: newBatch.registration_start,
        registration_end: newBatch.registration_end,
      });
    } catch { }
    alert(`Batch ${newBatch.name} (${newBatch.code}) launched!`);
  };

  return (
    <div key={adminTab} className="animate-fade-in-up space-y-8 font-sans">
      {adminTab === "overview" && (
        <AdminOverviewTab pendingApprovals={pendingApprovals} onApprove={handleApprove} onReject={handleReject} onNavigateToAdmissions={() => setAdminTab("admissions")} onOpenCreateBatch={() => setIsCreateBatchModalOpen(true)} />
      )}
      {adminTab === "admissions" && <AdminAdmissionsTab pendingApprovals={pendingApprovals} onApprove={handleApprove} onReject={handleReject} />}
      {adminTab === "students" && <AdminStudentsTab />}
      {adminTab === "instructors" && <AdminInstructorsTab />}
      {adminTab === "categories" && <AdminCategoriesTab />}
      {adminTab === "courses" && <AdminCoursesTab />}
      {adminTab === "batches" && <AdminBatchesTab />}
      {adminTab === "modules" && <AdminModulesTab />}
      {adminTab === "lessons" && <AdminLessonsTab />}
      {adminTab === "assignments" && <AdminAssignmentsTab />}
      {adminTab === "resources" && <AdminResourcesTab />}
      {adminTab === "certificates" && <AdminCertificatesTab />}
      {adminTab === "coupons" && <AdminCouponsTab />}
      {adminTab === "revenue" && <AdminRevenueTab />}
      {adminTab === "settings" && <AdminSettingsTab />}
      <AdminCreateBatchModal isOpen={isCreateBatchModalOpen} onClose={() => setIsCreateBatchModalOpen(false)} onCreate={handleLaunchBatch} />
    </div>
  );
}
