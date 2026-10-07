"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { StudentDashboardTab, InstructorDashboardTab, AdminDashboardTab } from "@/types/dashboard";
import { STUDENT_NAV_ITEMS, INSTRUCTOR_NAV_ITEMS, ADMIN_NAV_ITEMS } from "./dashboardNavConfig";
import DashboardBrandHeader from "./DashboardBrandHeader";
import DashboardSidebarFooter from "./DashboardSidebarFooter";

interface DashboardSidebarProps {
  currentRole: "student" | "instructor" | "admin";
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  studentTab: StudentDashboardTab;
  setStudentTab: (tab: StudentDashboardTab) => void;
  instructorTab: InstructorDashboardTab;
  setInstructorTab: (tab: InstructorDashboardTab) => void;
  adminTab: AdminDashboardTab;
  setAdminTab: (tab: AdminDashboardTab) => void;
}

export default function DashboardSidebar({
  currentRole,
  isMobileOpen,
  onCloseMobile,
  studentTab,
  setStudentTab,
  instructorTab,
  setInstructorTab,
  adminTab,
  setAdminTab,
}: DashboardSidebarProps) {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({ user_management: true });
  const [dynamicBadges, setDynamicBadges] = useState<Record<string, string>>({});
  
  const activeTabId = currentRole === "student" ? studentTab : currentRole === "instructor" ? instructorTab : adminTab;
  
  useEffect(() => {
    if (currentRole !== "admin") return;

    (async () => {
      try {
        const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
        const { studentsApi } = await import("@/services/api/studentsApi");
        const { mentorsApi } = await import("@/services/api/mentorsApi");
        const { batchesApi } = await import("@/services/api/batchesApi");

        const [enrollRes, stdRes, mentRes, btcRes] = await Promise.all([
          enrollmentsApi.getAllEnrollments({ limit: 100 }),
          studentsApi.getAllStudents({ limit: 1000 }),
          mentorsApi.getAllMentors({ limit: 100 }),
          batchesApi.getAllBatches({ limit: 100 }),
        ]);

        const pendingAdmissions = enrollRes.data?.items?.filter(e => e.status === "pending").length || 0;
        const students = stdRes.data?.items?.filter(s => s.role?.toLowerCase() === "student" || s.user?.role?.toLowerCase() === "student").length || 0;
        const mentors = mentRes.data?.items?.length || 0;
        const batches = btcRes.data?.items?.length || 0;

        setDynamicBadges({
          admissions: pendingAdmissions > 0 ? `${pendingAdmissions} Pending` : "",
          user_management: `${students + mentors}`,
          students: `${students}`,
          instructors: `${mentors} Active`,
          batches: `${batches}`,
        });
      } catch (error) {
        console.error("Failed to fetch sidebar counts:", error);
      }
    })();
  }, [currentRole]);

  const baseNavItems = currentRole === "student" ? STUDENT_NAV_ITEMS : currentRole === "instructor" ? INSTRUCTOR_NAV_ITEMS : ADMIN_NAV_ITEMS;
  
  const currentNavItems = baseNavItems.map(item => {
    const badge = dynamicBadges[item.id] !== undefined ? dynamicBadges[item.id] : item.badge;
    const children = item.children?.map(child => ({
      ...child,
      badge: dynamicBadges[child.id] !== undefined ? dynamicBadges[child.id] : child.badge
    }));
    return { ...item, badge, children };
  });

  const toggleDropdown = (id: string) => setOpenDropdowns((p) => ({ ...p, [id]: !p[id] }));

  const handleNavClick = (id: string) => {
    if (currentRole === "student") setStudentTab(id as StudentDashboardTab);
    else if (currentRole === "instructor") setInstructorTab(id as InstructorDashboardTab);
    else setAdminTab(id as AdminDashboardTab);
    onCloseMobile();
  };

  return (
    <>
      {isMobileOpen && <div onClick={onCloseMobile} className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs" />}

      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 sm:w-80 bg-[#001428] text-white z-50 lg:z-30 flex flex-col justify-between transition-transform duration-300 shrink-0 overflow-hidden shadow-2xl lg:shadow-none border-r border-slate-800/80 font-sans ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex flex-col min-h-0 flex-1">
          <DashboardBrandHeader currentRole={currentRole} onCloseMobile={onCloseMobile} />

          {/* Navigation Links with Dropdown Support */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = !!item.children?.length;
              const isChildActive = hasChildren && item.children?.some((c) => c.id === activeTabId);
              const isActive = activeTabId === item.id || isChildActive;
              const isExpanded = isChildActive || !!openDropdowns[item.id];

              if (hasChildren) {
                return (
                  <div key={item.id} className="space-y-1">
                    <button type="button" onClick={() => toggleDropdown(item.id)} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${isChildActive ? "bg-white/[0.08] text-white" : "text-slate-300 hover:bg-white/[0.05] hover:text-white"}`}>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4.5 h-4.5 ${isChildActive ? "text-sky-400" : "text-sky-300"}`} />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-200 font-semibold font-bold">{item.badge}</span>}
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="ml-5 pl-3 border-l-2 border-slate-700/60 space-y-1 py-1 mt-1">
                        {item.children?.map((sub) => (
                          <button key={sub.id} type="button" onClick={() => handleNavClick(sub.id)} className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTabId === sub.id ? "bg-[#0077b6] text-white font-bold shadow-xs" : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"}`}>
                            <span>{sub.label}</span>
                            {sub.badge && <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${activeTabId === sub.id ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>{sub.badge}</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button key={item.id} onClick={() => handleNavClick(item.id)} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${isActive ? "bg-gradient-to-r from-[#0077b6] to-[#0284c7] text-white shadow-md border border-sky-400/25" : "text-slate-300 hover:bg-white/[0.07] hover:text-white"}`}>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-sky-300"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && <span className="text-[11px] px-2 py-0.5 rounded-md font-semibold font-bold bg-sky-500/15 text-sky-200 border border-sky-500/25">{item.badge}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <DashboardSidebarFooter />
      </aside>
    </>
  );
}
