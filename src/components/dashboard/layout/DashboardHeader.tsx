"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Search, LogOut, ShieldAlert, ChevronDown, User } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";
import DashboardHeaderNotifications from "./DashboardHeaderNotifications";
import { authApi } from "@/services/api/authApi";

interface DashboardHeaderProps {
  currentRole: "student" | "instructor" | "admin";
  currentUser: UserAccount;
  onOpenMobileSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function DashboardHeader({
  currentRole,
  currentUser,
  onOpenMobileSidebar,
  searchQuery,
  setSearchQuery,
}: DashboardHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
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
    try {
      await authApi.logoutAll();
    } catch {}
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <header className="bg-white/85 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 px-4 sm:px-8 py-3 shadow-2xs font-sans">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Dynamic Portal Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:block">
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight tracking-tight">
              {currentRole === "student" && "Student Learning Portal"}
              {currentRole === "instructor" && "Instructor & Trainer Console"}
              {currentRole === "admin" && "Super Admin & Control Center"}
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">BIM Build BD Engineering Workspace</p>
          </div>
        </div>

        {/* Center: Search Bar with Keyboard Shortcut Badge */}
        <div className="hidden md:flex items-center relative w-64 lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search class, assignment, or file..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-12 py-2 rounded-xl bg-slate-100/90 border border-slate-200/80 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0077b6] focus:ring-2 focus:ring-sky-500/10 focus:outline-none transition-all"
          />
          <kbd className="hidden lg:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
            ⌘K
          </kbd>
        </div>

        {/* Right: Notifications & User Profile Menu */}
        <div className="flex items-center gap-3">
          <DashboardHeaderNotifications />

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer select-none"
            >
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-slate-300 shadow-2xs"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full ring-1 ring-emerald-400/30" />
              </div>
              <div className="hidden lg:block text-left leading-tight">
                <span className="text-xs font-extrabold text-slate-900 block truncate max-w-[120px]">
                  {currentUser.name}
                </span>
                <span className="text-[10px] font-bold text-[#0077b6] bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200/60 uppercase tracking-wider inline-block">
                  {currentRole}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 space-y-1 text-xs font-medium"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-extrabold text-slate-900 truncate">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{currentUser.email || "student@lms.com"}</p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out (This Device)</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogoutAll}
                  className="w-full text-left px-3 py-2 rounded-xl text-amber-700 hover:bg-amber-50 font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Log Out All Devices</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
