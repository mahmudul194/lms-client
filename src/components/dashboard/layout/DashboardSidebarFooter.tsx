"use client";

import React, { useState } from "react";
import { MessageCircle, LogOut, Headphones, ShieldAlert, Check } from "lucide-react";
import { authApi } from "@/services/api/authApi";

export default function DashboardSidebarFooter() {
  const [loggingOut, setLoggingOut] = useState(false);
  const [loggingOutAll, setLoggingOutAll] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authApi.logout();
    } catch {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("bim_access_token");
      localStorage.removeItem("bim_user_role");
      localStorage.removeItem("bim_user_name");
      localStorage.removeItem("bim_user_email");
      localStorage.removeItem("bim_user_id");
      window.location.href = "/login";
    }
  };

  const handleLogoutAll = async () => {
    if (!confirm("Are you sure you want to log out from ALL active devices?")) return;
    setLoggingOutAll(true);
    try {
      await authApi.logoutAll();
    } catch {}
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

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
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#0077b6]/20 hover:bg-[#0077b6]/30 border border-[#0077b6]/30 text-sky-300 hover:text-white transition-all text-xs font-bold group"
        >
          <span>+880 1879-526108</span>
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* Logout Controls */}
      <div className="grid grid-cols-2 gap-2">
        {/* Log Out Current Device */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut || loggingOutAll}
          className="py-2.5 px-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          title="Log out from this device"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{loggingOut ? "Leaving..." : "Log Out"}</span>
        </button>

        {/* Log Out All Devices */}
        <button
          type="button"
          onClick={handleLogoutAll}
          disabled={loggingOut || loggingOutAll}
          className="py-2.5 px-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 hover:text-amber-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          title="Log out from all devices"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>{loggingOutAll ? "Resetting..." : "Logout All"}</span>
        </button>
      </div>
    </div>
  );
}
