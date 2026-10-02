"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit, Trash2, Calendar, FileText, CheckCircle, Link as LinkIcon, BookOpen, Clock } from "lucide-react";
import { assignmentsApi, AssignmentItem, CreateAssignmentPayload } from "@/services/api/assignmentsApi";
import AdminEditAssignmentModal from "./AdminEditAssignmentModal";
import AdminAssignmentSubmissionsList from "./AdminAssignmentSubmissionsList";

interface AdminAssignmentDetailsProps {
  assignmentId: string;
  onBack: () => void;
  onDelete?: (assignment: AssignmentItem) => void;
}

export default function AdminAssignmentDetails({ assignmentId, onBack, onDelete }: AdminAssignmentDetailsProps) {
  const [assignment, setAssignment] = useState<AssignmentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await assignmentsApi.getAssignmentById(assignmentId);
        if (res.statusCode === 200 && res.data) {
          setAssignment(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [assignmentId]);

  const handleUpdate = async (id: string, payload: Partial<CreateAssignmentPayload>) => {
    await assignmentsApi.updateAssignment(id, payload);
    const res = await assignmentsApi.getAssignmentById(id);
    if (res.data) setAssignment(res.data);
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Loading assignment details...</div>;
  }

  if (!assignment) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-500 font-semibold">Assignment not found.</p>
        <button onClick={onBack} className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold transition-colors">Go Back</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-start gap-4">
          <button onClick={onBack} className="mt-1 p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                assignment.status === 'published' ? 'bg-emerald-100 text-emerald-700' :
                assignment.status === 'closed' ? 'bg-rose-100 text-rose-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {assignment.status}
              </span>
              <span className="text-xs font-bold text-slate-400">ID: {assignment.id}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{assignment.title}</h3>
            <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0077b6]" />
              {assignment.batch?.name || "Global Assignment"} {assignment.batch?.code ? `(${assignment.batch.code})` : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsEditing(true)} className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shrink-0">
            <Edit className="w-4 h-4" />
            <span>Edit Details</span>
          </button>
          {onDelete && (
            <button 
              onClick={() => onDelete(assignment)} 
              className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer shrink-0" 
              title="Delete Assignment"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0077b6]" />
              Assignment Description
            </h4>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
              {assignment.description || "No description provided."}
            </div>
          </div>

          {assignment.attachmentUrl && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#0077b6]" />
                Attachment Reference
              </h4>
              <a href={assignment.attachmentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-50 text-[#0077b6] hover:bg-sky-100 font-bold text-sm transition-colors">
                <FileText className="w-4 h-4" />
                <span>View Attached Document</span>
              </a>
            </div>
          )}
        </div>

        {/* Right Column - Stats & Info */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-600 mb-0.5">Total Marks</div>
              <div className="text-2xl font-black text-emerald-950">{assignment.totalMarks}</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-600 mb-0.5">Deadline</div>
              <div className="text-lg font-black text-amber-950">
                {new Date(assignment.dueAt).toLocaleString(undefined, {
                  month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Additional Info</h5>
            <div className="space-y-2 text-sm font-semibold text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Created At</span>
                <span>{assignment.createdAt ? new Date(assignment.createdAt).toLocaleDateString() : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mentor ID</span>
                <span className="truncate w-24 text-right" title={assignment.mentorId}>{assignment.mentorId || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminEditAssignmentModal
        isOpen={isEditing}
        assignment={assignment}
        onClose={() => setIsEditing(false)}
        onUpdate={handleUpdate}
      />

      {/* Submissions Section */}
      <div className="pt-8 border-t border-slate-200 mt-8">
        <AdminAssignmentSubmissionsList 
          assignmentId={assignment.id} 
          totalMarks={assignment.totalMarks} 
        />
      </div>
    </div>
  );
}
