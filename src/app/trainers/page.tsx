import React from "react";
import Link from "next/link";
import { Users, BookOpen, Award, ArrowRight } from "lucide-react";
import { TRAINERS } from "@/data/mockData";

export default function TrainersPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="bg-[#002b5b] text-white rounded-3xl p-8 lg:p-12 mb-12 shadow-xl">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Expert Instructor Panel
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Our Expert Trainers & BIM Mentors
            </h1>
            <p className="text-sm sm:text-base text-slate-200">
              Learn directly from seasoned structural engineers, architects, and MEP specialists with extensive experience on national and international infrastructure projects.
            </p>
          </div>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-3xl border border-slate-200 p-7 flex flex-col items-center justify-between shadow-xs hover:shadow-xl transition-all text-center group"
            >
              <div className="flex flex-col items-center">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  loading="lazy"
                  decoding="async"
                  className="w-28 h-28 rounded-full object-cover border-4 border-sky-50 shadow-md mb-4 group-hover:scale-105 transition-transform"
                />
                <h3 className="text-base font-bold text-slate-900">{trainer.name}</h3>
                <p className="text-xs font-bold text-[#0077b6] mt-1">{trainer.role}</p>
                <p className="text-xs text-slate-400 mt-0.5">{trainer.organization}</p>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">{trainer.bio}</p>

                <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                  {trainer.specialties.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>{trainer.coursesCount} Courses</span>
                <span>{trainer.studentsCount}+ Students</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
