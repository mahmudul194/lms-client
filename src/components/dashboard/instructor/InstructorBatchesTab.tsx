"use client";

import React, { useState, useEffect } from "react";
import { Video, Copy, Check, Monitor, ExternalLink, CalendarPlus, X } from "lucide-react";
import { BatchItem } from "@/services/api/batchesApi";
import { liveSchedulesApi, LiveScheduleItem } from "@/services/api/liveSchedulesApi";
import { createPortal } from "react-dom";

export default function InstructorBatchesTab({ batches }: { batches: BatchItem[] }) {
  const [selectedBatch, setSelectedBatch] = useState<BatchItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [liveSchedules, setLiveSchedules] = useState<LiveScheduleItem[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const currentBatch = selectedBatch || batches[0];

  useEffect(() => {
    if (currentBatch) {
      liveSchedulesApi.getAllLiveSchedules({ batchId: currentBatch.id, limit: 10 }).then((res) => {
        if (res.statusCode === 200 && res.data?.items) {
          setLiveSchedules(res.data.items);
        }
      }).catch(console.error);
    }
  }, [currentBatch]);

  const handleCopyLink = (url: string) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentBatch) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center font-sans space-y-2">
        <h3 className="text-xl font-bold text-slate-800">No active cohorts assigned</h3>
        <p className="text-sm text-slate-500">There are no teaching batches assigned to your instructor profile.</p>
      </div>
    );
  }

  // Find the next upcoming or live schedule
  const nextSchedule = liveSchedules.find(s => s.status === 'live' || s.status === 'scheduled') || liveSchedules[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Video className="w-6 h-6 text-[#0077b6]" />
            <span>Batches & Live Class Studio</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Monitor syllabus progress, student rosters, and launch live classes</p>
        </div>
        <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-200 w-fit">
          {batches.length} Active Cohorts
        </span>
      </div>

      <div className="space-y-2.5">
        <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">Select Your Active Teaching Batch:</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {batches.map((b) => (
            <button key={b.id} onClick={() => setSelectedBatch(b)} className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              currentBatch.id === b.id ? "border-[#0077b6] bg-sky-50/70 ring-2 ring-sky-300 shadow-sm" : "border-slate-200 bg-slate-50/70 hover:bg-white text-slate-700"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#0077b6] bg-sky-100 px-2 py-0.5 rounded-md">{b.code}</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">{b.status}</span>
              </div>
              <strong className="block text-sm text-slate-900 font-extrabold mt-1.5 truncate">{b.name}</strong>
              <span className="text-xs text-slate-500 block mt-0.5">{b.enrolled_count || 0} Students</span>
            </button>
          ))}
        </div>
      </div>

      {nextSchedule ? (
        <div className="p-6 sm:p-7 rounded-3xl bg-[#001830] text-white space-y-5 shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">LIVE STUDIO • {currentBatch.code}</span>
              <h4 className="text-lg sm:text-xl font-black text-white mt-0.5">{nextSchedule.title}</h4>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowCreateModal(true)} className="p-2 bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 rounded-full transition-colors" title="Create another schedule">
                <CalendarPlus className="w-5 h-5" />
              </button>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black flex items-center gap-1.5 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="uppercase">{nextSchedule.status}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10"><span className="text-slate-400 block text-xs">Meeting ID</span><strong className="text-base font-black text-white mt-0.5 block">{nextSchedule.meetingId || "N/A"}</strong></div>
            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10"><span className="text-slate-400 block text-xs">Host Passcode</span><strong className="text-base font-black text-white mt-0.5 block">{nextSchedule.meetingPassword || "N/A"}</strong></div>
            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10"><span className="text-slate-400 block text-xs">Live Time</span><strong className="text-base font-black text-sky-300 mt-0.5 block">{new Date(nextSchedule.startTime).toLocaleString()}</strong></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <a href={nextSchedule.meetingUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:flex-1 py-3.5 rounded-2xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102">
              <Monitor className="w-4 h-4" />
              <span>Launch {nextSchedule.platform === 'zoom' ? 'Zoom' : 'Meet'} as Host</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
            <button onClick={() => handleCopyLink(nextSchedule.meetingUrl)} className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Link Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
          <CalendarPlus className="w-12 h-12 text-slate-300 mx-auto" />
          <div>
            <h4 className="text-lg font-bold text-slate-700">No Live Schedules Yet</h4>
            <p className="text-sm text-slate-500">Create a new live schedule for this batch.</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2.5 rounded-xl bg-[#0077b6] text-white font-bold hover:bg-[#005a8c] transition-colors"
          >
            Create Live Schedule
          </button>
        </div>
      )}

      {showCreateModal && (
        <CreateLiveScheduleModal 
          batch={currentBatch} 
          onClose={() => setShowCreateModal(false)}
          onSuccess={(newSchedule) => {
            setLiveSchedules([newSchedule, ...liveSchedules]);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

function CreateLiveScheduleModal({ batch, onClose, onSuccess }: { batch: BatchItem, onClose: () => void, onSuccess: (s: LiveScheduleItem) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [platform, setPlatform] = useState("google_meet");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [meetingPassword, setMeetingPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await liveSchedulesApi.createLiveSchedule({
        batchId: batch.id,
        title,
        description,
        startTime: new Date(startTime).toISOString(),
        platform,
        meetingUrl,
        meetingId,
        meetingPassword,
        status: "scheduled"
      });
      if (res.statusCode === 201 && res.data) {
        onSuccess(res.data);
      } else {
        setError("Failed to create schedule.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to create schedule.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <h3 className="text-xl font-black text-slate-900">Create Live Schedule</h3>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-700 rounded-xl text-sm font-bold border border-rose-200">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">Topic / Title *</label>
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none" placeholder="e.g. Introduction to BIM" />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">Start Time *</label>
            <input required type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1">Platform *</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none">
                <option value="google_meet">Google Meet</option>
                <option value="zoom">Zoom</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1">Meeting ID</label>
              <input type="text" value={meetingId} onChange={e => setMeetingId(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">Meeting URL *</label>
            <input required type="url" value={meetingUrl} onChange={e => setMeetingUrl(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none" placeholder="https://..." />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">Password (Optional)</label>
            <input type="text" value={meetingPassword} onChange={e => setMeetingPassword(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:border-[#0077b6] focus:outline-none" />
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[#0077b6] text-white font-bold rounded-xl hover:bg-[#005a8c] disabled:opacity-50">
              {loading ? "Saving..." : "Create Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}


