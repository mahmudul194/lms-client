"use client";

import React, { useState, useEffect } from "react";
import { Award, ShieldCheck, Lock, CheckCircle2, QrCode, Download } from "lucide-react";
import { UserAccount } from "@/data/dummyAccounts";
import { CertificateItem } from "@/services/api/certificatesApi";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

interface StudentCertificateTabProps {
  currentUser: UserAccount;
}

export default function StudentCertificateTab({ currentUser }: StudentCertificateTabProps) {
  const [certs, setCerts] = useState<CertificateItem[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingCertId, setDownloadingCertId] = useState<string | null>(null);
  
  const certificateRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleDownloadPDF = async (certId: string, studentName: string) => {
    const certElement = certificateRefs.current[certId];
    if (!certElement) return;

    try {
      setDownloadingCertId(certId);
      
      const canvas = await html2canvas(certElement, {
        scale: 3, // 3x high-res
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // certificate element dimensions
      const canvasWidth = certElement.clientWidth;
      const canvasHeight = certElement.clientHeight;

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
      const imgWidth = canvasWidth * ratio;
      const imgHeight = canvasHeight * ratio;
      
      const marginX = (pdfWidth - imgWidth) / 2;
      const marginY = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", marginX, marginY, imgWidth, imgHeight);
      pdf.save(`${studentName.replace(/\s+/g, "_")}_Certificate.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setDownloadingCertId(null);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { certificatesApi } = await import("@/services/api/certificatesApi");
        const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
        
        const [certsRes, enrollmentsRes] = await Promise.all([
          certificatesApi.getAllCertificates({ limit: 100 }),
          enrollmentsApi.getMyEnrollments()
        ]);

        if (enrollmentsRes.statusCode === 200 && enrollmentsRes.data) {
          setEnrollments(enrollmentsRes.data);
        }

        if (certsRes.statusCode === 200 && certsRes.data?.items?.length) {
          const uName = (currentUser.name || currentUser.nameEn || "").trim().toLowerCase();
          
          const foundCerts = certsRes.data.items.filter(
            (c) =>
              c.status === "issued" &&
              ((c.studentName && c.studentName.trim().toLowerCase() === uName) ||
               (c.student?.name && c.student.name.trim().toLowerCase() === uName))
          );
          
          setCerts(foundCerts);
        }
      } catch (e) {
        console.error("Failed to fetch data", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUser.name, currentUser.nameEn]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 max-w-4xl mx-auto font-sans">
      <div className="text-center space-y-2 max-w-xl mx-auto border-b border-slate-100 pb-8">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0077b6] text-xs sm:text-sm font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Official BIM Credentials</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Verified Professional BIM Certificates</h3>
        <p className="text-sm text-slate-500 leading-relaxed">Issued by BIM Build BD upon 100% curriculum completion and project evaluation.</p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 font-semibold bg-slate-50 rounded-2xl border border-slate-200 animate-pulse">
          Loading your certificates...
        </div>
      ) : enrollments.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto shadow-sm border border-slate-100 text-slate-300">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-700">No Enrollments Found</h4>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">You are not enrolled in any batches yet. Enroll in a course to earn certificates!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {enrollments.map((enrollment) => {
            const batchName = enrollment.batch?.name || enrollment.batch?.code || "Unknown Batch";
            const courseTitle = enrollment.batch?.course?.title || "BIM Course";
            const cert = certs.find(c => c.batchId === enrollment.batch_id || (c.batchNumber && c.batchNumber === enrollment.batch?.code));

            return (
              <div key={enrollment.id} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">{courseTitle}</h4>
                    <p className="text-sm text-slate-500 font-medium">Batch: {batchName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${cert ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {cert ? "Certificate Issued" : "In Progress"}
                  </span>
                </div>

                {!cert ? (
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Graduation Milestone Checklist</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl border bg-white border-slate-200 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700">Course Syllabus Completion</span>
                          <Lock className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-xs font-bold text-amber-600">In Progress</span>
                      </div>
                      <div className="p-4 rounded-2xl border bg-white border-slate-200 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700">Modeling Assignments (Min 80%)</span>
                          <Lock className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-xs font-bold text-amber-600">In Evaluation</span>
                      </div>
                      <div className="p-4 rounded-2xl border bg-white border-slate-200 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700">Final Comprehensive BIM Project</span>
                          <Lock className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-xs font-bold text-amber-600">Pending</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div 
                      ref={(el) => {
                        if (el) {
                          certificateRefs.current[cert.id] = el;
                        }
                      }}
                      style={{ aspectRatio: '297/210' }}
                      className="relative p-8 sm:p-12 border-4 border-double border-slate-300 bg-gradient-to-b from-slate-50 to-white shadow-md text-center flex flex-col justify-center space-y-6 sm:space-y-8"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-4 text-xs sm:text-sm text-slate-500 font-bold">
                        <span>BIM BUILD BD ACADEMY</span>
                        <span className="text-[#0077b6]">ISO 9001:2015 STANDARD</span>
                      </div>

                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#002b5b] to-[#0077b6] text-white flex items-center justify-center mx-auto shadow-lg">
                        <Award className="w-8 h-8" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">This certifies that</span>
                        <h2 className="text-2xl sm:text-4xl font-black text-slate-950 underline decoration-[#0077b6] decoration-2 underline-offset-8 leading-relaxed">
                          {cert.studentName || currentUser.name || currentUser.nameEn}
                        </h2>
                        <p className="text-sm text-slate-600 pt-5">
                          has demonstrated professional competence in <strong className="text-slate-900 block mt-1 text-lg">{cert.courseName || cert.course?.title || courseTitle}</strong>
                        </p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest pt-2">
                          Batch: {cert.batchNumber || batchName}
                        </p>
                      </div>

                      <div className="pt-8 pb-4 flex items-end justify-between px-4 sm:px-12">
                        <div className="text-center space-y-2">
                          <div className="font-['Brush_Script_MT',cursive,serif] text-3xl text-slate-800">
                            {cert.signature1Name || "Dr. A. Rahman"}
                          </div>
                          <div className="w-40 border-t-2 border-slate-900 mx-auto"></div>
                          <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{cert.signature1Designation || "Course Director"}</span>
                        </div>
                        <div className="text-center space-y-2">
                          <div className="font-['Brush_Script_MT',cursive,serif] text-3xl text-slate-800">
                            {cert.signature2Name || "Engr. M. Hasan"}
                          </div>
                          <div className="w-40 border-t-2 border-slate-900 mx-auto"></div>
                          <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{cert.signature2Designation || "Lead Instructor"}</span>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
                        <div className="text-left space-y-0.5">
                          <span className="text-slate-400 font-bold block text-xs">VERIFICATION ID</span>
                          <span className="font-extrabold text-[#002b5b]">{cert.certificateNumber || "VERIFIED-CREDENTIAL"}</span>
                        </div>
                        <div className="text-left space-y-0.5">
                          <span className="text-slate-400 font-bold block text-xs">ISSUE DATE</span>
                          <span className="font-extrabold text-[#002b5b]">{cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : "N/A"}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleDownloadPDF(cert.id, cert.studentName || currentUser.name || "Student")}
                        disabled={downloadingCertId === cert.id}
                        className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0077b6] hover:bg-[#002b5b] transition-all text-white font-extrabold text-sm shadow-md hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
                      >
                        <Download className="w-5 h-5" /> 
                        {downloadingCertId === cert.id ? "Generating High-Res PDF..." : "Download PDF"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
