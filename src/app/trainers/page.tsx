"use client";

import React, { useState, useEffect } from "react";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { mentorsApi } = await import("@/services/api/mentorsApi");
        const res = await mentorsApi.getAllMentors({ limit: 12 });
        if (!isMounted) return;

        if (res.statusCode === 200 && res.data?.items?.length) {
          const apiTrainers = res.data.items.map((m, idx) => ({
            id: m.id || `m-${idx}`,
            name: m.user?.name || "Senior Mentor",
            role: m.designation,
            organization: m.subject || "LMS Platform",
            experience: m.experience || "5+ Years Industry Experience",
            bio: m.bio || "Certified mentor with industry experience.",
            coursesCount: 4,
            studentsCount: 1500,
            image: m.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
            specialties: m.skills?.length ? m.skills : ["Web Dev", "Full Stack"],
          }));
          setTrainers(apiTrainers);
        }
      } catch {
        // Fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#002b5b] text-white rounded-3xl p-8 lg:p-12 mb-12 shadow-xl">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-300">Expert Instructor Panel</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Expert Trainers & Mentors</h1>
            <p className="text-sm sm:text-base text-slate-200">
              Learn directly from seasoned software engineers, developers, and industry specialists with real project experience.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-3xl border border-slate-200 p-7 text-center animate-pulse space-y-4">
                <div className="w-28 h-28 rounded-full bg-slate-200 mx-auto" />
                <div className="h-5 bg-slate-200 rounded w-2/3 mx-auto" />
                <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="bg-white rounded-3xl border border-slate-200 p-7 flex flex-col items-center justify-between shadow-xs hover:shadow-xl transition-all text-center group">
                <div className="flex flex-col items-center">
                  <img src={trainer.image} alt={trainer.name} loading="lazy" decoding="async" className="w-28 h-28 rounded-full object-cover border-4 border-sky-50 shadow-md mb-4 group-hover:scale-105 transition-transform" />
                  <h3 className="text-base font-bold text-slate-900">{trainer.name}</h3>
                  <p className="text-xs font-bold text-[#0077b6] mt-1">{trainer.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{trainer.organization}</p>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">{trainer.bio}</p>
                  <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                    {trainer.specialties.map((s: string, idx: number) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">{s}</span>
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
        )}
      </div>
    </div>
  );
}
