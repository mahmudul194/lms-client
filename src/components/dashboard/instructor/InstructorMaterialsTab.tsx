"use client";

import React, { useState } from "react";
import { Upload, Plus, Check, ExternalLink, Link2, FileText, Send, Sparkles } from "lucide-react";
import { INITIAL_RECORDINGS_QUEUE, ClassRecordingSubmission } from "@/data/classRecordingsMockData";

export default function InstructorMaterialsTab() {
  const [list, setList] = useState<ClassRecordingSubmission[]>(INITIAL_RECORDINGS_QUEUE);
  const [selectedBatch, setSelectedBatch] = useState("REV-8TH");
  const [classNo, setClassNo] = useState("");
  const [topic, setTopic] = useState("");
  const [rawUrl, setRawUrl] = useState("");
  const [passcode, setPasscode] = useState("");
  const [attachedFile, setAttachedFile] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubmission: ClassRecordingSubmission = {
      id: `rec-${Date.now()}`,
      batchCode: selectedBatch,
      courseName: selectedBatch === "REV-8TH" ? "Professional Revit Combo" : selectedBatch === "TEK-8TH" ? "Tekla Steel Detailing" : "Revit Dynamo Automation",
      instructorName: "Engr. Ashikur Rahman",
      classNo,
      topic,
      rawRecordingUrl: rawUrl,
      passcode: passcode || undefined,
      attachedModel: attachedFile || "Class_Practice_Exercise.rvt (25 MB)",
      submittedAt: "Just now",
      duration: "1h 45m",
      notes: notes || "Recorded session with student Q&A. Ready for YouTube upload.",
      status: "Pending Admin Upload",
    };

    setList([newSubmission, ...list]);
    setClassNo(""); setTopic(""); setRawUrl(""); setPasscode(""); setAttachedFile(""); setNotes("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
          <Upload className="w-6 h-6 text-[#0077b6]" />
          <span>Handover Live Class Recording & Practice Files</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Submit your recorded Zoom/Drive video and practice BIM models to the Administration for unlisted YouTube publishing
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Recording and files handed over to Admin successfully! Admin will review and upload to YouTube.</span>
        </div>
      )}

      {/* Handover Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 text-xs sm:text-sm">
        <h4 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
          <Send className="w-4 h-4 text-[#0077b6]" />
          <span>Submit Today&apos;s Live Class Session</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Target Active Batch</label>
            <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 focus:outline-none">
              <option value="REV-8TH">REV-8TH: Revit Combo Pro</option>
              <option value="TEK-8TH">TEK-8TH: Tekla Steel Pro</option>
              <option value="DYN-8TH">DYN-8TH: Revit Dynamo Pro</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Class Number</label>
            <input type="text" required placeholder="e.g. 29" value={classNo} onChange={(e) => setClassNo(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Attached Practice Model</label>
            <input type="text" placeholder="e.g. Beam_Rebar_Class29.rvt" value={attachedFile} onChange={(e) => setAttachedFile(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 block mb-1">Topic / Lecture Title</label>
            <input type="text" required placeholder="e.g. Class 29: Structural Beam-Slab Framing & Rebar Detailing" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Passcode (If Zoom Cloud)</label>
            <input type="text" placeholder="e.g. BIM2026HOST" value={passcode} onChange={(e) => setPasscode(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Raw Video Link (Zoom Cloud / Google Drive)</label>
            <input type="url" required placeholder="https://zoom.us/rec/share/... or Google Drive URL" value={rawUrl} onChange={(e) => setRawUrl(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Instructor Note for Admin</label>
            <input type="text" placeholder="e.g. Audio clear, Q&A section starts at 01:25:00" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button type="submit" className="px-7 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-black text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-2 transition-all hover:scale-102">
            <Send className="w-4 h-4 text-sky-300" />
            <span>Handover Recording to Admin</span>
          </button>
        </div>
      </form>

      {/* Handover Queue History */}
      <div className="space-y-3">
        <h4 className="font-black text-slate-900 text-sm sm:text-base">Submitted Recordings Status</h4>
        {list.map((rec) => (
          <div key={rec.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#0077b6]/10 text-[#0077b6] font-bold text-xs">{rec.batchCode}</span>
                <strong className="text-slate-900 font-bold">{rec.topic}</strong>
              </div>
              <span className="text-slate-500 text-xs font-medium block">
                Practice File: <strong className="text-slate-700">{rec.attachedModel}</strong> • Submitted: {rec.submittedAt}
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-black shrink-0 ${rec.status === "Uploaded to YouTube" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
              {rec.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
