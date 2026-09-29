"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Mail, Phone, Plus } from "lucide-react";
import AdminStudentDetails from "./AdminStudentDetails";
import AdminAddStudentView from "./AdminAddStudentView";

export default function AdminStudentsTab() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { studentsApi } = await import("@/services/api/studentsApi");
        const res = await studentsApi.getAllStudents({ limit: 100 });
        if (res.statusCode === 200 && res.data?.items) {
          setStudents(res.data.items);
        }
      } catch { } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filter for students only based on role and search terms
  const filtered = students.filter((s) => {
    const isStudent = s.role?.toLowerCase() === "student" || s.user?.role?.toLowerCase() === "student";
    if (!isStudent) return false;

    const matchSearch = (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.phone || "").includes(search) ||
      (s.department || "").toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  if (isAddingStudent) {
    return (
      <AdminAddStudentView
        onBack={() => setIsAddingStudent(false)}
        onAdd={(newStudent) => {
          setStudents((prev) => [newStudent, ...prev]);
        }}
      />
    );
  }

  if (selectedStudent) {
    return <AdminStudentDetails student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#0077b6]" />
            <span>Students Directory</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Directory of all registered students</p>
        </div>

        <button
          onClick={() => setIsAddingStudent(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-bold text-sm transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Add New Student
        </button>

      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-[#0077b6] focus:outline-none"
          />
        </div>

        <span className="px-4 py-1.5 rounded-full bg-sky-50 text-[#0077b6] text-xs sm:text-sm font-bold border border-sky-200 w-fit">
          {filtered.length} Students
        </span>

      </div>


      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">Department</th>
              <th className="p-4">Semester</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">Loading students...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">No students found.</td></tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4"><strong className="text-slate-900 block font-bold">{s.name}</strong></td>
                  <td className="p-4 space-y-1">
                    <span className="flex items-center gap-1.5 text-xs text-slate-600"><Mail className="w-3.5 h-3.5 text-slate-400" /> {s.email || "N/A"}</span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-600"><Phone className="w-3.5 h-3.5 text-slate-400" /> {s.phone || "N/A"}</span>
                  </td>
                  <td className="p-4"><span className="font-semibold text-slate-800">{s.department || "N/A"}</span></td>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">{s.semester ? `Semester ${s.semester}` : "N/A"}</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => setSelectedStudent(s)} className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#0077b6] hover:text-white text-slate-700 font-bold text-xs transition-colors cursor-pointer">
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
