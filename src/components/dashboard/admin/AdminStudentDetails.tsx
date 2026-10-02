"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, GraduationCap, User, Info, MapPin, Briefcase, Calendar, Monitor, Shield, BookOpen } from "lucide-react";

interface AdminStudentDetailsProps {
  student: any;
  onBack: () => void;
}

export default function AdminStudentDetails({ student, onBack }: AdminStudentDetailsProps) {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
        const res = await enrollmentsApi.getAllEnrollments({ student_id: student.id, limit: 100 });
        if (res.statusCode === 200 && res.data?.items) {
          setEnrollments(res.data.items);
        }
      } catch (err) {
        console.error("Failed to load student enrollments", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [student.id]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <button 
          onClick={onBack} 
          className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <User className="w-6 h-6 text-[#0077b6]" />
            Student Details: {student.name}
          </h2>
          <p className="text-sm text-slate-500 mt-1">Full profile and academic records</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Basic Info Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-500" /> Basic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Full Name</span><span className="font-medium text-slate-900">{student.name || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Date of Birth</span><span className="font-medium text-slate-900">{student.dateOfBirth || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Gender</span><span className="font-medium text-slate-900">{student.gender || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Profile Status</span><span className="font-medium text-slate-900">{student.isActive ? "Active" : "Inactive"} {student.isVerified && "✓"}</span></div>
          </div>
        </div>

        {/* Academic Info Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-500" /> Academic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Institute</span><span className="font-medium text-slate-900">{student.institute || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Department</span><span className="font-medium text-slate-900">{student.department || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Technology</span><span className="font-medium text-slate-900">{student.technology || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Semester</span><span className="font-medium text-slate-900">{student.semester || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Shift</span><span className="font-medium text-slate-900">{student.shift || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Session</span><span className="font-medium text-slate-900">{student.session || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Roll No</span><span className="font-medium text-slate-900">{student.roll || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Registration No</span><span className="font-medium text-slate-900">{student.registrationNumber || "N/A"}</span></div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" /> Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Email Address</span><span className="font-medium text-slate-900">{student.email || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Phone Number</span><span className="font-medium text-slate-900">{student.phone || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">District</span><span className="font-medium text-slate-900">{student.district || "N/A"}</span></div>
            <div className="sm:col-span-2 lg:col-span-3"><span className="text-slate-500 block text-xs font-semibold mb-1.5">Present Address</span><span className="font-medium text-slate-900">{student.presentAddress || "N/A"}</span></div>
            <div className="sm:col-span-2 lg:col-span-3"><span className="text-slate-500 block text-xs font-semibold mb-1.5">Permanent Address</span><span className="font-medium text-slate-900">{student.permanentAddress || "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Division</span><span className="font-medium text-slate-900">{student.division || "N/A"}</span></div>
          </div>
        </div>

        {/* Professional & Social Info */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-500" /> Professional & Skills
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm mb-6">
            <div>
              <span className="text-slate-500 block text-xs font-semibold mb-3">Skills</span>
              <div className="flex flex-wrap gap-2">
                {student.skills && student.skills.length > 0 ? (
                  student.skills.map((skill: string, i: number) => <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg shadow-sm">{skill}</span>)
                ) : (
                  <span className="text-slate-400">N/A</span>
                )}
              </div>
            </div>
            <div>
              <span className="text-slate-500 block text-xs font-semibold mb-3">Interested Fields</span>
              <div className="flex flex-wrap gap-2">
                {student.interestedField && student.interestedField.length > 0 ? (
                  student.interestedField.map((field: string, i: number) => <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg shadow-sm">{field}</span>)
                ) : (
                  <span className="text-slate-400">N/A</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm pt-6 border-t border-slate-200/60">
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">GitHub</span><span className="font-medium text-sky-600 truncate block">{student.github ? <a href={student.github} target="_blank" rel="noreferrer" className="hover:underline">{student.github}</a> : "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">LinkedIn</span><span className="font-medium text-sky-600 truncate block">{student.linkedin ? <a href={student.linkedin} target="_blank" rel="noreferrer" className="hover:underline">{student.linkedin}</a> : "N/A"}</span></div>
            <div><span className="text-slate-500 block text-xs font-semibold mb-1.5">Portfolio</span><span className="font-medium text-sky-600 truncate block">{student.portfolio ? <a href={student.portfolio} target="_blank" rel="noreferrer" className="hover:underline">{student.portfolio}</a> : "N/A"}</span></div>
          </div>
        </div>

        {/* Account & Security (Devices) */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Shield className="w-4 h-4 text-violet-500" /> Account Security & Devices
          </h3>
          <div className="space-y-5">
            <div>
              <span className="text-slate-500 block text-xs font-semibold mb-3">Active Login Devices ({student.user?.devices?.length || 0})</span>
              <div className="flex flex-col gap-2">
                {student.user?.devices && student.user.devices.length > 0 ? (
                  student.user.devices.map((device: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-sm max-w-2xl">
                      <Monitor className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-medium break-all">{device}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-slate-400">No active devices found.</span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm pt-5 border-t border-slate-200/60">
              <div>
                <span className="text-slate-500 block text-xs font-semibold mb-1.5">Last Login Time</span>
                <span className="font-medium text-slate-900">
                  {student.user?.lastlogin ? new Date(student.user.lastlogin).toLocaleString() : "Never"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs font-semibold mb-1.5">Account Created</span>
                <span className="font-medium text-slate-900">
                  {student.user?.createdAt ? new Date(student.user.createdAt).toLocaleString() : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Industrial Attachment */}
        {student.industrialAttachment && (
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 shadow-sm">
            <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Industrial Attachment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div><span className="text-amber-700/70 block text-xs font-semibold mb-1.5">Company</span><span className="font-medium text-amber-900">{student.attachmentCompany || "N/A"}</span></div>
              <div><span className="text-amber-700/70 block text-xs font-semibold mb-1.5">Status</span><span className="font-medium text-amber-900">{student.attachmentStatus || "N/A"}</span></div>
            </div>
          </div>
        )}
        {/* Course Progress Section */}
        <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 shadow-sm">
          <h3 className="text-sm font-bold text-sky-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-600" /> Enrolled Courses & Progress
          </h3>
          {loading ? (
            <div className="text-sm text-sky-600 font-medium py-4 text-center">Loading enrollments...</div>
          ) : enrollments.length === 0 ? (
            <div className="text-sm text-sky-700/80 font-medium py-4 text-center">No active enrollments found for this student.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {enrollments.map((enr: any) => {
                const course = enr.batch?.course || {};
                let totalLessons = 0;
                
                (course.modules || []).forEach((m: any) => {
                  totalLessons += (m.lessons || []).length;
                });

                const completedLessonIds = (enr.lesson_progress || [])
                  .filter((p: any) => p.is_completed)
                  .map((p: any) => p.lesson_id);
                
                const completedLessonsCount = completedLessonIds.length;
                const progressPercent = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

                return (
                  <div key={enr.id} className="bg-white p-4 rounded-xl border border-sky-200 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{course.title || "Unknown Course"}</h4>
                        <p className="text-xs font-semibold text-sky-600 mt-0.5">Batch: {enr.batch?.name || "N/A"}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide shrink-0 ${enr.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {enr.status}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 mt-auto">
                      <div className="flex justify-between items-end text-xs">
                        <span className="font-semibold text-slate-500">Progress</span>
                        <span className="font-bold text-slate-700">{completedLessonsCount} / {totalLessons} Lessons ({progressPercent}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all duration-500" 
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
