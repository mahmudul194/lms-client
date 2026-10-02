"use client";

import React, { useState, useEffect } from "react";
import { Check, X, Eye, FileText, CheckCircle2, MessageSquare, Save } from "lucide-react";
import { assignmentSubmissionsApi, SubmissionItem } from "@/services/api/assignmentSubmissionsApi";

interface AdminAssignmentSubmissionsListProps {
  assignmentId: string;
  totalMarks: number;
}

export default function AdminAssignmentSubmissionsList({ assignmentId, totalMarks }: AdminAssignmentSubmissionsListProps) {
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Review modal state
  const [reviewingSubmission, setReviewingSubmission] = useState<SubmissionItem | null>(null);
  const [marks, setMarks] = useState<number | "">("");
  const [feedback, setFeedback] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await assignmentSubmissionsApi.getAllSubmissions({ assignmentId, limit: 100 });
      if (res.statusCode === 200 && res.data?.items) {
        setSubmissions(res.data.items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [assignmentId]);

  const handleReview = async () => {
    if (!reviewingSubmission) return;
    if (marks === "" || marks < 0 || marks > totalMarks) {
      alert(`Please enter valid marks between 0 and ${totalMarks}`);
      return;
    }
    
    setIsSubmittingReview(true);
    try {
      await assignmentSubmissionsApi.reviewSubmission(reviewingSubmission.id, {
        marks: Number(marks),
        feedback
      });
      alert("Review submitted successfully!");
      setReviewingSubmission(null);
      fetchSubmissions();
    } catch (err: any) {
      alert("Failed to submit review: " + err.message);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return <div className="py-10 text-center text-slate-500 font-semibold animate-pulse">Loading student submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h4 className="text-lg font-black text-slate-900">Student Submissions & Results</h4>
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
          {submissions.length} Submissions
        </span>
      </div>

      {submissions.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 font-medium">
          No students have submitted this assignment yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {submissions.map((sub) => {
            const isReviewed = sub.status === 'reviewed';
            return (
              <div key={sub.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row gap-5 items-start md:items-center justify-between hover:border-[#0077b6] transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#002b5b] text-white flex items-center justify-center font-bold text-sm">
                      {sub.student?.name?.[0]?.toUpperCase() || "S"}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">{sub.student?.name || "Unknown Student"}</h5>
                      <p className="text-xs text-slate-500">{sub.student?.email || "No email"}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    Submitted: {new Date(sub.submittedAt || "").toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {isReviewed ? (
                    <div className="text-right">
                      <span className="block text-xs font-bold text-emerald-600">Marks Given</span>
                      <span className="block text-xl font-black text-emerald-700">{sub.marks}<span className="text-sm text-emerald-500">/{totalMarks}</span></span>
                    </div>
                  ) : (
                    <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">Needs Review</span>
                  )}
                  
                  <button 
                    onClick={() => {
                      setReviewingSubmission(sub);
                      setMarks(sub.marks ?? "");
                      setFeedback(sub.feedback || "");
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-50 text-[#0077b6] hover:bg-sky-100 font-bold text-sm transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Result / Review</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {reviewingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 sticky top-0 z-10">
              <h3 className="text-xl font-black text-slate-900">Review Student Submission</h3>
              <button onClick={() => setReviewingSubmission(null)} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-sky-50 p-4 rounded-2xl border border-sky-100">
                <h4 className="text-sm font-bold text-slate-800 mb-2">Student Information</h4>
                <p className="text-sm text-slate-700 font-medium">Name: <span className="font-bold">{reviewingSubmission.student?.name}</span></p>
                <p className="text-sm text-slate-700 font-medium">Email: <span className="font-bold">{reviewingSubmission.student?.email}</span></p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0077b6]" /> Answer Provided
                </h4>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium whitespace-pre-wrap min-h-[100px]">
                  {reviewingSubmission.answer || "No text answer provided."}
                </div>
              </div>

              {reviewingSubmission.fileUrl && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0077b6]" /> Attached File / Link
                  </h4>
                  <a href={reviewingSubmission.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#0077b6] hover:underline font-bold text-sm">
                    {reviewingSubmission.fileUrl}
                  </a>
                </div>
              )}

              <div className="border-t border-slate-200 pt-6 space-y-5">
                <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Grade This Submission
                </h4>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Marks (out of {totalMarks})</label>
                  <input 
                    type="number"
                    min={0}
                    max={totalMarks}
                    className="w-full max-w-xs border-slate-200 rounded-xl text-sm p-3 focus:ring-[#0077b6] focus:border-[#0077b6] font-bold"
                    placeholder={`e.g. ${totalMarks}`}
                    value={marks}
                    onChange={(e) => setMarks(e.target.value === "" ? "" : Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-slate-400" /> Feedback (Optional)
                  </label>
                  <textarea 
                    className="w-full border-slate-200 rounded-xl text-sm p-3 focus:ring-[#0077b6] focus:border-[#0077b6]"
                    rows={4}
                    placeholder="Write constructive feedback for the student..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 sticky bottom-0 z-10 flex justify-end gap-3">
              <button 
                onClick={() => setReviewingSubmission(null)}
                className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReview}
                disabled={isSubmittingReview}
                className="px-6 py-2.5 bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-70"
              >
                {isSubmittingReview ? "Saving..." : <><Save className="w-4 h-4" /> Save Review</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
