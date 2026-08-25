"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Lock, Save, CheckCircle2 } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";

interface StudentProfileTabProps {
  currentUser: UserAccount;
}

export default function StudentProfileTab({ currentUser }: StudentProfileTabProps) {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState("01711-223344");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 max-w-3xl font-sans">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">Student Profile & Settings</h3>
        <p className="text-sm text-slate-500 mt-1">
          Manage your student credentials, phone number for batch SMS alerts, and certificate name
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-sm font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-sm">
        <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-3xl border border-slate-200">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-18 h-18 rounded-2xl object-cover border-2 border-[#0077b6] shadow-sm shrink-0"
          />
          <div>
            <h4 className="font-black text-slate-900 text-lg">{name}</h4>
            <span className="text-sm text-[#0077b6] font-bold block mt-0.5">{currentUser.roleTitle}</span>
            <span className="text-xs sm:text-sm text-slate-500 font-semibold">{currentUser.details}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
              Full Name (For Certificate)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
              WhatsApp / Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
              Change Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                defaultValue="password123"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-[#0077b6] hover:bg-[#002b5b] text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
