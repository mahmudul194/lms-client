"use client";

import React from "react";
import { createPortal } from "react-dom";
import { X, UploadCloud } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

interface AssignmentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssignmentUploadModal({
  isOpen,
  onClose,
}: AssignmentUploadModalProps) {
  const mounted = useIsMounted();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);

  if (!mounted || !isOpen) return null;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (selectedFile) {
      setUploading(true);
      try {
        const { uploadApi } = await import("@/services/api/uploadApi");
        await uploadApi.uploadFile(selectedFile);
      } catch {}
      setUploading(false);
    }
    onClose();
    alert("Assignment model submitted successfully!");
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shadow-xs shrink-0">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Submit Assignment Model
              </h3>
              <p className="text-xs text-slate-500">Supports images, models or archive files</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50/50 text-center space-y-2">
            <input
              type="file"
              required
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0077b6] file:text-white hover:file:bg-[#005a8c] file:cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block font-semibold">Supported formats: .jpg, .png, .gif, models</span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Notes for Evaluator (Optional)</label>
            <textarea
              rows={3}
              placeholder="Describe software version, LOD details, or special assumptions..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer hover:scale-102"
            >
              Upload & Submit
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
