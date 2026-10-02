"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, FileText, Printer, Download, GraduationCap, AlertCircle } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { EnrollmentItem } from "@/services/api/enrollmentsApi";

interface AdminInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollmentId: string;
}

export default function AdminInvoiceModal({ isOpen, onClose, enrollmentId }: AdminInvoiceModalProps) {
  const mounted = useIsMounted();
  const [invoiceData, setInvoiceData] = useState<EnrollmentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !enrollmentId) return;
    setLoading(true);
    (async () => {
      try {
        const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
        const res = await enrollmentsApi.getEnrollmentById(enrollmentId);
        if (res.statusCode === 200 && res.data) {
          setInvoiceData(res.data);
        }
      } catch (error) {
        console.error("Failed to load invoice", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [isOpen, enrollmentId]);

  if (!mounted || !isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-fade-in overflow-y-auto print:static print:bg-white print:inset-auto print:p-0 print:block">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 space-y-8 shadow-2xl border border-slate-100 my-8 print:shadow-none print:border-none print:m-0 print:p-0 print:max-w-full print:w-full">
        
        {/* Modal Header - Hidden in Print */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Enrollment Details & Invoice</h3>
              <p className="text-xs text-slate-500">View details and download receipt</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 cursor-pointer text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>
        ) : invoiceData ? (
          <div className="space-y-8 print:space-y-6">
            
            {/* Invoice Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-100 pb-6 print:border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">SkillSync Academy</h2>
                  <p className="text-sm text-slate-500">Dhaka, Bangladesh</p>
                  <p className="text-sm text-slate-500">contact@skillsync.com | +880 1234-567890</p>
                </div>
              </div>
              <div className="text-left sm:text-right mt-6 sm:mt-0">
                <h1 className="text-3xl font-black text-indigo-600 uppercase tracking-widest">INVOICE</h1>
                <p className="text-sm text-slate-600 mt-1">
                  <span className="font-bold text-slate-800">Invoice No:</span> #INV-{enrollmentId.split("-")[0].toUpperCase()}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-800">Date Issued:</span> {invoiceData.createdAt ? new Date(invoiceData.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}
                </p>
              </div>
            </div>

            {/* Billed To & Enrollment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-white print:border-none print:p-0">
              <div>
                <p className="text-xs text-indigo-600 font-extrabold uppercase tracking-widest mb-2">Billed To (Student)</p>
                <p className="font-black text-lg text-slate-900">{invoiceData.student?.name || "Student Name"}</p>
                <p className="text-sm font-medium text-slate-600 mt-1">{invoiceData.student?.email || "No Email"}</p>
                <p className="text-sm font-medium text-slate-600">{invoiceData.student?.phone || "No Phone"}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs text-indigo-600 font-extrabold uppercase tracking-widest mb-2">Enrollment Status</p>
                <span className={`inline-block px-4 py-1.5 rounded-full font-black text-sm uppercase tracking-wider ${
                  invoiceData.status === "active" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : 
                  invoiceData.status === "cancelled" ? "bg-rose-100 text-rose-800 border border-rose-200" : 
                  "bg-amber-100 text-amber-800 border border-amber-200"
                }`}>
                  {invoiceData.status}
                </span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="overflow-hidden border border-slate-200 rounded-2xl print:border-slate-300">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-800 font-extrabold text-sm uppercase tracking-wider border-b border-slate-200 print:bg-slate-50">
                  <tr>
                    <th className="p-4">Description</th>
                    <th className="p-4 text-center">Batch ID</th>
                    <th className="p-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="p-4">
                      <p className="font-black text-slate-900 text-base">{invoiceData.batch?.course?.title || "Professional Course Registration"}</p>
                      <p className="text-sm text-slate-500 font-medium mt-0.5">Batch: {invoiceData.batch?.name || "N/A"}</p>
                    </td>
                    <td className="p-4 text-center text-sm font-medium text-slate-600 font-mono">
                      {invoiceData.batch?.code || invoiceData.batch_id.split("-")[0].toUpperCase()}
                    </td>
                    <td className="p-4 text-right font-black text-slate-900 text-base">
                      ৳{(invoiceData.total_amount || 0).toLocaleString()}
                    </td>
                  </tr>
                  {invoiceData.discount_amount ? (
                    <tr className="bg-rose-50/50">
                      <td colSpan={2} className="p-4 text-rose-600 font-bold text-right">Special Discount Applied</td>
                      <td className="p-4 text-right text-rose-600 font-black">- ৳{invoiceData.discount_amount.toLocaleString()}</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end">
              <div className="w-full sm:w-1/2 lg:w-1/3 space-y-3">
                <div className="flex justify-between items-center text-slate-600 font-bold">
                  <span>Subtotal:</span>
                  <span className="text-slate-900">৳{(invoiceData.total_amount || 0).toLocaleString()}</span>
                </div>
                {invoiceData.discount_amount ? (
                  <div className="flex justify-between items-center text-rose-600 font-bold border-b border-slate-100 pb-3">
                    <span>Discount:</span>
                    <span>- ৳{invoiceData.discount_amount.toLocaleString()}</span>
                  </div>
                ) : <div className="border-b border-slate-100 pb-1"></div>}
                <div className="flex justify-between items-center text-lg">
                  <span className="font-black text-slate-900">Total Payable:</span>
                  <span className="font-black text-slate-900">৳{Math.max(0, (invoiceData.total_amount || 0) - (invoiceData.discount_amount || 0)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-600 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                  <span className="font-bold">Paid Amount:</span>
                  <span className="font-black">৳{(invoiceData.paid_amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-100 mt-2">
                  <span className="font-bold">Total Due:</span>
                  <span className="font-black">৳{Math.max(0, (invoiceData.total_amount || 0) - (invoiceData.discount_amount || 0) - (invoiceData.paid_amount || 0)).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Footer / Terms */}
            <div className="pt-8 border-t border-slate-100 text-center print:pt-16">
              <p className="text-slate-400 text-sm font-medium">Thank you for enrolling with SkillSync Academy!</p>
              <p className="text-slate-400 text-xs mt-1">This is a system-generated invoice and does not require a physical signature.</p>
            </div>

            {/* Action Buttons - Hidden in Print */}
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 print:hidden">
              <button onClick={handlePrint} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-sm">
                <Printer className="w-5 h-5" /> Print Invoice
              </button>
              <button onClick={handlePrint} className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-md">
                <Download className="w-5 h-5" /> Download as PDF
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <AlertCircle className="w-12 h-12 text-rose-300 mx-auto mb-4" />
            <p className="text-slate-500 font-bold text-lg">Invoice details could not be found.</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
