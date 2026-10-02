"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ClipboardList, Calendar, FileText, Download, CheckCircle2, UploadCloud, X, Check } from "lucide-react";
import { AssignmentItem } from "@/services/api/assignmentsApi";
import { SubmissionItem, assignmentSubmissionsApi } from "@/services/api/assignmentSubmissionsApi";

interface StudentAssignmentsViewProps {
  courseTitle: string;
  batch: string;
  batchId?: string;
  onBack: () => void;
}

export default function StudentAssignmentsView({
  courseTitle,
  batch,
  batchId,
  onBack,
}: StudentAssignmentsViewProps) {
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, SubmissionItem>>({});
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  // Submit form state
  const [answer, setAnswer] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!batchId) {
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        const { assignmentsApi } = await import("@/services/api/assignmentsApi");
        const [assignmentsRes, submissionsRes] = await Promise.all([
          assignmentsApi.getAllAssignments({ batchId }),
          assignmentSubmissionsApi.getAllSubmissions()
        ]);
        
        if (assignmentsRes.statusCode === 200 && assignmentsRes.data?.items) {
          setAssignments(assignmentsRes.data.items);
        }
        
        if (submissionsRes.statusCode === 200 && submissionsRes.data?.items) {
          const subMap: Record<string, SubmissionItem> = {};
          submissionsRes.data.items.forEach(sub => {
            subMap[sub.assignmentId] = sub;
          });
          setSubmissions(subMap);
        }
      } catch (err) {
        console.error("Failed to fetch assignments", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [batchId]);

  const handleSubmit = async (assignmentId: string) => {
    if (!answer && !fileUrl) {
      alert("Please provide an answer or a file link to submit.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await assignmentSubmissionsApi.submitAssignment({
        assignmentId,
        answer,
        fileUrl,
      });
      if (res.statusCode === 201 && res.data) {
        setSubmissions(prev => ({ ...prev, [assignmentId]: res.data as SubmissionItem }));
        setSubmittingId(null);
        setAnswer("");
        setFileUrl("");
      }
    } catch (err) {
      console.error("Failed to submit assignment", err);
      alert("Failed to submit assignment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeAssignments = assignments.filter(a => a.status === "published");
  const closedAssignments = assignments.filter(a => a.status === "closed");

  return (
    <div className="space-y-6 font-sans relative">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0077b6] hover:text-[#002b5b] transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> <span>Back to Course Options</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-[#002b5b] text-white text-xs font-bold">{batch}</span>
              <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">Assignments</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{courseTitle} — Batch Assignments</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">View and download assignments for your batch.</p>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-sky-50 text-[#0077b6] text-xs font-bold border border-sky-200 w-fit">
            {assignments.length} Total Assignments
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {loading ? (
          <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">Loading assignments...</div>
        ) : assignments.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center space-y-3">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 text-slate-300">
               <ClipboardList className="w-8 h-8" />
             </div>
             <div>
               <h4 className="text-base font-bold text-slate-700">No Assignments Yet</h4>
               <p className="text-sm text-slate-400">There are no assignments posted for this batch right now.</p>
             </div>
          </div>
        ) : (
          <>
            {activeAssignments.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-amber-500" />
                  Active Assignments
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {activeAssignments.map((a) => {
                    const submission = submissions[a.id];
                    const isSubmittingThis = submittingId === a.id;
                    
                    return (
                      <div key={a.id} className="p-5 sm:p-6 rounded-3xl border border-amber-100 bg-amber-50/30 hover:border-amber-300 transition-all flex flex-col md:flex-row gap-6 justify-between">
                        {/* Assignment Details */}
                        <div className="flex-1 space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                               <div>
                                 <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider">Active</span>
                                 <h4 className="text-lg font-black text-slate-900 leading-snug mt-2">{a.title}</h4>
                               </div>
                               <div className="text-right">
                                 <span className="block text-xs font-bold text-slate-500">Marks</span>
                                 <span className="block text-xl font-black text-[#0077b6]">{a.totalMarks}</span>
                               </div>
                            </div>
                            {a.description && <p className="text-sm text-slate-600 font-medium whitespace-pre-wrap">{a.description}</p>}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                              <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                                 <Calendar className="w-3.5 h-3.5 text-rose-500" /> 
                                 Due: {new Date(a.dueAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          {a.attachmentUrl && (
                            <a href={a.attachmentUrl} target="_blank" rel="noreferrer" className="w-fit px-5 py-2 rounded-xl bg-white border border-amber-200 hover:bg-amber-50 text-amber-700 text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer">
                              <Download className="w-4 h-4" /> <span>Download Attachment</span>
                            </a>
                          )}
                        </div>

                        {/* Submission Area */}
                        <div className="flex-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                          {submission ? (
                            <div className="flex flex-col h-full justify-center items-center text-center space-y-3">
                              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                <Check className="w-6 h-6" />
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-slate-900">Assignment Submitted</h4>
                                <p className="text-xs text-slate-500 mt-1">Submitted on {new Date(submission.submittedAt || "").toLocaleDateString()}</p>
                              </div>
                              <div className="flex gap-2 text-xs font-bold mt-2">
                                Status: 
                                <span className={
                                  submission.status === 'reviewed' ? "text-emerald-600" : 
                                  submission.status === 'rejected' ? "text-rose-600" : "text-amber-600"
                                }>
                                  {submission.status.toUpperCase()}
                                </span>
                              </div>
                              {submission.status === 'reviewed' && (
                                <div className="mt-3 p-3 bg-slate-50 rounded-lg w-full text-left">
                                  <p className="text-xs font-bold text-slate-700">Marks Earned: <span className="text-[#0077b6] text-lg">{submission.marks}/{a.totalMarks}</span></p>
                                  {submission.feedback && <p className="text-xs text-slate-600 mt-1">Feedback: {submission.feedback}</p>}
                                </div>
                              )}
                            </div>
                          ) : isSubmittingThis ? (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-slate-900">Submit Assignment</h4>
                                <button onClick={() => { setSubmittingId(null); setAnswer(""); setFileUrl(""); }} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1">Answer / Description</label>
                                  <textarea 
                                    className="w-full border-slate-200 rounded-xl text-sm p-3 focus:ring-[#0077b6] focus:border-[#0077b6]"
                                    rows={3}
                                    placeholder="Write your answer or add a Google Drive/GitHub link here..."
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1">File Link (Optional)</label>
                                  <input 
                                    type="url"
                                    className="w-full border-slate-200 rounded-xl text-sm p-2.5 focus:ring-[#0077b6] focus:border-[#0077b6]"
                                    placeholder="https://..."
                                    value={fileUrl}
                                    onChange={(e) => setFileUrl(e.target.value)}
                                  />
                                </div>
                                <button 
                                  onClick={() => handleSubmit(a.id)}
                                  disabled={isSubmitting}
                                  className="w-full py-2.5 bg-[#002b5b] hover:bg-[#0077b6] text-white rounded-xl text-sm font-bold shadow-md transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                  {isSubmitting ? "Submitting..." : <><UploadCloud className="w-4 h-4" /> Submit Now</>}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col h-full justify-center items-center text-center space-y-4 py-6">
                              <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-[#0077b6]">
                                <UploadCloud className="w-8 h-8" />
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-slate-900">Ready to submit?</h4>
                                <p className="text-xs text-slate-500 mt-1">Upload your work before the deadline.</p>
                              </div>
                              <button 
                                onClick={() => { setSubmittingId(a.id); setAnswer(""); setFileUrl(""); }}
                                className="px-6 py-2.5 bg-[#0077b6] hover:bg-[#002b5b] text-white rounded-xl text-sm font-bold shadow-md transition-colors"
                              >
                                Submit Assignment
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {closedAssignments.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-400" />
                  Past / Closed Assignments
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {closedAssignments.map((a) => {
                    const submission = submissions[a.id];
                    return (
                      <div key={a.id} className="p-5 rounded-3xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between gap-3 opacity-75 hover:opacity-100">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-wider">Closed</span>
                            <h4 className="text-sm font-black text-slate-700 leading-snug truncate">{a.title}</h4>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                            <span>Marks: {a.totalMarks}</span>
                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-slate-400" /> Due: {new Date(a.dueAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2 pt-2 border-t border-slate-200 text-xs font-bold flex items-center justify-between">
                           {submission ? (
                             <span className={submission.status === 'reviewed' ? "text-emerald-600" : "text-amber-600"}>
                               Status: {submission.status.toUpperCase()}
                             </span>
                           ) : (
                             <span className="text-rose-500">Not Submitted</span>
                           )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
