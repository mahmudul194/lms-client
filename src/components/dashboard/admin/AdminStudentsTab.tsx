"use client";

import React, { useState } from "react";
import { Users, Search, Mail, Phone } from "lucide-react";
import { MOCK_ADMIN_STUDENTS, AdminStudent } from "@/data/adminMockData";

export default function AdminStudentsTab() {
  const [students, setStudents] = useState<AdminStudent[]>(MOCK_ADMIN_STUDENTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search) ||
      s.course.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || s.paymentStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#0077b6]" />
            <span>Enrolled Students Directory</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Search student profiles, monitor installment dues, and review enrolled programs
          </p>
        </div>
        <span className="px-4 py-1.5 rounded-full bg-sky-50 text-[#0077b6] text-xs sm:text-sm font-bold border border-sky-200 w-fit">
          {students.length} Active Records
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, roll, phone or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-[#0077b6] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "Paid", "Due"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === status
                  ? "bg-[#002b5b] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {status === "all" ? "All Status" : status}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Student & Roll No</th>
              <th className="p-4">Enrolled Course & Batch</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">Fee Paid</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <strong className="text-slate-900 block font-bold text-sm sm:text-base">{s.name}</strong>
                  <span className="text-xs text-[#0077b6] font-bold">{s.roll}</span>
                </td>
                <td className="p-4">
                  <span className="font-semibold text-slate-800 block">{s.course}</span>
                  <span className="text-xs text-slate-500 font-medium">{s.batch}</span>
                </td>
                <td className="p-4 space-y-1">
                  <span className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> {s.email}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {s.phone}
                  </span>
                </td>
                <td className="p-4">
                  <strong className="text-slate-900 block font-black text-sm sm:text-base">{s.paidAmount}</strong>
                  <span className="text-xs text-slate-500 font-medium">of {s.totalFee}</span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      s.paymentStatus === "Paid"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {s.paymentStatus}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => alert(`Academic Profile: ${s.name} (${s.roll})\nCourse: ${s.course}\nPaid: ${s.paidAmount}`)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#0077b6] hover:text-white text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
