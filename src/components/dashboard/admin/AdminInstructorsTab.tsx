"use client";

import React, { useState } from "react";
import { UserCheck, Search, Plus, Phone, Mail, Star } from "lucide-react";
import AdminAddInstructorModal from "./AdminAddInstructorModal";

export interface InstructorRecord {
  id: string;
  name: string;
  role: string;
  specialty: string;
  phone: string;
  email: string;
  batchesCount: number;
  studentsCount: number;
  rating: number;
  status: "Active" | "On Leave";
}

const INITIAL_INSTRUCTORS: InstructorRecord[] = [
  { id: "ins-1", name: "Engr. Ashikur Rahman", role: "Lead Structural BIM Specialist", specialty: "Revit Structure + Dynamo Automation", phone: "+880 1711-223344", email: "ashikur@bimbuildbd.com", batchesCount: 12, studentsCount: 2150, rating: 4.9, status: "Active" },
  { id: "ins-2", name: "Engr. Mojahedur Rahman", role: "Senior Tekla Detailing Specialist", specialty: "Tekla Structures + Steel Connections", phone: "+880 1722-334455", email: "mojahedur@bimbuildbd.com", batchesCount: 8, studentsCount: 1480, rating: 4.85, status: "Active" },
  { id: "ins-3", name: "Engr. Maidul Islam", role: "Lead Architectural & MEP Specialist", specialty: "Revit Architecture + MEP Coordination", phone: "+880 1733-445566", email: "maidul@bimbuildbd.com", batchesCount: 10, studentsCount: 1610, rating: 4.9, status: "Active" },
];

export default function AdminInstructorsTab() {
  const [instructors, setInstructors] = useState<InstructorRecord[]>(INITIAL_INSTRUCTORS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = instructors.filter((ins) =>
    ins.name.toLowerCase().includes(search.toLowerCase()) ||
    ins.specialty.toLowerCase().includes(search.toLowerCase()) ||
    ins.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddInstructor = (t: InstructorRecord) => setInstructors((p) => [t, ...p]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-[#0077b6]" />
            <span>Instructor & Mentor Management Directory</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Assigned lead BIM instructors, active live batches, student ratios & performance ratings
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Add New Trainer</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by trainer name, email or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-[#0077b6] focus:outline-none"
          />
        </div>
        <span className="px-4 py-1.5 rounded-full bg-sky-50 text-[#0077b6] text-xs sm:text-sm font-bold border border-sky-200 shrink-0">
          {filtered.length} Active Mentors
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Instructor & Designation</th>
              <th className="p-4">Technical Specialty</th>
              <th className="p-4">Batches</th>
              <th className="p-4">Students</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filtered.map((ins) => (
              <tr key={ins.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-black text-sm border border-sky-200 shrink-0">
                      {ins.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-black text-slate-900 text-sm sm:text-base">{ins.name}</div>
                      <div className="text-xs text-[#0077b6] font-bold mt-0.5">{ins.role}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs">
                    {ins.specialty}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-xl bg-sky-50 text-[#0077b6] text-xs font-bold border border-sky-200">
                    {ins.batchesCount} Batches
                  </span>
                </td>
                <td className="p-4 font-bold text-slate-800">
                  {ins.studentsCount.toLocaleString()}
                </td>
                <td className="p-4 font-extrabold text-amber-800">
                  ★ {ins.rating}
                </td>
                <td className="p-4 text-slate-600 text-xs space-y-1">
                  <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#0077b6]" /> {ins.phone}</div>
                  <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#0077b6]" /> {ins.email}</div>
                </td>
                <td className="p-4 text-right">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {ins.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminAddInstructorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddInstructor} />
    </div>
  );
}
