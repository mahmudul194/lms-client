"use client";

import React, { useState } from "react";
import { FileCheck, Check, Filter } from "lucide-react";
import { StudentSubmission } from "@/data/instructorMockData";
import InstructorEvaluationModal from "./InstructorEvaluationModal";
import InstructorSubmissionCard from "./InstructorSubmissionCard";

import { BatchItem } from "@/services/api/batchesApi";
import { assignmentsApi, AssignmentItem } from "@/services/api/assignmentsApi";
import { uploadApi } from "@/services/api/uploadApi";
import { createPortal } from "react-dom";
import { X, CalendarPlus, Paperclip, Loader2 } from "lucide-react";

interface InstructorGradingTabProps {
  submissions: StudentSubmission[];
  batches: BatchItem[];
  assignments: AssignmentItem[];
  onAssignmentCreated: (a: AssignmentItem) => void;
}

export default function InstructorGradingTab({ submissions, batches, assignments, onAssignmentCreated }: InstructorGradingTabProps) {
  const [list, setList] = useState<StudentSubmission[]>(submissions);
  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Graded">("All");
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);
  const [scoreInput, setScoreInput] = useState<string>("");
  const [feedbackInput, setFeedbackInput] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"submissions" | "assignments">("submissions");

  const filtered = list.filter((s) => {
    if (filterStatus === "All") return true;
    return s.status === filterStatus;
  });

  const handleOpenEvaluate = (sub: StudentSubmission) => {
    setSelectedSubmission(sub);
    setScoreInput(sub.score !== null ? String(sub.score) : "95");
    setFeedbackInput(
      sub.feedback || "Well done! The structural model alignment and BNBC schedule are accurate."
    );
  };

  const handleSaveGrade = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    try {
      const { assignmentSubmissionsApi } = await import("@/services/api/assignmentSubmissionsApi");
      await assignmentSubmissionsApi.reviewSubmission(selectedSubmission.id, {
        marks: Number(scoreInput),
        feedback: feedbackInput,
      });
    } catch {}

    setList((prev) =>
      prev.map((item) =>
        item.id === selectedSubmission.id
          ? { ...item, score: Number(scoreInput), feedback: feedbackInput, status: "Graded" }
          : item
      )
    );

    setSuccessMsg(`Marks and feedback published for ${selectedSubmission.studentName}!`);
    setSelectedSubmission(null);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FileCheck className="w-6 h-6 text-[#0077b6]" />
            <span>Student Assignments & Submissions Review</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review BIM project submissions, test .rvt / .dwg models, and assign grades
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setActiveTab("submissions")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${activeTab === "submissions" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Submissions</button>
            <button onClick={() => setActiveTab("assignments")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${activeTab === "assignments" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>My Assignments</button>
          </div>
          
          <button
            onClick={() => setShowCreateAssignmentModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {activeTab === "submissions" ? (
        <>
          <div className="flex items-center gap-2 mb-4">
            {(["All", "Pending", "Graded"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  filterStatus === st
                    ? "bg-[#002b5b] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st === "Pending" ? "Pending Review" : st}
              </button>
            ))}
          </div>
          
          <div className="space-y-4">
            {filtered.map((sub) => (
              <InstructorSubmissionCard key={sub.id} sub={sub} onEvaluate={handleOpenEvaluate} />
            ))}
            {filtered.length === 0 && (
               <p className="text-slate-500 text-sm text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">No submissions found.</p>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {assignments.length > 0 ? (
            assignments.map(a => (
              <div key={a.id} className="p-5 border border-slate-200 rounded-2xl flex items-center justify-between bg-slate-50">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-[#0077b6]/10 text-[#0077b6]">{a.batch?.code || "BATCH"}</span>
                    <h5 className="font-bold text-slate-900">{a.title}</h5>
                  </div>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">{a.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs font-bold text-slate-500">Due: {new Date(a.dueAt).toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-500">Marks: {a.totalMarks}</span>
                    {a.attachmentUrl && (
                      <a href={a.attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1">
                        <Paperclip className="w-3 h-3" /> Attachment
                      </a>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${a.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                  {a.status}
                </span>
              </div>
            ))
          ) : (
            <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <CalendarPlus className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-600 font-bold">No assignments created yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal Evaluation Dialog */}
      <InstructorEvaluationModal
        selectedSubmission={selectedSubmission}
        scoreInput={scoreInput}
        setScoreInput={setScoreInput}
        feedbackInput={feedbackInput}
        setFeedbackInput={setFeedbackInput}
        onSave={handleSaveGrade}
        onClose={() => setSelectedSubmission(null)}
      />

      {/* Create Assignment Modal */}
      {showCreateAssignmentModal && (
        <CreateAssignmentModal
          batches={batches}
          onClose={() => setShowCreateAssignmentModal(false)}
          onSuccess={(newA) => {
            setShowCreateAssignmentModal(false);
            onAssignmentCreated(newA);
            setSuccessMsg(`Assignment "${newA.title}" created successfully!`);
            setTimeout(() => setSuccessMsg(null), 3000);
            setActiveTab("assignments");
          }}
        />
      )}
    </div>
  );
}

function CreateAssignmentModal({ batches, onClose, onSuccess }: { batches: BatchItem[], onClose: () => void, onSuccess: (a: AssignmentItem) => void }) {
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [totalMarks, setTotalMarks] = useState("100");
  const [dueAt, setDueAt] = useState("");
  const [attachment, setAttachment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatchId) {
      setError("Please select a batch.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      
      const res = await assignmentsApi.createAssignment({
        batchId: selectedBatchId,
        title,
        description,
        totalMarks: Number(totalMarks),
        dueAt: new Date(dueAt).toISOString(),
        status: "published",
        attachmentUrl: attachment || undefined,
      });
      if (res.statusCode === 201 && res.data) {
        onSuccess(res.data);
      } else {
        setError("Failed to create assignment.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to create assignment.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <h3 className="text-xl font-black text-slate-900">Create New Assignment</h3>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-700 rounded-xl text-sm font-bold border border-rose-200">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">Target Batch *</label>
            <select required value={selectedBatchId} onChange={e => setSelectedBatchId(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none bg-slate-50">
              <option value="" disabled>Select a batch</option>
              {batches.map(b => (
                <option key={b.id} value={b.id}>{b.code} - {b.name} ({b.status})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">Title *</label>
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none" placeholder="e.g. Final Project Submission" />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">Instructions / Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none" placeholder="Provide details, rules, or requirements..." rows={3} />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">Attachment Link (Optional)</label>
            <input type="url" value={attachment} onChange={e => setAttachment(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none text-sm" placeholder="e.g. Google Drive link..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1">Total Marks *</label>
              <input required type="number" value={totalMarks} onChange={e => setTotalMarks(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none" min="1" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1">Due Date *</label>
              <input required type="datetime-local" value={dueAt} onChange={e => setDueAt(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none" />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 disabled:opacity-50 cursor-pointer flex items-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarPlus className="w-4 h-4" />}
              <span>{loading ? "Creating..." : "Publish Assignment"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
