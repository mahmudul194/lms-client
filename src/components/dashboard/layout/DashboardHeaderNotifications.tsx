"use client";

import React, { useState } from "react";
import { Bell, CheckCircle2, Clock, Sparkles } from "lucide-react";

export default function DashboardHeaderNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 1,
      title: "Live Class Tonight at 9:00 PM",
      desc: "Class 29: Structural Beam-Slab Framing & Rebar Detailing.",
      time: "25m ago",
      type: "live",
    },
    {
      id: 2,
      title: "Assignment 7 Graded",
      desc: "Trainer gave 94/100 with feedback on column schedule.",
      time: "2h ago",
      type: "grade",
    },
    {
      id: 3,
      title: "New Revit Family Pack Added",
      desc: "Doors, Windows & Furniture library ready for download.",
      time: "1d ago",
      type: "resource",
    },
  ];

  return (
    <div className="relative font-sans">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setUnreadCount(0);
        }}
        className="relative p-2.5 rounded-xl text-slate-600 hover:text-[#0077b6] hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 space-y-3 z-50 animate-scale-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#0077b6]" />
              <span>Notifications & Alerts</span>
            </h4>
            <span className="text-[11px] text-[#0077b6] font-bold">Mark all as read</span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-sky-50/60 transition-colors border border-slate-100 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-bold">{n.title}</strong>
                  <span className="text-[10px] text-slate-400 font-semibold">{n.time}</span>
                </div>
                <p className="text-slate-600 leading-snug">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
