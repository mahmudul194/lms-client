import {
  Sparkles,
  BookOpen,
  Video,
  FileCheck,
  Award,
  CreditCard,
  FolderDown,
  Upload,
  Users,
  Layers,
  FolderTree,
  TicketPercent,
  BarChart3,
  User,
  PlayCircle,
  LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  id: string;
  label: string;
  badge?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  children?: NavSubItem[];
}

export const STUDENT_NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "live", label: "Live Schedule", icon: Video, badge: "Live" },
  { id: "assignments", label: "Assignments", icon: FileCheck, badge: "1 Due" },
  { id: "resources", label: "Resources", icon: FolderDown },
  { id: "payments", label: "Installments", icon: CreditCard, badge: "৳4k Due" },
  { id: "certificate", label: "Certificate", icon: Award },
  { id: "profile", label: "Settings", icon: User },
];

export const INSTRUCTOR_NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "batches", label: "Batches & Live Studio", icon: Video, badge: "Tonight" },
  { id: "grading", label: "Review Submissions", icon: FileCheck, badge: "3 Due" },
  { id: "materials", label: "Handover Class Recordings", icon: Upload, badge: "Handover" },
  { id: "profile", label: "Trainer Profile", icon: User },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Admin Overview", icon: Sparkles },
  { id: "admissions", label: "Admissions & TrxID", icon: CreditCard, badge: "2 Pending" },
  {
    id: "user_management",
    label: "User Management",
    icon: Users,
    badge: "5.2k",
    children: [
      { id: "students", label: "Student Directory", badge: "5,240" },
      { id: "instructors", label: "Trainer & Mentors", badge: "3 Active" },
    ],
  },
  { id: "categories", label: "Course Categories", icon: FolderTree },
  { id: "courses", label: "Course Manager", icon: BookOpen },
  { id: "batches", label: "Batch Manager", icon: Layers },
  { id: "modules", label: "Module Uploader", icon: FolderTree, badge: "New" },
  { id: "lessons", label: "Lessons Manager", icon: PlayCircle },
  { id: "assignments", label: "Assignments", icon: FileCheck },
  { id: "resources", label: "Resources", icon: FolderDown },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "coupons", label: "Coupon Engine", icon: TicketPercent, badge: "Active" },
  { id: "revenue", label: "Financial Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: User },
];
