"use client";

import React, { useState } from "react";
import { UserCheck, ArrowLeft, ArrowRight, UserPlus, BookOpen } from "lucide-react";
import { InstructorRecord } from "./AdminInstructorsTab";

const INITIAL_FORM = {
  // Step 1: User Data
  name: "",
  email: "",
  phone: "",
  password: "",
  // Step 2: Mentor Data
  designation: "",
  subject: "",
  experience: "",
  bio: "",
  skills: "",
  expertise: "",
  facebook: "",
  linkedin: "",
};

interface AdminAddInstructorViewProps {
  onBack: () => void;
  onAdd: (trainer: InstructorRecord) => void;
}

export default function AdminAddInstructorView({
  onBack,
  onAdd,
}: AdminAddInstructorViewProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdUserId, setCreatedUserId] = useState<string | null>(null);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setError("");
      setLoading(true);
      try {
        const { usersApi } = await import("@/services/api/usersApi");
        
        // Only create user if not already created in this session
        if (!createdUserId) {
          const uRes = await usersApi.createUser({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            password: form.password.trim() || "123456",
            role: "mentor",
          });
          
          if (uRes.statusCode === 201 || uRes.statusCode === 200) {
            setCreatedUserId(uRes.data?.id || null);
            setStep(2);
          } else {
            setError(uRes.message || "Failed to create user account.");
          }
        } else {
          setStep(2);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred creating the user.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createdUserId) return;
    
    setError("");
    setLoading(true);
    try {
      const { mentorsApi } = await import("@/services/api/mentorsApi");
      
      const skillsArray = form.skills.split(",").map(s => s.trim()).filter(s => s);
      const expertiseArray = form.expertise.split(",").map(e => e.trim()).filter(e => e);

      const mRes = await mentorsApi.createMentor({
        userId: createdUserId,
        designation: form.designation.trim(),
        subject: form.subject.trim(),
        experience: form.experience.trim(),
        bio: form.bio.trim(),
        skills: skillsArray.length > 0 ? skillsArray : undefined,
        expertise: expertiseArray.length > 0 ? expertiseArray : undefined,
        facebook: form.facebook.trim(),
        linkedin: form.linkedin.trim(),
      });

      if (mRes.statusCode === 201 || mRes.statusCode === 200) {
        // Construct the record for the local state update
        onAdd({
          id: mRes.data?.id || `ins-${Date.now()}`,
          name: form.name.trim(),
          role: form.designation.trim(),
          specialty: form.subject.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          status: "Active",
          rawData: mRes.data
        });
        onBack();
      } else {
        setError(mRes.message || "Failed to create mentor profile.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred creating the mentor profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans animate-in fade-in duration-200">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <button 
          onClick={onBack} 
          className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            {step === 1 ? <UserPlus className="w-6 h-6 text-[#0077b6]" /> : <BookOpen className="w-6 h-6 text-[#0077b6]" />}
            Add New Trainer - Step {step} of 2
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {step === 1 ? "Create the user account credentials first." : "Add professional mentor details for this user."}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-semibold">
          {error}
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleNext} className="space-y-5 max-w-2xl">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">User Account Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Full Name *</label>
                <input type="text" required placeholder="e.g. John Doe" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Email Address *</label>
                <input type="email" required placeholder="john@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Phone Number</label>
                <input type="tel" placeholder="+880 1XXXXXXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Password *</label>
                <input type="password" required placeholder="Min 6 characters" value={form.password} onChange={(e) => update("password", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-bold transition-all flex items-center gap-2">
              {loading ? "Creating..." : "Next Step"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Professional Mentor Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Designation *</label>
                <input type="text" required placeholder="e.g. Senior BIM Engineer" value={form.designation} onChange={(e) => update("designation", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Main Subject *</label>
                <input type="text" required placeholder="e.g. Architecture" value={form.subject} onChange={(e) => update("subject", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Years of Experience</label>
                <input type="text" placeholder="e.g. 5+ Years" value={form.experience} onChange={(e) => update("experience", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Bio</label>
                <textarea rows={3} placeholder="Brief description of the mentor..." value={form.bio} onChange={(e) => update("bio", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none resize-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Skills (Comma Separated)</label>
                <input type="text" placeholder="e.g. AutoCAD, Revit, Navisworks" value={form.skills} onChange={(e) => update("skills", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Expertise (Comma Separated)</label>
                <input type="text" placeholder="e.g. BIM Management, Clash Detection" value={form.expertise} onChange={(e) => update("expertise", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">Facebook URL</label>
                <input type="url" placeholder="https://facebook.com/..." value={form.facebook} onChange={(e) => update("facebook", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-sm">LinkedIn URL</label>
                <input type="url" placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" disabled={loading} onClick={() => setStep(1)} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all">Back</button>
            <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all">
              {loading ? "Saving..." : "Save Trainer Profile"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
