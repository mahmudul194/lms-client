"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function NavAboutDropdown() {
  const pathname = usePathname();

  const aboutSubItems = [
    { name: "Blogs", href: "/blog" },
    { name: "Our Portfolio", href: "/portfolio" },
    { name: "Contact us", href: "/contact" },
  ];

  const isActive =
    pathname.startsWith("/about") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/portfolio");

  return (
    <div className="relative group py-6 font-sans">
      <button
        className={`relative flex items-center gap-1.5 text-sm sm:text-[15px] font-bold transition-colors cursor-pointer ${
          isActive ? "text-[#0077b6]" : "text-slate-700 group-hover:text-[#0077b6]"
        }`}
      >
        <span>About us</span>
        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-slate-500 group-hover:text-[#0077b6]" />
        <span
          className={`absolute -bottom-2 left-0 h-[2.5px] bg-[#0077b6] rounded-full transition-all duration-200 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </button>

      <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full right-0 pt-2 w-48 transition-all duration-150 z-50">
        <div className="bg-white rounded-xl shadow-2xl border border-slate-100 py-2.5 relative">
          <div className="absolute -top-1.5 left-5 w-3 h-3 bg-white rotate-45 border-l border-t border-slate-100" />
          {aboutSubItems.map((subItem) => (
            <Link
              key={subItem.name}
              href={subItem.href}
              className={`block px-5 py-2.5 text-sm font-semibold transition-colors ${
                pathname === subItem.href
                  ? "text-[#0077b6]"
                  : "text-slate-700 hover:text-[#0077b6] hover:bg-slate-50"
              }`}
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
