"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, CheckCircle2, Sparkles } from "lucide-react";

export default function RecentPortfolioSection() {
  const recentProjects = [
    {
      id: "commercial-bim-modeling",
      title: "Multi-Storey Residential & Commercial BIM Model",
      category: "Architectural & Structural BIM",
      status: "Completed",
      tools: "Revit • Navisworks",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      description:
        "Detailed 3D architectural and structural BIM modeling with complete drawing sheets, schedules, and quantity takeoffs.",
    },
    {
      id: "pile-cap-structural-detailing",
      title: "Students Project: Pile, Pile Cap & Substructure",
      category: "Structural Detailing",
      status: "Completed",
      tools: "Revit Structure • AutoCAD",
      image:
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
      description:
        "Complete rebar modeling, reinforcement detailing, and structural documentation of pile foundations and retaining walls.",
    },
    {
      id: "mep-clash-coordination",
      title: "Comprehensive MEP Services & Clash Detection",
      category: "MEP & Coordination",
      status: "Live Project",
      tools: "Revit MEP • Navisworks Manage",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      description:
        "Full integration of HVAC ducting, plumbing, firefighting, and electrical containment with zero clash reports.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#f8fafc] font-sans border-y border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0077b6] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0077b6]" />
              OUR SHOWCASE & PORTFOLIO
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002b5b] mt-1 tracking-tight">
              Recent Projects & Student Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore real-world BIM models, structural detailing sheets, and MEP coordination completed by our students and engineers
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-[#0077b6] hover:bg-[#0077b6] hover:text-white font-extrabold text-xs sm:text-sm transition-all shadow-xs group shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {recentProjects.map((project) => (
            <Link
              key={project.id}
              href="/portfolio"
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer"
            >
              <div>
                {/* Project Image with Status & Tools Badges */}
                <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-xs shadow-md ${
                        project.status === "Completed"
                          ? "bg-emerald-500/90 text-white"
                          : "bg-[#0077b6]/90 text-white"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-sm text-white/95 text-[11px] font-bold border border-white/10 shadow-sm">
                      {project.tools}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-[#0077b6] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#0077b6]" />
                    <span>{project.category}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug group-hover:text-[#0077b6] transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-extrabold text-[#0077b6] group-hover:text-[#002b5b] transition-colors inline-flex items-center gap-1.5">
                  <span>Explore Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Verified Work
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
