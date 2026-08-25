"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface DashboardBrandHeaderProps {
  currentRole: string;
  onCloseMobile: () => void;
}

export default function DashboardBrandHeader({
  currentRole,
  onCloseMobile,
}: DashboardBrandHeaderProps) {
  return (
    <div className="p-5 border-b border-white/10 flex items-center justify-between font-sans">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
          <img
            src="/logo.jpeg"
            alt="BIM Build BD"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
        <div>
          <h1 className="text-base font-black text-white tracking-tight leading-none">
            BIM Build BD
          </h1>
          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-semibold font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            {currentRole} Portal
          </span>
        </div>
      </Link>

      <button
        onClick={onCloseMobile}
        className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 cursor-pointer"
        aria-label="Close sidebar"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
