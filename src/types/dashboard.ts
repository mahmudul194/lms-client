export interface ClassVideo {
  no: string;
  title: string;
  duration: string;
  date: string;
  videoUrl: string;
  description: string;
  resources: { name: string; size: string; type: string }[];
  completed?: boolean;
}

export interface LiveClass {
  id: number;
  title: string;
  date: string;
  time: string;
  instructor: string;
  status: string;
  zoomLink: string;
  meetingId: string;
  passcode: string;
}

export interface Assignment {
  id: number;
  title: string;
  deadline: string;
  totalMarks: number;
  obtainedMarks: number | null;
  status: "Graded" | "Due" | "Submitted";
  feedback: string;
}

export interface CourseResource {
  name: string;
  size: string;
  type: string;
  category: string;
}

export interface PendingApproval {
  id: string;
  name: string;
  course: string;
  method: string;
  amount: string;
  phone: string;
  status: "Pending" | "Approved" | "Rejected";
  trxId?: string; advancePaid?: string; totalFee?: string; dueAmount?: string; batch?: string; email?: string; note?: string;
}

export interface CourseLessonItem {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  resourcesCount: number;
}

export interface CourseModuleItem {
  id: string;
  courseId: string;
  courseName: string;
  moduleNo: string;
  moduleTitle: string;
  duration: string;
  lessons: CourseLessonItem[];
}

export interface CouponItem {
  id: string;
  code: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  applicableCourse: string;
  isActive: boolean;
}

export interface EnrolledLesson {
  id: string;
  lessonNo: number;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  resources: { name: string; size: string; type: string }[];
  isCompleted: boolean;
  isUnlocked: boolean;
}

export interface EnrolledModule {
  id: string;
  moduleNo: string;
  title: string;
  lessons: EnrolledLesson[];
}

export interface EnrolledCourse {
  id: string;
  title: string;
  category: string;
  batch: string;
  instructor: string;
  thumbnail: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  modules: EnrolledModule[];
}

export type StudentDashboardTab =
  | "overview"
  | "courses"
  | "live"
  | "assignments"
  | "resources"
  | "payments"
  | "certificate"
  | "profile";

export type InstructorDashboardTab =
  | "overview"
  | "batches"
  | "live_host"
  | "grading"
  | "materials"
  | "profile";

export type AdminDashboardTab =
  | "overview"
  | "admissions"
  | "students"
  | "instructors"
  | "batches"
  | "recordings"
  | "modules"
  | "coupons"
  | "revenue"
  | "settings";
