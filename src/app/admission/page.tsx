"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, ArrowRight } from "lucide-react";
import { COURSES } from "@/data/mockData";

import AdmissionCourseStep from "@/components/admission/AdmissionCourseStep";
import AdmissionStudentInfoStep from "@/components/admission/AdmissionStudentInfoStep";
import AdmissionPaymentStep from "@/components/admission/AdmissionPaymentStep";
import AdmissionSummaryCard from "@/components/admission/AdmissionSummaryCard";
import AdmissionSuccessSlip from "@/components/admission/AdmissionSuccessSlip";

export default function AdmissionPage() {
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES[0].id);
  const [batchTiming, setBatchTiming] = useState("night");
  const [classFormat, setClassFormat] = useState("live");
  const [paymentType, setPaymentType] = useState<"installment" | "full">("installment");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket" | "sslcommerz" | "bank">("bkash");
  const [trxId, setTrxId] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    profession: "Civil Engineer / Diploma",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedCourse = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];
  const installmentAmount = Math.round(selectedCourse.price / 3);
  const dueToday = paymentType === "installment" ? installmentAmount : selectedCourse.price;
  const savings = selectedCourse.originalPrice ? selectedCourse.originalPrice - selectedCourse.price : 0;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8 sm:py-14 text-slate-900 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
          <Link href="/" className="hover:text-[#0077b6] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/courses" className="hover:text-[#0077b6] transition-colors">
            Courses
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-bold">Online Admission</span>
        </div>

        {/* Page Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 text-[#002b5b] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#0077b6]" />
            <span>Official Admission Portal • 2026 Batches</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002b5b] tracking-tight">
            Complete Your Course Enrollment
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Secure your seat in our hands-on engineering programs. Enjoy 3-month flexible installment plans, live mentor guidance, and verified BIM credentials.
          </p>
        </div>

        {isSubmitted ? (
          <AdmissionSuccessSlip
            fullName={formData.fullName}
            selectedCourse={selectedCourse}
            batchTiming={batchTiming}
            paymentMethod={paymentMethod}
            trxId={trxId}
            dueToday={dueToday}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left 7 Columns: Step-by-Step Interactive Form */}
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <AdmissionCourseStep
                  courses={COURSES}
                  selectedCourseId={selectedCourseId}
                  onSelectCourseId={setSelectedCourseId}
                  classFormat={classFormat}
                  onSelectClassFormat={setClassFormat}
                  batchTiming={batchTiming}
                  onSelectBatchTiming={setBatchTiming}
                />

                <AdmissionStudentInfoStep
                  formData={formData}
                  setFormData={setFormData}
                />

                <AdmissionPaymentStep
                  selectedCourse={selectedCourse}
                  paymentType={paymentType}
                  onSelectPaymentType={setPaymentType}
                  paymentMethod={paymentMethod}
                  onSelectPaymentMethod={setPaymentMethod}
                  trxId={trxId}
                  setTrxId={setTrxId}
                  installmentAmount={installmentAmount}
                  dueToday={dueToday}
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-black text-base sm:text-lg shadow-xl shadow-sky-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-3"
                  >
                    <span>Complete Admission & Get Instant Access</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-2 font-medium">
                    By submitting, you agree to BIM Build BD Terms & Academic Policies.
                  </p>
                </div>
              </form>
            </div>

            {/* Right 5 Columns: Sticky Summary Card */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              <AdmissionSummaryCard
                selectedCourse={selectedCourse}
                paymentType={paymentType}
                installmentAmount={installmentAmount}
                dueToday={dueToday}
                savings={savings}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
