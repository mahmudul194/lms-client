"use client";

import React, { useState, useEffect } from "react";
import { DUMMY_ACCOUNTS, UserAccount } from "@/data/dummyAccounts";
import { ClassVideo, StudentDashboardTab, InstructorDashboardTab, AdminDashboardTab } from "@/types/dashboard";
import { MOCK_DASHBOARD_CLASSES, MOCK_LIVE_CLASSES, MOCK_ASSIGNMENTS, MOCK_RESOURCES } from "@/data/dashboardMockData";
import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/layout/DashboardHeader";
import StudentTabRouter from "@/components/dashboard/student/StudentTabRouter";
import AssignmentUploadModal from "@/components/dashboard/student/AssignmentUploadModal";
import InstructorDashboardView from "@/components/dashboard/instructor/InstructorDashboardView";
import AdminDashboardView from "@/components/dashboard/admin/AdminDashboardView";
import { Lock, LogOut, ShieldAlert } from "lucide-react";

export default function UnifiedDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [currentRole, setCurrentRole] = useState<"student" | "instructor" | "admin">("student");
  const [currentUser, setCurrentUser] = useState<UserAccount>(DUMMY_ACCOUNTS[0]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [studentTab, setStudentTabState] = useState<StudentDashboardTab>("overview");
  const [instructorTab, setInstructorTabState] = useState<InstructorDashboardTab>("overview");
  const [adminTab, setAdminTabState] = useState<AdminDashboardTab>("overview");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [, setActiveAssignmentId] = useState<number | null>(null);
  const [selectedClassVideo, setSelectedClassVideo] = useState<ClassVideo | null>(null);
  const [isDeviceLocked, setIsDeviceLocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const r = sp.get("role") || localStorage.getItem("bim_user_role");
    const t = sp.get("tab") || localStorage.getItem("bim_active_tab");
    const validRole: "student" | "instructor" | "admin" = r === "instructor" || r === "admin" ? r : "student";
    setCurrentRole(validRole);

    const storedName = localStorage.getItem("bim_user_name");
    const storedEmail = localStorage.getItem("bim_user_email");
    if (storedName) {
      setCurrentUser((prev) => ({ ...prev, name: storedName, nameEn: storedName, email: storedEmail || prev.email, role: validRole }));
    } else {
      setCurrentUser(DUMMY_ACCOUNTS.find((a) => a.role === validRole) || DUMMY_ACCOUNTS[0]);
    }

    if (t) {
      if (validRole === "student") setStudentTabState(t as StudentDashboardTab);
      else if (validRole === "instructor") setInstructorTabState(t as InstructorDashboardTab);
      else if (validRole === "admin") setAdminTabState(t as AdminDashboardTab);
    }

    (async () => {
      try {
        const { authApi } = await import("@/services/api/authApi");
        const res = await authApi.getMe();
        const user = res.data;
        if (res.statusCode === 200 && user) {
          if (user.isDeviceLocked) setIsDeviceLocked(true);
          if (user.name) localStorage.setItem("bim_user_name", user.name);
          if (user.email) localStorage.setItem("bim_user_email", user.email);
          setCurrentUser((prev) => ({ ...prev, name: user.name || prev.name, nameEn: user.name || prev.nameEn, email: user.email || prev.email }));
        }
      } catch {}
    })();
  }, []);

  const syncUrl = (role: string, tab: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("bim_user_role", role);
    localStorage.setItem("bim_active_tab", tab);
    const sp = new URLSearchParams(window.location.search);
    sp.set("role", role);
    sp.set("tab", tab);
    window.history.replaceState(null, "", `${window.location.pathname}?${sp.toString()}`);
  };

  const handleSetStudentTab = (t: StudentDashboardTab) => { setStudentTabState(t); syncUrl("student", t); };
  const handleSetInstructorTab = (t: InstructorDashboardTab) => { setInstructorTabState(t); syncUrl("instructor", t); };
  const handleSetAdminTab = (t: AdminDashboardTab) => { setAdminTabState(t); syncUrl("admin", t); };
  const activeVideo = selectedClassVideo || MOCK_DASHBOARD_CLASSES[0];

  if (!mounted) {
    return (
      <div className="bg-[#f8fafc] min-h-screen flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 rounded-full border-3 border-[#0077b6]/30 border-t-[#0077b6] animate-spin" />
          <span className="text-xs font-bold text-slate-400 tracking-wide uppercase">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] min-h-screen text-slate-900 flex font-sans w-full">
      <DashboardSidebar
        currentRole={currentRole} isMobileOpen={isMobileSidebarOpen} onCloseMobile={() => setIsMobileSidebarOpen(false)}
        studentTab={studentTab} setStudentTab={handleSetStudentTab} instructorTab={instructorTab}
        setInstructorTab={handleSetInstructorTab} adminTab={adminTab} setAdminTab={handleSetAdminTab}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          currentRole={currentRole} currentUser={currentUser} onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        />

        <main className="flex-1 p-4 sm:p-7 lg:p-9 space-y-7 max-w-[1600px] w-full">
          {currentRole === "student" && (
            <StudentTabRouter
              studentTab={studentTab} setStudentTab={handleSetStudentTab} currentUser={currentUser}
              classesList={MOCK_DASHBOARD_CLASSES} liveClasses={MOCK_LIVE_CLASSES} resources={MOCK_RESOURCES}
              assignments={MOCK_ASSIGNMENTS} activeVideo={activeVideo} onSelectVideo={setSelectedClassVideo}
              onOpenUpload={(id) => { setActiveAssignmentId(id); setUploadModalOpen(true); }}
            />
          )}
          {currentRole === "instructor" && (
            <InstructorDashboardView currentUser={currentUser} instructorTab={instructorTab} setInstructorTab={handleSetInstructorTab} />
          )}
          {currentRole === "admin" && (
            <AdminDashboardView adminTab={adminTab} setAdminTab={handleSetAdminTab} />
          )}
        </main>
      </div>

      <AssignmentUploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />

      {isDeviceLocked && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
              <ShieldAlert className="w-8 h-8 text-rose-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Device Limit Reached</h2>
            <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">
              You are logged in from more than 3 devices. Please log out from all devices or this device to regain access to your dashboard.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={async () => {
                  const { authApi } = await import("@/services/api/authApi");
                  await authApi.logoutAll();
                  window.location.href = "/";
                }}
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout All Devices
              </button>
              <button
                onClick={async () => {
                  const { authApi } = await import("@/services/api/authApi");
                  await authApi.logout();
                  window.location.href = "/";
                }}
                className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Logout This Device
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
