"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Quote, Sparkles, Award } from "lucide-react";
import { reviewsApi } from "@/services/api";

export default function SuccessStoriesPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await reviewsApi.getAllReviews();
        if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
          setReviews(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-[#002b5b] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#0077b6]" />
            <span>Alumni & Success Stories</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Student Success & Career Placements
          </h1>
          <p className="text-sm text-slate-600">
            Real feedback and career trajectories from graduates currently working at leading AEC consultancies and international remote contracting roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={review.student?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
                  alt={review.student?.name || "Student"}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{review.student?.name || "Anonymous"}</h4>
                  <p className="text-xs text-[#0077b6] font-bold">{review.batch?.name || "Student"}</p>
                </div>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <div className="col-span-3 text-center py-12 text-slate-500">
              No reviews available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
