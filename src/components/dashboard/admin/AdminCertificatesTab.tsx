"use client";

import React, { useState, useEffect } from "react";
import { Award, Plus, Search, Edit, Eye, Trash2, Calendar, FileCheck } from "lucide-react";
import { certificatesApi, CertificateItem, CreateCertificatePayload } from "@/services/api/certificatesApi";
import AdminAddCertificateView from "./AdminAddCertificateView";
import AdminCertificateDetails from "./AdminCertificateDetails";
import AdminEditCertificateModal from "./AdminEditCertificateModal";
import AdminDeleteConfirmModal from "./AdminDeleteConfirmModal";

export default function AdminCertificatesTab() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [selectedCertificateId, setSelectedCertificateId] = useState<string | null>(null);
  const [isAddingCertificate, setIsAddingCertificate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingCert, setEditingCert] = useState<CertificateItem | null>(null);
  const [deletingCert, setDeletingCert] = useState<CertificateItem | null>(null);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      // API currently doesn't search by name in this exact endpoint if not implemented,
      // but we will pass the search param anyway in case backend supports it
      const res = await certificatesApi.getAllCertificates({ limit: 100 });
      if (res.statusCode === 200 && res.data?.items) {
        setCertificates(res.data.items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [search]);

  const handleUpdateCertificate = async (id: string, payload: Partial<CreateCertificatePayload>) => {
    await certificatesApi.updateCertificate(id, payload);
    fetchCertificates();
  };

  const handleDeleteCertificateConfirm = async () => {
    if (!deletingCert) return;
    await certificatesApi.deleteCertificate(deletingCert.id);
    fetchCertificates();
    if (selectedCertificateId === deletingCert.id) {
      setSelectedCertificateId(null);
    }
  };

  if (selectedCertificateId) {
    return (
      <>
        <AdminCertificateDetails 
          certificateId={selectedCertificateId} 
          onBack={() => setSelectedCertificateId(null)} 
          onEdit={(c) => setEditingCert(c)}
          onDelete={(c) => setDeletingCert(c)}
        />
        <AdminEditCertificateModal
          isOpen={!!editingCert}
          certificate={editingCert}
          onClose={() => setEditingCert(null)}
          onUpdate={handleUpdateCertificate}
        />
        <AdminDeleteConfirmModal
          isOpen={!!deletingCert}
          title="Revoke Certificate"
          itemName={deletingCert ? `${deletingCert.studentName || 'Student'} - ${deletingCert.courseName || 'Course'}` : undefined}
          message="Are you sure you want to revoke and permanently delete this official completion certificate?"
          confirmText="Revoke & Delete"
          onClose={() => setDeletingCert(null)}
          onConfirm={handleDeleteCertificateConfirm}
        />
      </>
    );
  }

  if (isAddingCertificate) {
    return (
      <AdminAddCertificateView 
        onBack={() => setIsAddingCertificate(false)} 
        onSuccess={() => {
          setIsAddingCertificate(false);
          fetchCertificates();
        }} 
      />
    );
  }

  // Frontend filter just in case backend doesn't handle search param for studentName yet
  const filteredCerts = certificates.filter(c => 
    c.studentName?.toLowerCase().includes(search.toLowerCase()) || 
    c.courseName?.toLowerCase().includes(search.toLowerCase()) ||
    c.student?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Award className="w-6 h-6 text-[#0077b6]" />
            <span>Certificate Generator</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Issue, manage, and verify course completion certificates.</p>
        </div>
        <button onClick={() => setIsAddingCertificate(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0">
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Issue Certificates</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:outline-none font-medium bg-slate-50 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Course / Batch</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Issue Date</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">Loading certificates...</td>
              </tr>
            ) : filteredCerts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">No certificates found.</td>
              </tr>
            ) : (
              filteredCerts.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{cert.studentName || cert.student?.name || "Unknown"}</div>
                    <div className="text-xs text-slate-500 font-semibold mt-0.5">Cert ID: {cert.certificateNumber || cert.id.substring(0,8)}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-semibold text-slate-700">{cert.courseName || "Unknown Course"}</div>
                    <div className="text-xs text-slate-500 font-semibold mt-0.5">{cert.batchNumber || "Unknown Batch"}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : "N/A"}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                      cert.status === 'issued' ? 'bg-emerald-100 text-emerald-700' :
                      cert.status === 'revoked' ? 'bg-rose-100 text-rose-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedCertificateId(cert.id)} className="p-2 text-slate-400 hover:text-[#0077b6] hover:bg-sky-50 rounded-lg transition-colors cursor-pointer" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditingCert(cert)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer" title="Edit Certificate">
                        <Edit className="w-4 h-4" />
                      </button>
                      {cert.certificateUrl && (
                        <a href={cert.certificateUrl} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="View PDF">
                          <FileCheck className="w-4 h-4" />
                        </a>
                      )}
                      <button onClick={() => setDeletingCert(cert)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer" title="Revoke Certificate">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminEditCertificateModal
        isOpen={!!editingCert}
        certificate={editingCert}
        onClose={() => setEditingCert(null)}
        onUpdate={handleUpdateCertificate}
      />

      <AdminDeleteConfirmModal
        isOpen={!!deletingCert}
        title="Revoke Certificate"
        itemName={deletingCert ? `${deletingCert.studentName || 'Student'} - ${deletingCert.courseName || 'Course'}` : undefined}
        message="Are you sure you want to revoke and permanently delete this official completion certificate?"
        confirmText="Revoke & Delete"
        onClose={() => setDeletingCert(null)}
        onConfirm={handleDeleteCertificateConfirm}
      />
    </div>
  );
}
