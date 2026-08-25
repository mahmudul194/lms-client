"use client";

import React from "react";
import { Plus, ArrowRight, ShieldCheck, CreditCard, UserPlus, Tag, Layers, Sparkles } from "lucide-react";
import { PendingApproval } from "@/types/dashboard";
import AdminMetricsGrid from "./AdminMetricsGrid";
import AdminPaymentQueueTable from "./AdminPaymentQueueTable";

interface AdminOverviewTabProps {
  pendingApprovals: PendingApproval[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onNavigateToAdmissions: () => void;
  onOpenCreateBatch: () => void;
}

export default function AdminOverviewTab({
  pendingApprovals,
  onApprove,
  onReject,
  onNavigateToAdmissions,
  onOpenCreateBatch,
}: AdminOverviewTabProps) {
  const pendingCount = pendingApprovals.filter((p) => p.status === "Pending").length;

  return (
    <div className="space-y-8 font-sans">
      {/* Super Admin Control Banner */}
      <div className="bg-gradient-to-r from-[#002b5b] via-[#003b7a] to-[#0077b6] rounded-3xl text-white p-7 sm:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-sky-100 text-xs sm:text-sm font-bold backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Super Admin & Financial Command Center</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
            BIM Build BD LMS Administration
          </h2>
          <p className="text-sm sm:text-base text-sky-100 font-medium">
            You have <strong className="text-amber-300 font-bold">{pendingCount} Pending TrxID Approvals</strong> requiring manual bank/bKash verification.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCreateBatch}
            className="px-6 py-3.5 rounded-2xl bg-white text-[#002b5b] hover:bg-sky-50 font-black text-sm flex items-center gap-2 shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            <Plus className="w-4 h-4 text-[#0077b6]" />
            <span>Launch Batch</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metrics */}
      <AdminMetricsGrid />

      {/* Quick Action Navigation Strip */}
      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/90 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#0077b6]" />
          <span className="text-sm font-extrabold text-slate-800">Quick LMS Actions:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenCreateBatch}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#002b5b] hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#0077b6]" />
            <span>New Batch</span>
          </button>
          <button
            onClick={onNavigateToAdmissions}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#002b5b] hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-emerald-600" />
            <span>Manual Admission</span>
          </button>
          <button
            onClick={onNavigateToAdmissions}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#002b5b] hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <CreditCard className="w-4 h-4 text-amber-600" />
            <span>Verify Payments</span>
          </button>
        </div>
      </div>

      {/* Pending Admission TrxID Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-[#0077b6]" />
            <span>Admission TrxID Verification Queue</span>
          </h3>
          <button
            onClick={onNavigateToAdmissions}
            className="text-xs sm:text-sm text-[#0077b6] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Full Admission Queue ({pendingApprovals.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <AdminPaymentQueueTable
          pendingApprovals={pendingApprovals}
          onApprove={onApprove}
          onReject={onReject}
        />
      </div>
    </div>
  );
}
