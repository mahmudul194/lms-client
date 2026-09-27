"use client";

import React from "react";
import { BookOpen, Hash, Building } from "lucide-react";

interface RegisterAcademicFieldsProps {
  formData: {
    roll: string;
    registrationNumber: string;
    institute: string;
    technology: string;
    semester: string;
    session: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function RegisterAcademicFields({ formData, onChange }: RegisterAcademicFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black uppercase tracking-wider text-[#0077b6] flex items-center gap-2 border-b border-slate-100 pb-2">
        <BookOpen className="w-4 h-4" />
        <span>2. Polytechnic & Academic Information</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">STUDENT ROLL *</label>
          <div className="relative">
            <input
              type="text" name="roll" required placeholder="e.g. 589123"
              value={formData.roll} onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6]"
            />
            <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">REGISTRATION NUMBER *</label>
          <div className="relative">
            <input
              type="text" name="registrationNumber" required placeholder="e.g. 1502019482"
              value={formData.registrationNumber} onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6]"
            />
            <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">INSTITUTE NAME</label>
          <div className="relative">
            <input
              type="text" name="institute" placeholder="e.g. Dhaka Polytechnic Institute"
              value={formData.institute} onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6]"
            />
            <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">DEPARTMENT / TECHNOLOGY</label>
          <select
            name="technology" value={formData.technology} onChange={onChange}
            className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6] cursor-pointer"
          >
            <option value="Civil Technology">Civil Technology</option>
            <option value="Electrical Technology">Electrical Technology</option>
            <option value="Computer Technology">Computer Technology</option>
            <option value="Mechanical Technology">Mechanical Technology</option>
            <option value="Architecture Technology">Architecture Technology</option>
            <option value="Electronics Technology">Electronics Technology</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">SEMESTER</label>
          <select
            name="semester" value={formData.semester} onChange={onChange}
            className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6] cursor-pointer"
          >
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
            <option value="4">4th Semester</option>
            <option value="5">5th Semester</option>
            <option value="6">6th Semester</option>
            <option value="7">7th Semester</option>
            <option value="8">8th Semester</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">SESSION</label>
          <input
            type="text" name="session" placeholder="e.g. 2022-2023"
            value={formData.session} onChange={onChange}
            className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6]"
          />
        </div>
      </div>
    </div>
  );
}
