"use client";

import React, { useState } from "react";
import { User, Mail, Save, Award, Star, BookOpen, Check } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";

interface InstructorProfileTabProps {
  currentUser: UserAccount;
}

export default function InstructorProfileTab({ currentUser }: InstructorProfileTabProps) {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState("Lead Structural BIM Engineer & Autodesk Certified Instructor with 6+ years AEC industry expertise.");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 max-w-3xl font-sans">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">Trainer Profile & Credentials</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your instructor portfolio, specialization bio, and contact credentials
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Trainer credentials saved and updated successfully!</span>
        </div>
      )}

      {/* Trainer Stats Banner */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center">
          <span className="text-xs text-[#0077b6] font-bold uppercase block">Students Taught</span>
          <strong className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 block">520+</strong>
        </div>
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center">
          <span className="text-xs text-[#0077b6] font-bold uppercase block">Batches Lead</span>
          <strong className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 block">8 Cohorts</strong>
        </div>
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center">
          <span className="text-xs text-amber-600 font-bold uppercase block">Trainer Rating</span>
          <strong className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 block">★ 4.95</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-sm">
        {/* Avatar Card */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0077b6] shadow-sm"
          />
          <div>
            <h4 className="font-extrabold text-slate-900 text-base">{name}</h4>
            <span className="text-xs text-[#0077b6] font-bold block">{currentUser.roleTitle}</span>
            <span className="text-xs text-slate-500 font-medium">Autodesk Certified Professional (BIM / Revit)</span>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Trainer Biography</label>
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
            className="px-6 py-3 rounded-xl bg-[#002b5b] hover:bg-[#001830] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-sky-300" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
