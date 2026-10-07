import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Quote, ArrowRight } from "lucide-react";
import { reviewsApi } from "@/services/api";

export default function SuccessStoriesSection() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await reviewsApi.getAllReviews();
        if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
          // Take top 3 for the landing page
          setReviews(res.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-slate-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-[#002b5b] text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-[#0077b6] text-[#0077b6]" />
              <span>What Students Say About Us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Student Reviews & Success Stories
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Hear directly from our graduates working across top engineering firms and international remote BIM contracts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0077b6] transition-colors"
            >
              <span>Project Gallery</span>
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0077b6] hover:text-[#002b5b] transition-colors"
            >
              <span>All Success Stories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-10 h-10 text-sky-100 absolute top-5 right-5" />

              <div>
                {/* Rating Stars */}
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
                  className="w-12 h-12 rounded-full object-cover border-2 border-sky-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">{review.student?.name || "Anonymous"}</h4>
                  <p className="text-xs text-[#0077b6] font-semibold">{review.batch?.name || "Student"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
