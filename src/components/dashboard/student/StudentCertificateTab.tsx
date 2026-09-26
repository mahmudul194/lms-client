"use client";

import React, { useState, useEffect } from "react";
import { Award, ShieldCheck, Lock, CheckCircle2, QrCode, Download } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";
import { CertificateItem } from "@/services/api/certificatesApi";

interface StudentCertificateTabProps {
  currentUser: UserAccount;
}

export default function StudentCertificateTab({ currentUser }: StudentCertificateTabProps) {
  const [cert, setCert] = useState<CertificateItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { certificatesApi } = await import("@/services/api/certificatesApi");
        const res = await certificatesApi.getAllCertificates();
        if (res.statusCode === 200 && res.data?.items?.length) {
          const found = res.data.items.find((c) => c.status === "issued");
          if (found) setCert(found);
        }
      } catch {} finally {
        setLoading(false);
      }
    })();
  }, []);

  const criteria = [
    { title: "Course Syllabus Completion", status: cert ? "100% Done" : "In Progress", isDone: !!cert },
    { title: "Modeling Assignments (Min 80%)", status: cert ? "Approved" : "In Evaluation", isDone: !!cert },
    { title: "Final Comprehensive BIM Project", status: cert ? "Verified" : "Pending", isDone: !!cert },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 max-w-4xl mx-auto font-sans">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0077b6] text-xs sm:text-sm font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Official BIM Credential</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Verified Professional BIM Certificate</h3>
        <p className="text-sm text-slate-500 leading-relaxed">Issued by BIM Build BD upon 100% curriculum completion and project evaluation.</p>
      </div>

      <div className="relative p-8 sm:p-12 rounded-3xl border-4 border-double border-slate-300 bg-gradient-to-b from-slate-50 to-white shadow-md text-center space-y-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 text-xs sm:text-sm text-slate-500 font-bold">
          <span>BIM BUILD BD ACADEMY</span>
          <span className="text-[#0077b6]">ISO 9001:2015 STANDARD</span>
        </div>

        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#002b5b] to-[#0077b6] text-white flex items-center justify-center mx-auto shadow-lg">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">This certifies that</span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 underline decoration-[#0077b6] decoration-2 underline-offset-8">
            {cert?.studentName || currentUser.nameEn}
          </h2>
          <p className="text-sm text-slate-600 pt-3">
            has demonstrated professional competence in <strong>{cert?.courseName || "Revit Architecture, Structural & MEP BIM Lifecycles"}</strong>
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="text-left space-y-0.5">
            <span className="text-slate-400 font-bold block text-xs">VERIFICATION ID</span>
            <span className="font-extrabold text-[#002b5b]">{cert?.certificateNumber || "BIM-CERT-2026-PENDING"}</span>
          </div>
          {cert?.certificateUrl ? (
            <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077b6] text-white font-bold text-xs shadow-md">
              <Download className="w-4 h-4" /> Download PDF
            </a>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">
              <QrCode className="w-4 h-4 text-[#0077b6]" /> <span>Scannable ID</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Graduation Milestone Checklist</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {criteria.map((c, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${c.isDone ? "bg-emerald-50/60 border-emerald-200" : "bg-white border-slate-200"} space-y-1`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">{c.title}</span>
                {c.isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-slate-400" />}
              </div>
              <span className={`text-xs font-bold ${c.isDone ? "text-emerald-700" : "text-amber-600"}`}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
