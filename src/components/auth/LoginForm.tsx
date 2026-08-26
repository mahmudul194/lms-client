"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

interface LoginFormProps {
  loading: boolean;
  onLoginSubmit: (username: string, password: string) => void;
}

export default function LoginForm({ loading, onLoginSubmit }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onLoginSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Username or Email */}
      <div className="space-y-1.5">
        <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
          USERNAME OR EMAIL
        </label>
        <input
          type="text"
          required
          placeholder="student / instructor / admin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all"
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
          PASSWORD (USE: 123)
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password (123)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-4 pr-11 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password Row */}
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

        <Link href="/contact" className="text-slate-600 hover:text-[#0077b6] transition-colors">
          Forgot your password?
        </Link>
      </div>

      {/* Submit Button with Animated Spinner */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-extrabold text-sm sm:text-base shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <>
              <span>Log In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
