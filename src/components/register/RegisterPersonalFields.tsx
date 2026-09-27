"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";

interface RegisterPersonalFieldsProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RegisterPersonalFields({ formData, onChange }: RegisterPersonalFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black uppercase tracking-wider text-[#0077b6] flex items-center gap-2 border-b border-slate-100 pb-2">
        <User className="w-4 h-4" />
        <span>1. Personal & Account Credentials</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">FULL NAME *</label>
          <div className="relative">
            <input
              type="text" name="name" required placeholder="e.g. Tanvir Hossain"
              value={formData.name} onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6]"
            />
            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">EMAIL ADDRESS *</label>
          <div className="relative">
            <input
              type="email" name="email" required placeholder="e.g. tanvir@example.com"
              value={formData.email} onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6]"
            />
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">MOBILE PHONE *</label>
          <div className="relative">
            <input
              type="tel" name="phone" required placeholder="e.g. 01712345678"
              value={formData.phone} onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6]"
            />
            <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">PASSWORD *</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} name="password" required placeholder="At least 6 characters"
              value={formData.password} onChange={onChange}
              className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6]"
            />
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <button
              type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">CONFIRM PASSWORD *</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} name="confirmPassword" required placeholder="Re-enter your password"
              value={formData.confirmPassword} onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6]"
            />
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
