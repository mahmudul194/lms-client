"use client";

import React, { useState } from "react";
import { CreditCard, Search, UserPlus, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { PendingApproval } from "@/types/dashboard";
import AdminPaymentQueueTable from "./AdminPaymentQueueTable";
import AdminManualAdmissionModal from "./AdminManualAdmissionModal";
import AdminInvoiceModal from "./AdminInvoiceModal";
import AdminInstallmentsModal from "./AdminInstallmentsModal";

interface AdminAdmissionsTabProps {
  pendingApprovals: PendingApproval[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onManualEnroll?: (approval: PendingApproval) => void;
}

export default function AdminAdmissionsTab({
  pendingApprovals,
  onApprove,
  onReject,
  onManualEnroll,
}: AdminAdmissionsTabProps) {
  const [filter, setFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [search, setSearch] = useState("");
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [installmentsId, setInstallmentsId] = useState<string | null>(null);
  const [localApprovals, setLocalApprovals] = useState<PendingApproval[]>(pendingApprovals);

  React.useEffect(() => {
    setLocalApprovals(pendingApprovals);
  }, [pendingApprovals]);

  const handleEnrollStudent = (newApproval: PendingApproval) => {
    setLocalApprovals((prev) => [newApproval, ...prev]);
    if (onManualEnroll) onManualEnroll(newApproval);
  };

  const handleApproveLocal = (id: string) => {
    setLocalApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Approved" } : a))
    );
    onApprove(id);
  };

  const handleRejectLocal = (id: string) => {
    setLocalApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a))
    );
    onReject(id);
  };

  const filtered = localApprovals.filter((item) => {
    const matchesFilter = filter === "All" ? true : item.status === filter;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.method.toLowerCase().includes(search.toLowerCase()) ||
      (item.course && item.course.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#0077b6]" />
            <span>Admissions & Payment Verification Queue</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Verify manual TrxIDs, calculate advance vs due fees, and enroll offline students directly
          </p>
        </div>

        <button
          onClick={() => setIsManualModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0"
        >
          <UserPlus className="w-4 h-4 text-sky-300" />
          <span>+ Manual Admission & TrxID</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by student name, phone, course or TrxID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:border-[#0077b6] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {(["All", "Pending", "Approved", "Rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === tab
                  ? "bg-[#002b5b] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Subcomponent */}
      <AdminPaymentQueueTable
        pendingApprovals={filtered}
        onApprove={handleApproveLocal}
        onReject={handleRejectLocal}
        onViewInvoice={(id) => setInvoiceId(id)}
        onViewInstallments={(id) => setInstallmentsId(id)}
      />

      <AdminManualAdmissionModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        onEnroll={handleEnrollStudent}
      />

      <AdminInstallmentsModal
        isOpen={!!installmentsId}
        onClose={() => setInstallmentsId(null)}
        enrollmentId={installmentsId || ""}
      />
    </div>
  );
}
