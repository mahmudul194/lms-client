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
  { id: "courses", label: "Course & Videos", icon: BookOpen, badge: "28/45" },
  { id: "live", label: "Live Schedule", icon: Video, badge: "Live" },
  { id: "assignments", label: "Assignments", icon: FileCheck, badge: "1 Due" },
  { id: "resources", label: "Project Files", icon: FolderDown },
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
  { id: "batches", label: "Batch Manager", icon: Layers },
  { id: "recordings", label: "Recordings Queue", icon: Video, badge: "3 New" },
  { id: "modules", label: "Module Uploader", icon: FolderTree, badge: "New" },
  { id: "coupons", label: "Coupon Engine", icon: TicketPercent, badge: "Active" },
  { id: "revenue", label: "Financial Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: User },
];
