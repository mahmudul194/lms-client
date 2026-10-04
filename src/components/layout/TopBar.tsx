"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAuthToken } from "@/services/api/apiClient";

export default function TopBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);

  return (
    <div className="bg-[#002b5b] text-white text-xs sm:text-[13px] font-medium border-b border-[#0f4c81]/40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-10">
          {/* Left: Download App */}
          <div>
            <a
              href="/android_app/abi.apk"
              className="text-slate-200 hover:text-sky-300 transition-colors flex items-center gap-1.5 font-semibold text-xs sm:text-[13px]"
            >
              <span>Download App</span>
            </a>
          </div>

          {/* Right: Admission, Log in, Social Icons */}
          <div className="flex items-center gap-5 sm:gap-8 text-xs sm:text-[13px]">
            <Link
              href="/courses"
              className="text-slate-200 hover:text-sky-300 font-semibold transition-colors"
            >
              All Courses
            </Link>

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="text-slate-200 hover:text-sky-300 font-semibold transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-slate-200 hover:text-sky-300 font-semibold transition-colors"
              >
                Log in
              </Link>
            )}

            {/* Social Icons */}
            <div className="flex items-center gap-3.5 text-slate-300 border-l border-[#0f4c81] pl-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-300 hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-300 hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-300 hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
