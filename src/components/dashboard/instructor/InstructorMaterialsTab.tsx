"use client";

import React, { useState } from "react";
import { Upload, Plus, Check } from "lucide-react";

export default function InstructorMaterialsTab() {
  const [selectedBatch, setSelectedBatch] = useState("REV-8TH");
  const [materials, setMaterials] = useState([
    { id: "mat-1", title: "Class 28: Structural Column & Rebar Detailing in Revit", batchCode: "REV-8TH", classNo: "28", attachedFile: "Class_28_Rebar_Model.rvt (38 MB)", uploadDate: "Aug 22, 2026" },
    { id: "mat-2", title: "Class 27: 3D Curtain Wall & Custom Parametric Family", batchCode: "REV-8TH", classNo: "27", attachedFile: "Curtain_Wall_Profiles.rfa (12 MB)", uploadDate: "Aug 19, 2026" },
    { id: "mat-3", title: "Class 18: PEB Steel Columns & Base Plate Connections", batchCode: "TEK-8TH", classNo: "18", attachedFile: "Tekla_BasePlate_Model.zip (45 MB)", uploadDate: "Aug 21, 2026" },
  ]);

  const [title, setTitle] = useState("");
  const [classNo, setClassNo] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newMat = {
      id: `mat-${Date.now()}`,
      title,
      batchCode: selectedBatch,
      classNo,
      attachedFile: fileName || "Class_Practice_Exercise.rvt (28 MB)",
      uploadDate: "Just now",
    };
    setMaterials([newMat, ...materials]);
    setTitle(""); setClassNo(""); setVideoUrl(""); setFileName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
          <Upload className="w-6 h-6 text-[#0077b6]" />
          <span>Upload Class Videos & Project Materials</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Publish recorded lectures (YouTube Unlisted) and attach exercise BIM models for students</p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Lecture uploaded and published to Student Portal successfully!</span>
        </div>
      )}

      <form onSubmit={handleUpload} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 text-xs sm:text-sm">
        <h4 className="font-black text-slate-900 text-sm sm:text-base">Upload New Recorded Class Lecture</h4>
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
            <label className="text-xs font-bold text-slate-700 block mb-1">Attached Exercise File</label>
            <input type="text" placeholder="e.g. Beam_Framing.rvt" value={fileName} onChange={(e) => setFileName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Lecture Topic / Title</label>
            <input type="text" required placeholder="e.g. Class 29: Structural Beam-Slab Framing" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">YouTube Unlisted URL</label>
            <input type="url" required placeholder="https://www.youtube.com/watch?v=..." value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none" />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button type="submit" className="px-6 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-extrabold text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-2">
            <Plus className="w-4 h-4 text-sky-300" />
            <span>Publish Lecture</span>
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h4 className="font-black text-slate-900 text-sm sm:text-base">Published Lecture Library</h4>
        {materials.map((m) => (
          <div key={m.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#0077b6]/10 text-[#0077b6] font-bold text-xs">{m.batchCode}</span>
                <strong className="text-slate-900 font-bold">{m.title}</strong>
              </div>
              <span className="text-slate-500 text-xs font-medium block mt-1">Attached: <strong className="text-slate-700">{m.attachedFile}</strong> • {m.uploadDate}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">Live in Classroom</span>
          </div>
        ))}
      </div>
    </div>
  );
}
