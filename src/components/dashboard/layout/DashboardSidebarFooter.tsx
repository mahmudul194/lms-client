"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, LogOut, Headphones } from "lucide-react";

export default function DashboardSidebarFooter() {
  return (
    <div className="p-4 border-t border-white/10 bg-[#001830] space-y-3 font-sans">
      {/* Mentor Support Mini Card */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold text-sky-200">
            <Headphones className="w-4 h-4 text-sky-400" />
            <span>Mentor Support</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <a
          href="https://wa.me/8801879526108"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#0077b6]/20 hover:bg-[#0077b6]/30 border border-[#0077b6]/30 text-sky-300 hover:text-white transition-all text-xs font-semibold font-bold group"
        >
          <span>+880 1879-526108</span>
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* Full-width Styled Log Out Button */}
      <button
        type="button"
        onClick={async () => {
          try {
            const { authApi } = await import("@/services/api/authApi");
            await authApi.logout();
          } catch {}
          if (typeof window !== "undefined") {
            localStorage.removeItem("bim_access_token");
            localStorage.removeItem("bim_user_role");
            localStorage.removeItem("bim_active_tab");
            window.location.href = "/login";
          }
        }}
        className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out</span>
      </button>
    </div>
  );
}
