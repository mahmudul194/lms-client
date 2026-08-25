"use client";

import React from "react";
import { CheckCircle2, Award, Calendar, Users } from "lucide-react";
import { CatalogCourse } from "@/data/coursesCatalog20";

interface AdminBatchHistoryTableProps {
  course: CatalogCourse;
}

export default function AdminBatchHistoryTable({ course }: AdminBatchHistoryTableProps) {
  const pastBatches = [
    { batch: "7th Batch", startDate: "Mar 2026", endDate: "Jul 2026", students: 50, certified: 48, rating: 4.9 },
    { batch: "6th Batch", startDate: "Nov 2025", endDate: "Feb 2026", students: 48, certified: 46, rating: 4.85 },
    { batch: "5th Batch", startDate: "Jul 2025", endDate: "Oct 2025", students: 45, certified: 44, rating: 4.9 },
    { batch: "4th Batch", startDate: "Mar 2025", endDate: "Jun 2025", students: 42, certified: 40, rating: 4.8 },
    { batch: "3rd Batch", startDate: "Nov 2024", endDate: "Feb 2025", students: 40, certified: 39, rating: 4.85 },
    { batch: "2nd Batch", startDate: "Jul 2024", endDate: "Oct 2024", students: 38, certified: 36, rating: 4.75 },
    { batch: "1st Batch", startDate: "Mar 2024", endDate: "Jun 2024", students: 35, certified: 34, rating: 4.8 },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-base sm:text-lg font-black text-slate-900">
            Historical Completed Batches (1st to 7th Batch Archives)
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Full records of previous students who graduated and received verified certificates for {course.name}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
          7 Completed Batches (298 Alumni)
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Batch Cohort</th>
              <th className="p-4">Duration & Timeline</th>
              <th className="p-4">Graduated Students</th>
              <th className="p-4">Certificates Issued</th>
              <th className="p-4">Batch Rating</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {pastBatches.map((b, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <strong className="text-slate-900 block font-bold">{b.batch}</strong>
                  <span className="text-xs text-slate-500 font-normal">Lead: {course.instructor}</span>
                </td>
                <td className="p-4 text-slate-600">
                  <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /><span>{b.startDate} – {b.endDate}</span></div>
                </td>
                <td className="p-4">
                  <strong className="text-slate-900 font-bold">{b.students} Students</strong>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <Award className="w-4 h-4 text-emerald-600" /> {b.certified} QR Verified
                  </span>
                </td>
                <td className="p-4 font-black text-amber-800">
                  ★ {b.rating}
                </td>
                <td className="p-4 text-right">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    Archived & Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
