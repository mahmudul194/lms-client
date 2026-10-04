"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAuthToken } from "@/services/api/apiClient";
import { usePathname } from "next/navigation";
import FooterSocialShare from "./FooterSocialShare";
import FooterPaymentPills from "./FooterPaymentPills";

export default function Footer() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);

  // Hide public footer inside dashboard
  if (pathname && pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="bg-[#f0f4f8] text-slate-700 pt-20 pb-14 border-t border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">
          
          {/* Col 1: Logo & Share Icons (lg:col-span-5) */}
          <FooterSocialShare />

          {/* Col 2: About Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900">About</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-medium">
              <li>
                <Link href="/" className="hover:text-[#0077b6] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0077b6] transition-colors">
                  About Us
                </Link>
              </li>

            </ul>
          </div>

          {/* Col 3: Quick Navigation Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900">Links</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-medium">
              <li>
                <Link href="/courses" className="hover:text-[#0077b6] transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#0077b6] transition-colors">
                  Students Gallery
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#0077b6] transition-colors">
                  Our Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0077b6] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900">Support & Legal</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-medium">
              <li>
                <Link href="/faq" className="hover:text-[#0077b6] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#0077b6] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-[#0077b6] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                {isLoggedIn ? (
                  <Link href="/dashboard" className="hover:text-[#0077b6] transition-colors font-bold text-[#0077b6]">
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link href="/login" className="hover:text-[#0077b6] transition-colors font-bold text-[#0077b6]">
                    Portal Login (/dashboard)
                  </Link>
                )}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Payment Methods Row */}
        <FooterPaymentPills />
      </div>
    </footer>
  );
}
