"use client";

import React, { useState } from "react";
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

interface AdminDashboardViewProps {
  adminTab: AdminDashboardTab;
  setAdminTab: (tab: AdminDashboardTab) => void;
}

export default function AdminDashboardView({
  adminTab,
  setAdminTab,
}: AdminDashboardViewProps) {
  const [isCreateBatchModalOpen, setIsCreateBatchModalOpen] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([
    {
      id: "ADM-901",
      name: "Md. Tanvir Ahmed",
      course: "Professional Tekla Steel Detailing",
      method: "bKash (TrxID: 9J87K65LM4)",
      amount: "৳4,000 (1st Installment)",
      phone: "+880 1711-223344",
      status: "Pending",
    },
    {
      id: "ADM-902",
      name: "Sabbir Hossain",
      course: "Revit Architecture + Structure",
      method: "Nagad (TrxID: 8K72M90P11)",
      amount: "৳4,000 (1st Installment)",
      phone: "+880 1822-334455",
      status: "Pending",
    },
    {
      id: "ADM-903",
      name: "Engr. Farhana Yesmin",
      course: "Complete BIM Combo (Revit+Tekla+Navisworks)",
      method: "SSLCommerz (Card)",
      amount: "৳12,000 (Full Fee)",
      phone: "+880 1933-445566",
      status: "Approved",
    },
  ]);

  const handleApprove = (id: string) => {
    setPendingApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Approved" } : item))
    );
  };

  const handleReject = (id: string) => {
    setPendingApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Rejected" } : item))
    );
  };

  return (
    <div key={adminTab} className="animate-fade-in-up space-y-8 font-sans">
      {adminTab === "overview" && (
        <AdminOverviewTab
          pendingApprovals={pendingApprovals}
          onApprove={handleApprove}
          onReject={handleReject}
          onNavigateToAdmissions={() => setAdminTab("admissions")}
          onOpenCreateBatch={() => setIsCreateBatchModalOpen(true)}
        />
      )}

      {adminTab === "admissions" && (
        <AdminAdmissionsTab
          pendingApprovals={pendingApprovals}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {adminTab === "students" && <AdminStudentsTab />}

      {adminTab === "instructors" && <AdminInstructorsTab />}

      {adminTab === "batches" && <AdminBatchesTab />}

      {adminTab === "recordings" && <AdminRecordingsTab />}

      {adminTab === "modules" && <AdminModulesTab />}

      {adminTab === "coupons" && <AdminCouponsTab />}

      {adminTab === "revenue" && <AdminRevenueTab />}

      {adminTab === "settings" && <AdminSettingsTab />}

      <AdminCreateBatchModal
        isOpen={isCreateBatchModalOpen}
        onClose={() => setIsCreateBatchModalOpen(false)}
        onCreate={(newBatch: AdminBatch) => {
          alert(`Batch ${newBatch.name} (${newBatch.code}) launched successfully!`);
        }}
      />
    </div>
  );
}
