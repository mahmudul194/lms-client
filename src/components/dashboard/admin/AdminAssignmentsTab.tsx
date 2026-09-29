"use client";

import React, { useState, useEffect } from "react";
import { FileCheck, Plus, Search, Edit, Eye, Trash2, Calendar, User } from "lucide-react";
import { assignmentsApi, AssignmentItem, CreateAssignmentPayload } from "@/services/api/assignmentsApi";
import AdminAddAssignmentView from "./AdminAddAssignmentView";
import AdminAssignmentDetails from "./AdminAssignmentDetails";

export default function AdminAssignmentsTab() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await assignmentsApi.getAllAssignments({ limit: 100, search });
      if (res.statusCode === 200 && res.data?.items) {
        setAssignments(res.data.items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [search]);

  const handleCreateAssignment = async (newAssignment: CreateAssignmentPayload) => {
    try {
      const res = await assignmentsApi.createAssignment(newAssignment);
      if (res.statusCode === 201 || res.statusCode === 200) {
        alert(`Successfully created assignment!`);
        fetchAssignments();
        setIsAddingAssignment(false);
      } else {
        alert("Failed to create assignment.");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await assignmentsApi.deleteAssignment(id);
      fetchAssignments();
    } catch (e) {
      alert("Failed to delete assignment.");
    }
  };

  if (selectedAssignmentId) {
    return <AdminAssignmentDetails assignmentId={selectedAssignmentId} onBack={() => setSelectedAssignmentId(null)} />;
  }

  if (isAddingAssignment) {
    return <AdminAddAssignmentView onBack={() => setIsAddingAssignment(false)} onAdd={handleCreateAssignment} />;
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FileCheck className="w-6 h-6 text-[#0077b6]" />
            <span>Assignments Manager</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Manage course assignments, due dates, and submissions.</p>
        </div>
        <button onClick={() => setIsAddingAssignment(true)} className="px-6 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer hover:scale-102 transition-all shrink-0">
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Create Assignment</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assignments by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:outline-none font-medium bg-slate-50 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title & Batch</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Marks</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">Loading assignments...</td>
              </tr>
            ) : assignments.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">No assignments found. Create one to get started!</td>
              </tr>
            ) : (
              assignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{assignment.title}</div>
                    <div className="text-xs text-slate-500 font-semibold mt-0.5">{assignment.batch?.name || "Global Assignment"}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-semibold text-slate-700">
                      {assignment.totalMarks} Marks
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(assignment.dueAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                      assignment.status === 'published' ? 'bg-emerald-100 text-emerald-700' :
                      assignment.status === 'closed' ? 'bg-rose-100 text-rose-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedAssignmentId(assignment.id)} className="p-2 text-slate-400 hover:text-[#0077b6] hover:bg-sky-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(assignment.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Assignment">
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
    </div>
  );
}
