"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit, Award, User, BookOpen, Calendar, FileCheck, RefreshCw } from "lucide-react";
import { certificatesApi, CertificateItem } from "@/services/api/certificatesApi";

interface AdminCertificateDetailsProps {
  certificateId: string;
  onBack: () => void;
}

export default function AdminCertificateDetails({ certificateId, onBack }: AdminCertificateDetailsProps) {
  const [certificate, setCertificate] = useState<CertificateItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await certificatesApi.getCertificateById(certificateId);
        if (res.statusCode === 200 && res.data) {
          setCertificate(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [certificateId]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Loading certificate details...</div>;
  }

  if (!certificate) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-500 font-semibold">Certificate not found.</p>
        <button onClick={onBack} className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold transition-colors">Go Back</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 font-sans animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-start gap-4">
          <button onClick={onBack} className="mt-1 p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                certificate.status === 'issued' ? 'bg-emerald-100 text-emerald-700' :
                certificate.status === 'revoked' ? 'bg-rose-100 text-rose-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {certificate.status}
              </span>
              <span className="text-xs font-bold text-slate-400">ID: {certificate.certificateNumber || certificate.id}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Certificate of Completion</h3>
            <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0077b6]" />
              Official Document
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {certificate.certificateUrl && (
            <a href={certificate.certificateUrl} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shrink-0">
              <FileCheck className="w-4 h-4" />
              <span>View PDF</span>
            </a>
          )}
          <button className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shrink-0">
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
            <User className="w-6 h-6 text-[#0077b6]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Recipient</div>
            <div className="text-xl font-black text-slate-900">{certificate.studentName || certificate.student?.name}</div>
            <div className="text-sm font-semibold text-slate-500 mt-1">Student ID: {certificate.studentId}</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
            <BookOpen className="w-6 h-6 text-[#0077b6]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Course Details</div>
            <div className="text-xl font-black text-slate-900">{certificate.courseName}</div>
            <div className="text-sm font-semibold text-slate-500 mt-1">Batch: {certificate.batchNumber || "Global"}</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
            <Calendar className="w-6 h-6 text-[#0077b6]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Issue Date</div>
            <div className="text-xl font-black text-slate-900">
              {certificate.issueDate ? new Date(certificate.issueDate).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric'
              }) : "N/A"}
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
            <RefreshCw className="w-6 h-6 text-[#0077b6]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">System Metadata</div>
            <div className="text-sm font-semibold text-slate-700 mt-1">Record Created: {certificate.createdAt ? new Date(certificate.createdAt).toLocaleDateString() : "N/A"}</div>
            <div className="text-sm font-semibold text-slate-700 mt-1">Current Status: {certificate.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
