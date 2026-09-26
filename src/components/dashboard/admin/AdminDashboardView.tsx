"use client";

import React, { useState, useEffect } from "react";
import { AdminDashboardTab, PendingApproval } from "@/types/dashboard";
import AdminOverviewTab from "./AdminOverviewTab";
import AdminAdmissionsTab from "./AdminAdmissionsTab";
import AdminStudentsTab from "./AdminStudentsTab";
import AdminInstructorsTab from "./AdminInstructorsTab";
import AdminBatchesTab from "./AdminBatchesTab";
import AdminRecordingsTab from "./AdminRecordingsTab";
import AdminModulesTab from "./AdminModulesTab";
import AdminCouponsTab from "./AdminCouponsTab";
import AdminRevenueTab from "./AdminRevenueTab";
import AdminSettingsTab from "./AdminSettingsTab";
import AdminCreateBatchModal from "./AdminCreateBatchModal";
import { AdminBatch } from "@/data/adminMockData";

export default function AdminDashboardView({ adminTab, setAdminTab }: { adminTab: AdminDashboardTab; setAdminTab: (tab: AdminDashboardTab) => void }) {
  const [isCreateBatchModalOpen, setIsCreateBatchModalOpen] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
        const res = await enrollmentsApi.getAllEnrollments({ limit: 50 });
        if (res.statusCode === 200 && res.data?.items) {
          const apiApprovals: PendingApproval[] = res.data.items.map((e) => ({
            id: e.id,
            name: e.student?.name || "Student",
            course: e.batch?.course?.title || e.batch?.name || "BIM Engineering Course",
            method: e.paid_amount ? `Direct (৳${e.paid_amount})` : "Manual Entry",
            amount: `৳${(e.paid_amount || e.total_amount).toLocaleString()}`,
            phone: e.student?.phone || "N/A",
            status: e.status === "active" ? "Approved" : e.status === "cancelled" ? "Rejected" : "Pending",
            batch: e.batch?.name,
            email: e.student?.email,
            totalFee: `৳${e.total_amount?.toLocaleString()}`,
            advancePaid: `৳${(e.paid_amount || 0).toLocaleString()}`,
            dueAmount: `৳${Math.max(0, (e.total_amount || 0) - (e.paid_amount || 0)).toLocaleString()}`,
          }));
          setPendingApprovals(apiApprovals);
        }
      } catch {}
    })();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
      await enrollmentsApi.updateEnrollment(id, { discount_amount: 0 });
    } catch {}
    setPendingApprovals((prev) => prev.map((item) => (item.id === id ? { ...item, status: "Approved" } : item)));
  };

  const handleReject = async (id: string) => {
    try {
      const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
      await enrollmentsApi.deleteEnrollment(id);
    } catch {}
    setPendingApprovals((prev) => prev.map((item) => (item.id === id ? { ...item, status: "Rejected" } : item)));
  };

  return (
    <div key={adminTab} className="animate-fade-in-up space-y-8 font-sans">
      {adminTab === "overview" && (
        <AdminOverviewTab pendingApprovals={pendingApprovals} onApprove={handleApprove} onReject={handleReject} onNavigateToAdmissions={() => setAdminTab("admissions")} onOpenCreateBatch={() => setIsCreateBatchModalOpen(true)} />
      )}
      {adminTab === "admissions" && <AdminAdmissionsTab pendingApprovals={pendingApprovals} onApprove={handleApprove} onReject={handleReject} />}
      {adminTab === "students" && <AdminStudentsTab />}
      {adminTab === "instructors" && <AdminInstructorsTab />}
      {adminTab === "batches" && <AdminBatchesTab />}
      {adminTab === "recordings" && <AdminRecordingsTab />}
      {adminTab === "modules" && <AdminModulesTab />}
      {adminTab === "coupons" && <AdminCouponsTab />}
      {adminTab === "revenue" && <AdminRevenueTab />}
      {adminTab === "settings" && <AdminSettingsTab />}
      <AdminCreateBatchModal isOpen={isCreateBatchModalOpen} onClose={() => setIsCreateBatchModalOpen(false)} onCreate={(newBatch: AdminBatch) => alert(`Batch ${newBatch.name} (${newBatch.code}) launched!`)} />
    </div>
  );
}
