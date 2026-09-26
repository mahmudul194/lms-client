"use client";

import React, { useState, useEffect } from "react";
import { Video, Calendar, Clock, Copy, Check } from "lucide-react";
import { LiveClass } from "@/types/dashboard";

export default function StudentLiveScheduleTab({ liveClasses }: { liveClasses?: LiveClass[] }) {
  const [list, setList] = useState<LiveClass[]>(liveClasses || []);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { liveSchedulesApi } = await import("@/services/api/liveSchedulesApi");
        const res = await liveSchedulesApi.getAllLiveSchedules({ limit: 20 });
        if (res.statusCode === 200 && res.data?.items?.length) {
          const apiLives: LiveClass[] = res.data.items.map((ls, idx) => ({
            id: idx + 1,
            title: ls.title,
            instructor: ls.mentor?.user?.name || "BIM Specialist",
            date: ls.startTime ? new Date(ls.startTime).toLocaleDateString() : "Thursday",
            time: ls.startTime ? new Date(ls.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "9:00 PM",
            meetingId: ls.meetingId || "872 9102 4819",
            passcode: ls.meetingPassword || "BIM2026",
            zoomLink: ls.meetingUrl || "https://zoom.us/j/87291024819",
            status: ls.status === "live" ? "Live Now" : "Upcoming",
          }));
          setList(apiLives);
        }
      } catch {}
    })();
  }, []);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Video className="w-5 h-5 text-[#0077b6]" />
          <span>Live Class Schedule (Zoom / Meet)</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Attend live interactive lectures with mentor screen sharing and real-time doubt clearing
        </p>
      </div>

      {list.length === 0 ? (
        <div className="p-8 text-center text-slate-500 font-semibold bg-slate-50 rounded-2xl border border-slate-200">
          No live class schedules found in database.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((live) => (
            <div key={live.id} className="p-6 rounded-3xl border border-slate-200 bg-slate-50 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#0077b6] text-white text-xs font-bold shadow-xs">
                    {live.status}
                  </span>
                  <span className="text-xs font-bold text-slate-500 font-semibold">Live Intake Cohort</span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">{live.title}</h4>

                <div className="text-xs sm:text-sm text-slate-700 space-y-2 bg-white p-4 rounded-2xl border border-slate-200">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#0077b6]" />
                    <span>Date: <strong className="text-slate-900">{live.date}</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0077b6]" />
                    <span>Time: <strong className="text-slate-900">{live.time}</strong></span>
                  </p>
                  <p className="font-semibold text-slate-600 pt-1 border-t border-slate-100">
                    Meeting ID: <strong className="text-slate-900">{live.meetingId}</strong> • Passcode: <strong className="text-slate-900">{live.passcode}</strong>
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a href={live.zoomLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:scale-102">
                  <Video className="w-4 h-4" />
                  <span>Join Live Class</span>
                </a>

                <button onClick={() => handleCopy(live.id, `Meeting ID: ${live.meetingId}, Passcode: ${live.passcode}`)} className="px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer" title="Copy Meeting Info">
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
