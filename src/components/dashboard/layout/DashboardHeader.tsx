"use client";

import React from "react";
import Link from "next/link";
import { Menu, Search, LogOut } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";
import DashboardHeaderNotifications from "./DashboardHeaderNotifications";

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
          <kbd className="hidden lg:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold font-bold bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
            ⌘K
          </kbd>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-3">
          <DashboardHeaderNotifications />

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* User Mini Profile Avatar & Role Pill */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-slate-300 shadow-2xs"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full ring-1 ring-emerald-400/30" />
            </div>
            <div className="hidden lg:block text-left leading-tight">
              <span className="text-xs font-extrabold text-slate-900 block truncate max-w-[140px]">
                {currentUser.name}
              </span>
              <span className="text-[10px] font-bold text-[#0077b6] bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200/60 uppercase tracking-wider inline-block">
                {currentRole}
              </span>
            </div>
          </div>

          <Link
            href="/login"
            title="Log Out"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
