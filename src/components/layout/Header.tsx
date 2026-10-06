"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import Navbar from "./Navbar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide public website header when inside dashboard
  if (pathname && pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full max-w-full print:hidden transition-all duration-300 ease-in-out ${
        isScrolled
          ? "shadow-xl shadow-slate-900/15 border-b border-slate-200"
          : "shadow-xs border-b border-slate-100"
      }`}
    >
      {/* 1. TopBar (Always Sticky with Header) */}
      <TopBar />

      {/* 2. Main Navbar (Sticky with Header) */}
      <div className="bg-white">
        <Navbar isScrolled={isScrolled} />
      </div>
    </header>
  );
}
