"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function CommunityCards() {
  const cards = [
    {
      title: "Facebook Community",
      desc: "Connect with fellow engineers, ask questions, and share project updates.",
      action: "Join Community",
      link: "https://www.facebook.com",
      accentBorder: "group-hover:border-[#1877f2]/40",
      topGlow: "via-[#1877f2]",
      badgeBg: "bg-blue-50 text-[#1877f2] group-hover:bg-[#1877f2] group-hover:text-white",
      btnClass: "bg-[#1877f2] hover:bg-[#166fe5]",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      title: "YouTube Channel",
      desc: "Watch free tutorials, BIM workflows, and practical engineering guides.",
      action: "Subscribe Channel",
      link: "https://www.youtube.com",
      accentBorder: "group-hover:border-[#ff0000]/40",
      topGlow: "via-[#ff0000]",
      badgeBg: "bg-red-50 text-[#ff0000] group-hover:bg-[#ff0000] group-hover:text-white",
      btnClass: "bg-[#e60000] hover:bg-[#cc0000]",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      title: "LinkedIn Network",
      desc: "Stay updated with industry insights, company news, and career opportunities.",
      action: "Follow Page",
      link: "https://www.linkedin.com",
      accentBorder: "group-hover:border-[#0a66c2]/40",
      topGlow: "via-[#0a66c2]",
      badgeBg: "bg-sky-50 text-[#0a66c2] group-hover:bg-[#0a66c2] group-hover:text-white",
      btnClass: "bg-[#0a66c2] hover:bg-[#084e96]",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#f8fafc] border-t border-slate-100 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0077b6]">
            COMMUNITY
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002b5b] tracking-tight">
            Join Our Learning Community
          </h2>
        </div>

        {/* 3 Redesigned Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 ${c.accentBorder} shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-8 overflow-hidden`}
            >
              {/* Subtle top brand line on hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${c.topGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="space-y-5">
                {/* Brand Icon Squircle */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs ${c.badgeBg}`}
                >
                  {c.icon}
                </div>

                {/* Title & Concise Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#002b5b] tracking-tight">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mt-2">
                    {c.desc}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white ${c.btnClass} transition-all duration-200 shadow-xs hover:shadow-md group/btn`}
                >
                  <span>{c.action}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
