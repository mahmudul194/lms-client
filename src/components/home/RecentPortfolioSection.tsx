"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfoliosApi } from "@/services/api/portfoliosApi";

export default function RecentPortfolioSection() {
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await portfoliosApi.getAllPortfolios();
        if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
          // Take top 3 for the landing page
          setRecentProjects(res.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch portfolios", err);
      }
    };
    fetchPortfolios();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-[#f8fafc] font-sans border-y border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        {/* Section Header - Clean & Centered */}
        <div className="text-center pb-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002b5b] tracking-tight">
            Recent Projects & Student Portfolio
          </h2>
        </div>

        {/* 3-Column Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recentProjects.map((project) => (
            <Link
              key={project.id}
              href="/portfolio"
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Inset Framed Image with Category & Software Tool Tags */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={project.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0077b6] font-black text-[11px] tracking-wider uppercase shadow-xs">
                    {project.category || "Project"}
                  </span>
                </div>

                {/* Software Tool Badge */}
                {project.tools && (
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/75 backdrop-blur-md text-white/90 text-[11px] font-semibold border border-white/10 shadow-xs">
                      {project.tools}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body & CTA */}
              <div className="pt-5 px-1.5 flex flex-col justify-between flex-1">
                <h3 className="text-base sm:text-lg font-black text-[#002b5b] group-hover:text-[#0077b6] transition-colors line-clamp-2 leading-snug">
                  {project.title}
                </h3>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-700 group-hover:text-[#0077b6] transition-colors">
                    Explore Project
                  </span>
                  <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0077b6] group-hover:bg-[#0077b6] group-hover:text-white flex items-center justify-center transition-all duration-200">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
