import React from "react";
import Link from "next/link";

export default function TermsConditionsPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 font-medium">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-semibold">Terms & Conditions</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Terms & Conditions</h1>
        <p className="text-xs text-slate-500 font-semibold">Last Updated: August 2026</p>

        <section className="space-y-2 pt-2">
          <h2 className="text-base font-bold text-slate-900">1. Course Access & Intellectual Property</h2>
          <p className="leading-relaxed">
            Enrolled students are granted personalized access to live classes, recorded HD backups, Revit families, and drawing sheets solely for individual educational use. Redistribution, recording rebroadcast, or commercial resale of learning materials is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Installment Schedules & Grace Period</h2>
          <p className="leading-relaxed">
            Students utilizing the 3-month installment option agree to pay subsequent installment fees by their due dates (at 30 days and 60 days post-enrollment). A 7-day grace period is provided prior to any temporary portal lock.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Certificate Eligibility Criteria</h2>
          <p className="leading-relaxed">
            Official verifiable completion certificates are awarded to students who maintain at least 80% class attendance and achieve passing evaluations on required modeling assignments and the final capstone project.
          </p>
        </section>
      </div>
    </div>
  );
}
