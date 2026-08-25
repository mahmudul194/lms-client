"use client";

import React, { useState } from "react";
import { User, Mail, Save } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";

interface InstructorProfileTabProps {
  currentUser: UserAccount;
}

export default function InstructorProfileTab({ currentUser }: InstructorProfileTabProps) {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState("Lead Structural BIM Engineer & Trainer with 6+ years industry expertise.");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 max-w-3xl font-sans">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl font-bold text-slate-900">Instructor Profile & Credentials</h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your instructor portfolio, specialization bio, and contact credentials
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold text-center">
          Instructor credentials saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-sm">
        {/* Avatar Banner */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0077b6] shadow-sm"
          />
          <div>
            <h4 className="font-extrabold text-slate-900 text-base">{name}</h4>
            <span className="text-xs text-[#0077b6] font-bold block">{currentUser.roleTitle}</span>
            <span className="text-xs text-slate-400 font-semibold">{currentUser.details}</span>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Instructor Bio</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
