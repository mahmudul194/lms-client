"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Award, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { AssignmentItem } from "@/services/api/assignmentsApi";
import { SubmissionItem, assignmentSubmissionsApi } from "@/services/api/assignmentSubmissionsApi";

interface StudentResultsViewProps {
  courseTitle: string;
  batch: string;
  batchId?: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  onBack: () => void;
}

export default function StudentResultsView({
  courseTitle,
  batch,
  batchId,
  progressPercent,
  completedLessons,
  totalLessons,
  onBack,
}: StudentResultsViewProps) {
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);

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
          assignmentSubmissionsApi.getAllSubmissions() // Backend maps this to logged in student
        ]);
        
        if (assignmentsRes.statusCode === 200 && assignmentsRes.data?.items) {
          setAssignments(assignmentsRes.data.items);
        }
        
        if (submissionsRes.statusCode === 200 && submissionsRes.data?.items) {
          // Filter submissions to only those related to this batch's assignments
          const batchAssignmentIds = new Set(assignmentsRes.data?.items?.map((a: any) => a.id) || []);
          const batchSubmissions = submissionsRes.data.items.filter(sub => batchAssignmentIds.has(sub.assignmentId));
          setSubmissions(batchSubmissions);
        }
      } catch (err) {
        console.error("Failed to fetch results", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [batchId]);

  // Aggregate Data
  const reviewedSubmissions = submissions.filter(sub => sub.status === 'reviewed');
  const pendingSubmissions = submissions.filter(sub => sub.status !== 'reviewed');
  
  const totalEarnedMarks = reviewedSubmissions.reduce((acc, sub) => acc + (sub.marks || 0), 0);
  const totalPossibleMarks = reviewedSubmissions.reduce((acc, sub) => {
    const assignment = assignments.find(a => a.id === sub.assignmentId);
    return acc + (assignment?.totalMarks || 0);
  }, 0);

  const averageScore = totalPossibleMarks > 0 ? Math.round((totalEarnedMarks / totalPossibleMarks) * 100) : 0;
  
  let grade = "N/A";
  if (totalPossibleMarks > 0) {
    if (averageScore >= 90) grade = "A+ (Excellent)";
    else if (averageScore >= 80) grade = "A (Very Good)";
    else if (averageScore >= 70) grade = "B (Good)";
    else if (averageScore >= 60) grade = "C (Average)";
    else grade = "Needs Improvement";
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Award className="w-48 h-48 text-[#0077b6]" />
        </div>

        <button onClick={onBack} className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0077b6] hover:text-[#002b5b] transition-colors cursor-pointer relative z-10">
          <ArrowLeft className="w-4 h-4" /> <span>Back to Course Options</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-[#002b5b] text-white text-xs font-bold">{batch}</span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">Course Report Card</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{courseTitle} — Performance Results</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Your overall progress, grades, and feedback summary.</p>
          </div>
        </div>

        {/* Top Highlight Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 relative z-10">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0077b6] flex items-center justify-center shrink-0">
               <TrendingUp className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs font-bold text-slate-500">Course Progress</p>
               <h4 className="text-xl font-black text-slate-900">{progressPercent}%</h4>
               <p className="text-[10px] text-slate-400 font-medium">{completedLessons} of {totalLessons} lessons done</p>
             </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
               <CheckCircle2 className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs font-bold text-slate-500">Total Score</p>
               <h4 className="text-xl font-black text-slate-900">{totalEarnedMarks} / {totalPossibleMarks}</h4>
               <p className="text-[10px] text-slate-400 font-medium">From {reviewedSubmissions.length} graded assignments</p>
             </div>
          </div>
          <div className="bg-[#002b5b] p-4 rounded-2xl border border-[#001f42] flex items-center gap-4 text-white shadow-md">
             <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
               <Award className="w-6 h-6 text-yellow-400" />
             </div>
             <div>
               <p className="text-xs font-bold text-sky-200">Overall Grade</p>
               <h4 className="text-xl font-black">{grade}</h4>
               <p className="text-[10px] text-sky-300 font-medium">Average: {averageScore}%</p>
             </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-black text-slate-900 px-1">Assignment Grades</h3>
        
        {loading ? (
          <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">Loading results...</div>
        ) : submissions.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center space-y-3">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 text-slate-300">
               <CheckCircle2 className="w-8 h-8" />
             </div>
             <div>
               <h4 className="text-base font-bold text-slate-700">No Assignments Submitted</h4>
               <p className="text-sm text-slate-400">You haven't submitted any assignments for this batch yet.</p>
             </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {submissions.map(sub => {
              const assignment = assignments.find(a => a.id === sub.assignmentId);
              if (!assignment) return null;
              
              const isReviewed = sub.status === 'reviewed';
              const isRejected = sub.status === 'rejected';

              return (
                <div key={sub.id} className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <h4 className="text-base font-bold text-slate-900">{assignment.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
                      <span className="text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Submitted: {new Date(sub.submittedAt || "").toLocaleDateString()}</span>
                      
                      {isReviewed ? (
                        <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                          Graded
                        </span>
                      ) : isRejected ? (
                        <span className="px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 font-bold border border-rose-200">
                          Rejected
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 font-bold border border-amber-200">
                          Pending Review
                        </span>
                      )}
                    </div>
                    {isReviewed && sub.feedback && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600">
                        <span className="font-bold text-slate-800 block mb-1">Instructor Feedback:</span>
                        {sub.feedback}
                      </div>
                    )}
                  </div>
                  
                  {isReviewed ? (
                    <div className="text-right shrink-0 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100">
                      <span className="block text-xs font-bold text-emerald-600 mb-0.5">Marks Earned</span>
                      <span className="block text-2xl font-black text-emerald-700">{sub.marks}<span className="text-sm text-emerald-500">/{assignment.totalMarks}</span></span>
                    </div>
                  ) : (
                    <div className="text-right shrink-0 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                      <span className="block text-xs font-bold text-slate-500 mb-0.5">Marks Available</span>
                      <span className="block text-2xl font-black text-slate-700">-<span className="text-sm text-slate-400">/{assignment.totalMarks}</span></span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}
