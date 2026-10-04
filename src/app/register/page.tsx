"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, UserPlus, CheckCircle2, ArrowRight } from "lucide-react";
import { studentsApi } from "@/services/api/studentsApi";
import RegisterPersonalFields from "@/components/register/RegisterPersonalFields";
import RegisterAcademicFields from "@/components/register/RegisterAcademicFields";

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
    roll: "", registrationNumber: "", institute: "Dhaka Polytechnic Institute",
    technology: "Civil Technology", semester: "6", session: "2022-2023",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const p = searchParams.get("phone"), r = searchParams.get("roll"), reg = searchParams.get("reg");
    setFormData((prev) => ({ ...prev, phone: p || prev.phone, roll: r || prev.roll, registrationNumber: reg || prev.registrationNumber }));
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify password confirmation.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const cleanSemester = parseInt(String(formData.semester).replace(/\D/g, ""), 10) || 1;
      const res = await studentsApi.registerStudent({
        ...formData,
        semester: cleanSemester,
      });

      if (res.statusCode === 201 || res.statusCode === 200) {
        setSuccessMsg("🎉 Account registered successfully! Redirecting to login...");
        if (typeof window !== "undefined") {
          localStorage.setItem("bim_user_role", "student");
          localStorage.setItem("bim_user_name", formData.name);
          localStorage.setItem("bim_user_email", formData.email);
        }
        
        setTimeout(() => {
          const redirectParam = searchParams.get("redirect");
          if (redirectParam) {
            router.push(`/login?registered=true&redirect=${encodeURIComponent(redirectParam)}`);
          } else {
            router.push("/login?registered=true");
          }
        }, 1500);
      } else {
        setErrorMsg(res.message || "Registration failed. Please check your information.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Registration service error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fafbfc] min-h-[calc(100vh-140px)] py-10 sm:py-16 flex flex-col justify-start font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="text-xs sm:text-sm text-slate-400 font-medium mb-8">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={searchParams.get("redirect") ? `/login?redirect=${encodeURIComponent(searchParams.get("redirect") as string)}` : "/login"} className="hover:text-slate-600 transition-colors">Login</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-semibold">Student Account Registration</span>
        </div>

        <div className="max-w-3xl mx-auto w-full space-y-6">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-6 sm:p-10 space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-[#0077b6] text-xs font-extrabold uppercase tracking-wider">
                <UserPlus className="w-3.5 h-3.5" />
                <span>Student Self-Registration Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#002b5b] tracking-tight">Create Your Student Account</h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">Fill in your details below to register your polytechnic student profile and access online LMS courses.</p>
            </div>

            {successMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200 text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <RegisterPersonalFields formData={formData} onChange={handleChange} />
              <RegisterAcademicFields formData={formData} onChange={handleChange} />

              <div className="pt-4">
                <button
                  type="submit" disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0077b6] to-[#002b5b] hover:from-[#005a8c] hover:to-[#001f42] text-white font-black text-sm sm:text-base shadow-xl shadow-sky-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Complete Registration & Access LMS</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Already registered? <Link href={searchParams.get("redirect") ? `/login?redirect=${encodeURIComponent(searchParams.get("redirect") as string)}` : "/login"} className="text-[#0077b6] font-bold hover:underline">Back to LMS Login →</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">Loading registration portal...</div>}>
      <RegisterFormContent />
    </Suspense>
  );
}
