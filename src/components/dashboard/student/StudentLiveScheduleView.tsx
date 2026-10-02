"use client";

import React, { useState, useEffect } from "react";
import { Video, Calendar, Clock, Copy, Check, ArrowLeft } from "lucide-react";
import { liveSchedulesApi, LiveScheduleItem } from "@/services/api/liveSchedulesApi";

interface StudentLiveScheduleViewProps {
  courseTitle: string;
  batch: string;
  batchId: string;
  onBack: () => void;
}

export default function StudentLiveScheduleView({ courseTitle, batch, batchId, onBack }: StudentLiveScheduleViewProps) {
  const [list, setList] = useState<LiveScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await liveSchedulesApi.getAllLiveSchedules({ batchId, limit: 50 });
        if (res.statusCode === 200 && res.data?.items) {
          // Filter to only show upcoming/live, excluding completed/cancelled if desired
          // For now, let's show all or just 'scheduled' and 'live'
          const activeSchedules = res.data.items.filter(s => s.status === 'scheduled' || s.status === 'live');
          setList(activeSchedules);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [batchId]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0077b6] hover:text-[#002b5b] transition-colors cursor-pointer mb-2">
        <ArrowLeft className="w-4 h-4" /> <span>Back to Courses</span>
      </button>

      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#002b5b] text-white text-xs font-bold">{batch}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
          <Video className="w-6 h-6 text-[#0077b6]" />
          <span>{courseTitle} — Live Schedule</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Attend live interactive lectures with mentor screen sharing and real-time doubt clearing.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500 font-semibold bg-slate-50 rounded-2xl border border-slate-200 animate-pulse">
          Loading live schedule...
        </div>
      ) : list.length === 0 ? (
        <div className="p-8 text-center text-slate-500 font-semibold bg-slate-50 rounded-2xl border border-slate-200">
          No upcoming live classes are scheduled for this batch right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((live) => (
            <div key={live.id} className="p-6 rounded-3xl border border-slate-200 bg-slate-50 space-y-5 flex flex-col justify-between hover:border-[#0077b6] transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-xs ${live.status === 'live' ? 'bg-red-500 text-white animate-pulse' : 'bg-[#0077b6] text-white'}`}>
                    {live.status === 'live' ? 'LIVE NOW' : 'Upcoming'}
                  </span>
                  <span className="text-xs font-bold text-slate-500">Live Intake Cohort</span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">{live.title}</h4>

                <div className="text-xs sm:text-sm text-slate-700 space-y-2 bg-white p-4 rounded-2xl border border-slate-200">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#0077b6]" />
                    <span>Date: <strong className="text-slate-900">{new Date(live.startTime).toLocaleDateString()}</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0077b6]" />
                    <span>Time: <strong className="text-slate-900">{new Date(live.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></span>
                  </p>
                  <p className="font-semibold text-slate-600 pt-1 border-t border-slate-100">
                    Meeting ID: <strong className="text-slate-900">{live.meetingId || "N/A"}</strong> • Passcode: <strong className="text-slate-900">{live.meetingPassword || "N/A"}</strong>
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a href={live.meetingUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:scale-102">
                  <Video className="w-4 h-4" />
                  <span>Join Live Class</span>
                </a>

                <button onClick={() => handleCopy(live.id, `Meeting ID: ${live.meetingId}, Passcode: ${live.meetingPassword}`)} className="px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer" title="Copy Meeting Info">
                  {copiedId === live.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
