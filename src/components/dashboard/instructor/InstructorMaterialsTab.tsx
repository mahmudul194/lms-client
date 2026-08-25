"use client";

import React, { useState } from "react";
import { Upload, Plus, FileText, Check } from "lucide-react";

export default function InstructorMaterialsTab() {
  const [materials, setMaterials] = useState([
    {
      id: "mat-1",
      title: "Class 28: Structural Column & Rebar Detailing in Revit",
      batchCode: "REV-5TH",
      classNo: "28",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      attachedFile: "Class_28_Rebar_Model.rvt (38 MB)",
      uploadDate: "Aug 13, 2026",
    },
    {
      id: "mat-2",
      title: "Class 27: 3D Curtain Wall & Custom Parametric Family",
      batchCode: "REV-5TH",
      classNo: "27",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      attachedFile: "Curtain_Wall_Profiles.rfa (12 MB)",
      uploadDate: "Aug 10, 2026",
    },
  ]);

  const [title, setTitle] = useState("");
  const [classNo, setClassNo] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newMat = {
      id: `mat-${Date.now()}`,
      title,
      batchCode: "REV-5TH",
      classNo,
      videoUrl: videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
      attachedFile: "Class_Exercise_Pack.zip (25 MB)",
      uploadDate: "Just now",
    };

    setMaterials([newMat, ...materials]);
    setTitle("");
    setClassNo("");
    setVideoUrl("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Upload className="w-5 h-5 text-[#0077b6]" />
          <span>Upload Lecture Backups & Project Families</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Publish recorded class videos and attach practice exercise models for your students
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Lecture uploaded and published to Student Portal successfully!</span>
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 text-xs sm:text-sm">
        <h4 className="font-extrabold text-slate-900 text-sm">Add New Lecture Video</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Class No</label>
            <input
              type="text"
              required
              placeholder="e.g. 29"
              value={classNo}
              onChange={(e) => setClassNo(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 block mb-1">Lecture Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Class 29: Structural Beam-Slab Framing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Video Embed / Cloud URL</label>
          <input
            type="url"
            required
            placeholder="https://www.youtube.com/embed/..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#0077b6] focus:outline-none"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Lecture</span>
          </button>
        </div>
      </form>

      {/* Uploaded Materials List */}
      <div className="space-y-3">
        <h4 className="font-extrabold text-slate-900 text-sm">Published Lecture Library</h4>
        {materials.map((m) => (
          <div
            key={m.id}
            className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm"
          >
            <div>
              <strong className="text-slate-900 block font-bold">{m.title}</strong>
              <span className="text-slate-500 text-xs font-semibold">
                Batch: {m.batchCode} • Attached: {m.attachedFile} • {m.uploadDate}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              Published
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
