"use client";

import React, { useState, useEffect } from "react";
import { FolderDown, ArrowRight } from "lucide-react";
import { enrollmentsApi, EnrollmentItem } from "@/services/api/enrollmentsApi";
import StudentResourcesView from "./StudentResourcesView";

export default function StudentResourcesTab() {
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for which batch resources to view
  const [selectedBatch, setSelectedBatch] = useState<{
    id: string;
    name: string;
    courseTitle: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await enrollmentsApi.getMyEnrollments();
        if (res.statusCode === 200 && res.data) {
          // Show all enrollments or filter active
          setEnrollments(res.data);
        }
      } catch (e) {
        console.error("Failed to fetch enrollments for resources", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (selectedBatch) {
    return (
      <StudentResourcesView
        courseTitle={selectedBatch.courseTitle}
        batch={selectedBatch.name}
        batchId={selectedBatch.id}
        onBack={() => setSelectedBatch(null)}
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FolderDown className="w-6 h-6 text-[#0077b6]" />
            <span>My Resources</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Select a course batch to view and download study materials, PDFs, and links.</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-slate-400 font-semibold bg-slate-50 rounded-2xl border border-slate-100 animate-pulse">
            Loading your courses...
          </div>
        ) : enrollments.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-medium bg-slate-50 rounded-2xl border border-slate-100">
            You are not enrolled in any courses yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrollments.map((enr) => {
              const courseTitle = enr.batch?.course?.title || "Unknown Course";
              const batchName = enr.batch?.name || "Unknown Batch";
              
              return (
                <div 
                  key={enr.id} 
                  onClick={() => {
                    if (enr.batch_id) {
                      setSelectedBatch({
                        id: enr.batch_id,
                        name: batchName,
                        courseTitle: courseTitle,
                      });
                    }
                  }}
                  className="p-6 rounded-3xl border-2 border-slate-100 bg-white hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-black">
                        {batchName}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide shrink-0 ${enr.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {enr.status}
                      </span>
                    </div>
                    
                    <h4 className="font-black text-slate-900 text-lg group-hover:text-purple-700 transition-colors leading-tight">
                      {courseTitle}
                    </h4>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-purple-700">
                    <span>View Materials</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
