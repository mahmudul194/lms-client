"use client";

import React, { useState, useEffect } from "react";
import { Upload, Send } from "lucide-react";
import { ClassRecordingSubmission } from "@/data/classRecordingsMockData";

export default function InstructorMaterialsTab() {
  const [list, setList] = useState<ClassRecordingSubmission[]>([]);
  const [selectedBatch, setSelectedBatch] = useState("REV-8TH");
  const [classNo, setClassNo] = useState("");
  const [topic, setTopic] = useState("");
  const [rawUrl, setRawUrl] = useState("");
  const [passcode, setPasscode] = useState("");
  const [attachedFile, setAttachedFile] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { resourcesApi } = await import("@/services/api/resourcesApi");
        const res = await resourcesApi.getAllResources({ limit: 10 });
        if (res.statusCode === 200 && res.data?.items) {
          const apiRecs: ClassRecordingSubmission[] = res.data.items.map((r, i) => ({
            id: r.id,
            batchCode: "REV-8TH",
            courseName: "Professional BIM Detailing",
            instructorName: "Engr. Ashikur Rahman",
            classNo: String(i + 1),
            topic: r.title,
            rawRecordingUrl: r.url || "#",
            attachedModel: r.sizeMb ? `${r.sizeMb} MB` : "Model.rvt",
            submittedAt: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "Recently",
            duration: "1h 45m",
            notes: r.description || "Class practice resources uploaded.",
            status: "Uploaded to YouTube",
          }));
          setList(apiRecs);
        }
      } catch {}
    })();
  }, []);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const { resourcesApi } = await import("@/services/api/resourcesApi");
      await resourcesApi.createResource({
        title: `${selectedBatch}: Class ${classNo} - ${topic}`,
        description: notes || "Live class session recording and practice materials",
        url: rawUrl,
        link: passcode ? `Passcode: ${passcode}` : undefined,
      });
    } catch {}
    const newSubmission: ClassRecordingSubmission = {
      id: `rec-${Date.now()}`,
      batchCode: selectedBatch,
      courseName: selectedBatch === "REV-8TH" ? "Professional Revit Combo" : "BIM Detailing",
      instructorName: "Engr. Ashikur Rahman",
      classNo, topic, rawRecordingUrl: rawUrl, passcode: passcode || undefined,
      attachedModel: attachedFile || "Class_Practice.rvt",
      submittedAt: "Just now", duration: "1h 45m",
      notes: notes || "Recorded session.", status: "Pending Admin Upload",
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
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Submit recorded video and practice BIM models to Administration for YouTube publishing</p>
      </div>

      {success && <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold">Successfully submitted recording to Administration queue!</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Select Batch</label>
            <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs">
              <option value="REV-8TH">Revit Combo (REV-8TH)</option>
              <option value="TEK-8TH">Tekla Steel (TEK-8TH)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Class No</label>
            <input type="number" required placeholder="28" value={classNo} onChange={(e) => setClassNo(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Class Topic</label>
            <input type="text" required placeholder="e.g. Column & Rebar" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Raw Video Link (Zoom / Drive)</label>
            <input type="url" required placeholder="https://zoom.us/..." value={rawUrl} onChange={(e) => setRawUrl(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Passcode & Note</label>
            <input type="text" placeholder="Passcode / Notes for admin" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs" />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button type="submit" className="px-7 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-black text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-2 transition-all hover:scale-102">
            <Send className="w-4 h-4 text-sky-300" />
            <span>Handover Recording to Admin</span>
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h4 className="font-black text-slate-900 text-sm sm:text-base">Submitted Recordings Status</h4>
        {list.length === 0 ? (
          <div className="p-6 text-center text-slate-500 font-semibold bg-slate-50 rounded-2xl border border-slate-200 text-xs">No recording submissions recorded yet.</div>
        ) : (
          list.map((rec) => (
            <div key={rec.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#0077b6]/10 text-[#0077b6] font-bold text-xs">{rec.batchCode}</span>
                  <strong className="text-slate-900 font-bold">{rec.topic}</strong>
                </div>
                <span className="text-slate-500 text-xs block">Submitted: {rec.submittedAt}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black shrink-0 bg-emerald-100 text-emerald-800">{rec.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
