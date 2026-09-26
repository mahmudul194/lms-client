"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";

interface CategoryNavItem {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export default function NavCategoryDropdown() {
  const [categories, setCategories] = useState<CategoryNavItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { categoryApi } = await import("@/services/api/categoryApi");
        const res = await categoryApi.getAllCategories({ limit: 12 });
        if (!isMounted) return;

        if (res.statusCode === 200 && res.data?.items?.length) {
          setCategories(
            res.data.items.map((item) => ({
              id: item.id,
              name: item.name,
              slug: item.slug || item.id,
              count: item.coursesCount || 0,
            }))
          );
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
    <div className="relative hidden md:block group py-4">
      <button className="flex items-center gap-2.5 px-3.5 py-2 text-sm sm:text-[15px] font-bold text-slate-800 hover:text-[#0077b6] transition-colors cursor-pointer">
        <LayoutGrid className="w-5 h-5 text-slate-700" />
        <span>Category</span>
      </button>

      <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-0 pt-1 w-72 transition-all duration-150 z-50">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 py-3">
          <div className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            Course Categories
          </div>

          {loading ? (
            <div className="px-4 py-3 text-xs text-slate-400 font-medium animate-pulse">
              Loading categories...
            </div>
          ) : categories.length > 0 ? (
            categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/courses?category=${cat.slug}`}
                className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#0077b6] transition-colors"
              >
                <span>{cat.name}</span>
                {cat.count > 0 && (
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">
                    {cat.count}
                  </span>
                )}
              </Link>
            ))
          ) : (
            <Link
              href="/courses"
              className="block px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#0077b6] transition-colors"
            >
              Browse All Courses
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
