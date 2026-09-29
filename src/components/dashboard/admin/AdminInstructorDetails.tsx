"use client";

import React from "react";
import { ArrowLeft, User, Info, Briefcase, Mail, Phone, BookOpen, Link, Globe, Shield, Monitor } from "lucide-react";

interface AdminInstructorDetailsProps {
  instructor: any;
  onBack: () => void;
}

export default function AdminInstructorDetails({ instructor, onBack }: AdminInstructorDetailsProps) {
  const user = instructor.user || {};

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
            Instructor Details: {user.name || "Unknown"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">Full profile, experience, and system records</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Basic Info Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-500" /> Basic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Full Name</span><span className="font-medium text-slate-900">{user.name || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Email Address</span><span className="font-medium text-slate-900">{user.email || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Phone Number</span><span className="font-medium text-slate-900">{user.phone || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Role</span><span className="font-medium text-slate-900 capitalize">{user.role || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Profile Status</span><span className="font-medium text-slate-900">{user.isBanned ? "On Leave / Banned" : "Active"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Account Created</span><span className="font-medium text-slate-900">{user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}</span></div>
          </div>
        </div>

        {/* Professional Info Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-500" /> Professional Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Designation</span><span className="font-medium text-slate-900">{instructor.designation || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Subject / Department</span><span className="font-medium text-slate-900">{instructor.subject || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Experience</span><span className="font-medium text-slate-900">{instructor.experience || "N/A"}</span></div>
            <div className="sm:col-span-2 lg:col-span-3">
              <span className="text-slate-500 block text-xs font-semibold mb-1.5">Bio</span>
              <p className="font-medium text-slate-900 whitespace-pre-wrap">{instructor.bio || "No bio provided."}</p>
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" /> Skills & Expertise
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm">
            <div>
              <span className="text-slate-500 block text-xs font-semibold mb-3">Core Expertise</span>
              <div className="flex flex-wrap gap-2">
                {instructor.expertise && instructor.expertise.length > 0 ? (
                  instructor.expertise.map((exp: string, i: number) => <span key={i} className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium rounded-lg shadow-sm">{exp}</span>)
                ) : (
                  <span className="text-slate-400">N/A</span>
                )}
              </div>
            </div>
            <div>
              <span className="text-slate-500 block text-xs font-semibold mb-3">Technical Skills</span>
              <div className="flex flex-wrap gap-2">
                {instructor.skills && instructor.skills.length > 0 ? (
                  instructor.skills.map((skill: string, i: number) => <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg shadow-sm">{skill}</span>)
                ) : (
                  <span className="text-slate-400">N/A</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Info className="w-4 h-4 text-pink-500" /> Social Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-slate-500 block text-xs font-semibold mb-1.5 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Facebook
              </span>
              <span className="font-medium text-sky-600 truncate block">
                {instructor.facebook ? <a href={instructor.facebook} target="_blank" rel="noreferrer" className="hover:underline">{instructor.facebook}</a> : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs font-semibold mb-1.5 flex items-center gap-2">
                <Link className="w-4 h-4" /> LinkedIn
              </span>
              <span className="font-medium text-sky-600 truncate block">
                {instructor.linkedin ? <a href={instructor.linkedin} target="_blank" rel="noreferrer" className="hover:underline">{instructor.linkedin}</a> : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Account & Security (Devices) */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Shield className="w-4 h-4 text-violet-500" /> Account Security & Devices
          </h3>
          <div className="space-y-5">
            <div>
              <span className="text-slate-500 block text-xs font-semibold mb-3">Active Login Devices ({user.devices?.length || 0})</span>
              <div className="flex flex-col gap-2">
                {user.devices && user.devices.length > 0 ? (
                  user.devices.map((device: string, i: number) => (
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
                  {user.lastlogin ? new Date(user.lastlogin).toLocaleString() : "Never"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs font-semibold mb-1.5">Mentor Profile Updated</span>
                <span className="font-medium text-slate-900">
                  {instructor.updatedAt ? new Date(instructor.updatedAt).toLocaleString() : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
