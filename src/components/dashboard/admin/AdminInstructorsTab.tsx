"use client";

import React, { useState, useEffect, useMemo } from "react";
import { UserCheck, Search, Plus, Phone, Mail, ChevronLeft, ChevronRight, Eye, RotateCcw, X, ShieldCheck, ShieldAlert, Award, Ban, Trash2 } from "lucide-react";
import AdminAddInstructorView from "./AdminAddInstructorView";
import AdminInstructorDetails from "./AdminInstructorDetails";
import AdminUserStatusModal from "./AdminUserStatusModal";
import AdminDeleteConfirmModal from "./AdminDeleteConfirmModal";
import { mentorsApi, MentorItem } from "@/services/api/mentorsApi";

export interface InstructorRecord {
  id: string;
  name: string;
  role: string;
  specialty: string;
  phone: string;
  email: string;
  status: "Active" | "Banned";
  rawData?: any;
}

export default function AdminInstructorsTab() {
  const [instructors, setInstructors] = useState<InstructorRecord[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [isAddingInstructor, setIsAddingInstructor] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<any | null>(null);
  const [banningInstructor, setBanningInstructor] = useState<MentorItem | null>(null);
  const [deletingInstructor, setDeletingInstructor] = useState<MentorItem | null>(null);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMentors, setTotalMentors] = useState(0);
  const limit = 10;
  const [isLoading, setIsLoading] = useState(false);

  const loadMentors = async (currentPage = page) => {
    setIsLoading(true);
    try {
      const res = await mentorsApi.getAllMentors({ page: currentPage, limit, search, role: 'mentor' });
      if (res.statusCode === 200 && res.data?.items) {
        const mentorItems = res.data.items.filter(m => m.user?.role === "mentor");
        
        const apiMentors: InstructorRecord[] = mentorItems.map((m) => ({
          id: m.id,
          name: m.user?.name || "Unknown",
          role: m.designation || "N/A",
          specialty: m.subject || m.skills?.join(", ") || "N/A",
          phone: m.user?.phone || "N/A",
          email: m.user?.email || "N/A",
          status: m.user?.isBanned ? "Banned" : "Active",
          rawData: m
        }));

        setInstructors(apiMentors);
        setTotalPages(res.data.totalPages || 1);
        setTotalMentors(res.data.total || mentorItems.length);
      }
    } catch (error) {
      console.error("Failed to fetch mentors", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMentors(page);
  }, [page, search]);

  const handleToggleBanInstructor = async () => {
    if (!banningInstructor) return;
    const isBanned = !!banningInstructor.user?.isBanned;
    if (isBanned) {
      await mentorsApi.unbanMentor(banningInstructor.id);
    } else {
      await mentorsApi.banMentor(banningInstructor.id);
    }
    await loadMentors(page);
  };

  const handleDeleteInstructor = async () => {
    if (!deletingInstructor) return;
    await mentorsApi.deleteMentor(deletingInstructor.id);
    await loadMentors(page);
  };

  // Compute unique specialties list
  const specialtiesList = useMemo(() => {
    const specs = new Set<string>();
    instructors.forEach((ins) => {
      if (ins.specialty && ins.specialty !== "N/A") {
        ins.specialty.split(",").forEach(s => {
          const trimmed = s.trim();
          if (trimmed) specs.add(trimmed);
        });
      }
    });
    return Array.from(specs).sort();
  }, [instructors]);

  // Client-side filtering for status and specialty
  const filteredInstructors = useMemo(() => {
    return instructors.filter((ins) => {
      if (selectedStatus === "active" && ins.status !== "Active") return false;
      if (selectedStatus === "banned" && ins.status !== "Banned") return false;

      if (selectedSpecialty !== "all") {
        if (!ins.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [instructors, selectedStatus, selectedSpecialty]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedStatus("all");
    setSelectedSpecialty("all");
    setPage(1);
  };

  const isFiltered = search !== "" || selectedStatus !== "all" || selectedSpecialty !== "all";

  if (selectedInstructor) {
    return (
      <AdminInstructorDetails 
        instructor={selectedInstructor} 
        onBack={() => {
          setSelectedInstructor(null);
          loadMentors(page);
        }} 
      />
    );
  }

  if (isAddingInstructor) {
    return (
      <AdminAddInstructorView
        onBack={() => setIsAddingInstructor(false)}
        onAdd={(ins) => {
          setInstructors([ins, ...instructors]);
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-[#0077b6]" />
            <span>Instructor & Mentor Management Directory</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Assigned lead BIM instructors, active live cohorts, and mentor directory</p>
        </div>
        <button onClick={() => setIsAddingInstructor(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0">
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Add New Trainer</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 bg-slate-50/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by name, email or specialty..." 
              value={search} 
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }} 
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium text-slate-900" 
            />
            {search && (
              <button 
                onClick={() => { setSearch(""); setPage(1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Specialty Filter */}
          <div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium text-slate-700 cursor-pointer"
            >
              <option value="all">All Specialties</option>
              {specialtiesList.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-[#0077b6] focus:outline-none font-medium text-slate-700 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active Mentors</option>
              <option value="banned">Banned Mentors</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Action */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
          <span className="font-extrabold text-[#0077b6] bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200">
            {filteredInstructors.length} Mentors Found
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

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Instructor & Designation</th>
              <th className="p-4">Technical Specialty</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#0077b6] border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading mentors...</span>
                  </div>
                </td>
              </tr>
            ) : filteredInstructors.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-slate-500 font-medium space-y-2">
                  <p className="text-sm font-bold text-slate-700">
                    {isFiltered ? "No mentors match the selected filter criteria." : "No instructors found in database."}
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
              filteredInstructors.map((ins) => (
                <tr key={ins.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-black text-sm border border-sky-200 shrink-0">
                        {ins.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-sm sm:text-base">{ins.name}</div>
                        <div className="text-xs text-[#0077b6] font-bold mt-0.5">{ins.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs inline-block max-w-[200px] truncate" title={ins.specialty}>
                      {ins.specialty}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 text-xs space-y-1">
                    <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#0077b6]" /> {ins.phone}</div>
                    <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#0077b6]" /> {ins.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      ins.status === "Active" 
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                        : "bg-rose-100 text-rose-800 border border-rose-200"
                    }`}>
                      {ins.status === "Active" ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                      <span>{ins.status}</span>
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => setSelectedInstructor(ins.rawData)} 
                        className="p-2 text-slate-400 hover:text-[#0077b6] hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                        title="View Trainer Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setBanningInstructor(ins.rawData)}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          ins.rawData?.user?.isBanned
                            ? "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                            : "text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                        }`}
                        title={ins.rawData?.user?.isBanned ? "Reactivate Trainer" : "Ban Trainer"}
                      >
                        {ins.rawData?.user?.isBanned ? <ShieldCheck className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setDeletingInstructor(ins.rawData)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Trainer Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-sm font-semibold text-slate-500">
            Showing Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => handlePageChange(page - 1)} 
              disabled={page === 1}
              className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${page === 1 ? 'border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed' : 'border-[#0077b6] text-[#0077b6] hover:bg-[#0077b6] hover:text-white'}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handlePageChange(page + 1)} 
              disabled={page === totalPages}
              className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${page === totalPages ? 'border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed' : 'border-[#0077b6] text-[#0077b6] hover:bg-[#0077b6] hover:text-white'}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Ban / Unban Modal */}
      <AdminUserStatusModal
        isOpen={!!banningInstructor}
        userName={banningInstructor?.user?.name || banningInstructor?.designation}
        userRole="Trainer"
        isCurrentlyBanned={!!banningInstructor?.user?.isBanned}
        onClose={() => setBanningInstructor(null)}
        onConfirm={handleToggleBanInstructor}
      />

      {/* Delete Confirmation Modal */}
      <AdminDeleteConfirmModal
        isOpen={!!deletingInstructor}
        title="Delete Trainer Record"
        itemName={deletingInstructor?.user?.name || deletingInstructor?.designation}
        message="Are you sure you want to permanently delete this trainer record? This will remove their assigned courses and profile."
        confirmText="Delete Trainer"
        onClose={() => setDeletingInstructor(null)}
        onConfirm={handleDeleteInstructor}
      />
    </div>
  );
}
