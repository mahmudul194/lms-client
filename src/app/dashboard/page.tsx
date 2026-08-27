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

export default function UnifiedDashboardPage() {
  const [currentRole, setCurrentRole] = useState<"student" | "instructor" | "admin">("student");
  const [currentUser, setCurrentUser] = useState<UserAccount>(DUMMY_ACCOUNTS[0]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [studentTab, setStudentTabState] = useState<StudentDashboardTab>("overview");
  const [instructorTab, setInstructorTabState] = useState<InstructorDashboardTab>("overview");
  const [adminTab, setAdminTabState] = useState<AdminDashboardTab>("overview");

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [activeAssignmentId, setActiveAssignmentId] = useState<number | null>(null);
  const [selectedClassVideo, setSelectedClassVideo] = useState<ClassVideo | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const r = sp.get("role") || localStorage.getItem("bim_user_role");
    const t = sp.get("tab") || localStorage.getItem("bim_active_tab");

    const validRole: "student" | "instructor" | "admin" =
      r === "instructor" || r === "admin" ? r : "student";
    setCurrentRole(validRole);
    setCurrentUser(DUMMY_ACCOUNTS.find((a) => a.role === validRole) || DUMMY_ACCOUNTS[0]);

    if (t) {
      if (validRole === "student") setStudentTabState(t as StudentDashboardTab);
      else if (validRole === "instructor") setInstructorTabState(t as InstructorDashboardTab);
      else if (validRole === "admin") setAdminTabState(t as AdminDashboardTab);
    }
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

  const handleSetStudentTab = (t: StudentDashboardTab) => {
    setStudentTabState(t);
    syncUrl("student", t);
  };

  const handleSetInstructorTab = (t: InstructorDashboardTab) => {
    setInstructorTabState(t);
    syncUrl("instructor", t);
  };

  const handleSetAdminTab = (t: AdminDashboardTab) => {
    setAdminTabState(t);
    syncUrl("admin", t);
  };

  const switchRole = (role: "student" | "instructor" | "admin") => {
    setCurrentRole(role);
    const acc = DUMMY_ACCOUNTS.find((a) => a.role === role) || DUMMY_ACCOUNTS[0];
    setCurrentUser(acc);
    setIsMobileSidebarOpen(false);
    const activeT = role === "student" ? studentTab : role === "instructor" ? instructorTab : adminTab;
    syncUrl(role, activeT);
  };

  const activeVideo = selectedClassVideo || MOCK_DASHBOARD_CLASSES[0];

  return (
    <div className="bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] min-h-screen text-slate-900 flex font-sans w-full">
      <DashboardSidebar
        currentRole={currentRole}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        studentTab={studentTab}
        setStudentTab={handleSetStudentTab}
        instructorTab={instructorTab}
        setInstructorTab={handleSetInstructorTab}
        adminTab={adminTab}
        setAdminTab={handleSetAdminTab}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          currentRole={currentRole}
          currentUser={currentUser}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="flex-1 p-4 sm:p-7 lg:p-9 space-y-7 max-w-[1600px] w-full">
          {currentRole === "student" && (
            <StudentTabRouter
              studentTab={studentTab}
              setStudentTab={handleSetStudentTab}
              currentUser={currentUser}
              classesList={MOCK_DASHBOARD_CLASSES}
              liveClasses={MOCK_LIVE_CLASSES}
              resources={MOCK_RESOURCES}
              assignments={MOCK_ASSIGNMENTS}
              activeVideo={activeVideo}
              onSelectVideo={setSelectedClassVideo}
              onOpenUpload={(id) => { setActiveAssignmentId(id); setUploadModalOpen(true); }}
            />
          )}

          {currentRole === "instructor" && (
            <InstructorDashboardView
              currentUser={currentUser}
              instructorTab={instructorTab}
              setInstructorTab={handleSetInstructorTab}
            />
          )}

          {currentRole === "admin" && (
            <AdminDashboardView
              adminTab={adminTab}
              setAdminTab={handleSetAdminTab}
            />
          )}
        </main>
      </div>

      <AssignmentUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
}
