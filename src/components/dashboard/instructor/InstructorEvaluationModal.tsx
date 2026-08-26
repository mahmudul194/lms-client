"use client";

import React from "react";
import { createPortal } from "react-dom";
import { Download, MessageSquare, X } from "lucide-react";
import { StudentSubmission } from "@/data/instructorMockData";
import { useIsMounted } from "@/hooks/useIsMounted";

interface InstructorEvaluationModalProps {
  selectedSubmission: StudentSubmission | null;
  scoreInput: string;
  setScoreInput: (val: string) => void;
  feedbackInput: string;
  setFeedbackInput: (val: string) => void;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function InstructorEvaluationModal({
  selectedSubmission,
  scoreInput,
  setScoreInput,
  feedbackInput,
  setFeedbackInput,
  onSave,
  onClose,
}: InstructorEvaluationModalProps) {
  const mounted = useIsMounted();

  if (!mounted || !selectedSubmission) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl my-8 border border-slate-100 ring-1 ring-black/5 animate-scale-in text-xs sm:text-sm">
        <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-black text-slate-900">Evaluating: {selectedSubmission.studentName}</h4>
              <span className="text-xs font-semibold bg-sky-50 text-[#0077b6] px-2 py-0.5 rounded-md font-bold">{selectedSubmission.studentRoll}</span>
            </div>
            <p className="text-xs text-slate-500">{selectedSubmission.assignmentTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        {/* 1. Student's Answer Script & Notes */}
        <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 font-extrabold text-[#0077b6]"><MessageSquare className="w-4 h-4" /><span>Student&apos;s Answer Script:</span></div>
          <p className="text-slate-800 leading-relaxed bg-white p-2.5 rounded-xl border border-sky-100/80">&ldquo;{selectedSubmission.studentNote}&rdquo;</p>
        </div>

        {/* 2. Submitted Files */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Submitted CAD / BIM Files</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedSubmission.files.map((file, idx) => (
              <a key={idx} href={file.url} onClick={(e) => { e.preventDefault(); alert(`Downloading ${file.name}`); }} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between group text-xs cursor-pointer">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-[#002b5b] text-white font-semibold text-[10px] font-bold">{file.type}</span>
                  <span className="font-bold text-slate-900 truncate group-hover:text-[#0077b6]">{file.name}</span>
                </div>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0077b6] shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* 3. Evaluation Form */}
        <form onSubmit={onSave} className="space-y-3 pt-2 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Marks (Out of 100)</label>
              <input type="number" min="0" max="100" required value={scoreInput} onChange={(e) => setScoreInput(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold focus:bg-white focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div className="sm:col-span-2 text-slate-500 text-xs pb-1">Rubric: 40% 3D Geometry • 40% BNBC • 20% Schedule</div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Trainer Feedback & Corrections</label>
            <textarea rows={2} required value={feedbackInput} onChange={(e) => setFeedbackInput(e.target.value)} placeholder="Constructive feedback..." className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>

          <div className="flex justify-end gap-2.5 pt-1">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102">Submit Grade</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
