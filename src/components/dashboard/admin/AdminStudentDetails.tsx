"use client";

import React from "react";
import { ArrowLeft, GraduationCap, User, Info, MapPin, Briefcase, Calendar, Monitor, Shield } from "lucide-react";

interface AdminStudentDetailsProps {
  student: any;
  onBack: () => void;
}

export default function AdminStudentDetails({ student, onBack }: AdminStudentDetailsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <button 
          onClick={onBack} 
          className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <User className="w-6 h-6 text-[#0077b6]" />
            Student Details: {student.name}
          </h2>
          <p className="text-sm text-slate-500 mt-1">Full profile and academic records</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Basic Info Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-500" /> Basic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Full Name</span><span className="font-medium text-slate-900">{student.name || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Date of Birth</span><span className="font-medium text-slate-900">{student.dateOfBirth || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Gender</span><span className="font-medium text-slate-900">{student.gender || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Profile Status</span><span className="font-medium text-slate-900">{student.isActive ? "Active" : "Inactive"} {student.isVerified && "✓"}</span></div>
          </div>
        </div>

        {/* Academic Info Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-500" /> Academic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Institute</span><span className="font-medium text-slate-900">{student.institute || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Department</span><span className="font-medium text-slate-900">{student.department || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Technology</span><span className="font-medium text-slate-900">{student.technology || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Semester</span><span className="font-medium text-slate-900">{student.semester || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Shift</span><span className="font-medium text-slate-900">{student.shift || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Session</span><span className="font-medium text-slate-900">{student.session || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Roll No</span><span className="font-medium text-slate-900">{student.roll || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Registration No</span><span className="font-medium text-slate-900">{student.registrationNumber || "N/A"}</span></div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" /> Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Email Address</span><span className="font-medium text-slate-900">{student.email || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Phone Number</span><span className="font-medium text-slate-900">{student.phone || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">District</span><span className="font-medium text-slate-900">{student.district || "N/A"}</span></div>
            <div className="sm:col-span-2 lg:col-span-3"><span className="text-slate-500 block text-xs font-semibold mb-1.5">Present Address</span><span className="font-medium text-slate-900">{student.presentAddress || "N/A"}</span></div>
            <div className="sm:col-span-2 lg:col-span-3"><span className="text-slate-500 block text-xs font-semibold mb-1.5">Permanent Address</span><span className="font-medium text-slate-900">{student.permanentAddress || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Division</span><span className="font-medium text-slate-900">{student.division || "N/A"}</span></div>
          </div>
        </div>

        {/* Professional & Social Info */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-500" /> Professional & Skills
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm mb-6">
            <div>
              <span className="text-slate-500 block text-xs font-semibold mb-3">Skills</span>
              <div className="flex flex-wrap gap-2">
                {student.skills && student.skills.length > 0 ? (
                  student.skills.map((skill: string, i: number) => <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg shadow-sm">{skill}</span>)
                ) : (
                  <span className="text-slate-400">N/A</span>
                )}
              </div>
            </div>
            <div>
              <span className="text-slate-500 block text-xs font-semibold mb-3">Interested Fields</span>
              <div className="flex flex-wrap gap-2">
                {student.interestedField && student.interestedField.length > 0 ? (
                  student.interestedField.map((field: string, i: number) => <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg shadow-sm">{field}</span>)
                ) : (
                  <span className="text-slate-400">N/A</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm pt-6 border-t border-slate-200/60">
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">GitHub</span><span className="font-medium text-sky-600 truncate block">{student.github ? <a href={student.github} target="_blank" rel="noreferrer" className="hover:underline">{student.github}</a> : "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">LinkedIn</span><span className="font-medium text-sky-600 truncate block">{student.linkedin ? <a href={student.linkedin} target="_blank" rel="noreferrer" className="hover:underline">{student.linkedin}</a> : "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Portfolio</span><span className="font-medium text-sky-600 truncate block">{student.portfolio ? <a href={student.portfolio} target="_blank" rel="noreferrer" className="hover:underline">{student.portfolio}</a> : "N/A"}</span></div>
          </div>
        </div>

        {/* Account & Security (Devices) */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Shield className="w-4 h-4 text-violet-500" /> Account Security & Devices
          </h3>
          <div className="space-y-5">
            <div>
              <span className="text-slate-500 block text-xs font-semibold mb-3">Active Login Devices ({student.user?.devices?.length || 0})</span>
              <div className="flex flex-col gap-2">
                {student.user?.devices && student.user.devices.length > 0 ? (
                  student.user.devices.map((device: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-sm max-w-2xl">
                      <Monitor className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-medium break-all">{device}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-slate-400">No active devices found.</span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm pt-5 border-t border-slate-200/60">
              <div>
                <span className="text-slate-500 block text-xs font-semibold mb-1.5">Last Login Time</span>
                <span className="font-medium text-slate-900">
                  {student.user?.lastlogin ? new Date(student.user.lastlogin).toLocaleString() : "Never"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs font-semibold mb-1.5">Account Created</span>
                <span className="font-medium text-slate-900">
                  {student.user?.createdAt ? new Date(student.user.createdAt).toLocaleString() : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Industrial Attachment */}
        {student.industrialAttachment && (
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 shadow-sm">
            <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Industrial Attachment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div><span className="text-amber-700/70 block text-xs font-semibold mb-1.5">Company</span><span className="font-medium text-amber-900">{student.attachmentCompany || "N/A"}</span></div>
              <div><span className="text-amber-700/70 block text-xs font-semibold mb-1.5">Status</span><span className="font-medium text-amber-900">{student.attachmentStatus || "N/A"}</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
