"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FileText, Printer, Download, GraduationCap, AlertCircle, ArrowLeft } from "lucide-react";
import { EnrollmentItem } from "@/services/api/enrollmentsApi";

export default function InvoicePage() {
  const params = useParams();
  const router = useRouter();
  const enrollmentId = params.id as string;

  const [invoiceData, setInvoiceData] = useState<EnrollmentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enrollmentId) return;
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
  }, [enrollmentId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans print:bg-white print:p-0 print:py-0">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Navigation - Hidden in Print */}
        <div className="flex items-center justify-between print:hidden">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-3">
            <button onClick={handlePrint} className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-sm">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={handlePrint} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-md">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>

        {/* Invoice Paper */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 print:shadow-none print:border-none print:m-0 print:p-0 print:max-w-full print:w-full">
          {loading ? (
            <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>
          ) : invoiceData ? (
            <div className="space-y-10 print:space-y-8">
              
              {/* Invoice Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-100 pb-8 print:border-slate-300">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md print:shadow-none">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">SkillSync Academy</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">Dhaka, Bangladesh</p>
                    <p className="text-sm text-slate-500 font-medium">contact@skillsync.com | +880 1234-567890</p>
                  </div>
                </div>
                <div className="text-left sm:text-right mt-8 sm:mt-0">
                  <h1 className="text-4xl font-black text-indigo-600 uppercase tracking-widest">INVOICE</h1>
                  <p className="text-base text-slate-600 mt-2">
                    <span className="font-bold text-slate-800">Invoice No:</span> #INV-{enrollmentId.split("-")[0].toUpperCase()}
                  </p>
                  <p className="text-base text-slate-600">
                    <span className="font-bold text-slate-800">Date Issued:</span> {invoiceData.createdAt ? new Date(invoiceData.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}
                  </p>
                </div>
              </div>

              {/* Billed To & Enrollment Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-slate-50 p-8 rounded-3xl border border-slate-100 print:bg-white print:border-none print:p-0">
                <div>
                  <p className="text-sm text-indigo-600 font-extrabold uppercase tracking-widest mb-3">Billed To (Student)</p>
                  <p className="font-black text-xl text-slate-900">{invoiceData.student?.name || "Student Name"}</p>
                  <p className="text-base font-medium text-slate-600 mt-1">{invoiceData.student?.email || "No Email"}</p>
                  <p className="text-base font-medium text-slate-600">{invoiceData.student?.phone || "No Phone"}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm text-indigo-600 font-extrabold uppercase tracking-widest mb-3">Enrollment Status</p>
                  <span className={`inline-block px-5 py-2 rounded-full font-black text-sm uppercase tracking-wider ${
                    invoiceData.status?.toLowerCase() === "active" ? "bg-emerald-100 text-emerald-800 border border-emerald-200 print:border-emerald-800" : 
                    invoiceData.status?.toLowerCase() === "cancelled" ? "bg-rose-100 text-rose-800 border border-rose-200 print:border-rose-800" : 
                    "bg-amber-100 text-amber-800 border border-amber-200 print:border-amber-800"
                  }`}>
                    {invoiceData.status}
                  </span>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="overflow-hidden border border-slate-200 rounded-3xl print:border-slate-300">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-800 font-extrabold text-sm uppercase tracking-wider border-b border-slate-200 print:bg-slate-50">
                    <tr>
                      <th className="p-5">Description</th>
                      <th className="p-5 text-center">Batch ID</th>
                      <th className="p-5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr>
                      <td className="p-5">
                        <p className="font-black text-slate-900 text-lg">{invoiceData.batch?.course?.title || "Professional Course Registration"}</p>
                        <p className="text-base text-slate-500 font-medium mt-1">Batch: {invoiceData.batch?.name || "N/A"}</p>
                      </td>
                      <td className="p-5 text-center text-base font-bold text-slate-600 font-mono">
                        {invoiceData.batch?.code || invoiceData.batch_id.split("-")[0].toUpperCase()}
                      </td>
                      <td className="p-5 text-right font-black text-slate-900 text-lg">
                        ৳{(Number(invoiceData.total_amount) || 0).toLocaleString()}
                      </td>
                    </tr>
                    {Number(invoiceData.discount_amount) ? (
                      <tr className="bg-rose-50/50 print:bg-white">
                        <td colSpan={2} className="p-5 text-rose-600 font-bold text-right text-base">Special Discount Applied</td>
                        <td className="p-5 text-right text-rose-600 font-black text-lg">- ৳{(Number(invoiceData.discount_amount)).toLocaleString()}</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="flex justify-end">
                <div className="w-full sm:w-1/2 lg:w-2/5 space-y-4">
                  <div className="flex justify-between items-center text-slate-600 font-bold text-lg">
                    <span>Subtotal:</span>
                    <span className="text-slate-900">৳{(Number(invoiceData.total_amount) || 0).toLocaleString()}</span>
                  </div>
                  {Number(invoiceData.discount_amount) ? (
                    <div className="flex justify-between items-center text-rose-600 font-bold text-lg border-b border-slate-100 pb-4">
                      <span>Discount:</span>
                      <span>- ৳{(Number(invoiceData.discount_amount)).toLocaleString()}</span>
                    </div>
                  ) : <div className="border-b border-slate-100 pb-2"></div>}
                  
                  <div className="flex justify-between items-center text-xl pt-2">
                    <span className="font-black text-slate-900">Total Payable:</span>
                    <span className="font-black text-slate-900">৳{Math.max(0, (Number(invoiceData.total_amount) || 0) - (Number(invoiceData.discount_amount) || 0)).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-emerald-700 bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-lg print:border-emerald-600 print:bg-white">
                    <span className="font-bold">Paid Amount:</span>
                    <span className="font-black">৳{(Number(invoiceData.paid_amount) || 0).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-rose-700 bg-rose-50 p-4 rounded-xl border border-rose-100 mt-3 text-lg print:border-rose-600 print:bg-white">
                    <span className="font-bold">Total Due:</span>
                    <span className="font-black">৳{Math.max(0, (Number(invoiceData.total_amount) || 0) - (Number(invoiceData.discount_amount) || 0) - (Number(invoiceData.paid_amount) || 0)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Footer / Terms */}
              <div className="pt-12 border-t border-slate-200 text-center print:pt-24">
                <p className="text-slate-500 text-base font-bold">Thank you for enrolling with SkillSync Academy!</p>
                <p className="text-slate-400 text-sm mt-2 font-medium">This is a system-generated invoice and does not require a physical signature.</p>
              </div>

            </div>
          ) : (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-rose-300 mx-auto mb-4" />
              <p className="text-slate-500 font-bold text-xl">Invoice details could not be found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
