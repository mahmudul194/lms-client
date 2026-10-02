"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, Mail, Phone, Save, CheckCircle2, Camera, Loader2, Building2, MapPin, Link2, Globe, Code, Briefcase } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";

interface StudentProfileTabProps {
  currentUser: UserAccount;
}

export default function StudentProfileTab({ currentUser }: StudentProfileTabProps) {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [institute, setInstitute] = useState("");
  const [department, setDepartment] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const { studentsApi } = await import("@/services/api/studentsApi");
        const res = await studentsApi.getMyProfile();
        
        if (res.statusCode === 200 && res.data) {
          const student = res.data;
          if (student.name) setName(student.name);
          if (student.email) setEmail(student.email);
          if (student.phone) setPhone(student.phone);
          if (student.profileImage) setAvatar(student.profileImage);
          if (student.institute) setInstitute(student.institute);
          if (student.department) setDepartment(student.department);
          if (student.presentAddress) setPresentAddress(student.presentAddress);
          if (student.github) setGithub(student.github);
          if (student.linkedin) setLinkedin(student.linkedin);
          if (student.portfolio) setPortfolio(student.portfolio);
        }
      } catch (e) {
        console.error("Failed to fetch student profile", e);
      }
    })();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { uploadApi } = await import("@/services/api/uploadApi");
      const res = await uploadApi.uploadFile(file);
      if (res.statusCode === 201 && res.data?.url) {
        setAvatar(res.data.url);
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { studentsApi } = await import("@/services/api/studentsApi");
      await studentsApi.updateMyProfile({ 
        name, 
        phone, 
        profileImage: avatar,
        institute,
        department,
        presentAddress,
        github,
        linkedin,
        portfolio
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("bim_user_name", name);
      }
    } catch (e) {
      console.error("Failed to update profile", e);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 max-w-4xl font-sans mx-auto">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">Student Profile & Settings</h3>
        <p className="text-sm text-slate-500 mt-1">
          Manage your student credentials, academic details, and portfolio links.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-sm font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
          <div className="relative self-start sm:self-auto">
            <img
              src={avatar || currentUser.avatar}
              alt={name}
              className={`w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md shrink-0 transition-opacity ${uploading ? "opacity-50" : "opacity-100"}`}
            />
            {uploading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-[#0077b6] animate-spin" />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#0077b6] hover:bg-slate-50 hover:scale-105 transition-all"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-xl">{name}</h4>
            <span className="text-sm text-[#0077b6] font-bold block mt-1 uppercase tracking-wider">{currentUser.roleTitle}</span>
            <span className="text-sm text-slate-500 font-medium mt-1 block">{email}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          <div className="md:col-span-2">
            <h5 className="font-black text-slate-800 text-lg border-b border-slate-100 pb-2 mb-4">Personal Details</h5>
          </div>

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
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none bg-slate-50"
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
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none bg-slate-50"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
              Present Address
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
              <textarea
                value={presentAddress}
                onChange={(e) => setPresentAddress(e.target.value)}
                rows={2}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none bg-slate-50 resize-none"
              ></textarea>
            </div>
          </div>

          <div className="md:col-span-2 mt-4">
            <h5 className="font-black text-slate-800 text-lg border-b border-slate-100 pb-2 mb-4">Academic Details</h5>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
              Institute Name
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={institute}
                onChange={(e) => setInstitute(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none bg-slate-50"
                placeholder="e.g. Dhaka Polytechnic Institute"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
              Department
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none bg-slate-50"
                placeholder="e.g. Civil Engineering"
              />
            </div>
          </div>

          <div className="md:col-span-2 mt-4">
            <h5 className="font-black text-slate-800 text-lg border-b border-slate-100 pb-2 mb-4">Online Presence & Links</h5>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
              LinkedIn Profile
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none bg-slate-50"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
              GitHub Profile
            </label>
            <div className="relative">
              <Code className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none bg-slate-50"
                placeholder="https://github.com/username"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide block">
              Portfolio / Website Link
            </label>
            <div className="relative">
              <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#0077b6] focus:outline-none bg-slate-50"
                placeholder="https://myportfolio.com"
              />
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
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
