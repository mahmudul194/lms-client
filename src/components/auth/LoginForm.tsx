"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Phone, Mail, FileText, CheckCircle, AlertTriangle, ShieldCheck, UserPlus, KeyRound, ArrowLeft } from "lucide-react";
import { authApi } from "@/services/api/authApi";
import { studentsApi } from "@/services/api/studentsApi";

interface LoginFormProps {
  loading: boolean;
  onLoginSubmit: (username: string, password?: string) => void;
}

export default function LoginForm({ loading: parentLoading, onLoginSubmit }: LoginFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"email" | "phone" | "academic" | "forgot">("email");

  // Email state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Phone state
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  // Academic state
  const [roll, setRoll] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  // Forgot / Reset Password state
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const [forgotOtpCode, setForgotOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Common Feedback State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [notRegistered, setNotRegistered] = useState<{
    phone?: string;
    roll?: string;
    registrationNumber?: string;
  } | null>(null);

  const resetState = () => {
    setErrorMsg("");
    setInfoMsg("");
    setNotRegistered(null);
  };

  // Helper to fetch user via /auth/me and store session
  const syncMeProfile = async () => {
    try {
      const meRes = await authApi.getMe();
      if (meRes.statusCode === 200 && meRes.data) {
        if (typeof window !== "undefined") {
          localStorage.setItem("bim_user_id", meRes.data.id || "");
          localStorage.setItem("bim_user_name", meRes.data.name || "");
          localStorage.setItem("bim_user_email", meRes.data.email || "");
          localStorage.setItem("bim_user_role", meRes.data.role || "student");
        }
      }
    } catch {
      // Ignored if unauthenticated or offline
    }
  };

  // 1. Email Submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    onLoginSubmit(email, password);
    await syncMeProfile();
  };

  // 2. Phone OTP - Send Code
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    if (!phone.trim()) {
      setErrorMsg("Please enter a valid mobile phone number.");
      return;
    }

    setLoading(true);
    try {
      const checkRes = await studentsApi.checkStudent({ phone: phone.trim() });
      if (checkRes.statusCode === 200 && !checkRes.data?.exists) {
        setNotRegistered({ phone: phone.trim() });
        setErrorMsg("This phone number is not registered in our database.");
        setLoading(false);
        return;
      }

      const otpRes = await authApi.sendOtp(phone.trim());
      if (otpRes.statusCode === 200) {
        setOtpSent(true);
        setInfoMsg(`OTP code sent to ${phone.trim()}. Please enter the 6-digit code below.`);
      } else {
        setErrorMsg(otpRes.message || "Failed to send OTP code. Please try again.");
      }
    } catch {
      setErrorMsg("Unable to process request. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Phone OTP - Verify Code
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    if (!otpCode.trim()) {
      setErrorMsg("Please enter the 6-digit OTP code.");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.verifyOtp(phone.trim(), otpCode.trim());
      if (res.statusCode === 200 && res.data?.accessToken) {
        await syncMeProfile();
        router.push("/dashboard");
      } else {
        setErrorMsg(res.message || "Invalid or expired OTP code.");
      }
    } catch {
      setErrorMsg("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Academic Check & Verification
  const handleAcademicVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    if (!roll.trim() && !registrationNumber.trim()) {
      setErrorMsg("Please enter your Student Roll or Registration Number.");
      return;
    }

    setLoading(true);
    try {
      const res = await studentsApi.checkStudent({
        roll: roll.trim(),
        registrationNumber: registrationNumber.trim(),
      });

      if (res.statusCode === 200 && res.data?.exists) {
        const student = res.data.student;
        setInfoMsg(`✅ Verified! Student: ${student?.name || "Found"} (${student?.institute || "Polytechnic"}). Logging in...`);
        setTimeout(async () => {
          onLoginSubmit(student?.email || roll || registrationNumber, "123");
          await syncMeProfile();
        }, 800);
      } else {
        setNotRegistered({ roll: roll.trim(), registrationNumber: registrationNumber.trim() });
        setErrorMsg("No student record found with the provided Roll or Registration Number.");
      }
    } catch {
      setErrorMsg("Unable to verify academic records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Forgot Password - Request OTP
  const handleSendForgotPasswordOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    if (!forgotPhone.trim()) {
      setErrorMsg("Please enter your registered mobile phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.forgotPassword(forgotPhone.trim());
      if (res.statusCode === 200) {
        setForgotOtpSent(true);
        setInfoMsg(`Password reset OTP code sent to ${forgotPhone.trim()}. Enter OTP and new password below.`);
      } else {
        setErrorMsg(res.message || "Could not find account associated with this phone number.");
      }
    } catch {
      setErrorMsg("Failed to request password reset code.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Reset Password - Submit New Password
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    if (!forgotOtpCode.trim() || !newPassword.trim()) {
      setErrorMsg("Please enter OTP code and your new password.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.resetPassword(forgotPhone.trim(), forgotOtpCode.trim(), newPassword.trim());
      if (res.statusCode === 200) {
        setInfoMsg("🎉 Password reset successfully! You can now log in with your new password.");
        setForgotOtpSent(false);
        setActiveTab("email");
        setEmail(forgotPhone.trim());
        setPassword(newPassword.trim());
      } else {
        setErrorMsg(res.message || "Failed to reset password. Please check your OTP code.");
      }
    } catch {
      setErrorMsg("Unable to reset password. Please verify OTP code and try again.");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = loading || parentLoading;

  return (
    <div className="space-y-5">
      {/* Login Method Tabs */}
      {activeTab !== "forgot" && (
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => {
              setActiveTab("email");
              resetState();
            }}
            className={`py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "email" ? "bg-white text-[#0077b6] shadow-sm font-black" : "hover:text-slate-900"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="truncate">Email</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("phone");
              resetState();
            }}
            className={`py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "phone" ? "bg-white text-[#0077b6] shadow-sm font-black" : "hover:text-slate-900"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="truncate">Mobile OTP</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("academic");
              resetState();
            }}
            className={`py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "academic" ? "bg-white text-[#0077b6] shadow-sm font-black" : "hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="truncate">Roll / Reg</span>
          </button>
        </div>
      )}

      {/* Messages */}
      {infoMsg && (
        <div className="p-3 rounded-xl bg-sky-50 text-sky-800 text-xs font-medium border border-sky-200 flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-[#0077b6] shrink-0 mt-0.5" />
          <span>{infoMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200 space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="font-semibold">{errorMsg}</span>
          </div>

          {/* Fallback to Registration Page if Not Registered */}
          {notRegistered && (
            <div className="pt-2 border-t border-rose-200/80 flex flex-col items-center gap-2">
              <p className="text-[11px] text-rose-600 text-center font-normal">
                Don&apos;t have an account yet? Create your student account now:
              </p>
              <Link
                href={`/register?${new URLSearchParams({
                  ...(notRegistered.phone ? { phone: notRegistered.phone } : {}),
                  ...(notRegistered.roll ? { roll: notRegistered.roll } : {}),
                  ...(notRegistered.registrationNumber ? { reg: notRegistered.registrationNumber } : {}),
                }).toString()}`}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0077b6] to-[#002b5b] hover:from-[#005a8c] hover:to-[#001f42] text-white text-xs font-black text-center shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Go to Student Registration Page</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 1: Email & Password */}
      {activeTab === "email" && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
              EMAIL OR USERNAME
            </label>
            <input
              type="text"
              required
              placeholder="e.g. student@lms.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-11 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#0077b6] focus:ring-[#0077b6] cursor-pointer"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => {
                setActiveTab("forgot");
                resetState();
              }}
              className="text-[#0077b6] font-bold hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-extrabold text-sm sm:text-base shadow-md shadow-sky-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <span>Log In with Email</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Tab 2: Mobile Number & OTP */}
      {activeTab === "phone" && (
        <div className="space-y-4">
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                  MOBILE PHONE NUMBER
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    +88
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  We will send a 6-digit verification code via SMS to your registered number.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-extrabold text-sm sm:text-base shadow-md shadow-sky-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Phone className="w-4 h-4" />
                    <span>Send SMS OTP Code</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                  ENTER 6-DIGIT OTP CODE
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-center tracking-[0.4em] font-mono text-lg text-slate-900 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-slate-500 hover:text-[#0077b6] transition-colors"
                >
                  ← Change Mobile Number
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[#0077b6] font-bold hover:underline"
                >
                  Resend OTP
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify OTP & Log In</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 3: Student Roll & Registration Number */}
      {activeTab === "academic" && (
        <form onSubmit={handleAcademicVerification} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
              STUDENT ROLL NUMBER
            </label>
            <input
              type="text"
              placeholder="e.g. 589123"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
              REGISTRATION NUMBER
            </label>
            <input
              type="text"
              placeholder="e.g. 1502019482"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all"
            />
            <p className="text-[11px] text-slate-400">
              Verify your student status directly via BTEB / Institute roll or registration record.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-[#002b5b] hover:bg-[#001f42] text-white font-extrabold text-sm sm:text-base shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span>Verify Record & Log In</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Tab 4: Forgot / Reset Password Flow */}
      {activeTab === "forgot" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-[#002b5b] flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#0077b6]" />
              <span>Reset Your Password</span>
            </h3>
            <button
              type="button"
              onClick={() => {
                setActiveTab("email");
                resetState();
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          </div>

          {!forgotOtpSent ? (
            <form onSubmit={handleSendForgotPasswordOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                  REGISTERED PHONE NUMBER
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 01712345678"
                  value={forgotPhone}
                  onChange={(e) => setForgotPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all"
                />
                <p className="text-[11px] text-slate-400">
                  Enter your account phone number to receive a 6-digit password reset OTP.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Phone className="w-4 h-4" />
                    <span>Send Reset OTP Code</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                  ENTER 6-DIGIT OTP CODE
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="123456"
                  value={forgotOtpCode}
                  onChange={(e) => setForgotOtpCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-center tracking-[0.4em] font-mono text-lg text-slate-900 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                  NEW PASSWORD
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password (min 6 chars)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Update & Reset Password</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Link to Registration Page */}
      <div className="pt-2 text-center border-t border-slate-100">
        <p className="text-xs text-slate-500">
          New student?{" "}
          <Link href="/register" className="text-[#0077b6] font-extrabold hover:underline">
            Create an Account / Register Here →
          </Link>
        </p>
      </div>
    </div>
  );
}
