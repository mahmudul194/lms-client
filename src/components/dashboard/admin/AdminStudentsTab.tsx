"use client";

import React, { useState } from "react";
import { Users, Search, Mail, Phone, Shield } from "lucide-react";
import { MOCK_ADMIN_STUDENTS, AdminStudent } from "@/data/adminMockData";

export default function AdminStudentsTab() {
  const [students, setStudents] = useState<AdminStudent[]>(MOCK_ADMIN_STUDENTS);
  const [search, setSearch] = useState("");

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#0077b6]" />
            <span>Enrolled Students Database</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Search student profiles, monitor installment statuses, and batch assignments
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold w-fit">
          {students.length} Active Records
        </span>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by student name, roll, phone or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:border-[#0077b6] focus:outline-none"
        />
      </div>

      {/* Student Database Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
            <tr>
              <th className="p-4">Student & Roll No</th>
              <th className="p-4">Enrolled Course & Batch</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">Fee Paid</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4">
                  <strong className="text-slate-900 block font-extrabold">{s.name}</strong>
                  <span className="text-xs text-[#0077b6] font-semibold font-bold">{s.roll}</span>
                </td>
                <td className="p-4">
                  <span className="font-semibold text-slate-800 block">{s.course}</span>
                  <span className="text-xs text-slate-500">{s.batch}</span>
                </td>
                <td className="p-4 space-y-0.5">
                  <span className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Mail className="w-3 h-3 text-slate-400" /> {s.email}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
                    <Phone className="w-3 h-3 text-slate-400" /> {s.phone}
                  </span>
                </td>
                <td className="p-4 font-semibold">
                  <strong className="text-slate-900 block font-bold">{s.paidAmount}</strong>
                  <span className="text-[11px] text-slate-400">of {s.totalFee}</span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
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
                    onClick={() => alert(`Viewing full academic profile for ${s.name}`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Profile
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
