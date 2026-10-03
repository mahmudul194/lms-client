"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Award, Users } from "lucide-react";
import { CreateCertificatePayload, certificatesApi } from "@/services/api/certificatesApi";
import { batchesApi } from "@/services/api/batchesApi";
import { coursesApi } from "@/services/api/coursesApi";
import { studentsApi } from "@/services/api/studentsApi";
import { enrollmentsApi } from "@/services/api/enrollmentsApi";

interface AdminAddCertificateViewProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function AdminAddCertificateView({ onBack, onSuccess }: AdminAddCertificateViewProps) {
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  const [batches, setBatches] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]); // All students for single select
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    studentId: "",
    batchId: "",
    courseId: "",
    issueDate: new Date().toISOString().split("T")[0],
    signature1Name: "",
    signature1Designation: "",
    signature2Name: "",
    signature2Designation: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const cRes = await coursesApi.getAllCourses({ limit: 100 });
        if (cRes.data?.items) setCourses(cRes.data.items);

        const sRes = await studentsApi.getAllStudents({ limit: 500 });
        if (sRes.data?.items) setStudents(sRes.data.items);
      } catch (e) {
        console.error("Failed to fetch form data", e);
      }
    })();
  }, []);

  useEffect(() => {
    if (form.courseId) {
      (async () => {
        try {
          const bRes = await batchesApi.getAllBatches({ course_id: form.courseId, limit: 100 });
          if (bRes.data?.items) setBatches(bRes.data.items);
        } catch (e) {
          console.error("Failed to fetch batches", e);
        }
      })();
    } else {
      setBatches([]);
    }
  }, [form.courseId]);

  const handleSubmitSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentId || !form.batchId || !form.courseId) {
      alert("Student, Batch, and Course are required.");
      return;
    }

    const student = students.find(s => s.id === form.studentId);
    const course = courses.find(c => c.id === form.courseId);
    const batch = batches.find(b => b.id === form.batchId);

    const payload: CreateCertificatePayload = {
      studentId: form.studentId,
      batchId: form.batchId,
      courseId: form.courseId,
      studentName: student?.name || "Unknown Student",
      courseName: course?.title || "Unknown Course",
      batchNumber: batch?.code || "Unknown Batch",
      issueDate: new Date(form.issueDate).toISOString(),
      signature1Name: form.signature1Name || undefined,
      signature1Designation: form.signature1Designation || undefined,
      signature2Name: form.signature2Name || undefined,
      signature2Designation: form.signature2Designation || undefined,
      status: "issued"
    };

    setIsSubmitting(true);
    try {
      await certificatesApi.createCertificate(payload);
      onSuccess();
    } catch (err) {
      alert("Failed to issue certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.batchId || !form.courseId) {
      alert("Batch and Course are required for bulk generation.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Get all students in this batch
      const res = await enrollmentsApi.getAllEnrollments({ limit: 500 });
      const batchEnrollments = res.data?.items.filter((en: any) => en.batch?.id === form.batchId && en.student?.id) || [];
      
      if (batchEnrollments.length === 0) {
        alert("No students found in this batch.");
        setIsSubmitting(false);
        return;
      }

      const course = courses.find(c => c.id === form.courseId);
      const batch = batches.find(b => b.id === form.batchId);

      const bulkPayload: CreateCertificatePayload[] = batchEnrollments.map((en: any) => ({
        studentId: en.student.id,
        batchId: form.batchId,
        courseId: form.courseId,
        studentName: en.student.name || "Unknown Student",
        courseName: course?.title || "Unknown Course",
        batchNumber: batch?.code || "Unknown Batch",
        issueDate: new Date(form.issueDate).toISOString(),
        signature1Name: form.signature1Name || undefined,
        signature1Designation: form.signature1Designation || undefined,
        signature2Name: form.signature2Name || undefined,
        signature2Designation: form.signature2Designation || undefined,
        status: "issued"
      }));

      await certificatesApi.createBulkCertificates(bulkPayload);
      alert(`Successfully generated ${bulkPayload.length} certificates!`);
      onSuccess();
    } catch (err) {
      alert("Failed to issue bulk certificates");
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (field: string, value: any) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans animate-fade-in-up">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <button onClick={onBack} className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-[#0077b6]" />
            <span>Issue Certificates</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Generate course completion certificates for students</p>
        </div>
      </div>

      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("single")}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "single" ? "bg-white text-[#0077b6] shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
          }`}
        >
          <Award className="w-4 h-4" />
          Single Issue
        </button>
        <button
          onClick={() => setActiveTab("bulk")}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "bulk" ? "bg-white text-[#0077b6] shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
          }`}
        >
          <Users className="w-4 h-4" />
          Bulk Generate
        </button>
      </div>

      <form onSubmit={activeTab === "single" ? handleSubmitSingle : handleSubmitBulk} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-bold text-slate-700">Select Course *</label>
            <select
              required
              value={form.courseId}
              onChange={(e) => {
                update("courseId", e.target.value);
                update("batchId", "");
              }}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900"
            >
              <option value="">Choose a course...</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Select Batch *</label>
            <select
              required
              value={form.batchId}
              onChange={(e) => update("batchId", e.target.value)}
              disabled={!form.courseId}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900 disabled:opacity-50"
            >
              <option value="">{form.courseId ? "Choose a batch..." : "Select course first"}</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.code})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Issue Date *</label>
            <input
              type="date"
              required
              value={form.issueDate}
              onChange={(e) => update("issueDate", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <h4 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-2 mt-2">Signatures</h4>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">Signature 1 Name</label>
            <input
              type="text"
              placeholder="e.g. Dr. A. Rahman"
              value={form.signature1Name}
              onChange={(e) => update("signature1Name", e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none transition-all text-sm font-medium text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">Signature 1 Designation</label>
            <input
              type="text"
              placeholder="e.g. Course Director"
              value={form.signature1Designation}
              onChange={(e) => update("signature1Designation", e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none transition-all text-sm font-medium text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">Signature 2 Name</label>
            <input
              type="text"
              placeholder="e.g. Engr. M. Hasan"
              value={form.signature2Name}
              onChange={(e) => update("signature2Name", e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none transition-all text-sm font-medium text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">Signature 2 Designation</label>
            <input
              type="text"
              placeholder="e.g. Lead Instructor"
              value={form.signature2Designation}
              onChange={(e) => update("signature2Designation", e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none transition-all text-sm font-medium text-slate-900"
            />
          </div>

          {activeTab === "single" && (
            <div className="space-y-1.5 sm:col-span-2 mt-4">
              <label className="text-sm font-bold text-slate-700">Select Student *</label>
              <select
                required
                value={form.studentId}
                onChange={(e) => update("studentId", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0077b6] focus:outline-none focus:ring-4 focus:ring-[#0077b6]/10 transition-all font-medium text-slate-900"
              >
                <option value="">Choose a student...</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          {activeTab === "bulk" && (
            <div className="sm:col-span-2 p-5 bg-sky-50 rounded-2xl border border-sky-100 flex gap-4 mt-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                <Users className="w-6 h-6 text-[#0077b6]" />
              </div>
              <div>
                <h4 className="font-bold text-sky-900">Bulk Generation</h4>
                <p className="text-sm text-sky-700 mt-1">
                  This will generate certificates for all students enrolled in the selected batch. 
                  Make sure you have selected the correct batch and course before proceeding.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
          <button type="button" onClick={onBack} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102 flex items-center gap-2 disabled:opacity-50">
            <Save className="w-5 h-5 text-sky-300" />
            <span>{isSubmitting ? "Processing..." : activeTab === "single" ? "Issue Certificate" : "Generate All"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
