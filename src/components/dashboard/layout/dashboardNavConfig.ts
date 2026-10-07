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
  Star,
  Bell,
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
  { id: "reviews", label: "My Reviews", icon: Star },
  { id: "profile", label: "Settings", icon: User },
];

export const INSTRUCTOR_NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "batches", label: "Batches & Live Studio", icon: Video, badge: "Tonight" },
  { id: "grading", label: "Review Submissions", icon: FileCheck, badge: "3 Due" },
  { id: "materials", label: "Course Content Builder", icon: Upload },
  { id: "resources", label: "Resources", icon: FolderDown },
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
  {
    id: "batch_management",
    label: "Batch Manager",
    icon: Layers,
    children: [
      { id: "categories", label: "Course Categories" },
      { id: "courses", label: "Course " },
      { id: "batches", label: "Batch " },
    ],
  },
  {
    id: "course_contents",
    label: "Course Contents",
    icon: BookOpen,
    children: [
      { id: "modules", label: "Module ", badge: "New" },
      { id: "lessons", label: "Lessons " },
      { id: "assignments", label: "Assignments" },
      { id: "resources", label: "Resources" },
    ],
  },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "coupons", label: "Coupon Engine", icon: TicketPercent, badge: "Active" },
  { id: "revenue", label: "Financial Reports", icon: BarChart3 },
  {
    id: "cms",
    label: "CMS Management",
    icon: FolderTree,
    children: [
      { id: "blogs", label: "Blogs" },
      { id: "galleries", label: "Galleries" },
      { id: "portfolios", label: "Portfolios" },
      { id: "reviews", label: "Reviews" },
      { id: "notices", label: "Notices" },
      { id: "contacts", label: "Contact Messages" },
    ],
  },
  { id: "settings", label: "Settings", icon: User },
];
