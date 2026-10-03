"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Users, Search, Mail, Phone, Plus, RotateCcw, X, GraduationCap, ShieldCheck, ShieldAlert, Eye, Ban, Trash2 } from "lucide-react";
import AdminStudentDetails from "./AdminStudentDetails";
import AdminAddStudentView from "./AdminAddStudentView";
import AdminUserStatusModal from "./AdminUserStatusModal";
import AdminDeleteConfirmModal from "./AdminDeleteConfirmModal";
import { studentsApi, StudentRecord } from "@/services/api/studentsApi";

export default function AdminStudentsTab() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [banningStudent, setBanningStudent] = useState<StudentRecord | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<StudentRecord | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await studentsApi.getAllStudents({ limit: 1000 });
      if (res.statusCode === 200 && res.data?.items) {
        setStudents(res.data.items);
      }
    } catch (err) {
      console.error("Failed to load students", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleToggleBanStudent = async () => {
    if (!banningStudent) return;
    const isBanned = !!banningStudent.user?.isBanned;
    if (isBanned) {
      await studentsApi.unbanStudent(banningStudent.id);
    } else {
      await studentsApi.banStudent(banningStudent.id);
    }
    await fetchStudents();
  };

  const handleDeleteStudent = async () => {
    if (!deletingStudent) return;
    await studentsApi.deleteStudent(deletingStudent.id);
    await fetchStudents();
  };

  // Compute unique departments from loaded student records
  const departmentsList = useMemo(() => {
    const deps = new Set<string>();
    students.forEach((s) => {
      if (s.department && s.department.trim()) {
        deps.add(s.department.trim());
      }
    });
    return Array.from(deps).sort();
  }, [students]);

  // Filtering logic
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return students.filter((s) => {
      // Role check: must be student or default
      const isStudent = !s.role || s.role.toLowerCase() === "student" || s.user?.role?.toLowerCase() === "student";
      if (!isStudent) return false;

      // Department filter
      if (selectedDepartment !== "all") {
        if (!s.department || s.department.trim().toLowerCase() !== selectedDepartment.toLowerCase()) {
          return false;
        }
      }

      // Semester filter
      if (selectedSemester !== "all") {
        if (String(s.semester) !== selectedSemester) {
          return false;
        }
      }

      // Account Status filter
      if (selectedStatus !== "all") {
        const isBanned = !!s.user?.isBanned;
        if (selectedStatus === "banned" && !isBanned) return false;
        if (selectedStatus === "active" && isBanned) return false;
      }

      // Search keyword filter
      if (q) {
        const matchSearch =
          (s.name || "").toLowerCase().includes(q) ||
          (s.email || "").toLowerCase().includes(q) ||
          (s.phone || "").includes(q) ||
          (s.department || "").toLowerCase().includes(q) ||
          (s.roll || "").toLowerCase().includes(q) ||
          (s.registrationNumber || "").toLowerCase().includes(q) ||
          (s.institute || "").toLowerCase().includes(q);
        if (!matchSearch) return false;
      }

      return true;
    });
  }, [students, search, selectedDepartment, selectedSemester, selectedStatus]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedDepartment("all");
    setSelectedSemester("all");
    setSelectedStatus("all");
  };

  const isFiltered = search !== "" || selectedDepartment !== "all" || selectedSemester !== "all" || selectedStatus !== "all";

  if (isAddingStudent) {
    return (
      <AdminAddStudentView
        onBack={() => setIsAddingStudent(false)}
        onAdd={(newStudent: any) => {
          setStudents((prev) => [newStudent, ...prev]);
        }}
      />
    );
  }

  if (selectedStudent) {
    return (
      <AdminStudentDetails
        student={selectedStudent}
        onBack={() => {
          setSelectedStudent(null);
          fetchStudents();
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#0077b6]" />
            <span>Students Directory</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Directory of all registered students, enrollment status and academic details</p>
        </div>

        <button
          onClick={() => setIsAddingStudent(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 bg-slate-50/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, roll, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium text-slate-900"
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium text-slate-700 cursor-pointer"
            >
              <option value="all">All Departments</option>
              {departmentsList.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium text-slate-700 cursor-pointer"
            >
              <option value="all">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={String(sem)}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          {/* Account Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium text-slate-700 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active Accounts</option>
              <option value="banned">Banned / Restricted</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Action */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
          <span className="font-extrabold text-[#0077b6] bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200">
            {filtered.length} Students Found
          </span>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Student Details</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">Department & Institute</th>
              <th className="p-4">Semester</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500 font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#0077b6] border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading student records...</span>
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-10 text-center text-slate-500 font-medium space-y-2">
                  <p className="text-sm font-bold text-slate-700">
                    {isFiltered ? "No students match the selected filter criteria." : "No registered students found."}
                  </p>
                  {isFiltered && (
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-1.5 rounded-xl bg-sky-50 text-[#0077b6] hover:bg-sky-100 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear All Filters</span>
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              filtered.map((s) => {
                const isBanned = !!s.user?.isBanned;

                return (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-black text-sm border border-sky-200 shrink-0">
                          {s.name
                            ? s.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()
                            : "ST"}
                        </div>
                        <div>
                          <strong className="text-slate-900 block font-bold text-sm">{s.name}</strong>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            {s.roll && <span>Roll: {s.roll}</span>}
                            {s.registrationNumber && <span>Reg: {s.registrationNumber}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 space-y-1">
                      <span className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {s.email || "N/A"}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {s.phone || "N/A"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-800 block">{s.department || "N/A"}</span>
                      {s.institute && <span className="text-xs text-slate-500 block truncate max-w-[200px]">{s.institute}</span>}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                        {s.semester ? `Semester ${s.semester}` : "N/A"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          isBanned
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {isBanned ? (
                          <>
                            <ShieldAlert className="w-3.5 h-3.5" /> Banned
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-3.5 h-3.5" /> Active
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedStudent(s)}
                          className="p-2 text-slate-400 hover:text-[#0077b6] hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                          title="View Student Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setBanningStudent(s)}
                          className={`p-2 rounded-lg transition-colors cursor-pointer ${
                            isBanned
                              ? "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                              : "text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                          }`}
                          title={isBanned ? "Reactivate Student" : "Ban Student"}
                        >
                          {isBanned ? <ShieldCheck className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setDeletingStudent(s)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Student Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Ban / Unban Modal */}
      <AdminUserStatusModal
        isOpen={!!banningStudent}
        userName={banningStudent?.name}
        userRole="Student"
        isCurrentlyBanned={!!banningStudent?.user?.isBanned}
        onClose={() => setBanningStudent(null)}
        onConfirm={handleToggleBanStudent}
      />

      {/* Delete Confirmation Modal */}
      <AdminDeleteConfirmModal
        isOpen={!!deletingStudent}
        title="Delete Student Record"
        itemName={deletingStudent?.name}
        message="Are you sure you want to permanently delete this student record? All related admissions, payments, and submissions will be removed."
        confirmText="Delete Student"
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleDeleteStudent}
      />
    </div>
  );
}
