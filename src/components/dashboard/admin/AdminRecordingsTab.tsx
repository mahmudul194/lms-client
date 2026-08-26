"use client";

import React, { useState } from "react";
import { Video, ExternalLink, Check, Copy, Sparkles, CheckCircle2 } from "lucide-react";
import { INITIAL_RECORDINGS_QUEUE, ClassRecordingSubmission } from "@/data/classRecordingsMockData";

export default function AdminRecordingsTab() {
  const [recordings, setRecordings] = useState<ClassRecordingSubmission[]>(INITIAL_RECORDINGS_QUEUE);
  const [filter, setFilter] = useState<"All" | "Pending" | "Uploaded">("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [youtubeInput, setYoutubeInput] = useState("");

  const filtered = recordings.filter((r) => {
    if (filter === "Pending") return r.status === "Pending Admin Upload";
    if (filter === "Uploaded") return r.status === "Uploaded to YouTube";
    return true;
  });

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePublishYouTube = (id: string) => {
    const url = youtubeInput.trim() || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    setRecordings((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Uploaded to YouTube", youtubeUnlistedUrl: url } : r))
    );
    setActiveModalId(null);
    setYoutubeInput("");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Video className="w-6 h-6 text-[#0077b6]" />
            <span>Class Recordings Queue (Instructor Handover)</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Review raw Zoom/Drive recordings from instructors, get practice BIM files, and publish to YouTube</p>
        </div>
        <div className="flex items-center gap-2">
          {["All", "Pending", "Uploaded"].map((tab) => (
            <button key={tab} onClick={() => setFilter(tab as any)} className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${filter === tab ? "bg-[#002b5b] text-white shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
              {tab === "Pending" ? "Pending Upload (3)" : tab === "Uploaded" ? "Published (1)" : "All Submissions"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((rec) => (
          <div key={rec.id} className="p-6 rounded-3xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-[#002b5b] text-white font-black text-xs">{rec.batchCode}</span>
                <div>
                  <h4 className="text-base font-black text-slate-900 leading-snug">{rec.topic}</h4>
                  <span className="text-xs text-slate-500 font-semibold">{rec.courseName} • Class {rec.classNo}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black w-fit ${rec.status === "Uploaded to YouTube" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{rec.status}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-700">
              <div className="p-3 bg-white rounded-2xl border border-slate-200"><span className="text-slate-400 block text-xs">Lead Instructor</span><strong className="text-slate-900 block mt-0.5">{rec.instructorName}</strong></div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200"><span className="text-slate-400 block text-xs">Practice Model</span><strong className="text-[#0077b6] block mt-0.5 truncate">{rec.attachedModel}</strong></div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200"><span className="text-slate-400 block text-xs">Submitted At & Duration</span><strong className="text-slate-900 block mt-0.5">{rec.submittedAt} ({rec.duration})</strong></div>
            </div>

            {rec.notes && <p className="text-xs text-slate-600 bg-sky-50/60 p-3 rounded-xl border border-sky-100"><strong className="text-[#002b5b]">Instructor Note:</strong> {rec.notes} {rec.passcode && <span className="ml-2 font-bold text-slate-800">Passcode: {rec.passcode}</span>}</p>}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <a href={rec.rawRecordingUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer">
                  <span>Open Raw Video</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
                <button onClick={() => handleCopy(rec.rawRecordingUrl, rec.id)} className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs flex items-center gap-1 cursor-pointer">
                  {copiedId === rec.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === rec.id ? "Copied" : "Copy Link"}</span>
                </button>
              </div>

              {rec.status === "Pending Admin Upload" ? (
                <button onClick={() => setActiveModalId(rec.id)} className="px-5 py-2.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-black text-xs flex items-center gap-2 shadow-xs cursor-pointer hover:scale-102 transition-all">
                  <Sparkles className="w-4 h-4 text-sky-300" />
                  <span>Approve & Publish to Classroom</span>
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /><span>Live in Student Classroom</span></span>
              )}
            </div>

            {activeModalId === rec.id && (
              <div className="p-4 rounded-2xl bg-white border-2 border-[#0077b6] space-y-3">
                <label className="text-xs font-bold text-slate-800 block">Enter Video Embed Link (YouTube Unlisted / Vimeo) to publish for students:</label>
                <div className="flex gap-2">
                  <input type="url" placeholder="https://www.youtube.com/watch?v=..." value={youtubeInput} onChange={(e) => setYoutubeInput(e.target.value)} className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0077b6]" />
                  <button onClick={() => handlePublishYouTube(rec.id)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl">Publish to Classroom</button>
                  <button onClick={() => setActiveModalId(null)} className="px-3 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl">Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
