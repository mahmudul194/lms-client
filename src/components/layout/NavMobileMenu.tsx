"use client";

import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface NavMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export default function NavMobileMenu({ isOpen, onClose, searchQuery, setSearchQuery }: NavMobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-5 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
      <div className="relative w-full mb-3">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery?.(e.target.value)}
          className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm focus:outline-none focus:bg-white"
        />
        <Search className="w-4 h-4 text-[#0077b6] absolute right-3.5 top-1/2 -translate-y-1/2" />
      </div>

      <div className="space-y-1.5 text-base font-semibold">
        <Link
          href="/"
          onClick={onClose}
          className="block px-4 py-2.5 rounded-xl text-[#0077b6] bg-sky-50 font-bold"
        >
          Home
        </Link>
        <Link
          href="/courses"
          onClick={onClose}
          className="block px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
        >
          All Courses
        </Link>
        <Link
          href="/gallery"
          onClick={onClose}
          className="block px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
        >
          Students Gallery
        </Link>

        {/* Mobile About Us Submenu */}
        <div className="pl-2 space-y-1 pt-1 border-t border-slate-100">
          <div className="px-2 py-1 text-xs font-bold uppercase text-slate-400">About Us</div>
          <Link
            href="/blog"
            onClick={onClose}
            className="block px-4 py-2 rounded-lg text-sm text-slate-700 hover:text-[#0077b6]"
          >
            Blogs
          </Link>
          <Link
            href="/portfolio"
            onClick={onClose}
            className="block px-4 py-2 rounded-lg text-sm text-slate-700 hover:text-[#0077b6]"
          >
            Our Portfolio
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="block px-4 py-2 rounded-lg text-sm text-slate-700 hover:text-[#0077b6]"
          >
            Contact us
          </Link>
        </div>

        <Link
          href="/admission"
          onClick={onClose}
          className="block px-4 py-2.5 rounded-xl text-[#002b5b] bg-sky-100 font-bold"
        >
          Admission
        </Link>
      </div>
    </div>
  );
}
