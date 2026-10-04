"use client";

import React from "react";
import Link from "next/link";

export interface CourseCardItem {
  id: string;
  title: string;
  tag: string;
  discount: string;
  badge: string;
  duration: string;
  price: string;
  originalPrice: string;
  image: string;
  registrationEnd?: string;
}

import { Clock } from "lucide-react";

export default function CourseCard({ course }: { course: CourseCardItem }) {
  const [timeLeft, setTimeLeft] = React.useState<string | null>(null);
  const [isEndingSoon, setIsEndingSoon] = React.useState(false);

  React.useEffect(() => {
    if (!course.registrationEnd) return;
    const updateCountdown = () => {
      const end = new Date(course.registrationEnd!).getTime();
      const now = new Date().getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft("Registration Closed");
        setIsEndingSoon(true);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setIsEndingSoon(days < 3); // Highlight in red if less than 3 days

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m left`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s left`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [course.registrationEnd]);

  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold text-[#002b5b] rounded-full uppercase tracking-wider shadow-sm">
              {course.tag}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-red-500/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold text-white rounded-full shadow-sm">
              {course.discount}
            </span>
          </div>

          {/* Registration Countdown Banner */}
          {timeLeft && (
            <div className={`absolute bottom-0 left-0 right-0 py-2 px-4 backdrop-blur-md border-t border-white/20 flex items-center justify-center gap-2 ${isEndingSoon ? 'bg-rose-500/90 text-white' : 'bg-slate-900/80 text-sky-300'}`}>
              <Clock className={`w-3.5 h-3.5 ${isEndingSoon ? 'animate-pulse' : ''}`} />
              <span className="text-[11px] font-extrabold tracking-wide uppercase">
                Ends In: {timeLeft}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0077b6] bg-[#0077b6]/10 px-2.5 py-1 rounded-md">
              {course.badge}
            </span>
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {course.duration.replace("Duration: ", "")}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-[#0077b6] transition-colors h-[56px]">
            {course.title}
          </h3>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-black text-[#002b5b]">
                ৳{course.price}
              </span>
              <span className="text-sm font-medium text-slate-400 line-through decoration-slate-300">
                ৳{course.originalPrice}
              </span>
            </div>

            <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#0077b6] group-hover:text-white transition-colors text-[#0077b6]">
              <svg
                className="w-5 h-5 translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
