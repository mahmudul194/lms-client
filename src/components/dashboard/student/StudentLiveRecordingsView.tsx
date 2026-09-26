"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, PlayCircle, Clock, Calendar, Download } from "lucide-react";
import { LiveScheduleItem } from "@/services/api/liveSchedulesApi";

interface StudentLiveRecordingsViewProps {
  courseTitle: string;
  batch: string;
  onBack: () => void;
  onPlayRecording: (videoUrl: string, title: string) => void;
}

export default function StudentLiveRecordingsView({
  courseTitle,
  batch,
  onBack,
  onPlayRecording,
}: StudentLiveRecordingsViewProps) {
  const [recordings, setRecordings] = useState<LiveScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { liveSchedulesApi } = await import("@/services/api/liveSchedulesApi");
        const res = await liveSchedulesApi.getAllLiveSchedules();
        if (res.statusCode === 200 && res.data?.items) {
          setRecordings(res.data.items);
        }
      } catch {} finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0077b6] hover:text-[#002b5b] transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> <span>Back to Course Options</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-[#002b5b] text-white text-xs font-bold">{batch}</span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">Live Session Recordings</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{courseTitle} — Live Class Recordings</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Watch recorded videos of live classes conducted in your batch</p>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-sky-50 text-[#0077b6] text-xs font-bold border border-sky-200 w-fit">{recordings.length} Recorded Sessions</span>
        </div>
      </div>

      <div className="space-y-3.5">
        {loading ? (
          <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">Loading recordings...</div>
        ) : recordings.length === 0 ? (
          <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">No live class recordings available yet for this batch.</div>
        ) : (
          recordings.map((rec, i) => (
            <div key={rec.id} className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-white hover:border-[#0077b6] hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-[#002b5b] text-white text-xs font-black">Class {i + 1}</span>
                  <h4 className="text-base font-black text-slate-900 leading-snug">{rec.title}</h4>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#0077b6]" /> {new Date(rec.startTime).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#0077b6]" /> 1h 30m</span>
                </div>
              </div>
              <button onClick={() => onPlayRecording(rec.meetingUrl, rec.title)} className="px-5 py-2.5 rounded-xl bg-[#0077b6] hover:bg-[#002b5b] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0">
                <PlayCircle className="w-4 h-4" /> <span>Watch Recording</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
