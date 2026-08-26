"use client";

import React, { useState } from "react";
import { FileCheck, Check, Filter } from "lucide-react";
import { StudentSubmission } from "@/data/instructorMockData";
import InstructorEvaluationModal from "./InstructorEvaluationModal";
import InstructorSubmissionCard from "./InstructorSubmissionCard";

interface InstructorGradingTabProps {
  submissions: StudentSubmission[];
}

export default function InstructorGradingTab({ submissions }: InstructorGradingTabProps) {
  const [list, setList] = useState<StudentSubmission[]>(submissions);
  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Graded">("All");
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);
  const [scoreInput, setScoreInput] = useState<string>("");
  const [feedbackInput, setFeedbackInput] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

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

        <div className="flex items-center gap-2">
          {["All", "Pending", "Graded"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filterStatus === st
                  ? "bg-[#002b5b] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {st === "Pending" ? "Pending Review" : st}
            </button>
          ))}
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Submissions Cards */}
      <div className="space-y-4">
        {filtered.map((sub) => (
          <InstructorSubmissionCard key={sub.id} sub={sub} onEvaluate={handleOpenEvaluate} />
        ))}
      </div>

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
    </div>
  );
}
